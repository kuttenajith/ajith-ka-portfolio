import { useEffect, useState } from "react";

const NAMESPACE = "kuttenajith.github.io";
const KEY = "ajith-ka-portfolio";
const COUNTED = "ak-portfolio-visit-counted";
const ENDPOINT = "https://abacus.jasoncameron.dev";

let visitsPromise: Promise<number | null> | null = null;

function wasCounted() {
  try {
    if (localStorage.getItem(COUNTED) === "1") return true;
    if (sessionStorage.getItem("ak-portfolio-visit") === "1") {
      localStorage.setItem(COUNTED, "1");
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

function markCounted() {
  try {
    localStorage.setItem(COUNTED, "1");
  } catch {
    /* private mode */
  }
}

function loadVisits() {
  if (visitsPromise) return visitsPromise;

  const live = window.location.hostname === "kuttenajith.github.io";
  const already = wasCounted();
  const action = live && !already ? "hit" : "get";
  if (live && !already) markCounted();

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
    <span className="foot-visits" title={`${formatted} unique browsers on the live site`}>
      {formatted} visits
    </span>
  );
}
