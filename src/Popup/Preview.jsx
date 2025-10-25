import { useState, useEffect } from "react";

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

    const previewStyle = {
        flex: 1,
        borderRadius: '4px',
        overflow: 'hidden',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "40vw",
    };

    return (
        <div style={previewStyle}>
            {image ? (
                <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
                <span>No preview available</span>
            )}
        </div>
    );
}

