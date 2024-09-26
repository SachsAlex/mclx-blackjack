import { useEffect, useState } from "react";
import styles from "./Chip100.module.css";

const Chip100 = ({
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

  const placeBetChip100 = () => {
    let bet = 0; // Initialisiere bet mit 0
    bet += 100; // Erhöhe bet bei jedem Klick um 5
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
        className={styles.chip100}
        src="/images/chips/Chip_100-removebg-preview.webp"
        alt="Chip100"
        onClick={placeBetChip100}
        value={chipValue}
      />
    </div>
  );
};

export default Chip100;
