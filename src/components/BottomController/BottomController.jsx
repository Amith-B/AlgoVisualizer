import styles from "./BottomController.module.css";
import { createMemo, Show } from "solid-js";
import controls from "../../store/createControl";
import { shuffleArray } from "../../utils/arrayUtil";

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
    arraySize,
  } = controls;

  const handlePlayToggle = () => {
    setPlaying((playing) => !playing);
  };

  const handleReset = () => {
    setPlaying(false);
    setCurrentStep(-1);
  };

  const handleShuffle = () => {
    setShuffledArr(shuffleArray(Array.from(Array(arraySize()).keys())));
  };

  const getAlgorithmName = createMemo(() => {
    const selectedAlgorithm =
      algoList().find((algo) => algo.algoFunctionName === selectedAlgo()) || {};
    return selectedAlgorithm.algoName;
  });

  const handleSlideClick = (event) => {
    const selectedValue = Number(event.target.value);
    setCurrentStep(selectedValue);
  };

  const getStepPercent = () => {
    return `${100 - (currentStep() / totalStep()) * 100}%`;
  };

  return (
    <section class={styles.BottomBar}>
      <Show when={selectedAlgo()}>
        <input
          classList={{ [styles.Slider]: true, "slider-range": true }}
          type="range"
          min={0}
          max={totalStep() - 1}
          style={{ "background-position": getStepPercent() }}
          value={currentStep()}
          onInput={handleSlideClick}
        />
      </Show>
      <div
        classList={{ [styles.AlgoName]: true, "theme-text__color": true }}
        onClick={triggerBottomSheetOpen}
      >
        {selectedAlgo() ? getAlgorithmName() : "Please Select Algorithm"}
      </div>
      <Show when={selectedAlgo() && totalStep() !== 0}>
        <div class="theme-text__color">
          {currentStep() + 1}/{totalStep()}
        </div>
      </Show>

      <Show when={currentStep() !== totalStep() - 1 && selectedAlgo()}>
        <button
          onClick={handlePlayToggle}
          class="controls theme-text__color"
          title={playing() ? "Pause" : "Play"}
        >
          {playing() ? (
            <span class="material-symbols-outlined">pause_circle</span>
          ) : (
            <span class="material-symbols-outlined">play_circle</span>
          )}
        </button>
      </Show>
      <Show when={selectedAlgo() && currentStep() !== -1}>
        <button
          onClick={handleReset}
          class="controls theme-text__color"
          title="Reset"
        >
          <span class="material-symbols-outlined">restart_alt</span>
        </button>
      </Show>
      <Show when={selectedAlgo() && !playing() && currentStep() === -1}>
        <button
          onClick={handleShuffle}
          class="controls theme-text__color"
          title="Shuffle"
        >
          <span class="material-symbols-outlined">shuffle</span>
        </button>
      </Show>
    </section>
  );
}

export default BottomController;
