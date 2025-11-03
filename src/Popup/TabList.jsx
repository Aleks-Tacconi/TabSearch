import { useState, useEffect, useRef } from "react";
import Tab from "./Tab";
import Search from "./Search";
import Fuse from "fuse.js"

const searchTabs = (tabs, query) => {
    const options = {
        keys: ['title', 'url'],
        includeScore: true,
        threshold: 0.3,
    };

    const fuse = new Fuse(tabs, options);
    const results = fuse.search(query);
    return results.map(result => result.item);
};

const styles = {
    container: { display: "flex", flexDirection: "column", flex: 1, height: "90%" },
    list: { listStyle: "none", padding: 0, margin: 0, overflowY: "auto", flex: 1 },
};

export default function TabList({ tabs }) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const searchTab = query
        ? [{
            id: "searchTab",
            title: `Search Google for "${query}"`,
            url: `https://search.google.com/search?q=${encodeURIComponent(query)}`,
            isSearch: true,
        }]
        : [];

    const filteredTabs = [
        ...(query ? searchTabs(tabs, query) : tabs.filter(tab => !tab.active)),
        ...searchTab
    ];
    const itemRefs = useRef([]);

    useEffect(() => {
        const ref = itemRefs.current[selectedIndex];
        ref?.scrollIntoView({ block: "nearest", behavior: "auto" });
    }, [selectedIndex, filteredTabs]);

    return (
        <div style={styles.container}>
            <Search
                query={query}
                setQuery={setQuery}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                filteredTabs={filteredTabs}
            />

            <ul style={styles.list}>
                {filteredTabs.map((tab, i) => (
                    <Tab
                        key={tab.id}
                        tab={tab}
                        selected={i === selectedIndex}
                        ref={(el) => (itemRefs.current[i] = el)}
                    />
                ))}
            </ul>
        </div>
    );
}

