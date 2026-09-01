import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PAGE_SIZE } from "./site";

export const writingCategories = [
  { id: "van-hoa", label: "Culture" },
  { id: "case-study", label: "Case study" },
  { id: "series", label: "Series" },
  { id: "tuyen-dung", label: "Hiring" },
  { id: "hoc-nghe", label: "Craft" },
] as const;

export type WritingCategory = (typeof writingCategories)[number]["id"];

export type WritingMeta = {
  slug: string;
  category: WritingCategory;
  date: string;
  title: string;
  subtitle: string;
  audience: string;
  gated: boolean;
  cover: string;
  canonical: string;
};

export type WritingPost = WritingMeta & { body: string };

const ROOT = join(process.cwd(), "content/writing");
const REMOTE = "https://raw.githubusercontent.com/tuanquang269/pati-group-hq/main/content/writing";
const INDEX_SHARDS = 17;

function readLocalParts<T>(dir: string): T[] {
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir)
    .filter((name) => /^part-\d+\.json$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)?.[0] || 0) - Number(b.match(/\d+/)?.[0] || 0));
  const all: T[] = [];
  for (const name of files) {
    all.push(...(JSON.parse(readFileSync(join(dir, name), "utf8")) as T[]));
  }
  return all;
}

let posts: WritingMeta[] = [];
if (existsSync(join(ROOT, "index.json"))) {
  posts = JSON.parse(readFileSync(join(ROOT, "index.json"), "utf8")) as WritingMeta[];
} else {
  posts = readLocalParts<WritingMeta>(join(ROOT, "index-small"));
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export async function ensureWriting() {
  if (posts.length >= 296) return posts;
  const remote = await Promise.all(
    Array.from({ length: INDEX_SHARDS }, (_, i) =>
      fetchJson<WritingMeta[]>(`${REMOTE}/index-small/part-${i + 1}.json`),
    ),
  );
  const flat = remote.flatMap((part) => part || []);
  if (flat.length) posts = flat;
  return posts;
}

export function getWritingPosts() {
  return posts;
}

export function getWritingMeta(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function filterWritingPosts(category?: string) {
  if (!category) return posts;
  return posts.filter((post) => post.category === category);
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const safe = Math.min(Math.max(1, page), pages);
  const start = (safe - 1) * size;
  return {
    items: items.slice(start, start + size),
    page: safe,
    pages,
    total,
    publicCount: 0,
    gatedCount: 0,
  };
}

export function archivePage(category?: string, page = 1) {
  const list = filterWritingPosts(category);
  const result = paginate(list, page);
  return {
    ...result,
    publicCount: list.filter((p) => !p.gated).length,
    gatedCount: list.filter((p) => p.gated).length,
    allCount: list.length,
  };
}

export function mediaPath(url: string) {
  if (!url) return "";
  if (url.startsWith("/media/")) return url;
  const local = url.match(/\/(?:writing|media)\/(?:[a-z0-9-]+\/)?([0-9a-f-]{8,}\.webp)$/i);
  if (local) return `/media/${local[1]}`;
  if (/substackcdn|substack-post-media|bucketeer-/i.test(url)) return "";
  return url;
}

export function localizeUrl(_slug: string, url: string) {
  return mediaPath(url);
}

export function localizeMarkdown(_slug: string, source: string) {
  if (!source) return source;
  let md = source.replace(
    /https:\/\/(?:www\.)?patigroup\.com\/p\/([a-z0-9-]+)/gi,
    "/writing/$1",
  );
  md = md.replace(/\/writing\/[a-z0-9-]+\/([0-9a-f-]{8,}\.webp)/gi, "/media/$1");
  md = md.replace(
    /https:\/\/(?:substackcdn\.com|substack-post-media\.s3\.amazonaws\.com|bucketeer-[a-z0-9-]+\.s3\.amazonaws\.com)[^\s)"']+/gi,
    "",
  );
  return md;
}

function readLocalPost(slug: string): WritingPost | null {
  const file = join(ROOT, "bodies", `${slug}.json`);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8")) as WritingPost;
  if (existsSync(join(ROOT, "posts.json"))) {
    const all = JSON.parse(readFileSync(join(ROOT, "posts.json"), "utf8")) as WritingPost[];
    return all.find((p) => p.slug === slug) || null;
  }
  return null;
}

export async function loadWritingPost(slug: string): Promise<WritingPost | null> {
  await ensureWriting();
  const meta = getWritingMeta(slug);
  if (!meta) return null;
  const cached =
    readLocalPost(slug) || (await fetchJson<WritingPost>(`${REMOTE}/bodies/${slug}.json`));
  const extra = await fetchJson<{ body?: string }>(`${REMOTE}/bodies/${slug}.b.json`);
  const body = localizeMarkdown(slug, `${cached?.body || ""}${extra?.body || ""}`);
  return {
    ...(cached || meta),
    ...meta,
    cover: localizeUrl(slug, cached?.cover || meta.cover),
    body,
    gated: Boolean(meta.gated || cached?.gated || meta.audience === "only_paid"),
  };
}
