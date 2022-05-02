import styles from "./Visualizer.module.css";
import { createSignal, createEffect, Index, createMemo } from "solid-js";
import controls from "../../store/createControl";

function Visualizer() {
  const { partialSortedArr, colorList } = controls;
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
      <div class={styles.Visualizer} ref={vsRef}>
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
              {i + 1}
            </div>
          )}
        </Index>
      </div>
    </section>
  );
}

export default Visualizer;
