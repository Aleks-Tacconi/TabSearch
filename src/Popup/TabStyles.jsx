const styles = {
  li: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    cursor: "pointer",
    borderRadius: "10px",
    margin: "4px 8px",
    color: "rgba(255,255,255,0.9)",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    border: "1px solid transparent",
  },

  selected: {
    border: "1px solid rgba(255, 255, 255, 0.06)",
    background: "rgba(255, 255, 255, 0.05)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
  },

  icon: {
    width: "28px",
    height: "28px",
    marginRight: "12px",
    borderRadius: "6px",
    flexShrink: 0,
    objectFit: "contain",
    background: "rgba(255,255,255,0.08)",
    padding: "4px",
  },

  textContainer: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    gap: "2px",
  },

  title: {
    fontWeight: 500,
    color: "rgba(255,255,255,0.95)",
    fontSize: "0.95rem",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    lineHeight: 1.3,
  },

  url: {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.55)",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    lineHeight: 1.2,
  },
};

export default styles;
