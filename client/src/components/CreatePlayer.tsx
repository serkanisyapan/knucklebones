import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Player } from "../types/GameTypes";
import { Game } from "./Game";
import { ShareLink } from "./ShareLink";
import { v4 as uuidv4 } from "uuid";
import { LoadingSpinner } from "./LoadingSpinner";

const socket = io(import.meta.env.BASE_URL);
const id = uuidv4();

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
  const isPlayerJoined = checkIsPlayerJoined(id, players);

  function getPlayers(state: string) {
    socket.on(state, function (rooms: Rooms) {
      if (!gameId) return;
      const findRoom = rooms[gameId];
      setPlayers(findRoom.players);
    });
  }

  function pickPlayerName(playerName: PlayerName) {
    socket.on("playername_exists", function () {
      setPlayerName({ text: "", errorText: "Playername already exists." });
    });
    if (playerName.text.length === 0) {
      setPlayerName({
        text: "",
        errorText: "Username must be longer than 0 characters",
      });
      return;
    }
    socket.emit("joinGame", { gameId, playerName: playerName.text, id });
    savePlayerNameToStorage(playerName.text);
    getPlayers("players");
  }

  function checkIsPlayerJoined(id: string, players: Player[]) {
    return players.find((player) => player.id === id);
  }

  function savePlayerNameToStorage(name: string) {
    localStorage.setItem("playerName", name);
  }

  useEffect(() => {
    getPlayers("getRooms");
  }, [socket]);

  let renderGame = null;

  if (players.length === 2) {
    renderGame = (
      <Game players={players} setPlayers={setPlayers} gameId={gameId} />
    );
  } else {
    renderGame = (
      <div className="text-white flex flex-col gap-3">
        <ShareLink gameId={gameId} />
        {isPlayerJoined?.id === id ? (
          <div className="text-lg flex flex-col items-center gap-3">
            <LoadingSpinner />
            <p>Waiting for other player to join to the game...</p>
            <p>1 / 2</p>
          </div>
        ) : (
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
        )}
        <div className="w-64 h-7">
          {playerName.errorText && <p>{playerName.errorText}</p>}
        </div>
      </div>
    );
  }

  return renderGame;
};
