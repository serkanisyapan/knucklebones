import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

// io server
const clientURL = process.env.CLIENT_URL;
const port = process.env.PORT;
const io = new Server({
  cors: {
    origin: clientURL,
  },
});
io.listen(port);
// io server

const rooms = {};

const playerBoard = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

function createNewRoom(roomId, players = []) {
  if (Object.hasOwn(rooms, roomId)) return;
  rooms[roomId] = {
    roomId,
    players,
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
  return Math.floor(Math.random() * 6) + 1;
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
    io.to(gameId).emit("players", rooms);
  });

  socket.on("joinRoom", function (gameId) {
    socket.join(gameId);
  });

  socket.on("rollDice", function (gameId) {
    const dice = diceRoll();
    io.to(gameId).emit("rolledDice", dice);
  });

  socket.on("placeDice", function (data) {
    const { gameId, updatedPlayers, playerTurn } = data;
    const newPlayerBoards = placeDice(gameId, updatedPlayers);
    const newPlayerTurn =
      updatedPlayers[0].id === playerTurn
        ? updatedPlayers[1].id
        : updatedPlayers[0].id;
    const newDice = Math.floor(Math.random() * 6) + 1;
    io.to(gameId).emit("afterPlaceDice", {
      newPlayerBoards,
      newPlayerTurn,
      newDice,
    });
  });

  socket.on("clickRematch", function (data) {
    const { gameId, clickedRematch } = data;
    io.to(gameId).emit("clickedRematch", clickedRematch);
  });

  socket.on("startRematch", function (data) {
    const { gameId, rematchPlayers } = data;
    io.to(gameId).emit("rematch", rematchPlayers);
  });

  socket.emit("getRooms", rooms);

  socket.on("endGame", function (gameId) {
    delete rooms[gameId];
  });
});
