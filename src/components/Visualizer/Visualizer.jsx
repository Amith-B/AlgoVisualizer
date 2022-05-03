import styles from "./Visualizer.module.css";
import { createSignal, Index, createMemo, onMount, onCleanup, createEffect } from "solid-js";
import controls from "../../store/createControl";

function Visualizer() {
  const { selectedAlgo, stepWiseArray, currentStep, shuffledArr, colorList, intervalMs } =
    controls;
  const [visualizerSize, setVisualizerSize] = createSignal({
    width: 0,
    height: 0,
  });

  let vsRef;

  const getArrayLength = createMemo(() => {
    return shuffledArr().length;
  });

  const getBarWidth = createMemo(() => {
    return visualizerSize().width / getArrayLength();
  });

  onMount(() => {
    updateVisualizerSize();

    window.addEventListener("resize", updateVisualizerSize);

    onCleanup(() => window.removeEventListener("resize", updateVisualizerSize));
  });
  
  createEffect(() => {
    if(selectedAlgo()) {
      updateVisualizerSize();
    }
  });

  const updateVisualizerSize = () => {
    const { width, height } = vsRef.getBoundingClientRect();

    setVisualizerSize({
      width: width - 2,
      height: height - 2,
    });
  };

  return (
    <section class={styles.VisualizerContainer}>
      <div
        class={styles.Visualizer}
        ref={vsRef}
        style={`--duration: ${intervalMs()}ms`}
      >
        <Index
          each={
            currentStep() >= 0 ? stepWiseArray()[currentStep()] : shuffledArr()
          }
          fallback={
            <div class={styles.EmptySelection}>
              Please select the algorithm by clicking Bottom Bar
            </div>
          }
        >
          {(item, i) => (
            <div
              class={styles.ArrItem}
              style={{
                background: colorList()[i],
                transform: `translate(${
                  (visualizerSize().width / getArrayLength()) * item()
                }px, 0)`,
                width: `${getBarWidth()}px`,
                height: `${
                  (visualizerSize().height / getArrayLength()) * (i + 1)
                }px`,
              }}
            >
              <svg viewBox="0 0 56 18">
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  style="fill: white;"
                >
                  {i + 1}
                </text>
              </svg>
            </div>
          )}
        </Index>
      </div>
    </section>
  );
}

export default Visualizer;
