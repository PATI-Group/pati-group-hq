#!/usr/bin/env node
/**
 * If public/media is incomplete (MCP/file deploys), download the recoded
 * WebP archive and extract it. Extra Home photos uploaded with the deploy
 * are stashed and copied back so a writing-image archive cannot drop them.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const MEDIA = join(ROOT, "public/media");
const HOME = join(MEDIA, "home");
const STASH = "/tmp/pati-home-stash";
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

function stashHome() {
  if (!existsSync(HOME) || countWebp(HOME) === 0) return;
  mkdirSync(STASH, { recursive: true });
  cpSync(HOME, STASH, { recursive: true });
}

function restoreHome() {
  if (!existsSync(STASH)) return;
  mkdirSync(HOME, { recursive: true });
  cpSync(STASH, HOME, { recursive: true });
}

stashHome();
const have = countWebp(MEDIA);
if (have < NEED) {
  mkdirSync(join(ROOT, "public"), { recursive: true });
  const dest = join(ROOT, "public/pati-media.tgz");
  console.log(`fetch media archive (${have} on disk)`);
  execFileSync("curl", ["-fsSL", "-o", dest, ARCHIVE], { stdio: "inherit" });
  execFileSync("tar", ["-xzf", dest, "-C", join(ROOT, "public")], { stdio: "inherit" });
  execFileSync("rm", ["-f", dest]);
}
restoreHome();
const after = countWebp(MEDIA);
console.log(`media ready ${after}`);
if (after < NEED) {
  console.error("media extract short");
  process.exit(1);
}
