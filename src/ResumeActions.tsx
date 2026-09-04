import { useEffect, useState, type MouseEvent } from "react";
import { profile } from "./content";

const resumeFile = "Ajith-Amarnath-Senior-Frontend.pdf";

async function downloadResume(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  try {
    const response = await fetch(profile.resume);
    if (!response.ok) throw new Error("resume");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = resumeFile;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch {
    window.open(profile.resume, "_blank", "noopener,noreferrer");
  }
}

export function ResumeActions() {
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
      <span className="resume-actions">
        <button type="button" className="resume-word" onClick={() => setOpen(true)}>
          Resume
        </button>
        <a className="resume-dl" href={profile.resume} download={resumeFile} onClick={downloadResume} aria-label="Download resume PDF">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3.2v11.1l3.4-3.4 1.4 1.4-5.8 5.8-5.8-5.8 1.4-1.4 3.4 3.4V3.2h2Zm-7.5 16.1h15v1.8h-15v-1.8Z"
            />
          </svg>
        </a>
      </span>
      {open ? (
        <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Resume preview">
          <div className="resume-modal__bar">
            <span>Resume preview</span>
            <div className="resume-modal__tools">
              <a
                className="resume-dl resume-dl_light"
                href={profile.resume}
                download={resumeFile}
                onClick={downloadResume}
                aria-label="Download resume PDF"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3.2v11.1l3.4-3.4 1.4 1.4-5.8 5.8-5.8-5.8 1.4-1.4 3.4 3.4V3.2h2Zm-7.5 16.1h15v1.8h-15v-1.8Z"
                  />
                </svg>
              </a>
              <button type="button" className="resume-close" onClick={() => setOpen(false)} aria-label="Close preview">
                Close
              </button>
            </div>
          </div>
          <iframe title="Ajith Amarnath resume" src={profile.resume} />
        </div>
      ) : null}
    </>
  );
}
