import { useEffect, useState } from "react";
import styles from "./ChipAll.module.css";

const ChipAll = ({
  score,
  setScore,
  chipBet,
  setChipBet,
  chipValue,
  setChipValue5,
  currentBet,
  setCurrentBet,
  message,
  setMessage,
}) => {
  const [bet, setBet] = useState(0);

  useEffect(() => {
    setBet(0);
  }, []);

  const placeBetChipAll = () => {
    let bet = 0; // Initialisiere bet mit 0
    bet += score; // Erhöhe bet bei jedem Klick um 5
    if (bet > score) {
      setMessage("Insufficient funds to bet that amount.");
    } else {
      setScore(score - bet);
      setChipBet(chipBet + bet);
      setCurrentBet(bet);
    }
  };

  return (
    <div>
      <img
        className={styles.chipAll}
        src="/images/chips/MCLX.webp"
        alt="ChipAll"
        onClick={placeBetChipAll}
        value={chipValue}
      />
    </div>
  );
};

export default ChipAll;
