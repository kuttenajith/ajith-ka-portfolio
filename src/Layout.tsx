import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SiteVisits } from "./SiteVisits";
import { profile } from "./content";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
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
        <SiteVisits />
        <span>Senior Frontend Engineer</span>
      </footer>
    </>
  );
}
