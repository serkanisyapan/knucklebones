import { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { PlayerBoard } from "./PlayerBoard";
import { pickRandomDiceNumber, rollFirstDice } from "../helpers/rollDice";
import {
  destroyOpponentDice,
  updateDiceScoreAndColor,
} from "../helpers/diceCalculations";
import type { BoardState, Player } from "../types/GameTypes";
import { checkWinningCondition } from "../helpers/checkWinningCondition";
import rollDiceSound from "../assets/dice.mp3";
import { updatePlayers } from "../helpers/updatePlayers";

const playerBoard: BoardState[] = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

export const Game = () => {
  const [dice, setDice] = useState({ dice: rollFirstDice() });
  const [diceState, setDiceState] = useState({
    state: "rolling",
    dice: 1,
  });
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, playerName: "Player 1", board: playerBoard },
    { id: 2, playerName: "Player 2", board: playerBoard },
  ]);
  const [playerTurn, setPlayerTurn] = useState(players[0].id);
  const checkWinner = checkWinningCondition(players);

  useEffect(() => {
    if (checkWinner) return;
    let timesRolled = 0;
    function diceRollInterval() {
      timesRolled += 1;
      if (timesRolled < 6) {
        const pickDice = rollFirstDice();
        setDiceState({ state: "rolling", dice: pickDice });
      } else {
        clearInterval(rollInterval);
        setDiceState({ state: "rolled", dice: dice.dice });
      }
    }

    const rollInterval = setInterval(() => diceRollInterval(), 80);

    return () => clearInterval(rollInterval);
  }, [dice]);

  useEffect(() => {
    if (checkWinner) return;
    new Audio(rollDiceSound).play();
  }, [dice]);

  function rollDice() {
    setTimeout(() => {
      const rollDice = pickRandomDiceNumber();
      setDice({ dice: rollDice });
    }, 500);
  }

  function placeDiceToBoard(col: BoardState, playerId: number) {
    if (checkWinner || diceState.state === "rolling") return;
    // @ts-ignore
    setPlayers((players) => {
      const updatedPlayerBoards = updatePlayers(players, col, playerId, dice);
      return updatedPlayerBoards;
    });

    setDiceState((prevState) => {
      return { ...prevState, state: "rolling" };
    });

    setPlayerTurn((prevPlayer) =>
      prevPlayer === players[0].id ? players[1].id : players[0].id
    );
    rollDice();
  }

  return (
    <div>
      <p className="text-white text-lg text-center mb-5">
        {checkWinner ? checkWinner : `Player ${playerTurn}'s Turn`}
      </p>
      <div className="flex flex-row items-center gap-10">
        {checkWinner ? (
          <div className="w-16 h-16"></div>
        ) : (
          <Dice
            diceColor="bg-[#f2ebcf]"
            diceState={diceState}
            diceNumber={dice.dice}
            isRollingDice={true}
          />
        )}
        {players.map((player) => {
          return (
            <PlayerBoard
              placeDice={placeDiceToBoard}
              playerTurn={playerTurn}
              player={player}
            />
          );
        })}
      </div>
    </div>
  );
};
