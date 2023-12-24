import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Player } from "../types/GameTypes";
import { Game } from "./Game";
import { ShareLink } from "./ShareLink";

const socket = io("http://localhost:3000");

interface PlayerName {
  text: string;
  errorText: string;
}

interface CreatePlayer {
  gameId: string | undefined;
}

interface Rooms {
  [key: string]: {
    roomId: string;
    players: Player[];
  };
}

export const CreatePlayer = ({ gameId }: CreatePlayer) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<PlayerName>({
    text: "",
    errorText: "",
  });

  function getPlayers(state: string) {
    socket.on(state, function (rooms: Rooms) {
      if (!gameId) return;
      const findRoom = rooms[gameId];
      setPlayers(findRoom.players);
    });
  }

  function pickPlayerName(playerName: PlayerName) {
    if (playerName.text.length === 0) {
      setPlayerName({
        text: "",
        errorText: "Username must be longer than 0 characters",
      });
      return;
    }
    socket.emit("joinGame", { gameId, playerName: playerName.text });
    getPlayers("players");
  }

  useEffect(() => {
    getPlayers("getRooms");
  }, [socket]);

  let renderGame = null;

  if (players.length === 2) {
    renderGame = <Game players={players} setPlayers={setPlayers} />;
  } else {
    renderGame = (
      <div className="text-white flex flex-col gap-3">
        <ShareLink gameId={gameId} />
        <div className="flex gap-4">
          <input
            onChange={(event) =>
              setPlayerName((previous) => {
                return { ...previous, text: event.target.value };
              })
            }
            className="bg-gray-50 text-gray-900 text-lg rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            type="text"
            id="playerName"
            name="playerName"
            placeholder="Username..."
            value={playerName.text}
          />
          <button type="button" onClick={() => pickPlayerName(playerName)}>
            JOIN
          </button>
        </div>
        <div className="w-64 h-7">
          {playerName.errorText && <p>{playerName.errorText}</p>}
        </div>
      </div>
    );
  }

  return renderGame;
};
