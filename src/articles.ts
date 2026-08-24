export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  date: string;
  topic: string;
  summary: string;
  lede: string;
  relatedLabel?: string;
  relatedHref?: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "ai-frontend-prs-fail-review",
    title: "Why most AI-generated frontend PRs still fail review",
    date: "August 2026",
    topic: "Review",
    summary:
      "The demo looks finished. The diff is large. The tests are green. A senior review still sends it back — usually for the same ten reasons.",
    lede: "AI is fast at producing a screen that matches a screenshot. Review is slow because production UI is not a screenshot. It is loading, empty, error, keyboard, bundle, and the next person who has to change it.",
    body: [
      {
        type: "p",
        text: "This is not an argument against AI in frontend work. Used well, it writes boilerplate, migrates APIs, and drafts tests. Used badly, it opens a pull request that looks complete and is expensive to own. The gap is not syntax. Models are good at syntax. The gap is product judgement.",
      },
      { type: "h2", text: "What the demo hides" },
      {
        type: "p",
        text: "Most generated PRs are optimised for the happy path on the author’s machine: logged in, fat network, data already there, mouse only, latest Chrome, no extra query params. That is also how the model was prompted — “build a dashboard that looks like this.” Reviewers do not merge a screenshot. They merge behaviour under stress.",
      },
      {
        type: "p",
        text: "The second hide is volume. A 800-line diff that “just works” is harder to review than a 80-line change with a clear reason. Models do not mind extra files. Humans pay for every extra file on every future change.",
      },
      { type: "h2", text: "The ten reasons it comes back" },
      {
        type: "ol",
        items: [
          "**No loading, empty, or error UI.** The list assumes an array. The form assumes the POST succeeds. The image assumes the URL exists. Production data is late, missing, or forbidden.",
          "**State has no owner.** Local `useState`, a context, a URL param, and a server cache all hold the same flag. Refresh, back, and two tabs disagree. The model solved the render, not the source of truth.",
          "**The CSS only fits the prompt.** Fixed widths, magic numbers, no wrapping, no reduced motion, a layout that breaks at 320px or 1440px. If the PR never mentions a breakpoint, it was not designed.",
          "**Accessibility is a later ticket.** Buttons that are divs, inputs without labels, colour as the only status, a modal that does not trap focus. Automated a11y scores can still pass while keyboard users cannot complete the flow.",
          "**The bundle grew for a widget.** A chart library, a date library, and an icon pack landed because the prompt said “add a chart.” There is no lazy boundary and no note on what this does to the landing JS.",
          "**Effects that should be events.** Fetching in `useEffect` with a missing dependency, a subscription that never unsubscribes, a timer that outlives the page. The UI flickered once in the demo and looked “alive.”",
          "**Tests that assert the mock.** Snapshot of class names, `getByText(\"Submit\")`, zero user-event flows. Green CI, zero confidence when the copy changes.",
          "**API types that are a guess.** `any`, optional everything, or a hand-written shape that drifted from the backend. The page renders because the fixture was generated next to the component.",
          "**No deletion story.** Feature flags, dead routes, and leftover feature folders. The model adds. It rarely removes the thing this screen replaced.",
          "**The PR description is a recap of the files.** Reviewers need: what user problem, what you did not do, how to QA, what is risky. “Implemented the dashboard as requested” is not a review artefact.",
        ],
      },
      { type: "h2", text: "A review that still works in 2026" },
      {
        type: "p",
        text: "Read the PR description first. If you cannot QA from it, ask for one before you read the diff. Then walk the UI as a hostile user: slow network, empty tenant, expired session, keyboard only, a second tab. Then read the diff for ownership — who holds state, who owns styles, what ships on first load.",
      },
      {
        type: "p",
        text: "Ask three questions out loud. What happens when this request fails. What happens when this list is empty. What happens when this component is used on a page the author never opened. If the author cannot answer without running the app, the PR is not ready.",
      },
      { type: "h2", text: "Where AI is actually worth it" },
      {
        type: "ul",
        items: [
          "Renames, mechanical migrations, and converting a well-specified Figma token dump into CSS variables.",
          "First draft of tests **after** you have written the acceptance cases in the ticket.",
          "Explaining a confusing legacy file so a human can decide what to delete.",
          "Boilerplate around a pattern the repo already has — a new route that copies an existing one, not a new architecture.",
        ],
      },
      {
        type: "p",
        text: "It is a poor owner of product edges: money, auth, consent, real-time reconnect, anything a lawyer or a support queue will see. Generate a sketch. Keep a human on the contract.",
      },
      { type: "h2", text: "What to tell the model before it writes code" },
      {
        type: "p",
        text: "A better prompt is a better PR. State the empty and error UI. Name the source of truth. Cap the libraries. Point at an existing component to copy. Require a keyboard path. Require a PR description with QA steps. If you cannot write those constraints, you are not ready to generate the change — you are ready to explore, in a branch you might throw away.",
      },
      {
        type: "p",
        text: "Speed is not the scarce resource on a frontend team. Review time and production incidents are. AI that increases both is not leverage. It is unpaid debt with a green build.",
      },
    ],
  },
  {
    slug: "lighthouse-93",
    title: "How a production frontend reached a 93.8% Lighthouse performance score",
    date: "August 2026",
    topic: "Performance",
    summary:
      "The work that actually moved Core Web Vitals: smaller initial JavaScript, deferred UI, honest measurement, and what not to optimize first.",
    lede: "The score was a side effect. The work was reducing what the browser had to do before the first useful paint, then measuring on a real URL instead of a local happy path.",
    relatedLabel: "Ajith UI",
    relatedHref: "https://github.com/kuttenajith/ajith-ui",
    body: [
      {
        type: "p",
        text: "This is a field note, not a company case study. No product names, no internal code. The same sequence applies to most React and Next.js apps that have grown for a few years.",
      },
      { type: "h2", text: "Measure the real page" },
      {
        type: "p",
        text: "Lighthouse in an empty Chrome profile, against the deployed URL, on a throttled mobile preset. Incognito is not enough if extensions are still loaded. Run it three times and keep the median. One screenshot is not a baseline.",
      },
      {
        type: "p",
        text: "I also look at field data when it exists (CrUX / Search Console). Lab scores that disagree with real users are usually a cache, bot, or logged-out versus logged-in mismatch.",
      },
      { type: "h2", text: "What actually moved the number" },
      {
        type: "ol",
        items: [
          "**Cut the first JavaScript payload.** Route-level code splitting so the landing view does not download the entire app. Heavy widgets load after interaction or when they enter the viewport.",
          "**Stop hiding the page behind a waterfall.** Critical HTML and CSS first. Fonts with font-display: swap. Images with explicit width and height, modern formats, and lazy loading below the fold.",
          "**Render less on the first frame.** Lists that used to mount hundreds of nodes get windowing or pagination. CSS animations beat JavaScript loops on first paint.",
          "**Cache what does not change.** Fingerprinted assets, a long cache for static files, and a short cache for HTML. A CDN in front of the app server is not optional at traffic.",
        ],
      },
      { type: "h2", text: "What I did not start with" },
      {
        type: "p",
        text: "Rewriting the framework. Micro-optimizing global state. Switching CSS tools. Those debates burn weeks and rarely show up in Largest Contentful Paint. If a 400 KB date library is on the first load, remove it before you tune reducers.",
      },
      { type: "h2", text: "A practical order" },
      {
        type: "ol",
        items: [
          "Baseline: three Lighthouse runs and the heaviest route’s bundle report.",
          "Delete or defer anything not needed for first paint.",
          "Fix images, fonts, and layout shift.",
          "Re-measure. Only then look at runtime cost of remaining components.",
        ],
      },
      { type: "h2", text: "How this ties to conversion" },
      {
        type: "p",
        text: "A 94% conversion lift in an earlier product was not “make it prettier.” It was a faster first view plus a clearer primary action. Performance and UX were the same project.",
      },
    ],
  },
  {
    slug: "design-systems-teams-reuse",
    title: "A component library that teams actually reuse",
    date: "August 2026",
    topic: "Design systems",
    summary:
      "Tokens, accessibility, versioning, and the failure modes that turn a “library” into a graveyard of one-off buttons.",
    lede: "Most component libraries fail quietly. People keep building new buttons because the official one cannot do the job, or because using it is slower than copying markup.",
    relatedLabel: "Ajith UI",
    relatedHref: "https://github.com/kuttenajith/ajith-ui",
    body: [
      {
        type: "p",
        text: "I have led frontend modules where six engineers shared one UI surface. Reuse only happened when the library was the easiest path, not when it was a mandate in a wiki.",
      },
      { type: "h2", text: "Start with tokens, not fifty components" },
      {
        type: "p",
        text: "Colour, spacing, type, radius, and focus rings first. If those are inconsistent, every new component fights the last one. A small set of primitives — button, field, dialog, badge, card — covers most product UI.",
      },
      { type: "h2", text: "Accessibility is part of the API" },
      {
        type: "ul",
        items: [
          "Keyboard paths for dialogs, including Escape and focus return.",
          "Labels that are not placeholder-only.",
          "Contrast that survives the dark theme you will eventually ship.",
          "Names that describe behaviour (primary, ghost, danger), not visual fashion.",
        ],
      },
      { type: "h2", text: "Versioning and ownership" },
      {
        type: "p",
        text: "A library without a changelog is a rumour. Breaking changes need a major version and a one-paragraph migration. Someone has to review PRs that add variants. If every squad can extend the kit without review, you do not have a system. You have a folder.",
      },
      { type: "h2", text: "Why reuse dies" },
      {
        type: "ul",
        items: [
          "The primitive cannot accept the one prop the product needs, so people fork it.",
          "Docs are Storybook-only and nobody runs Storybook locally.",
          "The kit is visually behind the latest mock, so design bypasses it.",
          "Install and peer-dependency pain is worse than copying 40 lines of CSS.",
        ],
      },
      { type: "h2", text: "What I ship in public" },
      {
        type: "p",
        text: "Ajith UI is a small gallery of those primitives: tokens, kit CSS, and components that are meant to be copied as a pattern, not as a 200-package monorepo. The point is the contract, not the count of widgets.",
      },
    ],
  },
  {
    slug: "micro-frontends-without-hype",
    title: "Micro-frontends without the hype",
    date: "August 2026",
    topic: "Architecture",
    summary:
      "When independent deploys are worth the cost, when a well-cut package is enough, and why a host plus iframes is still a valid contract.",
    lede: "Micro-frontends are a deployment strategy, not a badge. Used early, they slow a team of six. Used late, they let two products ship on different calendars without freezing a shared bundle.",
    relatedLabel: "MFE Shell",
    relatedHref: "https://github.com/kuttenajith/mfe-shell",
    body: [
      {
        type: "p",
        text: "I work on platforms where a shell owns the chrome and other apps load inside it. The interesting part is the contract: what the host promises, what a remote may do, and how they talk without sharing a DOM.",
      },
      { type: "h2", text: "Use independent deploys when" },
      {
        type: "ul",
        items: [
          "Two teams release on different cadences and a shared SPA has become a merge queue.",
          "Failure in one app must not take down the shell or a sibling app.",
          "Tech stacks will diverge for a period (legacy plus a new React surface).",
        ],
      },
      { type: "h2", text: "Do not start here when" },
      {
        type: "ul",
        items: [
          "You have one team and one product. A package of shared UI is cheaper.",
          "You have not agreed on authentication, routing, and theming.",
          "The only goal is to put “micro-frontends” on a slide.",
        ],
      },
      { type: "h2", text: "Iframes and postMessage are not a joke" },
      {
        type: "p",
        text: "Module federation is powerful and easy to get wrong (shared dependency hell, silent version skew). A host that loads remotes in iframes, with a typed message list (ready, theme, navigate), is boring and explicit. Isolation is real. CSS cannot leak. That is often what operations wanted.",
      },
      {
        type: "p",
        text: "The public MFE Shell repo is that pattern in miniature: host, catalog remote, metrics remote, a theme ping, and a ready handshake. Interviewers can read the protocol file in one sitting.",
      },
      { type: "h2", text: "The contract that matters" },
      {
        type: "ol",
        items: [
          "Who owns the URL and the back button.",
          "How auth cookies or tokens reach the remote.",
          "What happens when the remote is slow or down (timeout UI in the host).",
          "A shared visual language — tokens — so the user does not feel two products.",
        ],
      },
    ],
  },
  {
    slug: "high-traffic-frontend-checklist",
    title: "A frontend architecture checklist for high-traffic apps",
    date: "August 2026",
    topic: "Architecture",
    summary:
      "Routing, data, errors, performance, and release habits I expect before calling a React app production-ready at traffic.",
    lede: "High traffic does not require exotic libraries. It requires boring answers to failure, caching, and “what ships on first load.”",
    relatedLabel: "Interview Board",
    relatedHref: "https://github.com/kuttenajith/interview-board",
    body: [
      { type: "h2", text: "Routing and code" },
      {
        type: "ul",
        items: [
          "Routes map to user jobs, not to folder archaeology.",
          "Each route has an error boundary and a loading state that is not a blank white screen.",
          "The first route is split from admin, settings, and rarely used tools.",
        ],
      },
      { type: "h2", text: "Data and state" },
      {
        type: "ul",
        items: [
          "Server state and UI state are not one global store by default.",
          "Mutations have a source of truth (the API). Optimistic UI is optional and reversible.",
          "Stale data has a rule: refetch on focus, or explicit invalidation, not hope.",
        ],
      },
      { type: "h2", text: "Errors users can understand" },
      {
        type: "p",
        text: "Timeouts, 401, 403, and 5xx are different screens or toasts. A generic “Something went wrong” is what you ship on day one and regret on day ninety. Log a request id the support team can search.",
      },
      { type: "h2", text: "Performance and release" },
      {
        type: "ul",
        items: [
          "A budget for first-load JavaScript, reviewed when it is crossed.",
          "Feature flags for risky UI, not long-lived branches.",
          "A rollback that does not require a full rebuild of unrelated apps.",
          "Client logs that do not include secrets or full payloads.",
        ],
      },
      { type: "h2", text: "Real-time, if you have it" },
      {
        type: "p",
        text: "WebSockets need a visible connection state, backoff, and a fallback when the socket cannot open (the Live Ops Board demo does this so a static host still shows a living UI). Silent reconnect loops are how you melt a node.",
      },
    ],
  },
  {
    slug: "leading-frontend-team-of-six",
    title: "How I run a frontend team of six",
    date: "August 2026",
    topic: "Leadership",
    summary:
      "Reviews, sprint quality, and what I stopped doing when I moved from individual contributor to module lead.",
    lede: "Leading six frontend engineers is not six times the tickets. It is protecting a standard so the sixth hire does not invent a seventh way to fetch data.",
    body: [
      { type: "h2", text: "What I own as a lead" },
      {
        type: "ul",
        items: [
          "The technical roadmap for the module: what we will not build this quarter.",
          "Review quality: I do not rubber-stamp, and I do not rewrite every PR in the comments.",
          "Estimates that product can plan against, with uncertainty named early.",
          "Production: who is on point when a release misbehaves.",
        ],
      },
      { type: "h2", text: "Reviews that scale" },
      {
        type: "p",
        text: "We review for behaviour, accessibility, and coupling — not for personal taste in commas. A checklist beats a 40-comment thread. If the same note appears three times, it becomes a lint rule or a kit component.",
      },
      { type: "h2", text: "What I stopped doing" },
      {
        type: "ul",
        items: [
          "Taking every “quick” production patch myself. That trains the team to wait.",
          "Allowing drive-by refactors in feature PRs. Refactors get their own change and a rollback plan.",
          "Pretending a six-point story is a two-point story to keep a sprint green.",
        ],
      },
      { type: "h2", text: "Working with product, QA, and design" },
      {
        type: "p",
        text: "I translate “make it pop” into constraints: performance budget, empty states, and what happens offline. QA gets a testable definition of done, not a Figma file and a prayer. Design gets tokens, not a surprise palette in production.",
      },
    ],
  },
  {
    slug: "what-i-look-for-in-senior-frontend",
    title: "What I look for in a senior frontend hire",
    date: "August 2026",
    topic: "Hiring",
    summary:
      "Signals that survive a take-home and a live session: judgement, debugging, and the ability to explain a trade-off without theatre.",
    lede: "Senior is not years on a CV. It is whether I would trust this person with a production incident and a junior sitting next to them.",
    relatedLabel: "Interview Board",
    relatedHref: "https://github.com/kuttenajith/interview-board",
    body: [
      { type: "h2", text: "What I score" },
      {
        type: "ol",
        items: [
          "**Debugging over trivia.** Can they form a hypothesis, use the network panel, and change one variable at a time?",
          "**HTML and CSS still matter.** Layout, focus, and overflow bugs are senior work. Framework fluency without that is incomplete.",
          "**Trade-offs out loud.** “I would do X because of Y, and I would revisit if Z.” Silence while coding is fine. Silence about why is not.",
          "**Code a teammate can change.** Names, boundaries, tests on the logic that will break. Cleverness is a cost.",
        ],
      },
      { type: "h2", text: "What I ignore" },
      {
        type: "ul",
        items: [
          "A list of twenty libraries with no story of production pain.",
          "Leetcode speed as a proxy for frontend judgement.",
          "Pixel-perfect recreation of a mock when the brief was “make it work and explain the state.”",
        ],
      },
      { type: "h2", text: "A session I trust" },
      {
        type: "p",
        text: "A small product surface — a board, a form, a live metric — plus questions: where would this fail at 10× traffic, what would you test, what would you defer. That is closer to the job than reversing a binary tree.",
      },
      {
        type: "p",
        text: "The Interview Board repo is the kind of artefact I like to see: domain language, persistence, and interaction that can be extended without a rewrite.",
      },
    ],
  },
  {
    slug: "websockets-ui-that-reconnects",
    title: "Real-time UI that survives a dropped socket",
    date: "August 2026",
    topic: "Real-time",
    summary:
      "Presence, backoff, and a simulated fallback so the dashboard still tells the truth when the WebSocket never opens.",
    lede: "A live ops screen that goes blank on a flaky network is worse than a slightly stale number with a clear badge.",
    relatedLabel: "Live Ops Board",
    relatedHref: "https://github.com/kuttenajith/live-ops-board",
    body: [
      { type: "h2", text: "Show the connection" },
      {
        type: "p",
        text: "Live, reconnecting, and simulated are three different states. Users and operators should see which one they are in. Hidden retries look like a frozen UI.",
      },
      { type: "h2", text: "Backoff is not optional" },
      {
        type: "p",
        text: "Immediate reconnect in a loop can take down your own server. Exponential backoff with a cap, and a jitter so a thousand tabs do not retry on the same tick, is the minimum adult behaviour.",
      },
      { type: "h2", text: "Fallback for static hosting" },
      {
        type: "p",
        text: "GitHub Pages cannot keep a socket for you. A demo that still moves — clearly labelled simulated — is more honest than a dead “connecting…” spinner. In production the fallback might be polling or the last known snapshot from HTTP.",
      },
      { type: "h2", text: "Presence" },
      {
        type: "p",
        text: "Join and leave events belong on the same stream as metrics. If you only broadcast numbers, you will invent a second channel later. Keep the protocol small: metrics, event, presence.",
      },
    ],
  },
];

export const posts = articles.map(({ slug, title, date, topic, summary }) => ({
  slug,
  title,
  date,
  topic,
  summary,
}));
