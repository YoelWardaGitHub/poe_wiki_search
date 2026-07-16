# PoeWiki Quick Search

A minimal cross-browser extension (Manifest V3) that adds an omnibox keyword for searching [poewiki.net](https://www.poewiki.net) directly. Works in **Chrome** and **Firefox**.

## Usage

1. Type `poe` in the address bar, then press <kbd>Space</kbd> (or <kbd>Tab</kbd> in Chrome).
2. Type your search query (e.g. `headhunter`).
3. Press <kbd>Enter</kbd> to search in the current tab, or <kbd>Alt+Enter</kbd> to open in a new tab.

The query is sent to poewiki.net's built-in `Special:Search` page.

## Installation

### Chrome (unpacked)

1. Open `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select the `src/` folder.

### Firefox (temporary — cleared on restart)

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select `src/manifest.json`.

### Firefox (permanent — signed `.xpi`)

Temporary add-ons are unloaded when Firefox restarts. For a permanent install,
use the Mozilla-signed `.xpi` produced by the signing step below:

1. Run `npm run sign` (see below) to generate a signed `.xpi` in `web-ext-artifacts/`.
2. Open `about:addons`.
3. Click the gear icon → **Install Add-on From File…** and select the `.xpi`.

## Project layout

```
src/            # the shipped extension
  manifest.json # MV3 manifest (omnibox keyword `poe`, cross-browser background)
  background.js  # builds the search URL and opens it
  icon.png       # 128x128 placeholder icon
package.json    # web-ext tooling (lint / build / sign)
```

## Development / signing

Requires [Node.js](https://nodejs.org/). Install tooling with `npm install`.

| Command         | What it does                                            |
| --------------- | ------------------------------------------------------- |
| `npm run pack:firefox` | Generate a Firefox-tailored build in `build/firefox/`.       |
| `npm run lint`         | Build for Firefox, then validate with `web-ext lint`.        |
| `npm run build`        | Package an unsigned Chrome `.zip` into `web-ext-artifacts/`. |
| `npm run sign`         | Produce a Mozilla-signed `.xpi` (self-distributed, unlisted).|
| `npm run publish`      | Submit a **listed** version to addons.mozilla.org for review.|

### Cross-browser note

`src/manifest.json` is cross-browser: it keeps `background.service_worker` (required
by Chrome) alongside `background.scripts` (required by Firefox). Firefox rejects the
`service_worker` key with a warning, so the Firefox/AMO commands run `pack:firefox`
first, which copies `src/` into `build/firefox/` and strips `service_worker`. Load
`src/` directly in Chrome; the signed/listed Firefox artifacts come from `build/firefox/`.

Listing metadata (summary, description, category, license) is read from
`amo-metadata.json`. Bump the `version` in both `src/manifest.json` and
`package.json` before each submission — AMO requires a unique version per upload.

Signing needs Mozilla add-on API credentials. Get them from the
[AMO API key page](https://addons.mozilla.org/developers/addon/api/key/) and
put them in a local `.env` file (already gitignored):

```
WEB_EXT_API_KEY=your-jwt-issuer
WEB_EXT_API_SECRET=your-jwt-secret
```

> **Never commit `.env`** — it holds your Mozilla signing secret.
