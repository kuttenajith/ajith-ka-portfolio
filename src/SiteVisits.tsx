import { useEffect, useState } from "react";

const NAMESPACE = "kuttenajith.github.io";
const KEY = "ajith-ka-portfolio";
const SESSION = "ak-portfolio-visit";
const ENDPOINT = "https://abacus.jasoncameron.dev";

let visitsPromise: Promise<number | null> | null = null;

function loadVisits() {
  if (visitsPromise) return visitsPromise;

  const live = window.location.hostname === "kuttenajith.github.io";
  const already = sessionStorage.getItem(SESSION) === "1";
  const action = live && !already ? "hit" : "get";
  if (live && !already) sessionStorage.setItem(SESSION, "1");

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
    <span className="foot-visits" title={`${formatted} site visits`}>
      {formatted} visits
    </span>
  );
}
