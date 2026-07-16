// A single omnibox keyword ("poe") can't be split into two, so this extension
// routes a single "poe" keyword to two destinations:
//   poe <query>        -> Path of Exile Wiki (poewiki.net)
//   poe db <query>     -> poedb.tw (via Google site: search, since poedb's own
//                          search needs a session-bound token)
// While typing, the dropdown also offers the *other* site as a selectable suggestion.

const wikiUrl = (query) =>
  `https://www.poewiki.net/index.php?search=${encodeURIComponent(query)}&title=Special%3ASearch`;

const poedbUrl = (query) =>
  `https://www.google.com/search?q=${encodeURIComponent(`site:poedb.tw/us ${query}`)}`;

const DB_PREFIX = /^db\s+/i;
const DEFAULT_DESCRIPTION = "Search the PoE Wiki  \u2014  tip: start with 'db ' to search poedb.tw";

// Chrome parses the omnibox description as XML (so `& < >` must be escaped);
// Firefox treats it as plain text and would render entities literally.
const isFirefox = typeof browser !== "undefined";
const fmt = (text) =>
  isFirefox
    ? text
    : text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const parse = (input) => {
  const raw = input.trim();
  const isDb = DB_PREFIX.test(raw);
  return { isDb, query: raw.replace(DB_PREFIX, "").trim() };
};

chrome.omnibox.setDefaultSuggestion({ description: DEFAULT_DESCRIPTION });

chrome.omnibox.onInputChanged.addListener((input, suggest) => {
  const { isDb, query } = parse(input);

  if (!query) {
    chrome.omnibox.setDefaultSuggestion({ description: DEFAULT_DESCRIPTION });
    suggest([]);
    return;
  }

  if (isDb) {
    chrome.omnibox.setDefaultSuggestion({
      description: `Search poedb.tw for "${fmt(query)}"`,
    });
    suggest([{ content: query, description: `Search the PoE Wiki for "${fmt(query)}"` }]);
  } else {
    chrome.omnibox.setDefaultSuggestion({
      description: `Search the PoE Wiki for "${fmt(query)}"`,
    });
    suggest([{ content: `db ${query}`, description: `Search poedb.tw for "${fmt(query)}"` }]);
  }
});

chrome.omnibox.onInputEntered.addListener((input, disposition) => {
  const { isDb, query } = parse(input);
  const url = isDb ? poedbUrl(query) : wikiUrl(query);

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
