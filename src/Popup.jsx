import { useState, useEffect } from "react";
import TabList from "./Popup/TabList.jsx";

const styles = {
    popupStyle: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70vw",
        maxWidth: "900px",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",

        /* --- Frosted glass effect --- */
        background: "rgba(20, 20, 20, 0.92)",
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",

        /* --- Border + glow --- */
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        boxShadow: `
            0 0 30px rgba(0, 0, 0, 0.4),
            0 0 12px rgba(255, 255, 255, 0.05)
        `,
        overflow: "hidden",

        /* --- Typography --- */
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "14px",
        color: "rgba(255, 255, 255, 0.95)",
        letterSpacing: "0.01em",
        lineHeight: 1.4,

        /* --- Layout behavior --- */
        padding: "16px",
        boxSizing: "border-box",
        userSelect: "none",

        animation: "popup-glow 0.3s ease-out",
        "@keyframes popup-glow": {
            from: { boxShadow: "0 0 0 rgba(255,255,255,0)" },
            to: { boxShadow: "0 0 15px rgba(255,255,255,0.08)" },
        }
    }
};

export default function Popup() {
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        chrome.runtime.sendMessage({ action: "get_tabs" }, (tabs) => {
            setTabs(tabs);
        });
    }, []);


    return (
        <div style={styles.popupStyle}>
            <TabList tabs={tabs} />
        </div>
    );
}

