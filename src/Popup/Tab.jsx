import { forwardRef } from "react";
import styles from "./TabStyles";

const Tab = forwardRef(({ tab, selected }, ref) => {
  if (tab.active) return null;

  const isSearch = tab.isSearch;

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
          opacity: selected ? 1 : 0,
        }}
      >
        <div>{isSearch ? "Search" : "Go\u00A0to\u00A0tab"}</div>
        <div
          style={{
            fontWeight: "800",
            padding: "2px 5px",
            borderRadius: "3px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
            marginLeft: "8px",
          }}
        >
          ⤶
        </div>
      </span>
    </li>
  );
});

export default Tab;
