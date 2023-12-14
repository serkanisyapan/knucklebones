import { Dice } from "./Dice";
import { calcColDiceSum, calcPlayerScore } from "../helpers/diceCalculations";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import placeSound from "../assets/placeDice.mp3";
import type {
  PlayerBoard as BoardType,
  Dice as DiceType,
  Player,
} from "../types/GameTypes";

export const PlayerBoard = ({
  player,
  playerTurn,
  placeDice,
  diceState,
}: BoardType) => {
  const [placeDiceSound, setPlaceDiceSound] = useState<HTMLAudioElement | null>(
    null
  );
  const playerScore = calcPlayerScore(player.board);
  const [diceAnimation, enable] = useAutoAnimate({ duration: 120 });

  function boardCornersRounded(index: number) {
    if (index === 0) return "rounded-tl-md rounded-bl-md";
    if (index === 2) return "rounded-tr-md rounded-br-md";
  }

  function checkClickableCols(
    dices: DiceType[],
    player: Player,
    playerTurn: number
  ) {
    if (playerTurn !== player.id)
      return "hover:cursor-not-allowed hover:bg-slate-700";
    if (dices.length < 3) return "hover:bg-slate-600 hover:cursor-pointer";
  }

  useEffect(() => {
    setPlaceDiceSound(new Audio(placeSound));
  }, []);

  return (
    <div>
      <div className="text-white flex flex-row justify-center mb-5">
        {player.board.map((col, index) => {
          const { dices } = col;
          const getDiceSum = calcColDiceSum(dices);
          const boardCorners = boardCornersRounded(index);
          const checkCols = checkClickableCols(dices, player, playerTurn);
          return (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xl">{getDiceSum || 0}</span>
              <div
                onClick={() => {
                  if (dices.length === 3 || playerTurn !== player.id) return;
                  if (placeDiceSound) placeDiceSound.play();
                  placeDice(col, playerTurn);
                }}
                className={`bg-slate-700 border border-black w-[100px] h-[250px] p-3 grid grid-rows-3 justify-center ${boardCorners} ${checkCols}`}
                key={index}
                ref={diceAnimation}
              >
                {dices.map((dice, idx) => (
                  <Dice
                    key={idx}
                    diceNumber={dice.die}
                    diceColor={dice.color}
                    isRollingDice={false}
                    diceState={diceState}
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
