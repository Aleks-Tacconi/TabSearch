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
            width: "300px",
            height: "150px",
            zIndex: 999999,
        });
        document.body.appendChild(container);

        container.contentDocument.open();
        container.contentDocument.write("<div id='root'></div>");
        container.contentDocument.close();

        root = ReactDOM.createRoot(container.contentDocument.getElementById("root"));
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
