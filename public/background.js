chrome.commands.onCommand.addListener((command) => {
    if (command === "show_popup") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggle_popup" });
        });
    }
});
