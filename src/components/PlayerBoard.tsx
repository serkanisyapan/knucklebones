import { useState } from "react";
import { Dice } from "./Dice";
import {
  calcPlayerScore,
  calcColDiceSum,
  checkDiceColor,
} from "../helpers/diceCalculations";

interface PlayerBoard {
  diceNumber: number;
  rollDice: () => void;
}

interface Dice {
  color: string;
  die: number;
}

interface BoardState {
  id: number;
  score: number;
  dices: Dice[];
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
            dices: [...b.dices, { color: "bg-[#f2ebcf]", die: diceNumber }],
          };
          const updatedScore = calcColDiceSum(updatedBoard.dices);
          const updatedDiceColors = checkDiceColor(updatedBoard.dices);
          return {
            ...updatedBoard,
            score: updatedScore,
            dices: updatedDiceColors,
          };
        }
        return b;
      })
    );
    rollDice();
  }

  function boardCornersRounded(index: number) {
    if (index === 0) return "rounded-tl-md rounded-bl-md";
    if (index === 2) return "rounded-tr-md rounded-br-md";
  }

  return (
    <div className="text-white flex flex-row justify-center mb-5">
      {board.map((col, index) => {
        const { dices } = col;
        const getDiceSum = calcColDiceSum(dices);
        const boardCorners = boardCornersRounded(index);
        return (
          <div key={index} className="flex flex-col items-center">
            <span className="text-xl">{getDiceSum || 0}</span>
            <div
              onClick={() => {
                if (dices.length === 3) return;
                placeDiceToBoard(col);
              }}
              className={`bg-slate-700 border border-black w-[100px] h-[250px] p-3 grid grid-rows-3 justify-center ${
                dices.length < 3 && "hover:bg-slate-600 hover:cursor-pointer"
              } ${boardCorners}`}
              key={index}
            >
              {dices.map((dice, idx) => (
                <Dice
                  key={idx}
                  diceNumber={dice.die}
                  diceColor={dice.color}
                  isRollingDice={false}
                />
              ))}
            </div>
          </div>
        );
      })}
      <div className="w-[110px] self-center ml-5 text-xl">
        Score: {playerScore}
      </div>
    </div>
  );
};
