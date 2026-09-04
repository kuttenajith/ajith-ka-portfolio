import { web3formsAccessKey } from "./contact.config";
import type { ContactFields } from "./validateContact";
import { sanitizePhone } from "./validateContact";

export class ContactSendError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type SubmitResult = { success?: boolean; message?: string };

function accessKey() {
  const fromEnv = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (typeof fromEnv === "string" && fromEnv.length > 8) return fromEnv;
  if (web3formsAccessKey.length > 8) return web3formsAccessKey;
  return "";
}

export async function sendContact(fields: ContactFields) {
  const key = accessKey();
  if (!key) {
    throw new ContactSendError(
      "The inbox is not connected yet. Email ajithkutten1998@gmail.com directly for now.",
    );
  }

  const replyBy = fields.replyBy === "callback" ? "Call back requested" : "Email";
  const phone = sanitizePhone(fields.phone).trim() || "—";
  const roleLabel = fields.role === "Other" ? `Other — ${fields.roleOther.trim()}` : fields.role;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: `Portfolio contact — ${roleLabel}: ${fields.name.trim()} (${fields.company.trim()})`,
      from_name: "Ajith Amarnath portfolio",
      name: fields.name.trim(),
      email: fields.email.trim(),
      replyto: fields.email.trim(),
      company: fields.company.trim(),
      role: roleLabel,
      reply_by: replyBy,
      phone,
      message: fields.message.trim(),
      botcheck: false,
    }),
  });

  let data: SubmitResult;
  try {
    data = (await response.json()) as SubmitResult;
  } catch {
    throw new ContactSendError("The mail service did not respond. Try again in a minute.");
  }

  if (!response.ok || data.success !== true) {
    throw new ContactSendError(data.message || "The message could not be sent.");
  }
}
