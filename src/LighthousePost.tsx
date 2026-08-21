import { Link } from "react-router-dom";
import { profile } from "./content";

export function LighthousePost() {
  return (
    <main id="top" className="page">
      <article className="wrap article">
        <p className="kicker">August 2026 · Performance</p>
        <h1>How a production frontend reached a 93.8% Lighthouse performance score</h1>
        <p className="lede">
          The score was a side effect. The work was reducing what the browser had to do before the first
          useful paint, then measuring on a real URL instead of a local happy path.
        </p>

        <p>
          This is a field note, not a company case study. No product names, no internal code. The same
          sequence applies to most React and Next.js apps that have grown for a few years.
        </p>

        <h2>Measure the real page</h2>
        <p>
          Lighthouse in an empty Chrome profile, against the deployed URL, on a throttled mobile preset.
          Incognito is not enough if extensions are still loaded. Run it three times and keep the median.
          One screenshot is not a baseline.
        </p>
        <p>
          I also look at the field data when it exists (CrUX / Search Console). Lab scores that disagree
          with real users are usually a cache, bot, or logged-out vs logged-in mismatch.
        </p>

        <h2>What actually moved the number</h2>
        <ol>
          <li>
            <strong>Cut the first JavaScript payload.</strong> Route-level code splitting so the landing
            view does not download the entire app. Heavy widgets (charts, editors, date libraries) load
            after interaction or when they enter the viewport.
          </li>
          <li>
            <strong>Stop hiding the page behind a waterfall.</strong> Critical HTML and CSS first. Fonts
            with <code>font-display: swap</code>. Images with explicit width and height, modern formats,
            and lazy loading below the fold.
          </li>
          <li>
            <strong>Render less on the first frame.</strong> Lists that used to mount hundreds of nodes
            get windowing or pagination. CSS animations beat JS loops on first paint.
          </li>
          <li>
            <strong>Cache what does not change.</strong> Fingerprinted assets, a long cache for static
            files, and a short cache for HTML. A CDN in front of the app server is not optional at
            traffic.
          </li>
        </ol>

        <h2>What I did not start with</h2>
        <p>
          Rewriting the framework. Micro-optimizing Redux. Switching CSS tools. Those debates burn weeks
          and rarely show up in Largest Contentful Paint. If a 400 KB date library is on the first load,
          remove it before you tune reducers.
        </p>

        <h2>A practical order</h2>
        <ol>
          <li>Baseline: three Lighthouse runs + the heaviest route’s bundle report.</li>
          <li>Delete or defer anything not needed for first paint.</li>
          <li>Fix images, fonts, and layout shift.</li>
          <li>Re-measure. Only then look at runtime cost of remaining components.</li>
        </ol>

        <h2>How this ties to conversion</h2>
        <p>
          A 94% conversion lift in an earlier product was not “make it prettier.” It was a faster first
          view plus a clearer primary action. Performance and UX were the same project.
        </p>

        <p>
          If you want this done on your product as a fixed-scope review, see{" "}
          <Link to="/work-with-me">Work with me</Link>. Related public work:{" "}
          <a href="https://github.com/kuttenajith/ajith-ui" target="_blank" rel="noreferrer">
            Ajith UI
          </a>
          .
        </p>

        <p className="article-end">
          <Link to="/blog">All articles</Link>
          {" · "}
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>
      </article>
    </main>
  );
}
