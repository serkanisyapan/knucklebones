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
  checkWinner,
  boardStyles,
  showScores,
}: BoardType) => {
  const [placeDiceSound, setPlaceDiceSound] = useState<HTMLAudioElement | null>(
    null
  );
  const [playerNameOnStorage, setPlayerNameOnStorage] = useState<string>("");
  const playerScore = calcPlayerScore(player.board);
  const [diceAnimation, enable] = useAutoAnimate({ duration: 120 });
  const checkPlayersTurn =
    player.playerName !== playerNameOnStorage ||
    playerTurn !== player.id ||
    checkWinner;

  function boardCornersRounded(index: number) {
    if (index === 0) return "rounded-tl-md rounded-bl-md";
    if (index === 2) return "rounded-tr-md rounded-br-md";
  }

  function checkClickableCols(dices: DiceType[], player: Player) {
    if (checkPlayersTurn) return "hover:cursor-not-allowed hover:bg-slate-700";
    if (dices.length < 3) return "hover:bg-slate-600 hover:cursor-pointer";
  }

  function getPlayerNameFromStorage() {
    const name = localStorage.getItem("playerName");
    if (!name) return;
    setPlayerNameOnStorage(name);
  }

  useEffect(() => {
    setPlaceDiceSound(new Audio(placeSound));
    getPlayerNameFromStorage();
  }, []);

  return (
    <div>
      <div className={`${boardStyles.boardFrame}`}>
        {player.board.map((col, index) => {
          const { dices } = col;
          const getDiceSum = calcColDiceSum(dices);
          const boardCorners = boardCornersRounded(index);
          const checkCols = checkClickableCols(dices, player);
          return (
            <div key={index} className="flex flex-col items-center">
              <span className={`${boardStyles.textSize}`}>
                {getDiceSum || 0}
              </span>
              <div
                onClick={() => {
                  if (dices.length === 3 || checkPlayersTurn) return;
                  if (placeDiceSound) placeDiceSound.play();
                  placeDice && placeDice(col, playerTurn);
                }}
                className={`bg-slate-700 border border-black grid grid-rows-3 justify-center ${boardCorners} ${checkCols} ${boardStyles.boardSize}`}
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
                    diceSize={boardStyles.diceSize}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {showScores && (
          <div className={`${boardStyles.scoreStyles}`}>
            Score: {playerScore}
          </div>
        )}
      </div>
      <p className={`${boardStyles.playerNameStyles}`}>{player.playerName}</p>
    </div>
  );
};
