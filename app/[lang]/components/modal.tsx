import React from "react";
import styles from "@/app/page.module.css";

interface ModalProps {
  showModal: boolean;
  restartGame: () => void;
  score: number;
  didWin: boolean;
  dict: any;
}

const Modal: React.FC<ModalProps> = ({
  dict,
  showModal,
  restartGame,
  score,
  didWin,
  
}) => {
  if (!showModal) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>
          {didWin
            ? dict?.congrats
            : dict?.timeout}
        </h2>
        <p>{dict?.score}: {score}</p>
        <button onClick={restartGame}>{dict?.restart}</button>
      </div>
    </div>
  );
};

export default Modal;