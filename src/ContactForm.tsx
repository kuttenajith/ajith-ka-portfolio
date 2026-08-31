import { useState, type FormEvent } from "react";
import { contact } from "./content";
import { sendContact } from "./sendContact";

const roles = [
  "Recruiter / HR",
  "Engineering manager",
  "CTO / VP Engineering",
  "CEO / Founder",
  "Other",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactBlock() {
  return (
    <div className="contact-layout">
      <div className="contact-copy">
        <p className="kicker">{contact.kicker}</p>
        <h2>{contact.title}</h2>
        <p className="lede">{contact.lede}</p>
        <p className="meta">{contact.note}</p>
      </div>
      <ContactForm />
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [replyBy, setReplyBy] = useState<"email" | "callback">("email");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") || "").trim()) {
      setStatus("sent");
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const role = String(data.get("role") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const reply = replyBy;

    if (!name || !email || !company || !role || !message) {
      setError("Please fill in every required field.");
      setStatus("error");
      return;
    }

    if (reply === "callback" && !phone) {
      setError("Add a phone number if you want a call back.");
      setStatus("error");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      await sendContact({ name, email, company, role, replyBy: reply, phone, message });
      setStatus("sent");
      form.reset();
      setReplyBy("email");
    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error ? reason.message : "The message could not be sent.");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-form contact-form_done" role="status">
        <p className="kicker">Sent</p>
        <h3>I have the brief.</h3>
        <p>I will reply from my inbox. If you asked for a call back, I will phone you on the number you left.</p>
        <button type="button" className="btn" onClick={() => setStatus("idle")}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="honey" htmlFor="company_website">
        Company website
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="field-row">
        <label className="field">
          <span>
            Full name <abbr title="required">*</abbr>
          </span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          <span>
            Work email <abbr title="required">*</abbr>
          </span>
          <input name="email" type="email" autoComplete="email" required maxLength={180} />
        </label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>
            Company <abbr title="required">*</abbr>
          </span>
          <input name="company" type="text" autoComplete="organization" required maxLength={120} />
        </label>
        <label className="field">
          <span>
            Your role <abbr title="required">*</abbr>
          </span>
          <select name="role" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="field">
        <legend>
          How should I reply? <abbr title="required">*</abbr>
        </legend>
        <div className="reply-picks">
          <label className="reply-pick">
            <input
              type="radio"
              name="replyBy"
              value="email"
              checked={replyBy === "email"}
              onChange={() => setReplyBy("email")}
            />
            <span>Email me</span>
          </label>
          <label className="reply-pick">
            <input
              type="radio"
              name="replyBy"
              value="callback"
              checked={replyBy === "callback"}
              onChange={() => setReplyBy("callback")}
            />
            <span>Call me back</span>
          </label>
        </div>
      </fieldset>

      <label className="field">
        <span>
          Phone {replyBy === "callback" ? <abbr title="required">*</abbr> : <em>(optional)</em>}
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          required={replyBy === "callback"}
          maxLength={40}
          placeholder="+91 …"
        />
      </label>

      <label className="field">
        <span>
          What do you need? <abbr title="required">*</abbr>
        </span>
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={6}
          placeholder="Role, product, stack, timeline, or the problem you want a call about."
        />
      </label>

      {status === "error" ? (
        <p className="contact-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
