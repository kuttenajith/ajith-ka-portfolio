import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { notePage } from "./notifyVisit";

export function VisitTracker() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    notePage(`${pathname}${search}${hash}`);
  }, [pathname, search, hash]);

  return null;
}
