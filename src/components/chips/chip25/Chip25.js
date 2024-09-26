import { useEffect, useState } from "react";
import styles from "./Chip25.module.css";

const Chip25 = ({
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

  const placeBetChip25 = () => {
    let bet = 0; // Initialisiere bet mit 0
    bet += 25; // Erhöhe bet bei jedem Klick um 5
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
        className={styles.chip25}
        src="/images/chips/Chip_25-removebg-preview.webp"
        alt="Chip25"
        onClick={placeBetChip25}
        value={chipValue}
      />
    </div>
  );
};

export default Chip25;
