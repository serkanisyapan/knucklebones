import { useState } from "react";
import { Dice } from "./Dice";
import { PlayerBoard } from "./PlayerBoard";
import { pickRandomDiceNumber, rollFirstDice } from "../helpers/rollDice";

export const Game = () => {
  const [dice, setDice] = useState<number>(rollFirstDice());

  function rollAfterPlacing() {
    const rollDice = pickRandomDiceNumber();
    setDice(rollDice);
  }

  return (
    <div>
      <Dice diceNumber={dice} diceColor="bg-emerald-500" />
      <PlayerBoard rollDice={rollAfterPlacing} diceNumber={dice} />
    </div>
  );
};
