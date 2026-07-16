# PoeWiki Quick Search

A minimal cross-browser extension (Manifest V3) that adds an omnibox keyword for searching [poewiki.net](https://www.poewiki.net) directly. Works in **Chrome** and **Firefox**.

## Usage

1. Type `poe` in the address bar, then press <kbd>Space</kbd> (or <kbd>Tab</kbd> in Chrome).
2. Type your search query (e.g. `headhunter`).
3. Press <kbd>Enter</kbd> to search in the current tab, or <kbd>Alt+Enter</kbd> to open in a new tab.

The query is sent to poewiki.net's built-in `Special:Search` page.

## Installation (unpacked)

### Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.

### Firefox

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select the `manifest.json` file in this folder.

## Files

- `manifest.json` — extension manifest (MV3, omnibox keyword `poe`, cross-browser background config)
- `background.js` — builds the search URL and opens it
- `icon.png` — 128x128 placeholder icon
