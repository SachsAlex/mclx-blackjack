// JavaScript Code
async function generateDeck() {
  try {
    const response = await fetch("./mediathek/deck.json");
    const deck = await response.json();
    displayDeck(deck);
  } catch (error) {
    console.error("Fehler beim Laden des Decks:", error);
  }
}

function displayDeck(deck) {
  const deckContainer = document.getElementById("deck-container");
  deckContainer.innerHTML = ""; // Vorherige Inhalte löschen

  deck.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.number} ${card.suit}"/>
        <p>${card.number} ${card.suit}</p>
      `;
    deckContainer.appendChild(cardElement);
  });
}

// Aufruf der Funktion zum Generieren des Decks
generateDeck();
