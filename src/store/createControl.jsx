import { createSignal, createRoot, createEffect, createMemo } from "solid-js";
import algos from "../algorithms";
import { getAlgoList } from "../utils/stringUtil";
import { generateHslaColors } from "../utils/colorUtil";

function createControl() {
  const [algoList] = createSignal(getAlgoList(algos));
  const [totalStep, setTotalStep] = createSignal(0);
  const [currentStep, setCurrentStep] = createSignal(0);
  const [intervalMs, setIntervalMs] = createSignal(500);
  const [playing, setPlaying] = createSignal(false);
  const [shuffledArr, setShuffledArr] = createSignal([]);
  const [partialSortedArr, setPartialSortedArr] = createSignal([]);
  const [swapList, setSwapList] = createSignal([]);
  const [selectedAlgo, setSelectedAlgo] = createSignal("");
  const [colorList, setColorList] = createSignal([]);

  createEffect(() => {
    const algoFunction = algos[selectedAlgo()];
    const arr = shuffledArr();

    if (algoFunction && arr.length) {
      const swapData = algoFunction(arr);
      console.log(
        "swapData",
        arr.map((d) => d + 1),
        swapData
      );
      setSwapList(swapData);
      setCurrentStep(0);
      setTotalStep(swapData.length);
      setPartialSortedArr(arr);
      setPlaying(false);
      setColorList(getColorList(arr.length));
    }
  });

  const getColorList = (arrLength) => {
    return generateHslaColors(50, 50, 1.0, arrLength);
  };

  return {
    algoList,

    totalStep,
    setTotalStep,

    currentStep,
    setCurrentStep,

    intervalMs,
    setIntervalMs,

    playing,
    setPlaying,

    shuffledArr,
    setShuffledArr,

    partialSortedArr,
    setPartialSortedArr,

    swapList,
    setSwapList,

    selectedAlgo,
    setSelectedAlgo,

    colorList,
    setColorList,
  };
}

export default createRoot(createControl);
