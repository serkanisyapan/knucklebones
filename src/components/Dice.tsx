interface Dice {
  diceNumber: number;
  diceColor: string;
  isRollingDice?: boolean;
  diceState: {
    state: string;
    dice: number;
  };
}

export const Dice = ({
  diceNumber,
  diceColor,
  isRollingDice,
  diceState,
}: Dice) => {
  return (
    <div
      className={`${diceColor} select-none h-16 w-16 rounded text-[#2f2417] flex justify-center items-center text-2xl`}
    >
      {isRollingDice ? diceState.dice : diceNumber}
    </div>
  );
};
