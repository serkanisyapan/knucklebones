import { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { PlayerBoard } from "./PlayerBoard";
import type { BoardState, BoardStyleTypes, Player } from "../types/GameTypes";
import { checkWinningCondition } from "../helpers/checkWinningCondition";
import rollDiceSound from "../assets/dice.mp3";
import { updatePlayers } from "../helpers/updatePlayers";
import { socket } from "../helpers/socketManager";
import { EndScreen } from "./EndScreen";

interface GameProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  gameId: string | undefined;
}

const boardStyles: BoardStyleTypes = {
  boardFrame: "text-white flex flex-row justify-center mb-5",
  boardSize: "w-[100px] h-[250px] p-3",
  diceSize: "w-16 h-16 text-2xl",
  scoreStyles: "w-[110px] self-center ml-5 text-xl",
  playerNameStyles: "text-white text-lg w-[300px] text-center",
  textSize: "text-xl",
};

export const Game = ({ players, setPlayers, gameId }: GameProps) => {
  const [dice, setDice] = useState({ dice: 0 });
  const [diceState, setDiceState] = useState({
    state: "rolling",
    dice: 0,
  });
  const [playerTurn, setPlayerTurn] = useState(players[0].id);
  const checkWinner = checkWinningCondition(players);
  const isFirstPlayer = playerTurn === players[0].id;

  function rollFirstDice() {
    socket.emit("rollDice", gameId);
    socket.on("rolledDice", function (diceNumber: number) {
      setDice({ dice: diceNumber });
    });
  }

  function rollDice(dice: number) {
    setTimeout(() => {
      setDice({ dice: dice });
    }, 500);
  }

  function placeDiceToBoard(col: BoardState, playerId: string) {
    if (checkWinner || diceState.state === "rolling") return;
    // @ts-ignore
    setPlayers((players) => {
      const updatedPlayers = updatePlayers(players, col, playerId, dice);
      socket.emit("placeDice", { updatedPlayers, gameId, playerTurn });
      return updatedPlayers;
    });

    setDiceState((prevState) => {
      return { ...prevState, state: "rolling" };
    });
  }

  useEffect(() => {
    rollFirstDice();
  }, []);

  useEffect(() => {
    if (checkWinner) {
      socket.emit("endGame", gameId);
      return;
    }
    new Audio(rollDiceSound).play();
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
    socket.on("afterPlaceDice", function (data: any) {
      const { newPlayerBoards, newPlayerTurn, newDice } = data;
      setPlayers(newPlayerBoards.players);
      setPlayerTurn(newPlayerTurn);
      rollDice(newDice);
    });
  }, [socket, players]);

  if (checkWinner)
    return (
      <EndScreen checkWinner={checkWinner} players={players} gameId={gameId} />
    );

  return (
    <div
      className={`flex flex-row ${
        isFirstPlayer ? "items-end" : "items-start"
      } gap-20`}
    >
      <Dice
        diceColor="bg-[#f2ebcf]"
        diceState={diceState}
        diceNumber={dice.dice}
        isRollingDice={true}
        isFirstPlayer={isFirstPlayer}
        diceSize={boardStyles.diceSize}
      />
      <div className="flex flex-col-reverse items-center gap-20">
        {players.map((player) => {
          return (
            <PlayerBoard
              placeDice={placeDiceToBoard}
              playerTurn={playerTurn}
              player={player}
              players={players}
              diceState={diceState}
              checkWinner={checkWinner}
              boardStyles={boardStyles}
              showScores={true}
              key={player.id}
            />
          );
        })}
      </div>
    </div>
  );
};
