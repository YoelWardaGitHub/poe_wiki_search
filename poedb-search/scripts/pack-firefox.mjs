// Generates a Firefox-specific build in build/firefox/ from src/.
// Firefox does not support MV3 `background.service_worker` (Chrome requires it),
// so we strip that key to keep the AMO upload warning-free while src/ stays
// cross-browser for Chrome and local development.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(root, "src");
const outDir = resolve(root, "build", "firefox");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(srcDir, outDir, { recursive: true });

const manifestPath = resolve(outDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

if (manifest.background?.service_worker) {
  delete manifest.background.service_worker;
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log("Built Firefox package in build/firefox/ (service_worker stripped)");
