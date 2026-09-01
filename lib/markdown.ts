function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sameUrl(a: string, b: string) {
  return a.replace(/\/$/, "") === b.replace(/\/$/, "");
}

function unwrapLinkedImages(md: string) {
  let t = md;
  t = t.replace(
    /\[\s*\n+\s*!\[([^\]]*)\]\(([^)\n]+)\)\s*\n+\s*\]\(([^)\n]+)\)/g,
    (_m, alt: string, src: string, href: string) => {
      const s = String(src).trim();
      const h = String(href).trim();
      if (sameUrl(s, h)) return `![${alt}](${s})`;
      return `[![${alt}](${s})](${h})`;
    },
  );
  t = t.replace(
    /\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)/g,
    (_m, alt: string, src: string, href: string) => {
      const s = String(src).trim();
      const h = String(href).trim();
      if (sameUrl(s, h)) return `![${alt}](${s})`;
      return `[![${alt}](${s})](${h})`;
    },
  );
  return t;
}

function unwrapMultilineLinks(md: string) {
  return md.replace(
    /\[\s*\n+\s*([^\n\[\]]+?)\s*\n+\s*\]\(([^)\n]+)\)/g,
    (_m, label: string, href: string) => `[${String(label).trim()}](${String(href).trim()})`,
  );
}

function stripOrphanMarkdown(md: string) {
  let t = md;
  t = t.replace(/^\s*\]\((?:\/(?:media|writing)\/|https?:)[^)]+\)\s*$/gm, "");
  t = t.replace(/^\s*!\[\s*$/gm, "");
  t = t.replace(/^\s*\[\s*$/gm, "");
  t = t.replace(/\]\(([^)]+)\)/g, (m, url: string, offset: number) => {
    const before = t.slice(0, offset);
    if (/\]\([^)]+\)$/.test(before)) return m;
    if (/\[[^\]]*$/.test(before)) return m;
    if (/^\/(?:media|writing)\//.test(url) || /^https?:\/\//i.test(url)) return "";
    return m;
  });
  return t;
}

export function normalizeMarkdown(source: string) {
  let md = (source || "").replace(/\r\n/g, "\n");
  for (let n = 0; n < 8; n += 1) {
    const next = unwrapMultilineLinks(unwrapLinkedImages(md));
    if (next === md) break;
    md = next;
  }
  return stripOrphanMarkdown(md);
}

function inline(s: string) {
  let t = escapeHtml(s);
  t = t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt: string, src: string) => {
    const srcLocal = src
      .replace(/\/writing\/[a-z0-9-]+\/([0-9a-f-]{8,}\.webp)/i, "/media/$1")
      .replace(/"/g, "");
    if (!srcLocal.startsWith("/media/")) return "";
    return `<img src="${srcLocal}" alt="${alt}" loading="lazy" />`;
  });
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => {
    const safe = href.replace(/"/g, "");
    if (/^javascript:/i.test(safe)) return label;
    const local = safe.replace(/https:\/\/(?:www\.)?patigroup\.com\/p\//i, "/writing/");
    const ext = local.startsWith("http") ? ` rel="noopener noreferrer" target="_blank"` : "";
    return `<a href="${local}"${ext}>${label}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return t;
}

function stripMarkdownLeakHtml(html: string) {
  let h = html;
  h = h.replace(/<p>\s*!?\s*\[\s*<\/p>\s*/g, "");
  h = h.replace(/<p>\s*\]\((?:\/(?:media|writing)\/|https?:)[^)]+\)\s*<\/p>\s*/g, "");
  h = h.replace(/\]\(\/(?:media|writing)\/[^)]+\)/g, "");
  h = h.replace(/(^|[>\s])!\[\s*(?=<|$)/g, "$1");
  return h;
}

function visibleMarkdownLeaks(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  return {
    media: (text.match(/\]\(\/media\//g) || []).length,
    writing: (text.match(/\]\(\/writing\//g) || []).length,
    bang: (text.match(/!\[/g) || []).length,
  };
}

export function markdownToHtml(source: string) {
  const lines = normalizeMarkdown(source).split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (/^###\s+/.test(line)) {
      out.push(`<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`);
      i += 1;
      continue;
    }
    if (/^##\s+/.test(line)) {
      out.push(`<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`);
      i += 1;
      continue;
    }
    if (/^#\s+/.test(line)) {
      out.push(`<h2>${inline(line.replace(/^#\s+/, ""))}</h2>`);
      i += 1;
      continue;
    }
    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      out.push(`<blockquote>${inline(buf.join(" "))}</blockquote>`);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      out.push("<ul>");
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        out.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, ""))}</li>`);
        i += 1;
      }
      out.push("</ul>");
      continue;
    }
    const buf: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,3}\s+/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^>\s?/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i += 1;
    }
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }
  return stripMarkdownLeakHtml(out.join("\n"));
}

export function assertNoMarkdownLeak(html: string) {
  const leaks = visibleMarkdownLeaks(html);
  return leaks.media === 0 && leaks.writing === 0 && leaks.bang === 0;
}
