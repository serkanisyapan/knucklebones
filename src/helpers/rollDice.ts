function pickRandomDiceNumber() {
  return Math.floor(Math.random() * 5) + 1;
}

function rollFirstDice() {
  return pickRandomDiceNumber();
}

export { pickRandomDiceNumber, rollFirstDice };
