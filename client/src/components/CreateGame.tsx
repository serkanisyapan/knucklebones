import { io } from "socket.io-client";
import { navigate } from "astro:transitions/client";
import { useState } from "react";
import { HowtoPlay } from "./HowtoPlay";
const socket = io(import.meta.env.BASE_URL || "http://localhost:3000");

export const CreateGame = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  function createNewGame() {
    const socketId = socket.id;
    socket.emit("createGame", socketId);
    navigate(`/games/${socketId}`);
  }

  function handleShowRules() {
    setShowHowToPlay((show) => !show);
  }

  if (showHowToPlay) return <HowtoPlay handleShowRules={handleShowRules} />;

  return (
    <div className="text-white">
      <div className="flex mb-8 gap-3 flex-col">
        <h1 className="text-2xl">Play Knucklebones</h1>
        <h3 className="text-lg">
          Play the Knucklebones game from the "Cult of The Lamb" game with your
          friends
        </h3>
      </div>
      <div className="flex flex-col gap-3 w-2/5">
        <button
          onClick={() => createNewGame()}
          className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
        >
          Play against your friend
        </button>
        <button
          onClick={() => handleShowRules()}
          className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
        >
          How to play?
        </button>
      </div>
    </div>
  );
};
