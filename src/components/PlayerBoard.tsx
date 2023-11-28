import { useState } from "react";
import { Dice } from "./Dice";
import { calcPlayerScore, calcColDiceSum } from "../helpers/diceCalculations";

interface PlayerBoard {
  diceNumber: number;
  rollDice: () => void;
}

interface BoardState {
  id: number;
  score: number;
  dices: number[];
}

const initialState: BoardState[] = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

export const PlayerBoard = ({ diceNumber, rollDice }: PlayerBoard) => {
  const [board, setBoard] = useState(initialState);
  const playerScore = calcPlayerScore(board);

  function placeDiceToBoard(col: BoardState) {
    setBoard((prev) =>
      prev.map((b, id) => {
        if (b.id === col.id && b.dices.length < 3) {
          const updatedBoard = {
            ...b,
            dices: [...b.dices, diceNumber],
          };
          const updatedScore = calcColDiceSum(updatedBoard.dices);
          return {
            ...updatedBoard,
            score: updatedScore,
          };
        }
        return b;
      })
    );
    rollDice();
  }

  return (
    <div className="text-white flex flex-row">
      {board.map((col, index) => {
        const { dices } = col;
        const getDiceSum = calcColDiceSum(dices);
        return (
          <div key={index} className="flex flex-col items-center">
            <span>{getDiceSum || 0}</span>
            <div
              onClick={() => {
                if (dices.length === 3) return;
                placeDiceToBoard(col);
              }}
              className={`bg-slate-500 border border-black w-[100px] h-[250px] p-3 grid grid-rows-3 ${
                dices.length < 3 && "hover:bg-slate-600 hover:cursor-pointer"
              } `}
              key={index}
            >
              {dices.map((dice, idx) => (
                <Dice key={idx} diceNumber={dice} />
              ))}
            </div>
          </div>
        );
      })}
      <span>{playerScore}</span>
    </div>
  );
};
