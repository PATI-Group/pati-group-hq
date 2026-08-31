import Link from "next/link";
import type { ReactNode } from "react";
import { writingCategories, type WritingMeta } from "../lib/writing";

export function Filters({
  base,
  active,
}: {
  base: string;
  active?: string;
}) {
  const allHref = base;
  return (
    <nav className="filters" aria-label="Categories">
      <Link className={!active ? "filter on" : "filter"} href={allHref}>
        All
      </Link>
      {writingCategories.map((c) => (
        <Link
          key={c.id}
          className={active === c.id ? "filter on" : "filter"}
          href={`${base}?cat=${c.id}`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}

export function PostList({ posts }: { posts: WritingMeta[] }) {
  return (
    <ol className="archive">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link className="item" href={`/writing/${p.slug}`}>
            <p className="meta">
              {writingCategories.find((c) => c.id === p.category)?.label || p.category}
              {p.date ? ` · ${p.date}` : ""}
              {p.gated ? " · Gated" : ""}
            </p>
            <h2>{p.title}</h2>
            {p.subtitle ? <p>{p.subtitle}</p> : null}
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function Pager({
  base,
  cat,
  page,
  pages,
}: {
  base: string;
  cat?: string;
  page: number;
  pages: number;
}) {
  if (pages <= 1) return null;
  const href = (n: number) => {
    const q = new URLSearchParams();
    if (cat) q.set("cat", cat);
    if (n > 1) q.set("page", String(n));
    const s = q.toString();
    return s ? `${base}?${s}` : base;
  };
  return (
    <nav className="pager" aria-label="Pagination">
      {page > 1 ? <Link href={href(page - 1)}>Previous</Link> : <span>Previous</span>}
      <span>
        Page {page} / {pages}
      </span>
      {page < pages ? <Link href={href(page + 1)}>Next</Link> : <span>Next</span>}
    </nav>
  );
}

export function Shell({
  k,
  h,
  l,
  children,
}: {
  k?: string;
  h: string;
  l: string;
  children: ReactNode;
}) {
  return (
    <main id="main" className="shell">
      <header className="shell-hero">
        {k ? <p className="kicker">{k}</p> : null}
        <h1>{h}</h1>
        <p className="lead">{l}</p>
      </header>
      {children}
    </main>
  );
}
