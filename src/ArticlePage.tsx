import { Link, Navigate, useParams } from "react-router-dom";
import { articles, type ArticleBlock } from "./articles";
import { profile } from "./content";

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function BlockView({ block }: { block: ArticleBlock }) {
  if (block.type === "p") {
    return (
      <p>
        <Inline text={block.text} />
      </p>
    );
  }
  if (block.type === "h2") {
    return <h2>{block.text}</h2>;
  }
  if (block.type === "ol") {
    return (
      <ol>
        {block.items.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul>
      {block.items.map((item) => (
        <li key={item}>
          <Inline text={item} />
        </li>
      ))}
    </ul>
  );
}

export function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main id="top" className="page">
      <article className="wrap article">
        <p className="kicker">
          {article.date} · {article.topic}
        </p>
        <h1>{article.title}</h1>
        <p className="lede">{article.lede}</p>
        {article.body.map((block, i) => (
          <BlockView key={`${article.slug}-${i}`} block={block} />
        ))}
        <p>
          If you want this applied to your product as a fixed-scope review, see{" "}
          <Link to="/work-with-me">Work with me</Link>
          {article.relatedHref ? (
            <>
              . Related public work:{" "}
              <a href={article.relatedHref} target="_blank" rel="noreferrer">
                {article.relatedLabel}
              </a>
              .
            </>
          ) : (
            "."
          )}
        </p>
        <p className="article-end">
          <Link to="/blog">All articles</Link>
          {" · "}
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>
      </article>
    </main>
  );
}
