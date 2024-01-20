import type { Player } from "../types/GameTypes";
import { calcPlayerScore } from "./diceCalculations";

function checkWinningCondition(players: Player[]) {
  const checkWinner = players.map((player) => {
    const isBoardFull = player.board.every((b) => b.dices.length === 3);
    const playerScore = calcPlayerScore(player.board);
    return { isBoardFull, playerScore };
  });
  for (let i = 0; i < checkWinner.length; i++) {
    const firstPlayer = {
      score: checkWinner[0].playerScore,
      name: players[0].playerName,
    };
    const secondPlayer = {
      score: checkWinner[1].playerScore,
      name: players[1].playerName,
    };

    if (checkWinner[i].isBoardFull) {
      if (firstPlayer.score > secondPlayer.score)
        return `${firstPlayer.name} wins with a score of ${firstPlayer.score}`;
      if (firstPlayer.score < secondPlayer.score)
        return `${secondPlayer.name} wins with a score of ${secondPlayer.score}`;
      if (firstPlayer.score === secondPlayer.score) {
        return "Roll-off results in a draw!";
      }
    }
  }
}

export { checkWinningCondition };
