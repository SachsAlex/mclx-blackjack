const fs = require("fs");

fs.readFile("./mediathek/deck.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const deck = JSON.parse(data);
  console.log(
    "Kartenwerte: ",
    deck.map(card => card.card),
  );
  console.log("Rückseite: ", deck.find(card => card.card === "B ♦").card);
  const card = deck.find(card => card.card === "B ♦").card;
  const img = document.createElement("imgLink");
  img.src = card.image;
  console.log("Bild: ", img, card);
  document.getElementById("card-container").appendChild(img);
});
