import { useState } from "react";

export default function Popup() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div
            style={{
                background: "white",
                border: "1px solid black",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                padding: "20px 30px",
                textAlign: "center",
                fontFamily: "sans-serif",
                cursor: "pointer",
            }}
            onClick={() => setVisible(false)}
        >
            <h3 style={{ margin: "0 0 10px 0" }}>Hello!</h3>
            <p style={{ margin: 0 }}>Click anywhere to close</p>
        </div>
    );
}

