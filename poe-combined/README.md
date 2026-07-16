# PoE Quick Search (Wiki + DB)

A minimal cross-browser extension (Manifest V3) that puts both Path of Exile
reference sites behind a single address-bar keyword. Works in **Chrome** and **Firefox**.

## Usage

Type `poe` in the address bar, press <kbd>Space</kbd>, then your query:

- `poe lightning strike` → **PoE Wiki** ([poewiki.net](https://www.poewiki.net))
- `poe db lightning strike` → **poedb.tw**

As you type, the dropdown also offers the *other* site as a selectable suggestion,
so you can pick either destination with the arrow keys. Press <kbd>Enter</kbd> for the
current tab, or <kbd>Alt+Enter</kbd> for a new tab.

> A single extension can only register one omnibox keyword, so both sites share
> `poe` and the `db ` prefix selects poedb. poedb queries are routed through a
> Google `site:poedb.tw/us` search because poedb's on-site search needs a session token.

## Install in Chrome (unpacked)

1. `chrome://extensions` → enable **Developer mode**.
2. **Load unpacked** → select the `src/` folder.

## Build / publish

Requires [Node.js](https://nodejs.org/). Run `npm install` once.

| Command                | What it does                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run build:chrome` | Build the Chrome Web Store `.zip` in `web-ext-artifacts/`.          |
| `npm run pack:chrome`  | Generate the Chrome build folder (`build/chrome/`) only.            |
| `npm run lint`         | Validate the (Firefox) build with `web-ext lint`.                   |
| `npm run sign`         | Mozilla-signed `.xpi` (unlisted) for direct Firefox install.        |
| `npm run publish`      | Submit a **listed** version to addons.mozilla.org.                  |

### Chrome Web Store

`npm run build:chrome` produces `web-ext-artifacts/poe-quick-search-chrome-<version>.zip`.
Upload that zip in the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
(a one-time \$5 developer registration is required). Google signs and hosts it after review.
