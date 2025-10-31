import { useState, useEffect, useRef } from "react";
import Tab from "./Tab";
import Search from "./Search";

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
            url: `https://search.brave.com/search?q=${encodeURIComponent(query)}`,
            isSearch: true,
        }]
        : [];

    const filteredTabs = [
        ...tabs
            .filter((tab) => !tab.active)
            .filter((tab) =>
                tab.title?.toLowerCase().includes(query.toLowerCase()) ||
                tab.url?.toLowerCase().includes(query.toLowerCase())
            ),
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

