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
});
