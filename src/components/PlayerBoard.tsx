import { Dice } from "./Dice";
import { calcColDiceSum, calcPlayerScore } from "../helpers/diceCalculations";
import type { PlayerBoard as BoardType } from "../types/GameTypes";

export const PlayerBoard = ({ player, playerTurn, placeDice }: BoardType) => {
  const playerScore = calcPlayerScore(player.board);

  function boardCornersRounded(index: number) {
    if (index === 0) return "rounded-tl-md rounded-bl-md";
    if (index === 2) return "rounded-tr-md rounded-br-md";
  }

  return (
    <div>
      <div className="text-white flex flex-row justify-center mb-5">
        {player.board.map((col, index) => {
          const { dices } = col;
          const getDiceSum = calcColDiceSum(dices);
          const boardCorners = boardCornersRounded(index);
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xl">{getDiceSum || 0}</span>
              <div
                onClick={() => {
                  if (dices.length === 3 || playerTurn !== player.id) return;
                  placeDice(col, playerTurn);
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
      <p className="text-white text-lg w-[300px] text-center">
        {player.playerName}
      </p>
    </div>
  );
};
