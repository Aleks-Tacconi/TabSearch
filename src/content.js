import React from "react";
import ReactDOM from "react-dom/client";
import Popup from "./Popup";

let container;
let root;
let visible = false;

function togglePopup() {
  if (!container) {
    // Create host element
    container = document.createElement("div");
    container.id = "react-popup";
    Object.assign(container.style, {
      all: "initial",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 999999,
      width: "80vw",
      height: "80vh",
    });
    document.body.appendChild(container);

    // Shadow DOM
    const shadow = container.attachShadow({ mode: "open" });

    // Root element for React inside shadow
    const reactRoot = document.createElement("div");
    shadow.appendChild(reactRoot);

    // Optional: Add styles scoped to shadow
    const style = document.createElement("style");
    style.textContent = `
        :host, :host * {
            all: unset;
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
            font-size: 14px !important;
        }

        :host {
            display: block;
            position: relative;
            background: rgba(40, 40, 40, 0.8);
            backdrop-filter: blur(16px);
            border-radius: 12px;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            color: transparent !important;
        }

        /* Prevent browser form and link styling */
        :host a, :host button, :host input, :host textarea, :host select {
            all: unset;
            box-sizing: border-box;
            font: inherit;
            color: inherit;
            background: none;
            border: none;
        }

        ::-webkit-scrollbar { display: none; }
        `;
    shadow.appendChild(style);
    root = ReactDOM.createRoot(reactRoot);
  }

  if (visible) {
    closePopup();
  } else {
    root.render(React.createElement(Popup));
    visible = true;
  }
}

function closePopup() {
  if (!root) return;
  root.unmount();
  container.remove();
  container = null;
  root = null;
  visible = false;
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "toggle_popup") togglePopup();
});
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "close_popup") closePopup();
});
