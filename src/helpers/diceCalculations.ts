interface Dice {
  color: string;
  die: number;
}

interface BoardState {
  id: number;
  score: number;
  dices: Dice[];
}

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
    if (areAllDicesEqual) return { ...dice, color: "bg-red-500" };
    if (findDuplicateDice)
      return {
        ...dice,
        color:
          dice.die === findDuplicateDice.die ? "bg-blue-500" : "bg-emerald-500",
      };
    return dice;
  });
  return updatedDiceColors;
}

export { calcColDiceSum, calcPlayerScore, checkDiceColor };
