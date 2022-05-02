import styles from "./Main.module.css";
import Visualizer from "./Visualizer/Visualizer";
import BottomController from "./BottomController/BottomController";
import BottomSheet from "./BottomSheet/BottomSheet";
import { createSignal } from "solid-js";
import Header from "./Header/Header";
import controls from "../store/createControl";

function Main() {
  const [bottomSheetOpen, setBottomSheetOpen] = createSignal(false);
  const { setPlaying } = controls;

  const handleBottomSheetOpen = (open) => {
    setBottomSheetOpen(open);
    if (open) {
      setPlaying(false);
    }
  };

  return (
    <main class={styles.Main}>
      <Header />
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
