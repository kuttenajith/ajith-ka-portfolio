import { useEffect, useRef, useState, type CSSProperties } from "react";
import { education, experience, impact, practice, profile, projects } from "./content";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? root.scrollTop / max : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(value);
      return;
    }

    const target = Number(match[2]);
    const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
    const prefix = match[1];
    const suffix = match[3];

    const play = () => {
      if (started.current) return;
      started.current = true;
      const duration = 1100;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <strong ref={ref}>{text}</strong>;
}

export function App() {
  const [active, setActive] = useState("experience");
  const progress = useScrollProgress();
  useReveal();

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => Boolean(n));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <a className="skip" href="#experience">
        Skip to experience
      </a>
      <header className="nav">
        <a className="mark" href="#top">
          AK
        </a>
        <nav>
          <ul className="nav-links">
            {sections.map((s) => (
              <li key={s.id}>
                <a className={active === s.id ? "active" : ""} href={`#${s.id}`}>
                  {s.label}
                </a>
              </li>
            ))}
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

      <main id="top">
        <div className="wrap hero">
          <div className="hero-copy">
            <p className="kicker">
              {profile.role} · {profile.location}
            </p>
            <h1>{profile.name}</h1>
            <p className="lede">{profile.headline}</p>
            <p className="meta">React · Next.js · TypeScript · Frontend architecture · 2018 — present</p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${profile.email}`}>
                Contact
              </a>
              <a className="btn" href={profile.resume} download>
                Download resume
              </a>
              <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <figure className="portrait" data-reveal>
            <div className="portrait__stage">
              <span className="portrait__offset" aria-hidden="true" />
              <div className="portrait__clip">
                <img src={profile.photo} alt="Ajith K A, Senior Frontend Engineer" />
              </div>
              <span className="portrait__tick portrait__tick--tl" aria-hidden="true" />
              <span className="portrait__tick portrait__tick--tr" aria-hidden="true" />
              <span className="portrait__tick portrait__tick--bl" aria-hidden="true" />
              <span className="portrait__tick portrait__tick--br" aria-hidden="true" />
            </div>
            <figcaption>
              <span>Currently</span>
              {profile.currentRole}
            </figcaption>
          </figure>
        </div>

        <section>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="kicker">Highlights</p>
              <div>
                <h2>Key results</h2>
                <p>Selected outcomes from professional experience.</p>
              </div>
            </div>
            <div className="impact">
              {impact.map((item, i) => (
                <article
                  className="stat"
                  data-reveal
                  key={item.label}
                  style={{ "--d": `${i * 110}ms` } as CSSProperties}
                >
                  <MetricValue value={item.value} />
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="kicker">Projects</p>
              <div>
                <h2>Selected work</h2>
                <p>Public repositories prepared for technical interviews. Each includes source and a live demo.</p>
              </div>
            </div>
            <div className="projects">
              {projects.map((item, i) => (
                <article
                  className="project"
                  data-reveal
                  key={item.name}
                  style={{ "--d": `${i * 90}ms` } as CSSProperties}
                >
                  <p className="project__tag">{item.tag}</p>
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
                  <div className="project__links">
                    <a href={item.live} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                    <a href={item.repo} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="kicker">Experience</p>
              <div>
                <h2>Professional experience</h2>
                <p>Roles spanning high-traffic platforms, enterprise modules, and frontend leadership.</p>
              </div>
            </div>
            {experience.map((job, i) => (
              <article
                className="job"
                data-reveal
                key={`${job.company}-${job.dates}`}
                style={{ "--d": `${i * 90}ms` } as CSSProperties}
              >
                <div>
                  <h3>{job.role}</h3>
                  <p className="company">{job.company}</p>
                  <p className="dates">{job.dates}</p>
                </div>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="kicker">Skills</p>
              <div>
                <h2>Technical skills</h2>
                <p>Frontend, architecture, and delivery capabilities used in production systems.</p>
              </div>
            </div>
            <div className="layers">
              {practice.layers.map((layer, i) => (
                <article
                  className="layer"
                  data-reveal
                  key={layer.title}
                  style={{ "--d": `${i * 110}ms` } as CSSProperties}
                >
                  <h3>{layer.title}</h3>
                  <ul>
                    {layer.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <ul className="focus">
              {practice.focus.map((item, i) => (
                <li data-reveal key={item} style={{ "--d": `${i * 80}ms` } as CSSProperties}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="kicker">About</p>
              <div>
                <h2>Profile</h2>
              </div>
            </div>
            <div className="about-grid">
              <p data-reveal>{profile.summary}</p>
              <div className="ed" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
                <label>Education</label>
                <strong>{education.degree}</strong>
                <p>
                  {education.school}
                  <br />
                  {education.dates} · {education.grade}
                </p>
              </div>
            </div>
            <div className="contact-row" data-reveal>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.phoneHref}>{profile.phone}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/kuttenajith
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/ajith-amarnath-18b71713b
              </a>
              <a href={profile.resume} download>
                Resume (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot" data-reveal>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Senior Frontend Engineer</span>
      </footer>
    </>
  );
}
