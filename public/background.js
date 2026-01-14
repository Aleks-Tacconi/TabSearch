chrome.commands.onCommand.addListener((command) => {
  if (command === "show_popup") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_popup" });
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sendResponse) => {
  if (msg.action === "get_tabs") {
    chrome.tabs.query({}, (tabs) => {
      sendResponse(tabs);
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "close_popup_background") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "close_popup" });
    });
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "activate_tab" && msg.tabId) {
    chrome.tabs.update(msg.tabId, { active: true });
  }
});

chrome.runtime.onMessage.addListener((msg, sendResponse) => {
  if (msg.action === "search_query" && msg.query) {
    const searchUrl = `https://search.google.com/search?q=${encodeURIComponent(msg.query)}`;
    chrome.tabs.create({ url: searchUrl });
    sendResponse({ status: "ok" });
  }
});
