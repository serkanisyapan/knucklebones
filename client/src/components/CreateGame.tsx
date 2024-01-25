import { socket } from "../helpers/socketManager";
import { navigate } from "astro:transitions/client";
import { useState } from "react";
import { HowtoPlay } from "./HowtoPlay";
import { v4 as uuidv4 } from "uuid";

export const CreateGame = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  function createNewGame() {
    const gameId = uuidv4();
    socket.emit("createGame", gameId);
    navigate(`/games/${gameId}`);
  }

  function handleShowRules() {
    setShowHowToPlay((show) => !show);
  }

  return (
    <>
      {showHowToPlay && <HowtoPlay handleShowRules={handleShowRules} />}
      <div className="text-white text-center flex flex-col items-center">
        <h1 className="text-7xl mb-10">KNUCKLEBONES</h1>
        <div className="flex flex-col gap-3 w-2/3">
          <button
            onClick={() => createNewGame()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Play against a friend
          </button>
          <button
            onClick={() => handleShowRules()}
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            How to play?
          </button>
        </div>
      </div>
    </>
  );
};
