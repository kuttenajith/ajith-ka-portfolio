import { web3formsAccessKey } from "./contact.config";

const TOUCH = "ak-first-touch";

export type Arrival = {
  at: string;
  page: string;
  referrer: string;
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
};

function accessKey() {
  const fromEnv = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (typeof fromEnv === "string" && fromEnv.length > 8) return fromEnv;
  if (web3formsAccessKey.length > 8) return web3formsAccessKey;
  return "";
}

function guessSource(referrer: string, utm: string) {
  if (utm) return utm;
  if (!referrer) return "direct / unknown (no referrer)";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (host.includes("linkedin")) return "linkedin.com";
    if (host.includes("github")) return "github.com";
    if (host.includes("google")) return "google";
    if (host.includes("bing")) return "bing";
    if (host.includes("twitter") || host.includes("x.com")) return "x / twitter";
    if (host.includes("instagram")) return "instagram";
    if (host.includes("whatsapp")) return "whatsapp";
    return host;
  } catch {
    return "unknown";
  }
}

export function rememberFirstTouch() {
  try {
    if (sessionStorage.getItem(TOUCH)) return;
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer.trim();
    const utm_source = params.get("utm_source")?.trim() || "";
    const arrival: Arrival = {
      at: new Date().toISOString(),
      page: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      referrer,
      source: guessSource(referrer, utm_source),
      utm_source,
      utm_medium: params.get("utm_medium")?.trim() || "",
      utm_campaign: params.get("utm_campaign")?.trim() || "",
      utm_content: params.get("utm_content")?.trim() || "",
    };
    sessionStorage.setItem(TOUCH, JSON.stringify(arrival));
  } catch {
    /* private mode */
  }
}

export function readFirstTouch(): Arrival | null {
  try {
    const raw = sessionStorage.getItem(TOUCH);
    if (!raw) return null;
    return JSON.parse(raw) as Arrival;
  } catch {
    return null;
  }
}

export function formatArrival(touch: Arrival | null) {
  if (!touch) return "Not captured.";
  const lines = [
    `Source: ${touch.source}`,
    `Landing page: ${touch.page}`,
    `Referrer: ${touch.referrer || "—"}`,
    `UTM source: ${touch.utm_source || "—"}`,
    `UTM medium: ${touch.utm_medium || "—"}`,
    `UTM campaign: ${touch.utm_campaign || "—"}`,
    `First seen: ${touch.at}`,
  ];
  return lines.join("\n");
}

type Geo = {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  isp?: string;
  org?: string;
  domain?: string;
};

async function lookupGeo(): Promise<Geo> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch("https://ipwho.is/", { signal: controller.signal });
    const data = (await response.json()) as {
      success?: boolean;
      ip?: string;
      city?: string;
      region?: string;
      country?: string;
      connection?: { isp?: string; org?: string; domain?: string };
    };
    if (data.success === false) return {};
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      isp: data.connection?.isp,
      org: data.connection?.org,
      domain: data.connection?.domain,
    };
  } catch {
    return {};
  } finally {
    window.clearTimeout(timer);
  }
}

function deviceLine() {
  const ua = navigator.userAgent;
  const width = window.screen.width;
  const height = window.screen.height;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return [
    `Device: ${width}×${height}, ${navigator.language}, ${tz}`,
    `User agent: ${ua}`,
  ].join("\n");
}

function isDatacenter(geo: Geo) {
  const isp = `${geo.isp || ""} ${geo.org || ""}`.toLowerCase();
  return /microsoft|github|google llc|google cloud|cloudflare|digitalocean|ovh|hetzner|linode|oracle|alibaba/.test(
    isp,
  );
}

const PENDING = "ak-visit-report-pending";
const MAILED = "ak-visit-report-mailed";
const PAGES = "ak-session-pages";
const STARTED = "ak-session-started";
const RESUME = "ak-session-resume";

