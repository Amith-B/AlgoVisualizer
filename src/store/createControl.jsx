import { createSignal, createRoot, createEffect, untrack } from "solid-js";
import algos from "../algorithms";
import { getAlgoList } from "../utils/stringUtil";
import { generateHslaColors, getBrightess } from "../utils/colorUtil";
import { getStepWiseArray } from "../utils/arrayUtil";
import { shuffleArray } from "../utils/arrayUtil";
import { createStore } from "solid-js/store";

function createLocalStore(initState) {
  const [state, setState] = createStore(initState);
  if (localStorage.settings) setState(JSON.parse(localStorage.settings));
  createEffect(() => (localStorage.settings = JSON.stringify(state)));
  return [state, setState];
}

function createControl() {
  const [state, setState] = createLocalStore({
    intervalMs: 200,
    arraySize: 40,
    themeColor: "#446b9e",
  });

  const [algoList] = createSignal(getAlgoList(algos));
  const [totalStep, setTotalStep] = createSignal(0);
  const [currentStep, setCurrentStep] = createSignal(0);
  const [intervalMs, setIntervalMs] = createSignal(state.intervalMs);
  const [arraySize, setArraySize] = createSignal(state.arraySize);
  const [playing, setPlaying] = createSignal(false);
  const [shuffledArr, setShuffledArr] = createSignal([]);
  const [stepWiseArray, setStepWiseArray] = createSignal([]);
  const [selectedAlgo, setSelectedAlgo] = createSignal("");
  const [colorList, setColorList] = createSignal([]);
  const [themeTextColor, setThemeTextColor] = createSignal("white");

  const [themeColor, setThemeColor] = createSignal(state.themeColor);

  const [timmerRef, setTimmerRef] = createSignal(undefined);

  createEffect(() => {
    setState({
      intervalMs: intervalMs(),
      arraySize: arraySize(),
      themeColor: themeColor(),
    });
  });

  createEffect(() => {
    const brightness = getBrightess(themeColor());
    setThemeTextColor(brightness < 128 ? "white" : "black");
  });

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

  createEffect(() => {
    if (selectedAlgo() && !shuffledArr().length) {
      setShuffledArr(shuffleArray(Array.from(Array(arraySize()).keys())));
    }
  });

  createEffect(() => {
    if (arraySize()) {
      setShuffledArr(shuffleArray(Array.from(Array(arraySize()).keys())));
    }
  });

  createEffect(() => {
    const isPlaying = playing();
    if (isPlaying) {
      untrack(startTimmer);
    } else {
      untrack(clearTimmer);
    }
  });

  const startTimmer = () => {
    if (timmerRef()) {
      clearInterval(timmerRef());
    }
    const tRef = setInterval(() => {
      const currentIndex = currentStep();
      const totalSteps = totalStep();

      if (currentIndex === totalSteps - 1) {
        clearInterval(timmerRef());
        setPlaying(false);
        return;
      }

      setCurrentStep(currentIndex + 1);
    }, intervalMs());
    setTimmerRef(tRef);
  };

  const clearTimmer = () => {
    if (timmerRef()) {
      clearInterval(timmerRef());
      setTimmerRef(undefined);
    }
  };

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

    arraySize,
    setArraySize,

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

    themeColor,
    setThemeColor,

    themeTextColor,
    setThemeTextColor,
  };
}

export default createRoot(createControl);
