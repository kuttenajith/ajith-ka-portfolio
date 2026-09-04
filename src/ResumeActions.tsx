import { type MouseEvent } from "react";
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

export function ResumeButton() {
  return (
    <a className="btn" href={profile.resume} download={resumeFile} onClick={downloadResume}>
      Resume
    </a>
  );
}

export function ResumeWithDownload() {
  return (
    <span className="resume-pair">
      <a href={profile.resume} target="_blank" rel="noreferrer">
        Resume (PDF)
      </a>
      <a className="resume-dl" href={profile.resume} download={resumeFile} onClick={downloadResume} aria-label="Download resume PDF">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3.2v11.1l3.4-3.4 1.4 1.4-5.8 5.8-5.8-5.8 1.4-1.4 3.4 3.4V3.2h2Zm-7.5 16.1h15v1.8h-15v-1.8Z"
          />
        </svg>
      </a>
    </span>
  );
}
