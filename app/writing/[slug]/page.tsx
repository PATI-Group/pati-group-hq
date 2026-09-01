import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { markdownToHtml } from "../../../lib/markdown";
import { loadWritingPost, writingCategories } from "../../../lib/writing";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadWritingPost(slug);
  if (!post) return { title: "Writing" };
  return { title: post.title, description: post.subtitle || post.title };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadWritingPost(slug);
  if (!post) notFound();
  const html = markdownToHtml(post.body);
  const cat = writingCategories.find((c) => c.id === post.category)?.label || post.category;
  return (
    <main id="main" className="shell">
      <header className="shell-hero">
        <p className="kicker">{cat}</p>
        <h1>{post.title}</h1>
        {post.subtitle ? <p className="lead">{post.subtitle}</p> : null}
        {post.gated ? <p className="gated">Gated · public preview</p> : null}
      </header>
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="cover" src={post.cover} alt="" />
      ) : null}
      {post.date ? <p className="meta">{post.date}</p> : null}
      <article className="article" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
