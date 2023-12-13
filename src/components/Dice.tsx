interface Dice {
  diceNumber: number;
  diceColor: string;
  isRollingDice?: boolean;
  diceState: {
    state: string;
    dice: number;
  };
  isFirstPlayer?: boolean;
}

export const Dice = ({
  diceNumber,
  diceColor,
  isRollingDice,
  diceState,
  isFirstPlayer,
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
      className={`${diceColor} ${diceClass}
      select-none h-16 w-16 rounded text-[#2f2417] flex justify-center items-center text-2xl`}
    >
      {isRollingDice ? diceState.dice : diceNumber}
    </div>
  );
};
