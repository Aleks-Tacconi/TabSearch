import { useEffect, useRef, useState } from "react";

const styles = {
    searchBar: {
        width: "calc(100% - 12px)",
        padding: "8px 12px",
        marginBottom: "8px",
        marginTop: "6px",
        marginLeft: "6px",
        marginRight: "6px",
        boxSizing: "border-box",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        fontSize: "0.95rem",
        outline: "none",
        transition: "border 0.2s, box-shadow 0.2s",
    },
    searchBarFocus: {
        border: "1px solid #2a7ae2",
        boxShadow: "0 0 4px rgba(42,122,226,0.3)",
    },
};

export default function Search({ query, setQuery, selectedIndex, setSelectedIndex, filteredTabs, setHoveredTab }) {
    const inputRef = useRef();
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        setHoveredTab(filteredTabs[selectedIndex]);
    }, [selectedIndex]);

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

