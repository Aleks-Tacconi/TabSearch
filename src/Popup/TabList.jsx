import { useState } from "react";
import Tab from "./Tab";
import Search from "./Search"

export default function TabList({ tabs }) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredTabs = tabs.filter((tab) =>
        tab.title?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <Search query={query} setQuery={setQuery} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} filteredTabs={filteredTabs} />

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {filteredTabs.map((tab, i) => (
                    <Tab
                        key={tab.id}
                        tab={tab}
                        selected={i === selectedIndex}
                    />
                ))}
            </ul>
        </div>
    );
}

