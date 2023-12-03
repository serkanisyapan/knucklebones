interface Dice {
  diceNumber: number;
  diceColor: string;
  isRollingDice?: boolean;
}

export const Dice = ({ diceNumber, diceColor, isRollingDice }: Dice) => {
  return (
    <div
      className={`${diceColor} select-none h-16 w-16 rounded text-[#2f2417] flex justify-center items-center text-2xl ${
        isRollingDice && ""
      }`}
    >
      {diceNumber}
    </div>
  );
};
