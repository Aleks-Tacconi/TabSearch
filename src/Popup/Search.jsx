import { useEffect, useRef } from "react";

export default function Search({ query, setQuery, selectedIndex, setSelectedIndex, filteredTabs }) {
    const inputRef = useRef();

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


            onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                    setSelectedIndex((i) => Math.min(i + 1, filteredTabs.length - 1));
                    e.preventDefault();
                } else if (e.key === "ArrowUp") {
                    setSelectedIndex((i) => Math.max(i - 1, 0));
                    e.preventDefault();
                } else if (e.key === "Enter") {
                    const selectedTab = filteredTabs[selectedIndex];
                    if (selectedTab) {
                        chrome.runtime.sendMessage({
                            action: "close_popup_background",
                        });

                        chrome.runtime.sendMessage({
                            action: "activate_tab",
                            tabId: selectedTab.id,
                        });
                    }
                } else if (e.key === "Escape") {
                    chrome.runtime.sendMessage({
                        action: "close_popup_background",
                    });
                }
            }}

            style={{
                width: "100%",
                padding: "6px 10px",
                marginBottom: "8px",
                boxSizing: "border-box",
            }}
        />
    );

}
