import { useEffect, useState } from "react";
import type { BoardStyleTypes, Player } from "../types/GameTypes";
import { PlayerBoard } from "./PlayerBoard";
import { socket } from "../helpers/socketManager";

interface EndScreenProps {
  checkWinner: string | undefined;
  players: Player[];
  gameId: string | undefined;
}

const boardStyles: BoardStyleTypes = {
  boardFrame: "text-white flex flex-row justify-center",
  boardSize: "w-[70px] h-[200px] p-2",
  diceSize: "w-12 h-12 text-lg",
  scoreStyles: "w-[110px] self-center ml-5 text-xl",
  playerNameStyles: "text-white text-center mb-4",
  textSize: "text-base",
};

export const EndScreen = ({ checkWinner, players, gameId }: EndScreenProps) => {
  const [playerClickedRematch, setPlayerClickedRematch] = useState<number>(0);
  const [playerClicked, setPlayerClicked] = useState(false);

  function handleRematch() {
    setPlayerClickedRematch((prev) => {
      const clickedRematch = prev + 1;
      socket.emit("clickRematch", { gameId, clickedRematch });
      return clickedRematch;
    });
    setPlayerClicked(true);
  }

  useEffect(() => {
    socket.on("clickedRematch", function (clickCount: number) {
      setPlayerClickedRematch(clickCount);
    });
  }, [socket, playerClickedRematch]);

  return (
    <div className="flex flex-row items-center">
      <div className="flex justify-center items-center flex-col">
        <p className="text-lg mb-5 text-green-400">{checkWinner}</p>
        {players.map((player) => (
          <PlayerBoard
            checkWinner={checkWinner}
            player={player}
            players={players}
            key={player.id}
            boardStyles={boardStyles}
            showScores={false}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleRematch()}
          disabled={playerClicked}
          className={`${
            playerClicked
              ? "cursor-not-allowed dark:bg-gray-600"
              : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          } text-white  font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2`}
        >
          Rematch {playerClickedRematch}/2
        </button>
        <a
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
          href="http://localhost:4321"
        >
          Main Menu
        </a>
      </div>
    </div>
  );
};
