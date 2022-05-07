import "./Modal.css";
import controls from "../../store/createControl";
import { createSignal } from "solid-js";
import { createEffect } from "solid-js";

function Modal(props) {
  const {
    intervalMs,
    setIntervalMs,
    arraySize,
    setArraySize,
    themeColor,
    setThemeColor,
  } = controls;

  const [itrMs, setItrMs] = createSignal(0);
  const [arrSize, setArrSize] = createSignal(0);

  createEffect(() => {
    setItrMs(intervalMs());
  });

  createEffect(() => {
    setArrSize(arraySize());
  });

  const handleIntervalInput = (event) => {
    const selectedValue = Number(event.target.value);
    setItrMs(selectedValue);
  };

  const handleArrSizeInput = (event) => {
    const selectedValue = Number(event.target.value);
    setArrSize(selectedValue);
  };

  const handleIntervalChange = (event) => {
    const selectedValue = Number(event.target.value);
    setIntervalMs(selectedValue);
  };

  const handleArrSizeChange = (event) => {
    const selectedValue = Number(event.target.value);
    setArraySize(selectedValue);
  };

  const handleColorChange = (event) => {
    setThemeColor(event.target.value);
  };

  const getIntervalPercent = () => {
    return `${100 - ((itrMs() - 10) / 1990) * 100}%`;
  };

  const getArrSizePercent = () => {
    return `${100 - ((arrSize() - 10) / 190) * 100}%`;
  };

  return (
    <>
      <div
        classList={{
          overlay: true,
          overlay__open: props.open,
        }}
        onClick={props.triggerClose}
      ></div>
      <div class="modal blur-modal">
        <header class="modal-header">
          <h3 class="theme-text__color">Settings</h3>
          <button
            class="controls theme-text__color"
            onClick={props.triggerClose}
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </header>
        <section class="modal-body">
          <div class="field">
            <label for="intervalms">
              Interval Milliseconds ( {intervalMs()} )
            </label>
            <div class="input-container">
              <span>10</span>
              <input
                type="range"
                min="10"
                value={intervalMs()}
                style={{ "background-position": getIntervalPercent() }}
                max="2000"
                class="slider-range"
                id="intervalms"
                name="interval"
                onInput={handleIntervalInput}
                onChange={handleIntervalChange}
              />
              <span>2000</span>
            </div>
          </div>
          <div class="field">
            <label for="arrsize">Array Size ( {arraySize()} )</label>
            <div class="input-container">
              <span>10</span>
              <input
                id="arrsize"
                type="range"
                min="10"
                max="200"
                style={{ "background-position": getArrSizePercent() }}
                value={arraySize()}
                class="slider-range"
                name="arr-size"
                onInput={handleArrSizeInput}
                onChange={handleArrSizeChange}
              />
              <span>200</span>
            </div>
          </div>
          <div class="field">
            <label for="themecolor">Theme Color ( {themeColor()} )</label>
            <div class="input-container">
              <input
                type="color"
                id="themecolor"
                value={themeColor()}
                name="theme-color"
                onChange={handleColorChange}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Modal;
