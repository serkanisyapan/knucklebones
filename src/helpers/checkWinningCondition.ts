import type { Player } from "../types/GameTypes";

function checkWinningCondition(players: Player[]) {
  const checkDices = players.map((player) => {
    const checkThis = player.board.every((b) => b.dices.length === 3);
    return checkThis;
  });
  if (checkDices[0]) return "Player 1 Wins";
  if (checkDices[1]) return "Player 2 Wins";
}

export { checkWinningCondition };
