import { useState } from "react";
import { Dice } from "./Dice";

interface PlayerBoard {
  diceNumber: number;
  rollDice: () => void;
}

export const PlayerBoard = ({ diceNumber, rollDice }: PlayerBoard) => {
  const [board, setBoard] = useState<number[][]>([[], [], []]);

  function placeDiceToBoard(place: number) {
    const placeDice = board.map((b, id) => {
      if (place === id && board[place].length < 3) {
        return [...b, diceNumber];
      } else {
        return b;
      }
    });
    rollDice();
    setBoard(placeDice);
  }

  return (
    <div className="h-[250px] flex flex-row">
      {board.map((col, index) => (
        <div
          onClick={() => {
            if (col.length === 3) return;
            placeDiceToBoard(index);
          }}
          className={`text-white bg-slate-500 border border-black w-[100px] p-3 grid grid-rows-3 ${
            col.length < 3 && "hover:bg-slate-600 hover:cursor-pointer"
          } `}
          key={index}
        >
          {col.map((dice, idx) => (
            <Dice key={idx} diceNumber={dice} />
          ))}
        </div>
      ))}
    </div>
  );
};
