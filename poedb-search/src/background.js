// poedb.tw's own search requires a session-bound token and sits behind an
// anti-bot layer, so we route through Google's site: operator instead, which
// needs no token and handles fuzzy/partial queries.
const buildSearchUrl = (query) =>
  `https://www.google.com/search?q=${encodeURIComponent(`site:poedb.tw/us ${query}`)}`;

const DEFAULT_DESCRIPTION = "Search poedb.tw (Path of Exile database)";

// Chrome parses the omnibox description as XML (so `& < >` must be escaped);
// Firefox treats it as plain text and would render entities literally.
const isFirefox = typeof browser !== "undefined";

const escapeXml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const describe = (query) =>
  `Search poedb.tw for "${isFirefox ? query : escapeXml(query)}"`;

chrome.omnibox.setDefaultSuggestion({ description: DEFAULT_DESCRIPTION });

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const query = text.trim();
  chrome.omnibox.setDefaultSuggestion({
    description: query ? describe(query) : DEFAULT_DESCRIPTION,
  });
  suggest([]);
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  const url = buildSearchUrl(text.trim());

  switch (disposition) {
    case "newForegroundTab":
      chrome.tabs.create({ url, active: true });
      break;
    case "newBackgroundTab":
      chrome.tabs.create({ url, active: false });
      break;
    default: // "currentTab"
      chrome.tabs.update({ url });
  }
});
