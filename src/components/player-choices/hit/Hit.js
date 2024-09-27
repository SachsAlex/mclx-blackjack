import { useEffect } from "react";
import styles from "./Hit.module.css";

const Hit = ({
  deck,
  setDeck,
  player,
  setPlayer,
  currentBet,
  setCurrentBet,
  gameOver,
  setGameOver,
  message,
  setMessage,
}) => {
  useEffect(() => {
    handleHit();
  }, []);

  const getRandomCard = mdeck => {
    const updatedDeck = mdeck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];
    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  };

  const getCount = cards => {
    const rearranged = [];
    cards.forEach(card => {
      if (card.number === "A") {
        rearranged.push(card);
      } else {
        rearranged.unshift(card);
      }
    });

    return rearranged.reduce((total, card) => {
      if (card.number === "J" || card.number === "Q" || card.number === "K") {
        return total + 10;
      } else if (card.number === "A") {
        return total + 11 <= 21 ? total + 11 : total + 1;
      } else {
        return total + Number(card.number);
      }
    }, 0);
  };

  const handleHit = () => {
    if (!gameOver) {
      if (currentBet) {
        const { randomCard, updatedDeck } = getRandomCard(deck);
        const newPlayer = { ...player };
        newPlayer.cards.push(randomCard);
        newPlayer.count = getCount(newPlayer.cards);
        if (newPlayer.count > 21) {
          setPlayer(newPlayer);
          setGameOver(true);
          setMessage("BUST!");
        } else {
          setDeck(updatedDeck);
          setPlayer(newPlayer);
        }
      } else {
        setMessage("Please place bet.");
      }
    } else {
      setMessage("Game over! Please start a new game.");
    }
  };
  return (
    <img
      className={styles.hit}
      src="/images/flaticon/positive-abstimmung.webp"
      alt="Hit"
      onClick={handleHit}
      title="Hit"
    />
  );
};

export default Hit;
