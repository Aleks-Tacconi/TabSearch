import styles from "./BottomPannelStyles";

export default function BottomPannel() {
  return (
    <div style={styles.bottomPannel}>
      <div style={styles.keybind}>
        <span>Next tab</span>
        <div style={styles.key}>⬇</div>
      </div>
      <div style={styles.keybind}>
        <span>Previous tab</span>
        <div style={styles.key}>⬆</div>
      </div>
      <div style={styles.keybind}>
        <span>Close popup</span>
        <div style={styles.key}>Esc</div>
      </div>
    </div>
  );
}
