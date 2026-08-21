import { Link } from "react-router-dom";
import { posts } from "./articles";

export function Blog() {
  return (
    <main id="top" className="page">
      <div className="wrap page-head">
        <p className="kicker">Writing</p>
        <h1>Blog</h1>
        <p className="lede">
          Field notes on frontend architecture, performance, and delivery. Written for engineers and hiring
          managers, not tutorial traffic.
        </p>
      </div>
      <div className="wrap">
        {posts.map((post) => (
          <article className="post-card" key={post.slug}>
            <p className="kicker">
              {post.date} · {post.topic}
            </p>
            <h2>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.summary}</p>
            <Link className="text-link" to={`/blog/${post.slug}`}>
              Read the article
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
