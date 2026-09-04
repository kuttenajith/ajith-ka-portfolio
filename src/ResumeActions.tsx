import { useEffect, useState } from "react";
import { profile } from "./content";

export function ResumeButton({ variant = "button" }: { variant?: "button" | "link" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" className={variant === "link" ? "resume-link" : "btn"} onClick={() => setOpen(true)}>
        {variant === "link" ? "Resume (PDF)" : "Resume"}
      </button>
      {open ? (
        <div
          className="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onClick={() => setOpen(false)}
        >
          <iframe title="Ajith Amarnath resume" src={profile.resume} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}
