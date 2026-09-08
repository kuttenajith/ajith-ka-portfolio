type CoverKind =
  | "mfe"
  | "ops"
  | "svg"
  | "ui"
  | "board"
  | "grid"
  | "a11y"
  | "product"
  | "perf"
  | "css"
  | "review"
  | "lead"
  | "hire"
  | "realtime";

const topicMap: Record<string, CoverKind> = {
  Accessibility: "a11y",
  Product: "product",
  Architecture: "mfe",
  Interface: "svg",
  Performance: "perf",
  CSS: "css",
  Review: "review",
  "Design systems": "ui",
  Leadership: "lead",
  Hiring: "hire",
  "Real-time": "realtime",
};

const projectMap: Record<string, CoverKind> = {
  "MFE Shell": "mfe",
  "Live Ops Board": "ops",
  "Task Master": "svg",
  "Ajith UI": "ui",
  "Interview Board": "board",
  "Data Grid": "grid",
};

export function coverForTopic(topic: string): CoverKind {
  return topicMap[topic] ?? "product";
}

export function coverForProject(name: string): CoverKind {
  return projectMap[name] ?? "product";
}

export function Cover({ kind, title }: { kind: CoverKind; title: string }) {
  return (
    <svg className="cover" viewBox="0 0 480 300" role="img" aria-label={title}>
      <rect className="cover__ground" width="480" height="300" />
      {kind === "mfe" && <Mfe />}
      {kind === "ops" && <Ops />}
      {kind === "svg" && <Floor />}
      {kind === "ui" && <Tokens />}
      {kind === "board" && <Board />}
      {kind === "grid" && <Grid />}
      {kind === "a11y" && <A11y />}
      {kind === "product" && <Product />}
      {kind === "perf" && <Perf />}
      {kind === "css" && <Css />}
      {kind === "review" && <Review />}
      {kind === "lead" && <Lead />}
      {kind === "hire" && <Hire />}
      {kind === "realtime" && <Realtime />}
    </svg>
  );
}

function Mfe() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect className="cover__line" x="48" y="42" width="384" height="216" rx="10" />
      <rect className="cover__soft" x="72" y="78" width="160" height="154" rx="8" />
      <rect className="cover__accent-stroke" x="248" y="78" width="160" height="70" rx="8" />
      <rect className="cover__line" x="248" y="162" width="160" height="70" rx="8" />
      <path className="cover__accent" d="M88 102h88M88 124h56" strokeWidth="3" />
    </g>
  );
}

function Ops() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
      <circle className="cover__accent" cx="78" cy="64" r="7" />
      <circle className="cover__line" cx="108" cy="64" r="7" />
      <path className="cover__accent" d="M56 210 120 150 176 178 248 96 320 132 404 88" />
      <path className="cover__line" d="M56 236h348" />
    </g>
  );
}

function Floor() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path className="cover__line" d="M80 70h320v160H80z" />
      <path className="cover__line" d="M80 150h320M210 70v160M320 70v90" />
      <rect className="cover__accent-fill" x="96" y="86" width="96" height="48" rx="4" />
      <circle className="cover__accent" cx="360" cy="200" r="14" />
    </g>
  );
}

function Tokens() {
  return (
    <g>
      <rect className="cover__accent-fill" x="64" y="72" width="88" height="88" rx="16" />
      <rect className="cover__soft" x="176" y="72" width="88" height="88" rx="16" />
      <rect className="cover__line-fill" x="288" y="72" width="88" height="88" rx="16" />
      <rect className="cover__line" x="64" y="184" width="312" height="36" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  );
}

function Board() {
  return (
    <g>
      <rect className="cover__soft" x="56" y="56" width="112" height="188" rx="8" />
      <rect className="cover__soft" x="184" y="56" width="112" height="188" rx="8" />
      <rect className="cover__soft" x="312" y="56" width="112" height="188" rx="8" />
      <rect className="cover__accent-fill" x="72" y="80" width="80" height="28" rx="4" />
      <rect className="cover__line-fill" x="200" y="80" width="80" height="28" rx="4" />
      <rect className="cover__line-fill" x="200" y="120" width="80" height="28" rx="4" />
      <rect className="cover__accent-fill" x="328" y="80" width="80" height="28" rx="4" />
    </g>
  );
}

function Grid() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect className="cover__line" x="56" y="64" width="368" height="172" />
      <path className="cover__line" d="M56 100h368M56 136h368M56 172h368M144 64v172M280 64v172" />
      <rect className="cover__accent-fill" x="56" y="136" width="88" height="36" />
    </g>
  );
}

function A11y() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3">
      <circle className="cover__accent" cx="240" cy="150" r="78" />
      <path className="cover__line" d="M240 96v108M198 150h84" />
      <path className="cover__accent" d="M168 210c22 28 72 28 94 0" />
    </g>
  );
}

function Product() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect className="cover__line" x="90" y="70" width="300" height="160" rx="12" />
      <circle className="cover__accent" cx="240" cy="150" r="36" />
      <path className="cover__line" d="M240 114v72M204 150h72" />
    </g>
  );
}

function Perf() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path className="cover__line" d="M90 210h300" />
      <path className="cover__accent" d="M110 190 176 128 232 154 300 78 370 118" />
      <circle className="cover__accent" cx="300" cy="78" r="7" />
    </g>
  );
}

function Css() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect className="cover__line" x="80" y="64" width="200" height="172" rx="8" />
      <rect className="cover__accent-stroke" x="200" y="108" width="200" height="128" rx="8" />
      <path className="cover__accent" d="M104 100h88M104 128h64" strokeWidth="3" />
    </g>
  );
}

function Review() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path className="cover__line" d="M96 88h288M96 140h220M96 192h260" />
      <path className="cover__accent" d="M340 168 372 200 428 132" />
    </g>
  );
}

function Lead() {
  return (
    <g>
      <circle className="cover__accent-fill" cx="240" cy="92" r="28" />
      <circle className="cover__soft" cx="140" cy="200" r="24" />
      <circle className="cover__soft" cx="240" cy="212" r="24" />
      <circle className="cover__soft" cx="340" cy="200" r="24" />
      <path className="cover__line" d="M240 120v40M140 176 240 160 340 176" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  );
}

function Hire() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect className="cover__line" x="120" y="70" width="240" height="168" rx="10" />
      <circle className="cover__accent" cx="240" cy="132" r="28" />
      <path className="cover__line" d="M176 210c16-28 112-28 128 0" />
    </g>
  );
}

function Realtime() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
      <path className="cover__accent" d="M70 150h70l24-52 36 120 40-160 36 92h134" />
      <circle className="cover__accent" cx="404" cy="150" r="8" />
    </g>
  );
}
