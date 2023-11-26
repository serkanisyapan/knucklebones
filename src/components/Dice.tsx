interface Dice {
  diceNumber: number;
}

export const Dice = ({ diceNumber }: Dice) => {
  return (
    <div className="bg-emerald-500 cursor-pointer select-none h-16 w-16 rounded text-white flex justify-center items-center text-2xl">
      {diceNumber}
    </div>
  );
};
