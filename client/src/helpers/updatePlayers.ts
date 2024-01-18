import type { BoardState, Player } from "../types/GameTypes.ts";
import {
  destroyOpponentDice,
  updateDiceScoreAndColor,
} from "./diceCalculations.ts";

interface Dice {
  dice: number;
}

const playerBoard = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

function updatePlayers(
  players: Player[],
  col: BoardState,
  playerId: string,
  dice: Dice
) {
  const updatedPlayers = players.map((player) => {
    const updatedBoard = player.board.map((column) => {
      if (column.id === col.id) {
        if (player.id === playerId) {
          const updatedDices = [
            ...column.dices,
            { color: "bg-[#f2ebcf]", die: dice.dice },
          ];
          const updateScoreAndColor = updateDiceScoreAndColor(updatedDices);
          return { ...column, ...updateScoreAndColor };
        }
        return destroyOpponentDice(playerId, players, column.id, dice.dice);
      }
      return column;
    });
    return { ...player, board: updatedBoard };
  });
  return updatedPlayers;
}

function resetPlayers(players: Player[]) {
  const rematchPlayers = players.map((player) => {
    return { ...player, board: playerBoard };
  });
  return rematchPlayers;
}

export { updatePlayers, resetPlayers };
