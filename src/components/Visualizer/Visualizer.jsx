import styles from "./Visualizer.module.css";
import { createSignal, createEffect, Index, createMemo } from "solid-js";
import controls from "../../store/createControl";

function Visualizer() {
  const { partialSortedArr, colorList, intervalMs } = controls;
  const [visualizerSize, setVisualizerSize] = createSignal({
    width: 0,
    height: 0,
  });

  let vsRef;
  createEffect(() => {
    const { width, height } = vsRef.getBoundingClientRect();

    setVisualizerSize({
      width: width - 2,
      height: height - 2,
    });
  });

  const getBarWidth = createMemo(() => {
    return visualizerSize().width / partialSortedArr().length;
  });

  return (
    <section class={styles.VisualizerContainer}>
      <div
        class={styles.Visualizer}
        ref={vsRef}
        style={`--duration: ${intervalMs()}ms`}
      >
        <Index
          each={partialSortedArr()}
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
                  (visualizerSize().width / partialSortedArr().length) * item()
                }px, 0)`,
                width: `${getBarWidth()}px`,
                height: `${
                  (visualizerSize().height / partialSortedArr().length) *
                  (i + 1)
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
