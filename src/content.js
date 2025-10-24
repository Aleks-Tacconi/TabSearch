import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup.jsx";

let container;
let root;
let visible = false;

function togglePopup() {
    if (!container) {
        container = document.createElement("iframe");
        container.id = "react-popup-iframe";
        Object.assign(container.style, {
            backgroundColor: "transparent",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999999,
            width: "80vw",
            height: "80vh",
            border: "none",
        });
        document.body.appendChild(container);

        const doc = container.contentDocument;
        doc.open();
        doc.write("<div id='root'></div>");
        doc.close();

        // Add CSS to hide scrollbar
        const style = doc.createElement("style");
        style.textContent = `
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        ::-webkit-scrollbar {
            display: none;
        }
        `;
        doc.head.appendChild(style);

        root = ReactDOM.createRoot(doc.getElementById("root"));
    }

    if (visible) {
        closePopup();
    } else {
        root.render(React.createElement(Popup));
        visible = true;
    }
}

function closePopup() {
    root.unmount();
    container.remove();
    container = null;
    visible = false;
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggle_popup") togglePopup();
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "close_popup") closePopup();
});

function onUrlChange() {
    chrome.runtime.sendMessage({ action: "capture" });
    console.log("URL changed:", location.href);
}

onUrlChange();
