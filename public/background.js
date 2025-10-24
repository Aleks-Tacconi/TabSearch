chrome.commands.onCommand.addListener((command) => {
    if (command === "show_popup") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_popup" });
        });
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "get_tabs") {
    chrome.tabs.query({}, (tabs) => {
      sendResponse(tabs);
    });
    return true;
  }
});
