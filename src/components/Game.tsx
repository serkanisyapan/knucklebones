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
    <div className="flex flex-row items-center gap-10">
      <Dice diceNumber={dice} diceColor="bg-[#f2ebcf]" isRollingDice={true} />
      <PlayerBoard rollDice={rollAfterPlacing} diceNumber={dice} />
    </div>
  );
};
