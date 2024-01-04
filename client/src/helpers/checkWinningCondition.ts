import type { Player } from "../types/GameTypes";
import { calcPlayerScore } from "./diceCalculations";

function checkWinningCondition(players: Player[]) {
  const checkWinner = players.map((player) => {
    const isBoardFull = player.board.every((b) => b.dices.length === 3);
    const playerScore = calcPlayerScore(player.board);
    return { isBoardFull, playerScore };
  });
  for (let i = 0; i < checkWinner.length; i++) {
    if (checkWinner[i].isBoardFull) {
      if (checkWinner[0].playerScore > checkWinner[1].playerScore)
        return `${players[0].playerName} Wins`;
      if (checkWinner[0].playerScore < checkWinner[1].playerScore)
        return `${players[1].playerName} Wins`;
    }
  }
}

export { checkWinningCondition };
