# PoeWiki Quick Search

A minimal Chrome extension (Manifest V3) that adds an omnibox keyword for searching [poewiki.net](https://www.poewiki.net) via Google.

## Usage

1. Type `poe` in the Chrome address bar, then press <kbd>Space</kbd> or <kbd>Tab</kbd>.
2. Type your search query (e.g. `headhunter`).
3. Press <kbd>Enter</kbd> to search in the current tab, or <kbd>Alt+Enter</kbd> to open in a new tab.

The query is sent to Google as `site:www.poewiki.net <your query>`.

## Installation (unpacked)

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.

## Files

- `manifest.json` — extension manifest (MV3, omnibox keyword `poe`)
- `background.js` — service worker that builds the search URL and opens it
- `icon.png` — 128x128 placeholder icon
