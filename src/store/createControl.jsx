import { createSignal, createRoot, createEffect, createMemo } from "solid-js";
import algos from "../algorithms";
import { getAlgoList } from "../utils/stringUtil";
import { generateHslaColors } from "../utils/colorUtil";
import { getStepWiseArray } from "../utils/arrayUtil";

function createControl() {
  const [algoList] = createSignal(getAlgoList(algos));
  const [totalStep, setTotalStep] = createSignal(0);
  const [currentStep, setCurrentStep] = createSignal(0);
  const [intervalMs, setIntervalMs] = createSignal(100);
  const [playing, setPlaying] = createSignal(false);
  const [shuffledArr, setShuffledArr] = createSignal([]);
  const [stepWiseArray, setStepWiseArray] = createSignal([]);
  const [selectedAlgo, setSelectedAlgo] = createSignal("");
  const [colorList, setColorList] = createSignal([]);

  createEffect(() => {
    const algoFunction = algos[selectedAlgo()];
    const arr = shuffledArr();

    if (algoFunction && arr.length) {
      const swapData = algoFunction(arr);
      const stepWiseArr = getStepWiseArray(arr, swapData);
      setStepWiseArray(stepWiseArr);
      setCurrentStep(-1);
      setTotalStep(stepWiseArr.length);
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

    stepWiseArray,
    setStepWiseArray,

    selectedAlgo,
    setSelectedAlgo,

    colorList,
    setColorList,
  };
}

export default createRoot(createControl);
