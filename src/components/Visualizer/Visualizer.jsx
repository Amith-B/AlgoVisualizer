import styles from "./Visualizer.module.css";
import { createSignal, createEffect, Index, createMemo } from "solid-js";
import { generateHslaColors } from "../../utils/colorUtil";

const arrList = [3, 1, 2, 5, 4, 10, 9, 6, 7, 8, 0, 11, 12, 14, 13];
const swapList = [
  [0, 1],
  [1, 2],
  [3, 4],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [13, 14],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [7, 8],
  [6, 7],
  [5, 6],
  [4, 5],
  [3, 4],
  [2, 3],
  [1, 2],
  [0, 1],
];

// const data = [
//   [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
//   [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10],
//   [0, 1, 8, 7, 6, 5, 4, 3, 2, 9, 10],
//   [0, 1, 2, 7, 6, 5, 4, 3, 8, 9, 10],
//   [0, 1, 2, 3, 6, 5, 4, 7, 8, 9, 10],
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// ];

function Visualizer() {
  const [arr, setArr] = createSignal(arrList);
  const [colorList, setColorList] = createSignal([]);
  const [visualizerSize, setVisualizerSize] = createSignal({
    width: 0,
    height: 0,
  });

  // below code to be remove
  const [itemIndex, setItemIndex] = createSignal(0);
  const interval = setInterval(() => {
    setItemIndex(itemIndex() + 1);

    if (itemIndex() + 1 >= swapList.length) {
      clearInterval(interval);
    }
  }, 500);

  createEffect(() => {
    setArr((oldArr) => {
      const newArr = [...oldArr];
      [newArr[swapList[itemIndex()][0]], newArr[swapList[itemIndex()][1]]] = [
        newArr[swapList[itemIndex()][1]],
        newArr[swapList[itemIndex()][0]],
      ];
      return newArr;
    });
  });

  // above code to be remove
  createEffect(() => {
    setColorList(getColorList());
  });

  createEffect(() => {
    console.log("colorList", colorList());
  });

  let vsRef;
  createEffect(() => {
    const { width, height } = vsRef.getBoundingClientRect();

    setVisualizerSize({
      width: width - 2,
      height: height - 2,
    });
  });

  const getColorList = createMemo(() => {
    return generateHslaColors(50, 40, 1.0, arr().length);
  });

  const getBarWidth = createMemo(() => {
    return visualizerSize().width / arr().length;
  });

  return (
    <section class={styles.VisualizerContainer}>
      <div class={styles.Visualizer} ref={vsRef}>
        <Index each={arr()}>
          {(item, i) => (
            <div
              class={styles.ArrItem}
              style={{
                background: colorList()[i],
                transform: `translate(${
                  (visualizerSize().width / arr().length) * item()
                }px, 0)`,
                width: `${getBarWidth()}px`,
                height: `${
                  (visualizerSize().height / arr().length) * (i + 1)
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
