export function scrollToY(targetY: number, duration?: number) {
  const start = window.scrollY;
  const distance = targetY - start;
  if (Math.abs(distance) < 2) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    return;
  }

  const ms = duration ?? Math.min(1400, Math.max(720, Math.abs(distance) * 0.42));

  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const startTime = performance.now();
  const ease = (t: number) => 1 - (1 - t) ** 3;

  const tick = (now: number) => {
    const t = Math.min(1, (now - startTime) / ms);
    window.scrollTo(0, start + distance * ease(t));
    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }
    root.style.scrollBehavior = previous;
  };

  requestAnimationFrame(tick);
}

export function scrollToTop() {
  scrollToY(0);
}

export function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) {
    scrollToTop();
    return;
  }
  const top = node.getBoundingClientRect().top + window.scrollY - 12;
  scrollToY(Math.max(0, top));
}
