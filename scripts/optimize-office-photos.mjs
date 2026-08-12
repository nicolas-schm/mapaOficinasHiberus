import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeWithRetry(path, buffer, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      writeFileSync(path, buffer);
      return;
    } catch (err) {
      if (i === attempts - 1) throw err;
      await sleep(300);
    }
  }
}

const ROOT = join(import.meta.dirname, "..", "src", "assets", "oficinas");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 78;
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".jfif"]);

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else if (IMAGE_EXTENSIONS.has(extname(entry).toLowerCase())) files.push(full);
  }
  return files;
}

const files = walk(ROOT);
let totalBefore = 0;
let totalAfter = 0;
const failed = [];

for (const file of files) {
  try {
    const before = statSync(file).size;
    const inputBuffer = readFileSync(file);
    const buffer = await sharp(inputBuffer)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    await writeWithRetry(file, buffer);
    const after = statSync(file).size;
    totalBefore += before;
    totalAfter += after;
    console.log(
      `${file.replace(ROOT, "")}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024 / 1024).toFixed(1)}MB`,
    );
  } catch (err) {
    failed.push(file);
    console.error(`FAILED ${file.replace(ROOT, "")}: ${err.message}`);
  }
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(0)}MB -> ${(totalAfter / 1024 / 1024).toFixed(0)}MB`,
);
if (failed.length) {
  console.log(`\n${failed.length} file(s) could not be processed:`);
  for (const f of failed) console.log(`  ${f}`);
}
