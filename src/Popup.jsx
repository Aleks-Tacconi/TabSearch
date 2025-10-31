import { useState, useEffect } from "react";
import TabList from "./Popup/TabList.jsx";

const styles = {
    popupStyle: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        height: "80vh",
        display: "flex",
        flexDirection: "row",

        background: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",

        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "12px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        overflow: "hidden",
        fontFamily: "system-ui, sans-serif",
    }
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
        </div>
    );
}

