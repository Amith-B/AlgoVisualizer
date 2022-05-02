import styles from "./Main.module.css";
import Visualizer from "./Visualizer/Visualizer";
import BottomController from "./BottomController/BottomController";
import BottomSheet from "./BottomSheet/BottomSheet";
import { createSignal } from "solid-js";

function Main() {
  const [bottomSheetOpen, setBottomSheetOpen] = createSignal(false);

  const handleBottomSheetOpen = (open) => {
    setBottomSheetOpen(open);
  };

  return (
    <main class={styles.Main}>
      <header class={styles.Header}>
        <h3>AlgoVisualizer</h3>
      </header>
      <Visualizer />
      <BottomController
        triggerBottomSheetOpen={() => handleBottomSheetOpen(true)}
      />
      <BottomSheet
        open={bottomSheetOpen()}
        triggerClose={() => handleBottomSheetOpen(false)}
      />
    </main>
  );
}

export default Main;
