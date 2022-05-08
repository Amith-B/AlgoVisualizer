import styles from "./Header.module.css";
import { createSignal, createEffect } from "solid-js";
import Modal from "./../Modal/Modal";
import controls from "../../store/createControl";
import githubLogo from "../../assets/github.svg";

function Header() {
  const [showModal, setShowModal] = createSignal(false);
  const { setPlaying, themeTextColor } = controls;

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
        <div class={styles.BtnGrp}>
          <a
            href="https://github.com/Amith-B/AlgoVisualizer"
            target="_blank"
            style={{ display: "flex" }}
            title="Amith.B Github"
          >
            <img
              alt="github"
              src={githubLogo}
              classList={{
                [styles.GitHubLink]: true,
                [styles.GitHubLinkInvert]: themeTextColor() === "white",
              }}
            />
          </a>
          <button
            class="controls theme-text__color"
            onClick={handleModalToggle}
            title="Settings"
          >
            <span class="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
