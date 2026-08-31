export const roles = [
  "Recruiter / HR",
  "Engineering manager",
  "CTO / VP Engineering",
  "CEO / Founder",
  "Other",
] as const;

export type ContactRole = (typeof roles)[number];
export type ReplyBy = "email" | "callback";

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  role: string;
  replyBy: ReplyBy;
  phone: string;
  message: string;
};

export type FieldKey = keyof ContactFields;
export type FieldErrors = Partial<Record<FieldKey, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizePhone(value: string) {
  const kept = value.replace(/[^\d+\s().-]/g, "");
  const plus = kept.startsWith("+") ? "+" : "";
  const rest = (plus ? kept.slice(1) : kept).replace(/\+/g, "");
  return plus + rest;
}

export function digitCount(phone: string) {
  return phone.replace(/\D/g, "").length;
}

function hasLetter(value: string) {
  return /\p{L}/u.test(value);
}

export function validateContact(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const company = fields.company.trim();
  const message = fields.message.trim();
  const phone = sanitizePhone(fields.phone).trim();
  const digits = digitCount(phone);

  if (name.length < 2 || !hasLetter(name)) {
    errors.name = "Enter your full name — at least two letters.";
  } else if (name.length > 120) {
    errors.name = "Name is too long. Use 120 characters or fewer.";
  }

  if (!email) {
    errors.email = "Work email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "That email does not look complete. Check the @ and the domain.";
  }

  if (company.length < 2) {
    errors.company = "Enter the company or organisation name.";
  } else if (company.length > 120) {
    errors.company = "Company name is too long.";
  }

  if (!roles.includes(fields.role as ContactRole)) {
    errors.role = "Select the option that best matches your role.";
  }

  if (fields.replyBy !== "email" && fields.replyBy !== "callback") {
    errors.replyBy = "Choose email or a call back.";
  }

  if (phone) {
    if (/[a-zA-Z]/.test(fields.phone)) {
      errors.phone = "Phone can only include numbers, spaces, +, - or brackets.";
    } else if (digits < 10 || digits > 15) {
      errors.phone = "Enter a real phone number (10–15 digits). Example: +91 79049 49080.";
    }
  } else if (fields.replyBy === "callback") {
    errors.phone = "A call back needs a phone number with at least 10 digits.";
  }

  if (message.length < 20) {
    errors.message = "Tell me a little more — at least a couple of sentences (20 characters).";
  } else if (message.length > 4000) {
    errors.message = "Keep the brief under 4000 characters.";
  }

  return errors;
}
