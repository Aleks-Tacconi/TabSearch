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
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999999,
            width: "80vw",
            height: "80vh",
            overflow: "hidden",
        });
        document.body.appendChild(container);

        container.contentDocument.open();
        container.contentDocument.write("<div id='root'></div>");
        container.contentDocument.close();

        root = ReactDOM.createRoot(container.contentDocument.getElementById("root"));
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
