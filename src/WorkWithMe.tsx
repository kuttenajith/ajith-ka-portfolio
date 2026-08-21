import { Link } from "react-router-dom";
import { offer, profile } from "./content";

const mail = `mailto:${profile.email}?subject=${encodeURIComponent("Frontend health check")}&body=${encodeURIComponent(
  "Product URL:\nStack (React / Next.js):\nWhat you want from the review:\n",
)}`;

export function WorkWithMe() {
  return (
    <main id="top" className="page">
      <div className="wrap page-head">
        <p className="kicker">Freelance</p>
        <h1>{offer.name}</h1>
        <p className="lede">{offer.summary}</p>
        <p className="meta">{offer.length} · Remote · Fixed fee after an intro call</p>
        <div className="actions">
          <a className="btn primary" href={mail}>
            Request an intro call
          </a>
          <Link className="btn" to="/blog/lighthouse-93">
            Read the Lighthouse article
          </Link>
        </div>
      </div>

      <div className="wrap offer-grid">
        <section>
          <h2>Included</h2>
          <ul>
            {offer.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Not included</h2>
          <ul>
            {offer.notIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="wrap page-block">
        <h2>How to start</h2>
        <p>{offer.howToStart}</p>
        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {" · "}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
      </div>
    </main>
  );
}
