#!/usr/bin/env node
/**
 * If public/media is incomplete (MCP/file deploys), download the recoded
 * WebP archive and extract it. Git deploys that already contain the files skip.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const MEDIA = join(ROOT, "public/media");
const ARCHIVE = "https://litter.catbox.moe/4wavc5.tgz";
const NEED = 600;

function countWebp(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) n += countWebp(p);
    else if (name.name.endsWith(".webp")) n += 1;
  }
  return n;
}

const have = countWebp(MEDIA);
if (have >= NEED) {
  console.log(`media ready ${have}`);
  process.exit(0);
}

mkdirSync(join(ROOT, "public"), { recursive: true });
const dest = join(ROOT, "public/pati-media.tgz");
console.log(`fetch media archive (${have} on disk)`);
execFileSync("curl", ["-fsSL", "-o", dest, ARCHIVE], { stdio: "inherit" });
execFileSync("tar", ["-xzf", dest, "-C", join(ROOT, "public")], { stdio: "inherit" });
execFileSync("rm", ["-f", dest]);
const after = countWebp(MEDIA);
console.log(`media extracted ${after}`);
if (after < NEED) {
  console.error("media extract short");
  process.exit(1);
}
