interface Dice {
  diceNumber: number;
  diceColor: string;
}

export const Dice = ({ diceNumber, diceColor }: Dice) => {
  return (
    <div
      className={`${diceColor} cursor-pointer select-none h-16 w-16 rounded text-white flex justify-center items-center text-2xl`}
    >
      {diceNumber}
    </div>
  );
};
