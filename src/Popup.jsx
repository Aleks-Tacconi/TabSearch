import { useState, useEffect } from "react";
import TabList from "./Popup/TabList.jsx"

const popupStyle = {
    background: "white",
    border: "1px solid black",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    padding: "20px 30px",
    textAlign: "center",
    fontFamily: "sans-serif",
    cursor: "pointer"
};


export default function Popup() {
    const [visible, setVisible] = useState(true);
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        chrome.runtime.sendMessage({ action: "get_tabs" }, (tabs) => {
            setTabs(tabs);
        });
    }, []);

    if (!visible) return null;

    return (
        <div style={popupStyle} onClick={() => setVisible(false)}>
            <h3>Open Tabs</h3>
            <TabList tabs={tabs}></TabList>
            <p>Click anywhere to close</p>
        </div>
    );
}

