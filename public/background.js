chrome.commands.onCommand.addListener((command) => {
    if (command === "show_popup") {
        chrome.storage.local.get("tabPreviews", (data) => {
            tabPreviews = data.tabPreviews || {};
        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_popup" });
            captureTabPreview(tabs[0].id);
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

let tabPreviews = {};

function savePreviews() {
    chrome.storage.local.set({ tabPreviews });
}

function captureTabPreview(tabId) {
    chrome.tabs.get(tabId, (tab) => {
        if (!tab) return;

        if (tab.active) {
            chrome.tabs.captureVisibleTab(tab.windowId, { format: "jpeg", quality: 50 }, (dataUrl) => {
                if (!chrome.runtime.lastError && dataUrl) {
                    tabPreviews[tabId] = dataUrl;
                    savePreviews();
                }
            });
        }
    });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "get_preview") {
        // TODO: this can be optimized (maybe)
        chrome.storage.local.get("tabPreviews", (data) => {
            tabPreviews = data.tabPreviews || {};
        });

        sendResponse({ preview: tabPreviews[msg.tabId] || null });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "capture") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            captureTabPreview(tabs[0].id);
        });
    }
});
