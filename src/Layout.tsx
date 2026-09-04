import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BackToTop } from "./BackToTop";
import { SideRail } from "./SideRail";
import { SiteVisits } from "./SiteVisits";
import { ThemeToggle } from "./ThemeToggle";
import { profile } from "./content";
import { scrollToId } from "./scroll";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      window.setTimeout(() => scrollToId(id), 40);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <a className="skip" href="#top">
        Skip to content
      </a>
      <SideRail />
      <div className="shell">
        <header className="nav">
          <Link className="mark" to="/">
            AA
          </Link>
          <div className="nav-end">
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
                  <NavLink to="/contact">Contact</NavLink>
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
            <ThemeToggle />
          </div>
        </header>
        <div className="shell-main">
          <Outlet />
        </div>
        <footer className="wrap foot">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <SiteVisits />
          <span>Senior Frontend Engineer</span>
        </footer>
      </div>
      <BackToTop />
    </>
  );
}
