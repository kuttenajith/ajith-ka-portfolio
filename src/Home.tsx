import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { education, experience, impact, practice, profile, projects } from "./content";
import { ContactBlock } from "./ContactForm";
import { ResumeButton, ResumeWithDownload } from "./ResumeActions";
import { TypeLine } from "./TypeLine";

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

export function Home() {
  const progress = useScrollProgress();
  useReveal();

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
      <main id="top">
        <div className="wrap hero">
          <div className="hero-copy">
            <p className="kicker">{profile.location}</p>
            <h1>{profile.name}</h1>
            <TypeLine />
            <div className="hero-social">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.2A9.8 9.8 0 0 0 2.2 12c0 4.3 2.8 8 6.7 9.3.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.1-3.3-1.1-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.7.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7 1 .7 2v2.2c0 .3.2.6.7.5A9.8 9.8 0 0 0 21.8 12 9.8 9.8 0 0 0 12 2.2Z"
                  />
                </svg>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.4 9.2H3.8V20h2.6V9.2ZM5.1 4c-.9 0-1.5.6-1.5 1.4 0 .8.6 1.4 1.5 1.4.8 0 1.5-.6 1.5-1.4C6.6 4.6 6 4 5.1 4ZM20.2 20v-5.9c0-3.2-1.7-4.6-4-4.6-1.8 0-2.6 1-3.1 1.7V9.2H10.5V20h2.6v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.6 1.8 3V20h2.6Z"
                  />
                </svg>
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M3.5 6.5h17v11h-17v-11Zm1.7 1.6 6.8 5 6.8-5H5.2Zm13.6 1.5-6.5 4.8a1 1 0 0 1-1.1 0L4.7 9.6V16h14.1V9.6Z"
                  />
                </svg>
              </a>
            </div>
            <p className="lede">{profile.headline}</p>
            <p className="meta">React · Next.js · TypeScript · Frontend architecture · 2018 — present</p>
            <div className="actions">
              <Link className="btn primary" to="/work-with-me">
                Work with me
              </Link>
              <Link className="btn" to="/blog">
                Blog
              </Link>
              <ResumeButton />
              <Link className="btn" to="/contact">
                Contact
              </Link>
              <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <figure className="portrait" data-reveal>
            <div className="portrait__stage">
              <span className="portrait__offset" aria-hidden="true" />
              <div className="portrait__clip">
                <img src={profile.photo} alt="Ajith Amarnath, Senior Frontend Engineer" />
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

        <section id="highlights">
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
                      <li key={item.skill}>
                        <span>{item.skill}</span>
                        <div className="skill-meter" title={`${item.level}%`}>
                          <span className="skill-meter__track">
                            <span style={{ width: `${item.level}%` }} />
                          </span>
                          <em>{item.level}%</em>
                        </div>
                      </li>
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
              <ResumeWithDownload />
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

        <section id="contact">
          <div className="wrap">
            <ContactBlock />
          </div>
        </section>
      </main>
    </>
  );
}
