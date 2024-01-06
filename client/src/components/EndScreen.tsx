import type { BoardStyleTypes, Player } from "../types/GameTypes";
import { PlayerBoard } from "./PlayerBoard";

interface EndScreenProps {
  checkWinner: string | undefined;
  players: Player[];
}

const boardStyles: BoardStyleTypes = {
  boardFrame: "text-white flex flex-row justify-center",
  boardSize: "w-[70px] h-[200px] p-2",
  diceSize: "w-12 h-12 text-lg",
  scoreStyles: "w-[110px] self-center ml-5",
  playerNameStyles: "text-white w-[235px] text-center",
  textSize: "text-md",
};

export const EndScreen = ({ checkWinner, players }: EndScreenProps) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-lg mb-5 text-green-400">{checkWinner}</p>
      {players.map((player) => (
        <PlayerBoard
          checkWinner={checkWinner}
          player={player}
          key={player.id}
          boardStyles={boardStyles}
          showScores={false}
        />
      ))}
    </div>
  );
};
