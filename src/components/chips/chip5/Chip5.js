import { useEffect, useState } from "react";
import styles from "./Chip5.module.css";

const Chip5 = ({
  score,
  setScore,
  chipBet,
  setChipBet,
  currentBet,
  setCurrentBet,
  message,
  setMessage,
}) => {
  const [bet, setBet] = useState(0);

  useEffect(() => {
    setBet(0);
  }, []);

  const placeBetChip5 = () => {
    const bet = 5;
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
        className={styles.chip5}
        src="/images/chips/Chip_5-removebg-preview.webp"
        alt="Chip5"
        onClick={placeBetChip5}
      />
    </div>
  );
};

export default Chip5;
