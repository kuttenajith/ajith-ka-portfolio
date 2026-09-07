import { useEffect, useState } from "react";
import { profile } from "./content";

export function TypeLine() {
  const titles = profile.titles;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(titles[0]);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", sync);
      return () => media.removeEventListener("change", sync);
    }
    media.addListener(sync);
    return () => media.removeListener(sync);
  }, []);

  useEffect(() => {
    const word = titles[index];
    let cancelled = false;
    let timer = 0;

    if (reduce) {
      setText(word);
      timer = window.setTimeout(() => {
        if (!cancelled) setIndex((current) => (current + 1) % titles.length);
      }, 2400);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    let i = 0;
    let deleting = false;
    setText("");

    const tick = () => {
      if (cancelled) return;
      if (!deleting) {
        i += 1;
        setText(word.slice(0, i));
        if (i >= word.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 70);
        return;
      }
      i -= 1;
      setText(word.slice(0, i));
      if (i <= 0) {
        setIndex((current) => (current + 1) % titles.length);
        return;
      }
      timer = window.setTimeout(tick, 40);
    };

    timer = window.setTimeout(tick, 320);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [index, reduce, titles]);

  return (
    <p className="type-line">
      I'm{" "}
      <span className="type-line__word">{text}</span>
      {reduce ? null : <span className="type-line__caret" aria-hidden="true" />}
    </p>
  );
}
