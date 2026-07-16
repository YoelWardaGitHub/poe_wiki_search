const buildSearchUrl = (query) =>
  `https://www.poewiki.net/index.php?search=${encodeURIComponent(query)}&title=Special%3ASearch`;

const DEFAULT_DESCRIPTION = "Search the Path of Exile Wiki (poewiki.net)";

// Chrome parses the omnibox description as XML (so `& < >` must be escaped, and
// styling markup like <match> is supported). Firefox treats it as plain text and
// renders any entities or markup literally, so we skip escaping there.
const isFirefox = typeof browser !== "undefined";

const escapeXml = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const describe = (query) =>
  `Search poewiki.net for "${isFirefox ? query : escapeXml(query)}"`;

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
