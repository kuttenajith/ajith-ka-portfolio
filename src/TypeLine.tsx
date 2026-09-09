import { useEffect, useState } from "react";
import { profile } from "./content";

export function TypeLine() {
  const titles = profile.titles;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % titles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [titles]);

  const word = titles[index];

  return (
    <p className="type-line">
      I'm{" "}
      <span className="type-line__word" key={word}>
        {word}
      </span>
    </p>
  );
}
