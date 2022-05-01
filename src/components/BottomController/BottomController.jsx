import styles from "./BottomController.module.css";

function BottomController({ triggerBottomSheetOpen }) {
  return (
    <section class={styles.BottomBar} onClick={triggerBottomSheetOpen}>
      footer
    </section>
  );
}

export default BottomController;
