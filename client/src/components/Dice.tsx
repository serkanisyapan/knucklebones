interface Dice {
  diceNumber: number;
  diceColor: string;
  isRollingDice?: boolean;
  diceState?: {
    state: string;
    dice: number;
  };
  isFirstPlayer?: boolean;
  diceSize: string;
}

export const Dice = ({
  diceNumber,
  diceColor,
  isRollingDice,
  diceState,
  isFirstPlayer,
  diceSize,
}: Dice) => {
  const diceClass = checkForRollingDice(isFirstPlayer, isRollingDice);

  function checkForRollingDice(
    player: boolean | undefined,
    dice: boolean | undefined
  ) {
    if (dice) {
      if (player) return "mb-16";
      return "mt-16";
    }
    return "";
  }

  return (
    <div
      className={`${diceColor} ${diceClass} ${diceSize}
      select-none rounded text-[#2f2417] flex justify-center items-center`}
    >
      {isRollingDice && diceState ? diceState.dice : diceNumber}
    </div>
  );
};
