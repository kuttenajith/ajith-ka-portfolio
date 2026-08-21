import { Link, NavLink, Outlet } from "react-router-dom";
import { profile } from "./content";

export function Layout() {
  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>
      <header className="nav">
        <Link className="mark" to="/">
          AK
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/work-with-me">Work with me</NavLink>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer className="wrap foot">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Senior Frontend Engineer</span>
      </footer>
    </>
  );
}
