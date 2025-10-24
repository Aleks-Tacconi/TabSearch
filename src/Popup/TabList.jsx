import { useState, useEffect, useRef } from "react";
import Tab from "./Tab";
import Search from "./Search";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        overflowY: "auto",
        flex: 1,
    },
};

export default function TabList({ tabs }) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredTabs = tabs.filter((tab) =>
        tab.title?.toLowerCase().includes(query.toLowerCase())
    );

    const itemRefs = useRef([]);

    useEffect(() => {
        const ref = itemRefs.current[selectedIndex];
        ref?.scrollIntoView({ block: "nearest" });
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

