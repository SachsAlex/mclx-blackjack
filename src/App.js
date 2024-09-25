import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/Globals.css";
import Button from "./components/button/Button";
import Card from "./components/card/Card";
import data from "./mediathek/deck.json";
import Stand from "./components/player-choices/stand";
import NewGame from "./components/player-choices/newGame/NewGame";
import Hit from "./components/player-choices/hit";

const App = () => {
  const [deck, setDeck] = useState([]);
  const [dealer, setDealer] = useState(null);
  const [player, setPlayer] = useState(null);
  const [score, setScore] = useState(100);
  const [inputValue, setInputValue] = useState("");
  const [currentBet, setCurrentBet] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(null);
  const [initalData] = useState([...data]);

  useEffect(() => {
    startNewGame();
  }, []);

  const generateDeck = () => {
    return [...initalData];
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
    console.log("InitialData: ", initalData, playerCard2.updatedDeck);
    console.log("Dealer Start Hand: ", dealerStartingHand);
    console.log("Dealer: ", dealer);
    console.log("Player: ", player);
    return { updatedDeck: playerCard2.updatedDeck, player, dealer };
  };

  const startNewGame = (type = "new") => {
    if (type === "continue") {
      if (score > 0) {
        console.log("InitialData: ", initalData);
        const deckToUse = deck.length < 10 ? generateDeck() : deck;
        const { updatedDeck, player, dealer } = dealCards(deckToUse);
        setDeck(updatedDeck);
        setDealer(dealer);
        setPlayer(player);
        setCurrentBet(null);
        setGameOver(false);
        setMessage(null);
      } else {
        setMessage("Game over! You are broke! Please start a new game.");
      }
    } else {
      const newDeck = generateDeck();
      const { updatedDeck, player, dealer } = dealCards(newDeck);
      setDeck(updatedDeck);
      setDealer(dealer);
      setPlayer(player);
      setScore(100);
      setInputValue("");
      setCurrentBet(null);
      setGameOver(false);
      setMessage(null);
    }
  };

  const getRandomCard = mdeck => {
    const updatedDeck = mdeck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];
    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  };

  const placeBet = () => {
    const bet = inputValue;
    if (bet > score) {
      setMessage("Insufficient funds to bet that amount.");
    } else if (bet % 1 !== 0) {
      setMessage("Please bet whole numbers only.");
    } else {
      setScore(score - bet);
      setInputValue("");
      setCurrentBet(bet);
    }
  };

  // const placeBetChip = () => {
  //   const bet = chipValue;
  //   if (bet > score) {
  //     setMessage("Insufficient funds to bet that amount.");
  //   } else if (bet % 1 !== 0) {
  //     setMessage("Please bet whole numbers only.");
  //   } else {
  //     setScore(score - bet);
  //     setInputValue("");
  //     setCurrentBet(bet);
  //   }
  // };

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

  return (
    <div className="background">
      <div>
        <p className="font">Dealer's Hand ({dealer?.count || 0})</p>
        <table className="cards">
          <tbody>
            <tr>
              {dealer?.cards.map((card, i) => (
                <Card key={i} imgSource={card.img} />
              ))}
            </tr>
          </tbody>
        </table>
        <p>{message}</p>
        <p className="font">Your Hand ({player?.count || 0})</p>
        <table className="cards">
          <tbody>
            <tr>
              {player?.cards.map((card, i) => (
                <Card key={i} imgSource={card.img} />
              ))}
            </tr>
          </tbody>
        </table>
        <div className="buttons">
          <NewGame
            deck={deck}
            setDeck={setDeck}
            dealer={dealer}
            setDealer={setDealer}
            player={player}
            setPlayer={setPlayer}
            score={score}
            setScore={setScore}
            inputValue={inputValue}
            setInputValue={setInputValue}
            currentBet={currentBet}
            setCurrentBet={setCurrentBet}
            gameOver={gameOver}
            setGameOver={setGameOver}
            message={message}
            setMessage={setMessage}
            initalData={initalData}
          />
          <Hit
            deck={deck}
            setDeck={setDeck}
            player={player}
            setPlayer={setPlayer}
            currentBet={currentBet}
            setCurrentBet={setCurrentBet}
            gameOver={gameOver}
            setGameOver={setGameOver}
            message={message}
            setMessage={setMessage}
          />
          <Stand
            deck={deck}
            setDeck={setDeck}
            dealer={dealer}
            setDealer={setDealer}
            player={player}
            setPlayer={setPlayer}
            score={score}
            setScore={setScore}
            currentBet={currentBet}
            setCurrentBet={setCurrentBet}
            gameOver={gameOver}
            setGameOver={setGameOver}
            message={message}
            setMessage={setMessage}
          />
        </div>
        <p className="font">Score: {score}</p>
        {!currentBet ? (
          <div className="input-bet">
            <form>
              <input
                type="text"
                name="bet"
                placeholder=""
                value={inputValue}
                onChange={e => setInputValue(+e.target.value)}
              />
            </form>
            <Button onClick={placeBet} text="Place Bet" />
            {/* <Button onClick={placeBetChip} text="Place Bet" /> */}
          </div>
        ) : null}
        {gameOver && (
          <div className="buttons">
            <Button onClick={() => startNewGame("continue")} text="Continue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
