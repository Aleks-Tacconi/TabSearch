import { useState, useEffect } from "react";
import TabList from "./Popup/TabList.jsx"
import Preview from "./Popup/Preview.jsx"

const styles = {
    popupStyle: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontFamily: "sans-serif",
        width: "80vw",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
};

export default function Popup() {
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        chrome.runtime.sendMessage({ action: "get_tabs" }, (tabs) => {
            setTabs(tabs);
        });
    }, []);

    return (
        <div style={styles.popupStyle}>
            <TabList tabs={tabs} />
            <Preview />
        </div>
    );
}

