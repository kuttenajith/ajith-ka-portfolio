import { type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "./content";

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3.2 3.5 10.4V21h6.2v-6.3h4.6V21h6.2V10.4L12 3.2Z" />
    </svg>
  );
}

function IconBlog() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6 3.5h9.2L20.5 9v11.5H6V3.5Zm8.2 1.7v4.3h4.1" />
    </svg>
  );
}

function IconWork() {
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

function RailLink({
  to,
  label,
  end,
  children,
}: {
  to: string;
  label: string;
  end?: boolean;
  children: ReactNode;
}) {
  return (
    <NavLink to={to} end={end} className="rail-btn" aria-label={label}>
      {children}
      <span className="rail-tip">{label}</span>
    </NavLink>
  );
}

export function SideRail() {
  return (
    <nav className="rail" aria-label="Primary">
      <NavLink className="rail-mark" to="/" aria-label="Home">
        AK
      </NavLink>
      <ul className="rail-list">
        <li>
          <RailLink to="/" label="Home" end>
            <IconHome />
          </RailLink>
        </li>
        <li>
          <RailLink to="/blog" label="Blog">
            <IconBlog />
          </RailLink>
        </li>
        <li>
          <RailLink to="/work-with-me" label="Work with me">
            <IconWork />
          </RailLink>
        </li>
        <li>
          <RailLink to="/contact" label="Contact">
            <IconMail />
          </RailLink>
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
      <ThemeToggle />
    </nav>
  );
}
