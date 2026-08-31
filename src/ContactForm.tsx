import { useState, type FormEvent } from "react";
import { contact } from "./content";
import { ContactSendError, sendContact } from "./sendContact";
import {
  roles,
  sanitizePhone,
  validateContact,
  type ContactFields,
  type FieldErrors,
  type FieldKey,
  type ReplyBy,
} from "./validateContact";

type Status = "idle" | "sending" | "sent" | "activate" | "error";

const empty: ContactFields = {
  name: "",
  email: "",
  company: "",
  role: "",
  replyBy: "email",
  phone: "",
  message: "",
};

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

function FieldError({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="field-error" role="alert">
      {text}
    </span>
  );
}

function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [banner, setBanner] = useState("");

  const setField = <K extends FieldKey>(key: K, value: ContactFields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const onBlur = (key: FieldKey) => {
    const next = validateContact(fields);
    if (next[key]) {
      setErrors((current) => ({ ...current, [key]: next[key] }));
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const trap = String(new FormData(form).get("_gotcha") || "").trim();
    if (trap) {
      return;
    }

    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setBanner("Please fix the highlighted fields — then send again.");
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
      return;
    }

    setBanner("");
    setStatus("sending");

    try {
      await sendContact(fields);
      setStatus("sent");
      setFields(empty);
    } catch (reason) {
      if (reason instanceof ContactSendError && reason.kind === "activate") {
        setStatus("activate");
        setBanner(reason.message);
        return;
      }
      setStatus("error");
      setBanner(reason instanceof Error ? reason.message : "The message could not be sent.");
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

  if (status === "activate") {
    return (
      <div className="contact-form contact-form_done" role="status">
        <p className="kicker">One more step</p>
        <h3>Activate the inbox link</h3>
        <p>{banner}</p>
        <p className="meta">This is a one-time check. After you click the link, send the form again and it will arrive as a normal email.</p>
        <button
          type="button"
          className="btn primary"
          onClick={() => {
            setStatus("idle");
            setBanner("");
          }}
        >
          I have activated it — send again
        </button>
      </div>
    );
  }

  const replyBy: ReplyBy = fields.replyBy;

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label className="honey" htmlFor="contact-gotcha">
        Leave blank
        <input
          id="contact-gotcha"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>

      <div className="field-row">
        <label className={`field${errors.name ? " field_invalid" : ""}`}>
          <span>
            Full name <abbr title="required">*</abbr>
          </span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={fields.name}
            aria-invalid={Boolean(errors.name)}
            onChange={(event) => setField("name", event.target.value)}
            onBlur={() => onBlur("name")}
          />
          <FieldError text={errors.name} />
        </label>
        <label className={`field${errors.email ? " field_invalid" : ""}`}>
          <span>
            Work email <abbr title="required">*</abbr>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={180}
            value={fields.email}
            aria-invalid={Boolean(errors.email)}
            onChange={(event) => setField("email", event.target.value)}
            onBlur={() => onBlur("email")}
          />
          <FieldError text={errors.email} />
        </label>
      </div>

      <div className="field-row">
        <label className={`field${errors.company ? " field_invalid" : ""}`}>
          <span>
            Company <abbr title="required">*</abbr>
          </span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={fields.company}
            aria-invalid={Boolean(errors.company)}
            onChange={(event) => setField("company", event.target.value)}
            onBlur={() => onBlur("company")}
          />
          <FieldError text={errors.company} />
        </label>
        <label className={`field${errors.role ? " field_invalid" : ""}`}>
          <span>
            Your role <abbr title="required">*</abbr>
          </span>
          <select
            name="role"
            value={fields.role}
            aria-invalid={Boolean(errors.role)}
            onChange={(event) => setField("role", event.target.value)}
            onBlur={() => onBlur("role")}
          >
            <option value="" disabled>
              Select one
            </option>
            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FieldError text={errors.role} />
        </label>
      </div>

      <fieldset className={`field${errors.replyBy ? " field_invalid" : ""}`}>
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
              onChange={() => setField("replyBy", "email")}
            />
            <span>Email me</span>
          </label>
          <label className="reply-pick">
            <input
              type="radio"
              name="replyBy"
              value="callback"
              checked={replyBy === "callback"}
              onChange={() => setField("replyBy", "callback")}
            />
            <span>Call me back</span>
          </label>
        </div>
        <FieldError text={errors.replyBy} />
      </fieldset>

      <label className={`field${errors.phone ? " field_invalid" : ""}`}>
        <span>
          Phone {replyBy === "callback" ? <abbr title="required">*</abbr> : <em>(optional)</em>}
        </span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={20}
          placeholder="+91 79049 49080"
          value={fields.phone}
          aria-invalid={Boolean(errors.phone)}
          onChange={(event) => setField("phone", sanitizePhone(event.target.value))}
          onBlur={() => onBlur("phone")}
        />
        <FieldError text={errors.phone} />
      </label>

      <label className={`field${errors.message ? " field_invalid" : ""}`}>
        <span>
          What do you need? <abbr title="required">*</abbr>
        </span>
        <textarea
          name="message"
          maxLength={4000}
          rows={6}
          placeholder="Role, product, stack, timeline, or the problem you want a call about."
          value={fields.message}
          aria-invalid={Boolean(errors.message)}
          onChange={(event) => setField("message", event.target.value)}
          onBlur={() => onBlur("message")}
        />
        <FieldError text={errors.message} />
      </label>

      {status === "error" && banner ? (
        <p className="contact-error" role="alert">
          {banner}
        </p>
      ) : null}

      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
