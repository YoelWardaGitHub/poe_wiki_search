# PoeDB Quick Search

A minimal cross-browser extension (Manifest V3) that adds an omnibox keyword for
searching [poedb.tw](https://poedb.tw/us/), the Path of Exile database. Works in
**Chrome** and **Firefox**.

## Usage

1. Type `poedb` in the address bar, then press <kbd>Space</kbd> (or <kbd>Tab</kbd> in Chrome).
2. Type your search query (e.g. `lightning strike`).
3. Press <kbd>Enter</kbd> to search in the current tab, or <kbd>Alt+Enter</kbd> to open in a new tab.

### Why Google site search?

poedb.tw's on-site search requires a session-bound `token` parameter (and the site
sits behind an anti-bot layer), so it can't be driven from a stateless address-bar
extension. Instead, queries are routed through a Google search scoped with
`site:poedb.tw/us`, which needs no token and handles fuzzy/partial queries.

## Installation

### Chrome (unpacked)

1. Open `chrome://extensions`, enable **Developer mode**.
2. **Load unpacked** → select the `src/` folder.

### Firefox (permanent — signed `.xpi`)

1. Run `npm run sign` to generate a signed `.xpi` in `web-ext-artifacts/`.
2. Open `about:addons` → gear → **Install Add-on From File…** → select the `.xpi`.

## Development / signing

Requires [Node.js](https://nodejs.org/). Install tooling with `npm install`.

| Command                | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `npm run pack:firefox` | Generate a Firefox-tailored build in `build/firefox/`.       |
| `npm run lint`         | Build for Firefox, then validate with `web-ext lint`.        |
| `npm run build`        | Package an unsigned Chrome `.zip` into `web-ext-artifacts/`. |
| `npm run sign`         | Produce a Mozilla-signed `.xpi` (unlisted).                  |
| `npm run publish`      | Submit a **listed** version to addons.mozilla.org.           |

Signing needs Mozilla API credentials in a local `.env` (gitignored):

```
WEB_EXT_API_KEY=your-jwt-issuer
WEB_EXT_API_SECRET=your-jwt-secret
```
