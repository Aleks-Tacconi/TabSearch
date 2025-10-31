import { useEffect, useRef, useState } from "react";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: "8px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        marginBottom: "14px",
    },

    searchBar: {
        width: "calc(100% - 16px)",
        margin: "4px auto",
        padding: "4px 16px",
        color: "rgba(255, 255, 255, 0.95)",

        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        fontSize: "18px",
        letterSpacing: "0.01em",

        outline: "none",

        caretColor: "rgba(255, 255, 255, 0.8)",
    },

    searchBarFocus: {
        // you can add extra glow/border on focus if desired
    },
};

export default function Search({ query, setQuery, selectedIndex, setSelectedIndex, filteredTabs }) {
    const inputRef = useRef();
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div style={styles.container}>
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
                        return;
                    }

                    if (filteredTabs.length === 0) {
                        setSelectedIndex(0);
                        return;
                    }

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
                    ...(focused ? styles.searchBarFocus : {}),
                }}
            />
        </div>
    );
}

