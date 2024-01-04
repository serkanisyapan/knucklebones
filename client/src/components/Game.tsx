import { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { PlayerBoard } from "./PlayerBoard";
import { pickRandomDiceNumber } from "../helpers/rollDice";
import type { BoardState, Player } from "../types/GameTypes";
import { checkWinningCondition } from "../helpers/checkWinningCondition";
import rollDiceSound from "../assets/dice.mp3";
import { updatePlayers } from "../helpers/updatePlayers";
import { io } from "socket.io-client";

interface GameProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  gameId: string | undefined;
}

interface Rooms {
  roomId: string;
  players: Player[];
}

const socket = io("http://localhost:3000");

export const Game = ({ players, setPlayers, gameId }: GameProps) => {
  const [dice, setDice] = useState({ dice: 0 });
  const [diceState, setDiceState] = useState({
    state: "rolling",
    dice: 0,
  });
  const [playerTurn, setPlayerTurn] = useState(players[0].id);
  const checkWinner = checkWinningCondition(players);
  const isFirstPlayer = playerTurn === players[0].id;

  useEffect(() => {
    rollFirstDice();
  }, []);

  useEffect(() => {
    if (checkWinner) return;
    let timesRolled = 0;
    function diceRollInterval() {
      timesRolled += 1;
      if (timesRolled < 6) {
        const pickDice = Math.floor(Math.random() * 5) + 1;
        setDiceState({ state: "rolling", dice: pickDice });
      } else {
        clearInterval(rollInterval);
        setDiceState({ state: "rolled", dice: dice.dice });
      }
    }

    const rollInterval = setInterval(() => diceRollInterval(), 80);

    return () => clearInterval(rollInterval);
  }, [dice]);

  useEffect(() => {
    if (checkWinner) return;
    new Audio(rollDiceSound).play();
  }, [dice]);

  useEffect(() => {
    socket.on("afterPlaceDice", function (data: Rooms) {
      setPlayers(data.players);
    });
  }, [socket, players]);

  function rollFirstDice() {
    socket.emit("rollDice");
    socket.on("rolledDice", function (diceNumber: number) {
      setDice({ dice: diceNumber });
    });
  }

  function rollDice() {
    setTimeout(() => {
      const rollDice = pickRandomDiceNumber();
      setDice({ dice: rollDice });
    }, 500);
  }

  function placeDiceToBoard(col: BoardState, playerId: string) {
    if (checkWinner || diceState.state === "rolling") return;
    // @ts-ignore
    setPlayers((players) => {
      const updatedPlayers = updatePlayers(players, col, playerId, dice);
      socket.emit("placeDice", { updatedPlayers, gameId });
      return updatedPlayers;
    });

    setDiceState((prevState) => {
      return { ...prevState, state: "rolling" };
    });

    setPlayerTurn((prevPlayer) =>
      prevPlayer === players[0].id ? players[1].id : players[0].id
    );
    rollDice();
  }

  return (
    <div
      className={`flex flex-row ${
        isFirstPlayer ? "items-end" : "items-start"
      } gap-20`}
    >
      {checkWinner ? (
        <div className="w-16 h-16"></div>
      ) : (
        <Dice
          diceColor="bg-[#f2ebcf]"
          diceState={diceState}
          diceNumber={dice.dice}
          isRollingDice={true}
          isFirstPlayer={isFirstPlayer}
        />
      )}
      <div className="flex flex-col-reverse items-center gap-20">
        {players.map((player) => {
          return (
            <PlayerBoard
              placeDice={placeDiceToBoard}
              playerTurn={playerTurn}
              player={player}
              diceState={diceState}
            />
          );
        })}
      </div>
    </div>
  );
};
