import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "./content";
import { scrollToId } from "./scroll";

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3.2 3.5 10.4V21h6.2v-6.3h4.6V21h6.2V10.4L12 3.2Z" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 3.5h9.2L20.5 9v11.5H6V3.5Zm8.2 1.7v4.3h4.1" />
    </svg>
  );
}

function IconBrief() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M9 4.5h6l.8 2H20.5v13H3.5v-13H8.2L9 4.5Zm1.5 2 .4-1h2.2l.4 1h-3Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.5 6.5h17v11h-17v-11Zm1.7 1.6 6.8 5 6.8-5H5.2Zm13.6 1.5-6.5 4.8a1 1 0 0 1-1.1 0L4.7 9.6V16h14.1V9.6Z"
      />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2A9.8 9.8 0 0 0 2.2 12c0 4.3 2.8 8 6.7 9.3.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.1-3.3-1.1-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.7.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7 1 .7 2v2.2c0 .3.2.6.7.5A9.8 9.8 0 0 0 21.8 12 9.8 9.8 0 0 0 12 2.2Z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.4 9.2H3.8V20h2.6V9.2ZM5.1 4c-.9 0-1.5.6-1.5 1.4 0 .8.6 1.4 1.5 1.4.8 0 1.5-.6 1.5-1.4C6.6 4.6 6 4 5.1 4ZM20.2 20v-5.9c0-3.2-1.7-4.6-4-4.6-1.8 0-2.6 1-3.1 1.7V9.2H10.5V20h2.6v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.6 1.8 3V20h2.6Z"
      />
    </svg>
  );
}

function IconPen() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.2 16.3 14.8 6.7l2.5 2.5-9.6 9.6H5.2v-2.5Zm10.1-11.2 1.3-1.3a1.2 1.2 0 0 1 1.7 0l1.9 1.9a1.2 1.2 0 0 1 0 1.7l-1.3 1.3-3.6-3.6Z"
      />
    </svg>
  );
}

function IconWork() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.8 13.7 7l3.6.3-2.7 2.5.8 3.5L12 11.6 8.6 13.3l.8-3.5-2.7-2.5 3.6-.3L12 3.8Zm-6.4 12.4h12.8v1.8H5.6v-1.8Zm1.6 3.2h9.6V21H7.2v-1.6Z"
      />
    </svg>
  );
}

const homeOrder = ["top", "highlights", "experience", "skills", "about", "projects", "contact"] as const;

const homeMap: Record<(typeof homeOrder)[number], string> = {
  top: "home",
  highlights: "home",
  projects: "projects",
  experience: "experience",
  skills: "experience",
  about: "experience",
  contact: "contact",
};

function RailButton({
  label,
  active,
  onClick,
  href,
  children,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  children: ReactNode;
}) {
  const className = `rail-btn${active ? " active" : ""}`;
  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer" aria-label={label}>
        {children}
        <span className="rail-tip">{label}</span>
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick} aria-label={label} aria-current={active ? "page" : undefined}>
      {children}
      <span className="rail-tip">{label}</span>
    </button>
  );
}

export function SideRail() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [spy, setSpy] = useState("home");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = "home";
      for (const id of homeOrder) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top <= line) current = homeMap[id];
      }
      setSpy(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const goHomeSection = (id: string) => {
    if (pathname === "/") {
      scrollToId(id);
      return;
    }
    navigate({ pathname: "/", hash: id });
  };

  const homeActive = pathname === "/" && spy === "home";
  const experienceActive = pathname === "/" && spy === "experience";
  const projectsActive = pathname === "/" && spy === "projects";
  const contactActive = pathname === "/contact" || (pathname === "/" && spy === "contact");
  const blogActive = pathname.startsWith("/blog");
  const workActive = pathname === "/work-with-me";

  return (
    <nav className="rail" aria-label="Primary">
      <Link className="rail-mark" to="/" aria-label="Home">
        AA
      </Link>
      <ul className="rail-list">
        <li>
          <RailButton label="Home" active={homeActive} onClick={() => goHomeSection("top")}>
            <IconHome />
          </RailButton>
        </li>
        <li>
          <RailButton label="Experience" active={experienceActive} onClick={() => goHomeSection("experience")}>
            <IconDoc />
          </RailButton>
        </li>
        <li>
          <RailButton label="Projects" active={projectsActive} onClick={() => goHomeSection("projects")}>
            <IconBrief />
          </RailButton>
        </li>
        <li>
          <RailButton
            label="Contact"
            active={contactActive}
            onClick={() => {
              if (pathname === "/") scrollToId("contact");
              else navigate("/contact");
            }}
          >
            <IconMail />
          </RailButton>
        </li>
        <li>
          <RailButton label="Blog" active={blogActive} onClick={() => navigate("/blog")}>
            <IconPen />
          </RailButton>
        </li>
        <li>
          <RailButton label="Work" active={workActive} onClick={() => navigate("/work-with-me")}>
            <IconWork />
          </RailButton>
        </li>
        <li>
          <a className="rail-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <IconGitHub />
            <span className="rail-tip">GitHub</span>
          </a>
        </li>
        <li>
          <a className="rail-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <IconLinkedIn />
            <span className="rail-tip">LinkedIn</span>
          </a>
        </li>
      </ul>
      <div className="rail-foot">
        <ThemeToggle />
      </div>
    </nav>
  );
}
