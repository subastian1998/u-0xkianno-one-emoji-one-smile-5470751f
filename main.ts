// One Emoji, One Smile — writes the single chosen emoji to $MAKEFUN_OUTPUT_DIR/entry.txt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
// Entry choice: 🤗 (hugging face) — a warm smile plus an open-arms hug:
// direct first-glance warmth, universal, deliberately chosen rather than the
// default 🙂/😊, and a virtual hug from a stranger reads friendly, not intimate.
const text = readFileSync(join(here, "entry.txt"), "utf8");
const chars = [...text];
if (chars.length < 1 || chars.length > 8 || text.trim().length === 0) {
  console.error(`entry.txt must hold 1-8 non-whitespace characters, got ${chars.length}`);
  process.exit(1);
}
if (/\s/.test(text)) {
  console.error("entry.txt must hold exactly one emoji and nothing else — no whitespace");
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${chars.length}-character entry to ${join(outDir, "entry.txt")}`);
