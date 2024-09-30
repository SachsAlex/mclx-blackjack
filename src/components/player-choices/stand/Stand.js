import { useEffect } from "react";
import styles from "./Stand.module.css";

const Stand = ({
  deck,
  setDeck,
  dealer,
  setDealer,
  player,
  setPlayer,
  score,
  setScore,
  currentBet,
  setCurrentBet,
  gameOver,
  setGameOver,
  message,
  setMessage,
}) => {
  useEffect(() => {
    handleStand();
  }, []);

  const getRandomCard = mdeck => {
    const updatedDeck = mdeck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];
    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  };

  const dealerDraw = (dealer, mdeck) => {
    const { randomCard, updatedDeck } = getRandomCard(mdeck);
    dealer.cards.push(randomCard);
    dealer.count = getCount(dealer.cards);
    return { dealer, updatedDeck };
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

  const getWinner = (dealer, player) => {
    if (dealer.count > player.count) return "dealer";
    if (dealer.count < player.count) return "player";
    return "push";
  };

  const handleStand = () => {
    if (!gameOver) {
      if (currentBet) {
        let updatedDeck = [...deck];
        let newDealer = { ...dealer };
        newDealer.cards.pop();
        newDealer.cards.push(getRandomCard(updatedDeck).randomCard);
        newDealer.count = getCount(newDealer.cards);
        // Draw cards until dealer's count is 17 or more
        while (newDealer.count < 17) {
          const draw = dealerDraw(newDealer, updatedDeck);
          newDealer = draw.dealer;
          updatedDeck = draw.updatedDeck;
        }
        if (newDealer.count > 21) {
          setDeck(updatedDeck);
          setDealer(newDealer);
          setScore(score + currentBet * 2);
          setGameOver(true);
          setMessage("Dealer bust!\nYou win!");
        } else {
          const winner = getWinner(newDealer, player);
          let newScore = score;
          let resultMessage;
          if (winner === "dealer") {
            resultMessage = "Dealer wins...";
          } else if (winner === "player") {
            newScore += currentBet * 2;
            resultMessage = "You win!";
          } else {
            newScore += currentBet;
            resultMessage = "Push.";
          }
          setDeck(updatedDeck);
          setDealer(newDealer);
          setScore(newScore);
          setGameOver(true);
          setMessage(resultMessage);
        }
      } else {
        setMessage("Please place bet.");
      }
    } else {
      setMessage("Game over!\nPlease start a new game.");
    }
  };
  return (
    <img
      className={styles.stand}
      src="/images/flaticon/negative-abstimmung.webp"
      alt="Stand"
      onClick={handleStand}
      title="Stand"
    />
  );
};

export default Stand;
