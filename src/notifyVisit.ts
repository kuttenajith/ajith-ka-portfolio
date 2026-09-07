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
      connection?: { isp?: string };
    };
    if (data.success === false) return {};
    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      isp: data.connection?.isp,
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

export async function notifyNewVisit() {
  const key = accessKey();
  if (!key) return;

  rememberFirstTouch();
  const touch = readFirstTouch();
  const geo = await lookupGeo();
  const now = new Date().toISOString();
  const here = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const place = [geo.city, geo.region, geo.country].filter(Boolean).join(", ") || "—";

  const message = [
    "A new unique browser opened the live portfolio.",
    "",
    "Visitor email: not available. Browsers do not send it on a page view. You only get an email address if they submit the contact form.",
    "",
    `When: ${now}`,
    `Page now: ${here}`,
    "",
    "How they arrived",
    formatArrival(touch),
    "",
    "Network (approximate)",
    `Place: ${place}`,
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
        subject: `Portfolio visit — ${touch?.source || "unknown"}`,
        from_name: "Portfolio visit ping",
        name: "Unique visitor",
        email: "ajithkutten1998@gmail.com",
        replyto: "ajithkutten1998@gmail.com",
        botcheck: false,
        kind: "visit",
        source: touch?.source || "unknown",
        message,
      }),
    });
  } catch {
    /* visit mail is best-effort */
  }
}
