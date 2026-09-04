import { useEffect, useState } from "react";

const NAMESPACE = "kuttenajith.github.io";
const KEY = "ajith-ka-portfolio";
const SKIP = "ak-portfolio-skip";
const COUNTED = "ak-portfolio-visit-counted";
const COOKIE = "ak-portfolio-skip=1";
const ENDPOINT = "https://abacus.jasoncameron.dev";

let visitsPromise: Promise<number | null> | null = null;

function isLive() {
  return window.location.hostname === "kuttenajith.github.io";
}

function isBot() {
  return /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|pingdom/i.test(
    navigator.userAgent,
  );
}

function hasCookie() {
  return document.cookie.split(";").some((part) => part.trim().startsWith(COOKIE));
}

function rememberBrowser() {
  try {
    localStorage.setItem(SKIP, "1");
    localStorage.setItem(COUNTED, "1");
    document.cookie = `${COOKIE}; Max-Age=315360000; Path=/; SameSite=Lax`;
  } catch {
    /* private mode */
  }
}

function isKnownBrowser() {
  try {
    if (localStorage.getItem(SKIP) === "1") return true;
    if (localStorage.getItem(COUNTED) === "1") return true;
    if (localStorage.getItem("ak-theme")) return true;
    if (sessionStorage.getItem("ak-portfolio-visit") === "1") return true;
    if (hasCookie()) return true;
  } catch {
    return true;
  }
  return false;
}

function isOwnerVisit() {
  const params = new URLSearchParams(window.location.search);
  return params.get("owner") === "1" || params.get("me") === "1";
}

function stripOwnerQuery() {
  const url = new URL(window.location.href);
  if (!url.searchParams.has("owner") && !url.searchParams.has("me")) return;
  url.searchParams.delete("owner");
  url.searchParams.delete("me");
  window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function loadVisits() {
  if (visitsPromise) return visitsPromise;

  const owner = isOwnerVisit();
  if (owner) {
    rememberBrowser();
    stripOwnerQuery();
  }

  const skip = owner || !isLive() || isBot() || isKnownBrowser();
  const action = skip ? "get" : "hit";
  if (!skip) rememberBrowser();

  visitsPromise = fetch(`${ENDPOINT}/${action}/${NAMESPACE}/${KEY}`)
    .then((response) => {
      if (!response.ok) throw new Error("counter");
      return response.json() as Promise<{ value: number }>;
    })
    .then((data) => data.value)
    .catch(() => null);

  return visitsPromise;
}

export function SiteVisits() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    loadVisits().then((value) => {
      if (active) setVisits(value);
    });
    return () => {
      active = false;
    };
  }, []);

  if (visits == null) return null;

  const formatted = new Intl.NumberFormat("en").format(visits);

  return (
    <span className="foot-visits" title={`${formatted} unique browsers, excluding yours`}>
      {formatted} visits
    </span>
  );
}
