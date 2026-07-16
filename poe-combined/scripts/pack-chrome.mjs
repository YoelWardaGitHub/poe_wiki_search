// Generates a Chrome-specific build in build/chrome/ from src/.
// Chrome only supports MV3 `background.service_worker` and ignores Firefox-only
// keys, so we strip `background.scripts` and `browser_specific_settings` to keep
// the Chrome Web Store package clean and warning-free.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(root, "src");
const outDir = resolve(root, "build", "chrome");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(srcDir, outDir, { recursive: true });

const manifestPath = resolve(outDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

delete manifest.background?.scripts;
delete manifest.browser_specific_settings;

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log("Built Chrome package in build/chrome/ (Firefox-only keys stripped)");
