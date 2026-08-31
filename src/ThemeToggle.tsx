import { useRef, useState } from "react";

const STORAGE = "ak-theme";

type Theme = "light" | "dark";

type ViewTransition = {
  ready: Promise<void>;
};

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE, theme);
  } catch {
    /* private mode */
  }
}

function wipeFallback(x: number, y: number, next: Theme, swap: () => void) {
  const wipe = document.createElement("div");
  wipe.className = "theme-wipe";
  wipe.dataset.to = next;
  wipe.style.setProperty("--theme-x", `${x}px`);
  wipe.style.setProperty("--theme-y", `${y}px`);
  document.body.append(wipe);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    swap();
    wipe.remove();
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wipe.classList.add("is-on");
    });
  });

  const timer = window.setTimeout(finish, 800);
  wipe.addEventListener("transitionend", (event) => {
    if (event.propertyName !== "clip-path") return;
    window.clearTimeout(timer);
    finish();
  });
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const busy = useRef(false);

  const onToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (busy.current) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    const x = event.clientX;
    const y = event.clientY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const swap = () => {
      applyTheme(next);
      setTheme(next);
    };

    if (reduce) {
      swap();
      return;
    }

    busy.current = true;
    const done = () => {
      busy.current = false;
    };

    const doc = document as Document & {
      startViewTransition?: (update: () => void) => ViewTransition & { finished?: Promise<void> };
    };

    if (typeof doc.startViewTransition === "function") {
      try {
        const transition = doc.startViewTransition.call(document, swap);
        await transition.ready;
        const radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
          },
          {
            duration: 760,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        await transition.finished;
      } catch {
        swap();
      }
      done();
      return;
    }

    wipeFallback(x, y, next, () => {
      swap();
      done();
    });
  };

  const toLight = theme === "dark";

  return (
    <button
      type="button"
      className="theme-switch"
      onClick={onToggle}
      aria-label={toLight ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={!toLight}
      title={toLight ? "Light theme" : "Dark theme"}
    >
      <span className="theme-switch__track" aria-hidden="true">
        <span className="theme-switch__stars" />
        <span className="theme-switch__knob" />
      </span>
    </button>
  );
}
