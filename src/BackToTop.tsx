import { useEffect, useState } from "react";
import { scrollToTop } from "./scroll";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button type="button" className="back-top" onClick={() => scrollToTop()} aria-label="Back to top">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 5.2 4.8 12.4l1.4 1.4 4.8-4.8V20h2V9l4.8 4.8 1.4-1.4L12 5.2Z" />
      </svg>
    </button>
  );
}
