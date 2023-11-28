interface BoardState {
  id: number;
  score: number;
  dices: number[];
}

function calcColDiceSum(dices: number[]) {
  let sumDice = 0;
  if (dices[0] === dices[1] && dices[0] === dices[2]) {
    sumDice += dices[0] * 9;
    return sumDice;
  } else {
    for (let i = 0; i < dices.length; i++) {
      if (dices[i] === dices[i + 1]) {
        sumDice += dices[i] * 2 + dices[i];
      } else {
        sumDice += dices[i];
      }
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

export { calcColDiceSum, calcPlayerScore };
