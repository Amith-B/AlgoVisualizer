import { createSignal, createRoot } from "solid-js";
import algos from "../algorithms";
import { getAlgoList } from "../utils/stringUtil";

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
  };
}

export default createRoot(createControl);
