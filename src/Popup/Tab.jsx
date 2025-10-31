import React, { forwardRef } from "react";

const styles = {
    li: {
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        cursor: "pointer",
        borderRadius: "10px",
        margin: "4px 8px",

        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
        transition: "all 0.18s ease-in-out",

        color: "rgba(255,255,255,0.9)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },

    hover: {
        background: "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 3px 6px rgba(0,0,0,0.35)",
    },

    selected: {
        background: "rgba(255,255,255,0.18)",
        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        backdropFilter: "blur(14px) saturate(180%)",
        transform: "scale(1.005)",
    },

    icon: {
        width: "28px",
        height: "28px",
        marginRight: "12px",
        borderRadius: "6px",
        flexShrink: 0,
        objectFit: "contain",
        background: "rgba(255,255,255,0.08)",
        padding: "4px",
    },

    textContainer: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        gap: "2px",
    },

    title: {
        fontWeight: 500,
        color: "rgba(255,255,255,0.95)",
        fontSize: "0.95rem",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        lineHeight: 1.3,
    },

    url: {
        fontSize: "0.8rem",
        color: "rgba(255,255,255,0.55)",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        lineHeight: 1.2,
    },
};

const Tab = forwardRef(({ tab, selected }, ref) => {
    if (tab.active) return null;

    return (
        <li
            ref={ref}
            style={{
                ...styles.li,
                ...(selected ? styles.selected : {}),
                position: "relative",
            }}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.hover)}
            onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.li);
                if (selected) Object.assign(e.currentTarget.style, styles.selected);
            }}
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

            <span
                style={{
                    marginLeft: "auto",
                    fontSize: "4rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    userSelect: "none",
                    paddingLeft: "12px",
                    transition: "opacity 0.18s ease-in-out",
                    opacity: selected ? 1 : 0,
                }}
            >
                <div>
                    Go&nbsp;to&nbsp;tab
                </div>
                <div style={{
                    fontWeight: "800",
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
                    marginLeft: "8px",
                }}>
                    ⤶
                </div>
            </span>
        </li>
    );
});

export default Tab;

