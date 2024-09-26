import { useEffect, useState } from "react";
import styles from "./Chip10.module.css";

const Chip10 = ({
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

  const placeBetChip10 = () => {
    let bet = 0; // Initialisiere bet mit 0
    bet += 10; // Erhöhe bet bei jedem Klick um 5
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
        className={styles.chip10}
        src="/images/chips/Chip_10-removebg-preview.webp"
        alt="Chip10"
        onClick={placeBetChip10}
        value={chipValue}
      />
    </div>
  );
};

export default Chip10;
