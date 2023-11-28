import { useState } from "react";
import { Dice } from "./Dice";

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
          const updatedScore = calcDiceSum(updatedBoard.dices);
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

  function calcDiceSum(dices: number[]) {
    let sumDice = 0;
    if (dices[0] === dices[1] && dices[0] === dices[2]) {
      sumDice += dices[0] * 9;
      return sumDice;
    } else {
      for (let i = 0; i < dices.length; i++) {
        if (dices[i] === dices[i + 1]) {
          sumDice += dices[i] * 2 + dices[i];
        } else {
          sumDice += dices[i];
        }
      }
    }
    return sumDice;
  }

  function calcPlayerScore(playerBoard: BoardState[]) {
    let playerScore = 0;
    for (let a of playerBoard) {
      playerScore += a.score;
    }
    return playerScore;
  }

  return (
    <div className="text-white flex flex-row">
      {board.map((col, index) => {
        const { dices } = col;
        const getDiceSum = calcDiceSum(dices);
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
