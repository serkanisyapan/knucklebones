const diceCombination = [
  [1, 4, 9],
  [2, 8, 18],
  [3, 12, 27],
  [4, 16, 36],
  [5, 20, 45],
  [6, 24, 54],
];

interface DieProps {
  color: string;
}

interface HowtoPlayProps {
  handleShowRules: () => void;
}

const Die = ({ color }: DieProps) => {
  return (
    <div
      className={`w-8 text-2xl text-black rounded flex justify-center items-center ${color}`}
    >
      6
    </div>
  );
};

const BonesImage = () => {
  return (
    <img
      width={60}
      height={60}
      className="object-cover"
      src="../../public/knucklebones-logo.png"
      alt="knucklebones game logo"
    />
  );
};

export const HowtoPlay = ({ handleShowRules }: HowtoPlayProps) => {
  return (
    <div className="text-white w-[460px]">
      <p
        onClick={() => handleShowRules()}
        className="hover:cursor-pointer hover:underline mb-2"
      >
        Back
      </p>
      <div className="flex justify-between">
        <BonesImage />
        <h1 className="text-5xl text-center mb-3">KNUCKLEBONES</h1>
        <BonesImage />
      </div>
      <h2 className="text-3xl text-center text-red-400 mb-3">HOW TO PLAY</h2>

      <p className="text-center">
        Your score is calculated by adding <br /> the values of your dice
        together.
      </p>

      <div className="flex justify-between mb-5 mt-8">
        <div>
          <h3 className="text-2xl text-red-400">DESTROY OPPONENT'S DICE</h3>
          <p>
            Destroy your opponent's dice by <br /> matching your dice on the{" "}
            <br />
            same column to theirs.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Die color="bg-[#f2ebcf]" />
          <hr />
          <Die color="bg-red-400" />
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl text-red-400">MATCH DICE</h3>
          <p>
            When dice of the same number are <br /> placed in the same column,
            multiply <br /> their value.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Die color="bg-[#6ba6c6]" />
          <Die color="bg-[#6ba6c6]" />
          <Die color="bg-[#6ba6c6]" />
        </div>
      </div>
      <table className="w-full text-center mt-4">
        <thead className="text-center">
          <tr>
            <th className="text-[#f2ebcf]">Die</th>
            <th className="text-[#c9b96f]">Two Dice</th>
            <th className="text-[#6ba6c6]">Three Dice</th>
          </tr>
        </thead>
        <tbody>
          {diceCombination.map((combination) => {
            return (
              <tr>
                {combination.map((comb) => (
                  <td className="text-lg">{comb}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
