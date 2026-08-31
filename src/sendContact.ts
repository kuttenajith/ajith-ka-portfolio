import { profile } from "./content";
import type { ContactFields } from "./validateContact";
import { sanitizePhone } from "./validateContact";

export class ContactSendError extends Error {
  kind: "activate" | "failed";

  constructor(kind: "activate" | "failed", message: string) {
    super(message);
    this.kind = kind;
  }
}

type SubmitResult = { success?: boolean | string; message?: string };

function isSuccess(data: SubmitResult) {
  return data.success === true || data.success === "true";
}

function isActivation(data: SubmitResult) {
  const text = `${data.message ?? ""}`.toLowerCase();
  return text.includes("activat") || text.includes("confirm your") || text.includes("activate form");
}

function toPayload(fields: ContactFields) {
  const replyBy = fields.replyBy === "callback" ? "Call back requested" : "Email";
  return {
    subject: `Portfolio contact — ${fields.role}: ${fields.name.trim()} (${fields.company.trim()})`,
    replyBy,
    phone: sanitizePhone(fields.phone).trim() || "—",
    name: fields.name.trim(),
    email: fields.email.trim(),
    company: fields.company.trim(),
    role: fields.role,
    message: fields.message.trim(),
  };
}

export async function sendContact(fields: ContactFields) {
  const payload = toPayload(fields);
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (typeof key === "string" && key.length > 8) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: payload.subject,
        from_name: payload.name,
        email: payload.email,
        company: payload.company,
        role: payload.role,
        reply_by: payload.replyBy,
        phone: payload.phone,
        message: payload.message,
      }),
    });
    const data = (await response.json()) as SubmitResult;
    if (!response.ok || !isSuccess(data)) {
      throw new ContactSendError("failed", data.message || "The message could not be sent.");
    }
    return;
  }

  const body = new FormData();
  body.set("name", payload.name);
  body.set("email", payload.email);
  body.set("_replyto", payload.email);
  body.set("_subject", payload.subject);
  body.set("_template", "table");
  body.set("_captcha", "false");
  body.set("company", payload.company);
  body.set("role", payload.role);
  body.set("reply_by", payload.replyBy);
  body.set("phone", payload.phone);
  body.set("message", payload.message);

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });

  let data: SubmitResult;
  try {
    data = (await response.json()) as SubmitResult;
  } catch {
    throw new ContactSendError("failed", "The mail service did not respond. Try again in a minute.");
  }

  if (isActivation(data)) {
    throw new ContactSendError(
      "activate",
      "Gmail should have a mail from FormSubmit. Open it (check Spam too) and click Activate Form. Then send this brief again.",
    );
  }

  if (!response.ok || !isSuccess(data)) {
    throw new ContactSendError("failed", data.message || "The message could not be sent.");
  }
}