function currentPath() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function readPages(): string[] {
  try {
    const raw = sessionStorage.getItem(PAGES);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function notePage(path = currentPath()) {
  try {
    const pages = readPages();
    if (pages[pages.length - 1] === path) return;
    pages.push(path);
    sessionStorage.setItem(PAGES, JSON.stringify(pages.slice(-24)));
    if (!sessionStorage.getItem(STARTED)) sessionStorage.setItem(STARTED, String(Date.now()));
  } catch {
    /* private mode */
  }
}

export function noteResume(kind: "preview" | "download") {
  try {
    const prev = sessionStorage.getItem(RESUME);
    sessionStorage.setItem(RESUME, prev && prev !== kind ? "both" : kind);
  } catch {
    /* private mode */
  }
  void flushVisitReport();
}

function timeSpent() {
  const started = Number(sessionStorage.getItem(STARTED) || Date.now());
  const ms = Math.max(0, Date.now() - started);
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}m ${rest}s`;
}

function resumeLabel() {
  const value = sessionStorage.getItem(RESUME);
  if (value === "download") return "Downloaded PDF";
  if (value === "preview") return "Opened PDF preview";
  if (value === "both") return "Previewed and downloaded PDF";
  return "Did not open resume";
}

let armed = false;

export function armVisitReport() {
  try {
    sessionStorage.setItem(PENDING, "1");
    if (!sessionStorage.getItem(STARTED)) sessionStorage.setItem(STARTED, String(Date.now()));
  } catch {
    return;
  }
  notePage();
  if (armed) return;
  armed = true;
  window.setTimeout(() => void flushVisitReport(), 28000);
  const onLeave = () => void flushVisitReport();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onLeave();
  });
  window.addEventListener("pagehide", onLeave);
}

async function flushVisitReport() {
  try {
    if (sessionStorage.getItem(PENDING) !== "1") return;
    if (sessionStorage.getItem(MAILED) === "1") return;
  } catch {
    return;
  }

  const key = accessKey();
  if (!key) return;

  rememberFirstTouch();
  const touch = readFirstTouch();
  const geo = await lookupGeo();
  if (isDatacenter(geo) && !touch?.referrer && !touch?.utm_source) {
    try {
      sessionStorage.setItem(MAILED, "1");
    } catch {
      /* ignore */
    }
    return;
  }

  try {
    sessionStorage.setItem(MAILED, "1");
  } catch {
    /* ignore */
  }

  const company = geo.org || geo.isp || "Unknown (home / mobile / VPN)";
  const place = [geo.city, geo.region, geo.country].filter(Boolean).join(", ") || "—";
  const pages = readPages();
  const trail = pages.length ? pages.join(" → ") : currentPath();
  const now = new Date().toISOString();

  const message = [
    "THIS IS NOT A CONTACT FORM.",
    "Web3Forms always writes “A new form has been submitted” — ignore that line.",
    "A real enquiry has subject: Portfolio contact — … with a person’s work email.",
    "",
    "What this is: one unique browser session on the live portfolio.",
    "Person name, personal email, phone, and LinkedIn cannot be read from a page view.",
    "Company below is the network owner on the IP (office ISP), not a matched employee.",
    "",
    `Company (from IP): ${company}`,
    `Network domain: ${geo.domain || "—"}`,
    `Location: ${place}`,
    `Time spent: ${timeSpent()}`,
    `Pages: ${trail}`,
    `Resume: ${resumeLabel()}`,
    `When: ${now}`,
    "",
    "How they arrived",
    formatArrival(touch),
    "",
    "Network",
    `IP: ${geo.ip || "—"}`,
    `ISP: ${geo.isp || "—"}`,
    "",
    deviceLine(),
  ].join("\n");

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `[VISIT] ${company} · ${touch?.source || "unknown"}`,
        from_name: "Visit report (not a contact form)",
        name: "[VISIT] not a contact form",
        email: "not-captured@visitor.invalid",
        botcheck: false,
        kind: "visit",
        company,
        source: touch?.source || "unknown",
        message,
      }),
      keepalive: true,
    });
  } catch {
    /* visit mail is best-effort */
  }
}

export function notifyNewVisit() {
  armVisitReport();
}
