import { useEffect } from "react";
import data from "../../../mediathek/deck.json";
import styles from "./NewGame.module.css";

const NewGame = ({
  deck,
  setDeck,
  dealer,
  setDealer,
  player,
  setPlayer,
  score,
  setScore,
  inputValue,
  setInputValue,
  chipBet,
  setChipBet,
  currentBet,
  setCurrentBet,
  gameOver,
  setGameOver,
  message,
  setMessage,
  initialData = [[...data]],
}) => {
  useEffect(() => {
    handleNewGame();
  }, []);

  const generateDeck = () => {
    return [...initialData];
    // Kopiert Elemente des Original Arrays
    // Keine simple Referenz!
  };

  const dealCards = mdeck => {
    const playerCard1 = getRandomCard(mdeck);
    const dealerCard1 = getRandomCard(playerCard1.updatedDeck);
    const playerCard2 = getRandomCard(dealerCard1.updatedDeck);
    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
    const dealerStartingHand = [dealerCard1.randomCard, { number: 0 }];
    const player = {
      cards: playerStartingHand,
      count: getCount(playerStartingHand),
    };
    const dealer = {
      cards: dealerStartingHand,
      count: getCount(dealerStartingHand),
    };
    return { updatedDeck: playerCard2.updatedDeck, player, dealer };
  };

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

  const handleNewGame = (type = "new") => {
    if (type === "continue") {
      if (score > 0) {
        console.log("InitialData: ", initialData);
        const deckToUse = deck.length < 10 ? generateDeck() : deck;
        const { updatedDeck, player, dealer } = dealCards(deckToUse);
        setDeck(updatedDeck);
        setDealer(dealer);
        setPlayer(player);
        setChipBet(null);
        setCurrentBet(null);
        setGameOver(false);
        setMessage(null);
      } else {
        setMessage("Game over! You are broke!\nPlease start a new game.");
      }
    } else {
      const newDeck = generateDeck();
      const { updatedDeck, player, dealer } = dealCards(newDeck);
      setDeck(updatedDeck);
      setDealer(dealer);
      setPlayer(player);
      setScore(100);
      setInputValue("");
      setChipBet(null);
      setCurrentBet(null);
      setGameOver(false);
      setMessage(null);
    }
  };
  return (
    <img
      className={styles.newGame}
      src="/images/flaticon/wiederholung.webp"
      alt="New Game"
      onClick={handleNewGame}
      title="New Game"
    />
  );
};

export default NewGame;
