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

function loadJsonArray<T>(single: string, partsDir: string): T[] {
  if (existsSync(single)) {
    return JSON.parse(readFileSync(single, "utf8")) as T[];
  }
  if (!existsSync(partsDir)) return [];
  const files = readdirSync(partsDir)
    .filter((name) => /^part-\d+\.json$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)?.[0] || 0) - Number(b.match(/\d+/)?.[0] || 0));
  const all: T[] = [];
  for (const name of files) {
    all.push(...(JSON.parse(readFileSync(join(partsDir, name), "utf8")) as T[]));
  }
  return all;
}

const posts = loadJsonArray<WritingMeta>(
  join(process.cwd(), "content/writing/index.json"),
  join(process.cwd(), "content/writing/index"),
);

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

export function counts() {
  return {
    all: posts.length,
    public: posts.filter((p) => !p.gated).length,
    gated: posts.filter((p) => p.gated).length,
  };
}

let bodyMap: Map<string, WritingPost> | null = null;

function loadBodies() {
  if (bodyMap) return bodyMap;
  const root = join(process.cwd(), "content/writing");
  const full = loadJsonArray<WritingPost>(join(root, "posts.json"), join(root, "posts"));
  bodyMap = new Map(full.map((p) => [p.slug, p]));
  return bodyMap;
}

export function localizeUrl(slug: string, url: string) {
  if (!url) return "";
  if (url.startsWith("/writing/")) return url;
  if (/substackcdn|substack-post-media|bucketeer-/i.test(url)) return "";
  return url;
}

export function localizeMarkdown(slug: string, source: string) {
  if (!source) return source;
  let md = source.replace(
    /https:\/\/(?:www\.)?patigroup\.com\/p\/([a-z0-9-]+)/gi,
    "/writing/$1",
  );
  md = md.replace(
    /https:\/\/(?:substackcdn\.com|substack-post-media\.s3\.amazonaws\.com|bucketeer-[a-z0-9-]+\.s3\.amazonaws\.com)[^\s)"']+/gi,
    "",
  );
  return md;
}

export function loadWritingPost(slug: string): WritingPost | null {
  const meta = getWritingMeta(slug);
  if (!meta) return null;
  const cached = loadBodies().get(slug);
  const body = localizeMarkdown(slug, cached?.body || "");
  return {
    ...(cached || meta),
    ...meta,
    cover: localizeUrl(slug, cached?.cover || meta.cover),
    body,
    gated: Boolean(meta.gated || cached?.gated || meta.audience === "only_paid"),
  };
}
