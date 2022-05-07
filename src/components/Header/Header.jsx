import styles from "./Header.module.css";
import { createSignal, createEffect } from "solid-js";
import Modal from "./../Modal/Modal";
import controls from "../../store/createControl";

function Header() {
  const [showModal, setShowModal] = createSignal(false);
  const { setPlaying } = controls;

  const handleModalToggle = () => {
    setShowModal((show) => !show);
  };

  createEffect(() => {
    if (showModal()) {
      setPlaying(false);
    }
  });

  return (
    <>
      <Modal open={showModal()} triggerClose={handleModalToggle} />
      <header class={styles.Header}>
        <h3 class="theme-text__color">AlgoVisualizer</h3>
        <button
          class="controls theme-text__color"
          onClick={handleModalToggle}
          title="Settings"
        >
          <span class="material-symbols-outlined">settings</span>
        </button>
      </header>
    </>
  );
}

export default Header;
