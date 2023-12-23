import { io } from "socket.io-client";
import { navigate } from "astro:transitions/client";
const socket = io("http://localhost:3000");

export const CreateGame = () => {
  function createNewGame() {
    const socketId = socket.id;
    socket.emit("createGame", socketId);
    navigate(`/games/${socketId}`);
  }

  return (
    <div className="text-white">
      <div className="flex mb-8 gap-3 flex-col">
        <h1 className="text-2xl">Play Knucklebones</h1>
        <h3 className="text-lg">
          Play the Knucklebones games from the Cult of The Lambs game with your
          friends
        </h3>
      </div>
      <button
        onClick={() => createNewGame()}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Play against your friends
      </button>
    </div>
  );
};
