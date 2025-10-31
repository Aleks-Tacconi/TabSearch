import { useEffect, useRef, useState } from "react";

const styles = {
    searchBar: {
        width: "calc(100% - 16px)",
        margin: "8px auto",
        padding: "12px 16px",

        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "12px",
        color: "rgba(255, 255, 255, 0.95)",

        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "15px",
        letterSpacing: "0.01em",

        outline: "none",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",

        transition: "all 0.2s ease-in-out",
        boxShadow: "inset 0 0 8px rgba(255, 255, 255, 0.04)",
        caretColor: "rgba(255, 255, 255, 0.8)",

        "::placeholder": {
            color: "rgba(255, 255, 255, 0.4)",
        },
    },

    searchBarFocus: {
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: `
            0 0 10px rgba(255, 255, 255, 0.1),
            inset 0 0 8px rgba(255, 255, 255, 0.08)
        `,
        background: "rgba(255, 255, 255, 0.12)",
    },
}; 

export default function Search({ query, setQuery, selectedIndex, setSelectedIndex, filteredTabs }) {
    const inputRef = useRef();
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <input
            ref={inputRef}
            type="text"
            placeholder="Search tabs..."
            value={query}
            onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {

                if (e.key === "Escape") {
                    chrome.runtime.sendMessage({ action: "close_popup_background" });
                    return
                }

                if (filteredTabs.length === 0) {
                    setSelectedIndex(0);
                    return
                };

                if (e.key === "ArrowDown") {
                    setSelectedIndex((i) => Math.min(i + 1, filteredTabs.length - 1));
                    e.preventDefault();
                } else if (e.key === "ArrowUp") {
                    setSelectedIndex((i) => Math.max(i - 1, 0));
                    e.preventDefault();
                } else if (e.key === "Enter") {
                    const selectedTab = filteredTabs[selectedIndex];
                    if (selectedTab) {
                        chrome.runtime.sendMessage({ action: "close_popup_background" });
                        chrome.runtime.sendMessage({ action: "activate_tab", tabId: selectedTab.id });
                    }
                }
            }}
            style={{
                ...styles.searchBar,
                ...(focused ? styles.searchBarFocus : {})
            }}
        />
    );
}

