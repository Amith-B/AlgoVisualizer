import "./Modal.css";
import controls from "../../store/createControl";

function Modal(props) {
  const {
    intervalMs,
    setIntervalMs,
    arraySize,
    setArraySize,
    themeColor,
    setThemeColor,
  } = controls;

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
          <h3>Settings</h3>
          <button class="controls" onClick={props.triggerClose}>
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
                max="2000"
                class="slider-range"
                id="intervalms"
                name="interval"
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
                max="100"
                value={arraySize()}
                class="slider-range"
                name="arr-size"
                onChange={handleArrSizeChange}
              />
              <span>100</span>
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
