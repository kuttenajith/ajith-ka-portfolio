import { useEffect, useState } from "react";
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
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <ScrollToTop />
      <a className="skip" href="#top">
        Skip to content
      </a>
      <SideRail />
      <div className="shell">
        <header className="nav">
          <Link className="mark" to="/" onClick={closeMenu}>
            AA
          </Link>
          <div className="nav-end">
            <ThemeToggle />
            <button
              type="button"
              className={`burger${menuOpen ? " burger_open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="burger__lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>
        <nav id="site-menu" className={`nav-drawer${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
          <ul className="nav-drawer__list">
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <Link to="/#experience" onClick={closeMenu}>
                Experience
              </Link>
            </li>
            <li>
              <Link to="/#projects" onClick={closeMenu}>
                Projects
              </Link>
            </li>
            <li>
              <NavLink to="/blog" onClick={closeMenu}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/work-with-me" onClick={closeMenu}>
                Work with me
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={closeMenu}>
                Contact
              </NavLink>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" onClick={closeMenu}>
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={closeMenu}>
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
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
