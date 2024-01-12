import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

const origin = "http://localhost:4321";
const httpServer = createServer();
const port = process.env.PORT;
const io = new Server(httpServer, {
  cors: {
    origin,
  },
});
httpServer.listen(port);

const rooms = {};

const playerBoard = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

function createNewRoom(roomId) {
  if (Object.hasOwn(rooms, roomId)) return;
  rooms[roomId] = {
    roomId,
    players: [],
  };
}

function joinRoom(playerName, gameId, socketId, socket) {
  if (!Object.hasOwn(rooms, gameId)) {
    createNewRoom(gameId);
  }
  const findRoom = rooms[gameId];
  if (findRoom.players.length < 2) {
    const checkName = checkPlayernameExistInRoom(findRoom, playerName);
    if (checkName) {
      socket.emit("playername_exists", "this playername already exists");
      return;
    } else {
      findRoom.players.push({
        id: socketId,
        playerName: playerName,
        board: playerBoard,
      });
    }
  }
}

function placeDice(gameId, players) {
  const findRoom = rooms[gameId];
  if (!findRoom) return;
  findRoom.players = players;
  return findRoom;
}

function diceRoll() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  return diceRoll;
}

function checkPlayernameExistInRoom(room, name) {
  const getPlayerName = room.players.map((player) => player.playerName);
  return getPlayerName.includes(name);
}

io.on("connect", function (socket) {
  socket.on("createGame", function (data) {
    createNewRoom(data);
  });

  socket.on("joinGame", function (data) {
    const { gameId, playerName, id } = data;
    joinRoom(playerName, gameId, id, socket);
    io.emit("players", rooms);
  });

  socket.on("rollDice", function () {
    const dice = diceRoll();
    io.emit("rolledDice", dice);
  });

  socket.on("placeDice", function (data) {
    const { gameId, updatedPlayers, playerTurn } = data;
    const newPlayerBoards = placeDice(gameId, updatedPlayers);
    const newPlayerTurn =
      updatedPlayers[0].id === playerTurn
        ? updatedPlayers[1].id
        : updatedPlayers[0].id;
    const newDice = Math.floor(Math.random() * 6) + 1;
    io.emit("afterPlaceDice", { newPlayerBoards, newPlayerTurn, newDice });
  });

  socket.emit("getRooms", rooms);

  socket.on("disconnect", function () {
    console.log("disconnected", socket.id);
    // players.splice(
    //   players.findIndex((player) => player.id === socket.id),
    //   1
    // );
    // io.emit("players", players);
  });
});
