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

  const getStepCompletionPercentage = () => {
    const completed = currentStep() + 1;
    const total = totalStep();
    const stepCompletionPercentage = (completed / total) * 100;
    return stepCompletionPercentage;
  };

  const handleSlideClick = (event) => {
    const selectedValue = Number(event.target.value);
    setCurrentStep(selectedValue);
  };

  return (
    <section class={styles.BottomBar}>
      <Show when={selectedAlgo()}>
        <input
          class={styles.Slider}
          style={{
            background: `linear-gradient(to right, #ffbc42 0%, #ffbc42 ${getStepCompletionPercentage()}%, white ${getStepCompletionPercentage()}%, white 100%)`,
          }}
          type="range"
          min={0}
          max={totalStep() - 1}
          value={currentStep()}
          onInput={handleSlideClick}
          id="slider-range"
        />
      </Show>
      <div class={styles.AlgoName} onClick={triggerBottomSheetOpen}>
        {selectedAlgo() ? getAlgorithmName() : "Please Select Algorithm"}
      </div>
      <Show when={selectedAlgo() && totalStep() !== 0}>
        <div>
          {currentStep() + 1}/{totalStep()}
        </div>
      </Show>

      <Show when={currentStep() !== totalStep() - 1 && selectedAlgo()}>
        <button onClick={handlePlayToggle} class={styles.Controls}>
          {playing() ? (
            <span class="material-symbols-outlined">pause_circle</span>
          ) : (
            <span class="material-symbols-outlined">play_circle</span>
          )}
        </button>
      </Show>
      <Show when={selectedAlgo() && currentStep() !== -1}>
        <button onClick={handleReset} class={styles.Controls}>
          <span class="material-symbols-outlined">restart_alt</span>
        </button>
      </Show>
      <Show when={selectedAlgo() && !playing() && currentStep() === -1}>
        <button onClick={handleShuffle} class={styles.Controls}>
          <span class="material-symbols-outlined">shuffle</span>
        </button>
      </Show>
    </section>
  );
}

export default BottomController;
