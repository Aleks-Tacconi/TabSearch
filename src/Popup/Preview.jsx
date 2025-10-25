import { useState, useEffect } from "react";

const styles = {
    preview: {
        width: "60vw",
        height: "50vh",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#f7f7f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        margin: "8px",
    },
    img: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        borderRadius: "4px",
    },
    placeholder: {
        color: "#666",
        fontSize: "0.9rem",
        fontStyle: "italic",
    },
};

export default function Preview({ tab }) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!tab || !tab.id) {
            setImage(null);
            return;
        };

        chrome.runtime.sendMessage(
            { action: "get_preview", tabId: tab.id },
            (res) => {
                setImage(res?.preview || null);
                console.log("Preview loaded:", res);
            }
        );
    }, [tab]);

    return (
        <div style={styles.preview}>
            {image ? (
                <img src={image} style={styles.img} />
            ) : (
                <span style={styles.placeholder}>No preview available</span>
            )}
        </div>
    );
}

