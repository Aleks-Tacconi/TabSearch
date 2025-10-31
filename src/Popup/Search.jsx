import { useEffect, useRef, useState } from "react";

const styles = {
    searchBar: {
        margin: "8px",
        padding: "10px 14px",
        borderRadius: "10px",

        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "white",

        outline: "none",
        fontSize: "0.95rem",
        backdropFilter: "blur(10px)",
    },

    searchBarFocus: {
        border: "1px solid rgba(255,255,255,0.45)",
        boxShadow: "0 0 6px rgba(255,255,255,0.3)",
    }
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

