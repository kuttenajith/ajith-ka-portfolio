import { useEffect, useState } from "react";
import { profile } from "./content";

export function TypeLine() {
  const titles = profile.titles;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) {
      setText(titles[0]);
      return;
    }

    let cancelled = false;
    let timer = 0;
    const word = titles[index];
    let i = 0;
    let deleting = false;

    const tick = () => {
      if (cancelled) return;
      if (!deleting) {
        i += 1;
        setText(word.slice(0, i));
        if (i === word.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 72);
        return;
      }
      i -= 1;
      setText(word.slice(0, i));
      if (i === 0) {
        setIndex((current) => (current + 1) % titles.length);
        return;
      }
      timer = window.setTimeout(tick, 42);
    };

    timer = window.setTimeout(tick, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [index, reduce, titles]);

  return (
    <p className="type-line">
      I'm{" "}
      <span className="type-line__word" aria-live="polite">
        {reduce ? titles[0] : text}
      </span>
      {reduce ? null : <span className="type-line__caret" aria-hidden="true" />}
    </p>
  );
}
