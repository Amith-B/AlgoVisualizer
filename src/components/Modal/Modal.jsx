import "./Modal.css";
import controls from "../../store/createControl";

function Modal(props) {
  const { intervalMs, setIntervalMs, arraySize, setArraySize } = controls;

  const handleIntervalChange = (event) => {
    const selectedValue = Number(event.target.value);
    setIntervalMs(selectedValue);
  };

  const handleArrSizeChange = (event) => {
    const selectedValue = Number(event.target.value);
    setArraySize(selectedValue);
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
          <fieldset>
            <legend>
              <pre> Interval Milliseconds({intervalMs()}) </pre>
            </legend>
            <div class="range-container">
              <span>10</span>
              <input
                type="range"
                min="10"
                value={intervalMs()}
                max="2000"
                id="slider-range"
                name="interval"
                onChange={handleIntervalChange}
              />
              <span>2000</span>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <pre> Array Size({arraySize()}) </pre>
            </legend>
            <div class="range-container">
              <span>10</span>
              <input
                type="range"
                min="10"
                max="100"
                value={arraySize()}
                id="slider-range"
                name="arr-size"
                onChange={handleArrSizeChange}
              />
              <span>100</span>
            </div>
          </fieldset>
        </section>
      </div>
    </>
  );
}

export default Modal;
