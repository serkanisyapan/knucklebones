import type { Dice, BoardState, Player } from "../types/GameTypes";

function calcColDiceSum(dices: Dice[]) {
  let sumDice = 0;

  if (
    dices.length === 3 &&
    dices[0]?.die === dices[1]?.die &&
    dices[0]?.die === dices[2]?.die
  ) {
    sumDice += dices[0].die * 9;
    return sumDice;
  }

  for (let i = 0; i < dices.length; i++) {
    if (
      i < dices.length - 1 &&
      (dices[i].die === dices[i + 1]?.die ||
        dices[i]?.die === dices[i + 2]?.die)
    ) {
      sumDice += dices[i].die * 2 + dices[i].die;
    } else {
      sumDice += dices[i].die;
    }
  }
  return sumDice;
}

function calcPlayerScore(playerBoard: BoardState[]) {
  let playerScore = 0;
  for (let a of playerBoard) {
    playerScore += a.score;
  }
  return playerScore;
}

function checkDiceColor(dices: Dice[]) {
  const areAllDicesEqual = dices.every((dice) => {
    if (dices.length === 3) return dice.die === dices[0].die;
  });

  const findDuplicateDice = dices.find(
    (dice) => dices.filter((d) => d.die === dice.die).length === 2
  );

  const updatedDiceColors = dices.map((dice) => {
    if (areAllDicesEqual) return { ...dice, color: "bg-[#6ba6c6]" };
    if (findDuplicateDice)
      return {
        ...dice,
        color:
          dice.die === findDuplicateDice.die ? "bg-[#c9b96f]" : "bg-[#f2ebcf]",
      };
    return dice;
  });
  return updatedDiceColors;
}

function destroyOpponentDice(
  playerId: number,
  players: Player[],
  colId: number,
  dice: number
) {
  const opponentId = playerId === 1 ? 2 : 1;
  const opponentColumn = players.find((player) => player.id === opponentId)
    ?.board[colId];
  if (!opponentColumn) return;
  const destroyDices = opponentColumn.dices.filter((die) => die.die !== dice);
  const updateOpponent = { ...opponentColumn, dices: destroyDices };
  const updateScoreAndColor = updateDiceScoreAndColor(updateOpponent.dices);
  return { ...opponentColumn, ...updateScoreAndColor };
}

function updateDiceScoreAndColor(dices: Dice[]) {
  const updateScore = calcColDiceSum(dices);
  const updateDiceColors = checkDiceColor(dices);
  return { score: updateScore, dices: updateDiceColors };
}

export {
  calcColDiceSum,
  calcPlayerScore,
  checkDiceColor,
  destroyOpponentDice,
  updateDiceScoreAndColor,
};
