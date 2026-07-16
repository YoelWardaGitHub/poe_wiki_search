const buildSearchUrl = (query) =>
  `https://www.poewiki.net/index.php?search=${encodeURIComponent(query)}&title=Special%3ASearch`;

// Omnibox suggestion descriptions are parsed as XML, so user input must be escaped.
const escapeXml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const DEFAULT_DESCRIPTION = "Search the Path of Exile Wiki (poewiki.net)";

chrome.omnibox.setDefaultSuggestion({ description: DEFAULT_DESCRIPTION });

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const query = text.trim();
  chrome.omnibox.setDefaultSuggestion({
    description: query
      ? `Search poewiki.net for "<match>${escapeXml(query)}</match>"`
      : DEFAULT_DESCRIPTION,
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
