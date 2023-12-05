import { useState } from "react";
import { Dice } from "./Dice";
import { PlayerBoard } from "./PlayerBoard";
import { pickRandomDiceNumber, rollFirstDice } from "../helpers/rollDice";
import { calcColDiceSum, checkDiceColor } from "../helpers/diceCalculations";
import type { BoardState, Player } from "../types/GameTypes";

const playerBoard: BoardState[] = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

export const Game = () => {
  const [dice, setDice] = useState<number>(rollFirstDice());
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, playerName: "Player 1", board: playerBoard },
    { id: 2, playerName: "Player 2", board: playerBoard },
  ]);
  const [playerTurn, setPlayerTurn] = useState(players[0].id);

  function rollDice() {
    const rollDice = pickRandomDiceNumber();
    setDice(rollDice);
  }

  function placeDiceToBoard(col: BoardState, playerId: number) {
    setPlayers((players) => {
      const updatedPlayers = players.map((player) => {
        if (player.id === playerId) {
          const updatedBoard = player.board.map((column) => {
            if (column.id === col.id) {
              const updatedDices = [
                ...column.dices,
                { color: "bg-[#f2ebcf]", die: dice },
              ];
              const updateScore = calcColDiceSum(updatedDices);
              const updateDiceColors = checkDiceColor(updatedDices);
              return { ...column, score: updateScore, dices: updateDiceColors };
            }
            return column;
          });
          return { ...player, board: updatedBoard };
        }
        return player;
      });
      return updatedPlayers;
    });
    setPlayerTurn((prevPlayer) =>
      prevPlayer === players[0].id ? players[1].id : players[0].id
    );
    rollDice();
  }

  return (
    <div>
      <p className="text-white text-lg text-center mb-5">
        Player {playerTurn}'s Turn
      </p>
      <div className="flex flex-row items-center gap-10">
        <Dice diceNumber={dice} diceColor="bg-[#f2ebcf]" isRollingDice={true} />
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
