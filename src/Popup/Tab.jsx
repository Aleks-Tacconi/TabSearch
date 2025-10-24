const styles = {
    li: {
        display: "flex",
        alignItems: "center",
        padding: "6px 10px",
        cursor: "pointer",
    },
    icon: {
        width: "24px",
        height: "24px",
        marginRight: "10px",
        flexShrink: 0,
        borderRadius: "4px",
    },
    fallbackIcon: {
        width: "24px",
        height: "24px",
        marginRight: "10px",
        flexShrink: 0,
        background: "#ccc",
        borderRadius: "4px",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
    },
    title: {
        fontWeight: "bold",
    },
    url: {
        fontSize: "0.85em",
        color: "blue",
    },
};

export default function Tab({ tab, selected }) {
    return (
        <li style={{
            ...styles.li,
            backgroundColor: selected ? "#ddd" : "transparent",
        }}>
            {tab.favIconUrl ? (
                <img src={tab.favIconUrl} alt="icon" style={styles.icon} />
            ) : (
                <div style={styles.fallbackIcon} />
            )}

            <div style={styles.textContainer}>
                <span style={styles.title}>{tab.title || "No title"}</span>
                <span style={styles.url}>{tab.url}</span>
            </div>
        </li>
    );
}
