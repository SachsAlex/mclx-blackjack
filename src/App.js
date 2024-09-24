import React, { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/Globals.css";
import Button from "./components/button/Button";
import Card from "./components/card/Card";
import data from "./mediathek/deck.json";

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

  const hit = () => {
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

  const stand = () => {
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
          setMessage("Dealer bust! You win!");
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
      setMessage("Game over! Please start a new game.");
    }
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
          <Button onClick={startNewGame} text="New Game" />
          <Button onClick={hit} text="Hit" />
          <Button onClick={stand} text="Stand" />
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
