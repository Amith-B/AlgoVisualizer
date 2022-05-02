import { For } from "solid-js";
import controls from "../../store/createControl";
import "./BottomSheet.css";

function BottomSheet(props) {
  const { algoList, selectedAlgo, setSelectedAlgo } = controls;
  return (
    <section class="bottom-sheet__container">
      <div
        classList={{
          overlay: true,
          overlay__open: props.open,
        }}
        onClick={props.triggerClose}
      ></div>
      <div
        classList={{
          "bottom-sheet": true,
          "blur-modal": true,
          "bottom-sheet__open": props.open,
        }}
      >
        <ul class="algo-list">
          <For each={algoList()}>
            {(algo) => (
              <li
                classList={{
                  selected: selectedAlgo() === algo.algoFunctionName,
                }}
                onClick={() => {
                  setSelectedAlgo(algo.algoFunctionName);
                  props.triggerClose();
                }}
              >
                {algo.algoName}
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
}

export default BottomSheet;
