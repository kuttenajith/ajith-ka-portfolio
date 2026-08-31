import { profile } from "./content";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  role: string;
  replyBy: "email" | "callback";
  phone: string;
  message: string;
};

function isSuccess(data: { success?: boolean | string }) {
  return data.success === true || data.success === "true";
}

export async function sendContact(payload: ContactPayload) {
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const subject = `Portfolio contact — ${payload.role}: ${payload.name} (${payload.company})`;
  const replyBy = payload.replyBy === "callback" ? "Call back requested" : "Email";

  if (typeof key === "string" && key.length > 8) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject,
        from_name: payload.name,
        email: payload.email,
        company: payload.company,
        role: payload.role,
        reply_by: replyBy,
        phone: payload.phone || "—",
        message: payload.message,
      }),
    });
    const data = (await response.json()) as { success?: boolean; message?: string };
    if (!response.ok || !isSuccess(data)) {
      throw new Error(data.message || "The message could not be sent.");
    }
    return;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      _replyto: payload.email,
      _subject: subject,
      _template: "table",
      _captcha: "false",
      company: payload.company,
      role: payload.role,
      reply_by: replyBy,
      phone: payload.phone || "—",
      message: payload.message,
    }),
  });
  const data = (await response.json()) as { success?: boolean | string; message?: string };
  if (!response.ok || !isSuccess(data)) {
    throw new Error(data.message || "The message could not be sent.");
  }
}
