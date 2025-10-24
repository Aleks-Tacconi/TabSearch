import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup.jsx";

let container;
let root;
let visible = false;

function togglePopup() {
    if (!container) {
        container = document.createElement("div");
        container.id = "react-popup-container";
        Object.assign(container.style, {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
        });
        document.body.appendChild(container);
        root = ReactDOM.createRoot(container);
    }

    if (visible) {
        root.unmount();
        container.remove();
        container = null;
    } else {
        root.render(React.createElement(Popup));
    }

    visible = !visible;
}

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "toggle_popup") togglePopup();
});
