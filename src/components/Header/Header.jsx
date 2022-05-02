import styles from "./Header.module.css";

function Header() {
  return (
    <header class={styles.Header}>
      <h3>AlgoVisualizer</h3>
      <button class="controls">
        <span class="material-symbols-outlined">settings</span>
      </button>
    </header>
  );
}

export default Header;
