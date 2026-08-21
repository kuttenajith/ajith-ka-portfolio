import { useEffect, useState } from "react";
import { education, experience, impact, practice, profile } from "./content";

const sections = [
  { id: "work", label: "Work" },
  { id: "practice", label: "Practice" },
  { id: "about", label: "About" },
];

export function App() {
  const [active, setActive] = useState("work");

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
      <a className="skip" href="#work">
        Skip to work
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
          <p className="kicker">
            {profile.role} · {profile.location}
          </p>
          <h1>{profile.name}</h1>
          <p className="lede">{profile.headline}</p>
          <p className="meta">React · Next.js · TypeScript · Frontend architecture · 2018 — present</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              Email me
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

        <section>
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">Impact</p>
              <div>
                <h2>Numbers I can stand behind</h2>
                <p>Pulled from both resumes. Same story, measured outcomes.</p>
              </div>
            </div>
            <div className="impact">
              {impact.map((item) => (
                <article className="stat" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">Experience</p>
              <div>
                <h2>Where the work happened</h2>
                <p>High-traffic products, enterprise modules, and the path from IC to module lead.</p>
              </div>
            </div>
            {experience.map((job) => (
              <article className="job" key={`${job.company}-${job.dates}`}>
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

        <section id="practice">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">Practice</p>
              <div>
                <h2>How I build</h2>
                <p>Interface, architecture, and delivery as one system — not a tool list dumped on a page.</p>
              </div>
            </div>
            <div className="layers">
              {practice.layers.map((layer) => (
                <article className="layer" key={layer.title}>
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
              {practice.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <div className="section-head">
              <p className="kicker">About</p>
              <div>
                <h2>Short version</h2>
              </div>
            </div>
            <div className="about-grid">
              <p>{profile.summary}</p>
              <div className="ed">
                <label>Education</label>
                <strong>{education.degree}</strong>
                <p>
                  {education.school}
                  <br />
                  {education.dates} · {education.grade}
                </p>
              </div>
            </div>
            <div className="contact-row">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.phoneHref}>{profile.phone}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                github.com/kuttenajith
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/ajith-k-a-18b71713b
              </a>
              <a href={profile.resumeAlt} download>
                Alternate resume (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Personal site · not affiliated with employer repos</span>
      </footer>
    </>
  );
}
