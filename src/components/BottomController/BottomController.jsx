import styles from "./BottomController.module.css";
import { createEffect, createMemo, Switch, Show } from "solid-js";
import controls from "../../store/createControl";
import { shuffleArray } from "../../utils/arrayUtil";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function BottomController({ triggerBottomSheetOpen }) {
  const {
    selectedAlgo,
    algoList,
    setShuffledArr,
    playing,
    setPlaying,
    currentStep,
    setCurrentStep,
    totalStep,
  } = controls;

  createEffect(() => {
    if (selectedAlgo()) {
      setShuffledArr(
        shuffleArray(Array.from(Array(getRndInteger(10, 60)).keys()))
      );
    }
  });

  const handlePlayToggle = () => {
    setPlaying((playing) => !playing);
  };

  const handleReset = () => {
    setPlaying(false);
    setCurrentStep(-1);
  };

  const handleShuffle = () => {
    setShuffledArr(
      shuffleArray(Array.from(Array(getRndInteger(10, 60)).keys()))
    );
  };

  const getAlgorithmName = createMemo(() => {
    const selectedAlgorithm =
      algoList().find((algo) => algo.algoFunctionName === selectedAlgo()) || {};
    return selectedAlgorithm.algoName;
  });

  return (
    <section class={styles.BottomBar}>
      <div class={styles.AlgoName} onClick={triggerBottomSheetOpen}>
        {selectedAlgo() ? getAlgorithmName() : "Please Select Algorithm"}
      </div>

      <Show when={currentStep() !== totalStep() - 1 && selectedAlgo()}>
        <button onClick={handlePlayToggle}>
          {playing() ? "Pause" : "Start"}
        </button>
      </Show>
      <Show when={selectedAlgo() && currentStep() !== -1}>
        <button onClick={handleReset}>Reset</button>
      </Show>
      <Show when={selectedAlgo() && !playing() && currentStep() === -1}>
        <button onClick={handleShuffle}>Shuffle</button>
      </Show>
    </section>
  );
}

export default BottomController;
