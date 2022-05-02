import styles from "./BottomController.module.css";
import { createEffect } from "solid-js";
import controls from "../../store/createControl";
import { shuffleArray } from "../../utils/arrayUtil";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function BottomController({ triggerBottomSheetOpen }) {
  const { selectedAlgo, setShuffledArr, playing, setPlaying, setCurrentStep } =
    controls;

  createEffect(() => {
    if (selectedAlgo()) {
      setShuffledArr(
        shuffleArray(Array.from(Array(getRndInteger(10, 60)).keys()))
      );
      setCurrentStep(-1);
    }
  });

  const handlePlayToggle = (event) => {
    event.stopPropagation();
    setPlaying((playing) => !playing);
  };

  return (
    <section class={styles.BottomBar} onClick={triggerBottomSheetOpen}>
      <button onClick={handlePlayToggle}>
        {playing() ? "Pause" : "Start"}
      </button>
    </section>
  );
}

export default BottomController;
