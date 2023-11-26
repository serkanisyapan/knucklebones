import { useState } from "react";
import { Dice } from "./Dice";
import { PlayerBoard } from "./PlayerBoard";

export const Game = () => {
  const [dice, setDice] = useState<number>(rollFirstDice());

  function pickRandomDieNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function rollFirstDice() {
    return pickRandomDieNumber();
  }

  function rollAfterPlacing() {
    const rollDice = pickRandomDieNumber();
    setDice(rollDice);
  }

  return (
    <div>
      <Dice diceNumber={dice} />
      <PlayerBoard rollDice={rollAfterPlacing} diceNumber={dice} />
    </div>
  );
};
