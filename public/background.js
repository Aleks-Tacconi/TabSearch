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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "close_popup_background") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "close_popup" });
        });
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "activate_tab" && msg.tabId) {
        chrome.tabs.update(msg.tabId, { active: true });
    }
});

const tabPreviews = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        captureTabPreview(tabId);
    }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
    captureTabPreview(tabId);
});

function captureTabPreview(tabId) {
    chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] }, () => {
        chrome.tabs.sendMessage(tabId, { action: "capture_tab" }, (res) => {
            if (res?.preview) tabPreviews[tabId] = res.preview;
        });
    });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "get_preview") {
        sendResponse({ preview: tabPreviews[msg.tabId] || null });
    }
});
