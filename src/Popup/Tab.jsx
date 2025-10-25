import React, { forwardRef } from "react";

const styles = {
    li: {
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "6px",
        marginBottom: "4px",
        transition: "background 0.2s, box-shadow 0.2s",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        margin: "4px 8px",
        width: "40vw",
    },
    selected: {
        backgroundColor: "#e6f0ff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    },
    icon: {
        backgroundColor: "transparent",
        width: "32px",
        height: "32px",
        marginRight: "12px",
        flexShrink: 0,
        borderRadius: "8px",
        objectFit: "contain",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    title: {
        fontWeight: 600,
        color: "#1a1a1a",
        fontSize: "0.95rem",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
    url: {
        fontSize: "0.82rem",
        color: "#2a7ae2",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    },
};


const Tab = forwardRef(({ tab, selected }, ref) => {
    if (tab.active) return null;

    return (
        <li
            ref={ref}
            style={{ ...styles.li, ...(selected ? styles.selected : {}) }}
        >
            <img
                src={tab.favIconUrl || chrome.runtime.getURL("search.png")}
                alt="icon"
                style={styles.icon}
                onError={(e) => {
                    e.onerror = null;
                    e.target.src = chrome.runtime.getURL("search.png");
                }}
            />

            <div style={styles.textContainer}>
                <span style={styles.title}>{tab.title || "No title"}</span>
                <span style={styles.url}>{tab.url}</span>
            </div>
        </li>
    );
});

export default Tab;

