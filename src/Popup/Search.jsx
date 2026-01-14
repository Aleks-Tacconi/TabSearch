import { useEffect, useRef } from "react";
import styles from "./SearchStyles";

export default function Search({ query, setQuery, selectedIndex, setSelectedIndex, filteredTabs }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        chrome.runtime.sendMessage({ action: "close_popup_background" });
        return;
      }

      const ignoredKeys = ["ArrowUp", "ArrowDown", "Enter", "Backspace", "Control"];

      if (!ignoredKeys.includes(e.key) && inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();

        if (e.key.length === 1) {
          const start = inputRef.current.selectionStart;
          const end = inputRef.current.selectionEnd;
          const newValue = query.slice(0, start) + e.key + query.slice(end);
          setQuery(newValue);
          setTimeout(() => {
            inputRef.current.setSelectionRange(start + 1, start + 1);
          }, 0);
        }
        return;
      }

      if (e.key === "Enter") {
        const selectedTab = filteredTabs[selectedIndex];

        if (selectedTab) {
          chrome.runtime.sendMessage({ action: "close_popup_background" });
          if (selectedTab.isSearch) {
            chrome.runtime.sendMessage({ action: "search_query", query: query });
          } else {
            chrome.runtime.sendMessage({
              action: "activate_tab",
              tabId: selectedTab.id,
            });
          }
        }
      }

      if (filteredTabs.length === 1) {
        setSelectedIndex(0);
        return;
      }

      if (e.key === "ArrowDown") {
        setSelectedIndex((i) => Math.min(i + 1, filteredTabs.length - 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((i) => Math.max(i - 1, 0));
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [filteredTabs, selectedIndex, query, setQuery, setSelectedIndex]);

  return (
    <div style={styles.container}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tabs..."
        value={query}
        onChange={(e) => {
          const newQuery = e.target.value;
          setQuery(newQuery);
        }}
        onBlur={() => {
          chrome.runtime.sendMessage({ action: "close_popup_background" });
        }}
        style={styles.searchBar}
      />
    </div>
  );
}
