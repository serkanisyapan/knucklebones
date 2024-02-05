import knucklebonesLogo from "../../knucklebones-logo.png";

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
      src={knucklebonesLogo.src}
      alt="knucklebones game logo"
      height={60}
      width={60}
    />
  );
};

export const HowtoPlay = ({ handleShowRules }: HowtoPlayProps) => {
  return (
    <div
      onClick={() => handleShowRules()}
      className="fixed bg-white bg-opacity-10 w-full h-full top-0 left-0 flex items-center justify-center p-7 z-10"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="text-white p-5 bg-[#0f172a] rounded-md "
      >
        <button
          onClick={() => handleShowRules()}
          className="hover:cursor-pointer hover:underline"
        >
          X
        </button>
        <h2 className="text-3xl text-red-400 text-center mb-2">HOW TO PLAY</h2>
        <div className="flex justify-between mb-3">
          <BonesImage />
          <h1 className="text-5xl text-center mb-3">KNUCKLEBONES</h1>
          <BonesImage />
        </div>
        <p className="mb-3">
          Your score is calculated by adding <br /> the values of your dice
          together.
        </p>
        <div className="flex justify-between mb-5">
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
    </div>
  );
};
