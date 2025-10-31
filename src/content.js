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
            all: "initial",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999999,
            width: "80vw",
            height: "80vh",
            border: "none",
        });
        container.style.setProperty("background", "transparent", "important");
        document.body.appendChild(container);

        const doc = container.contentDocument;
        doc.open();

        doc.write(`
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
          <div id="tab-search-root"></div>
        </body>
        </html>
        `);

        doc.close();

        // Add CSS to hide scrollbar
        const style = doc.createElement("style");
        style.textContent = `
        html, body, #tab-search-root {
          all: initial;
          display: block;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0) !important;
          color: rgba(0, 0, 0, 0) !important;
          overflow: hidden;
        }

        *, *::before, *::after {
          all: unset;
          box-sizing: border-box;
        }

        ::-webkit-scrollbar { display: none; }
        `;
        doc.head.appendChild(style);

        root = ReactDOM.createRoot(doc.getElementById("tab-search-root"));
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
