const buildSearchUrl = (query) =>
  `https://www.poewiki.net/index.php?search=${encodeURIComponent(query)}&title=Special%3ASearch`;

chrome.omnibox.setDefaultSuggestion({
  description: "Search poewiki.net for: %s",
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
