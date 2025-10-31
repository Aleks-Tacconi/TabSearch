const styles = {
    bottomPannel: {
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(40, 40, 40, 0.85)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "8px 0px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: "12px",
        color: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999999999,
        marginTop: "8px",
        marginLeft: "-16px",
        marginRight: "-16px",
    },
    keybind: {
        display: "flex",
        gap: "12px",
        alignItems: "center",
        marginRight: "12px",
        marginLeft: "8px",
        marginBottom: "3px",
    },
    key: {
        background: "rgba(255, 255, 255, 0.08)",
        padding: "2px 6px",
        borderRadius: "4px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        marginLeft: "-2px",
    }
};

//  <div style={styles.keybind}>
//      <span>Go to tab</span>
//      <div style={styles.key}>⤶</div>
//  </div>
export default function BottomPannel() {
    return (
        <div style={styles.bottomPannel}>
            <div style={styles.keybind}>
                <span>Navigate tabs</span>
                <div style={styles.key}>⇅</div>
            </div>
            <div style={styles.keybind}>
                <span>Close popup</span>
                <div style={styles.key}>Esc</div>
            </div>
        </div>
    );
}

