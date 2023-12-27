import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:4321",
  },
});

io.listen(3000);

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

function joinRoom(playerName, gameId, socketId) {
  if (!Object.hasOwn(rooms, gameId)) {
    createNewRoom(gameId);
  }
  const findRoom = rooms[gameId];
  if (findRoom.players.length < 2) {
    findRoom.players.push({
      id: socketId,
      playerName: playerName,
      board: playerBoard,
    });
  }
}

function diceRoll() {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  return diceRoll;
}

io.on("connect", function (socket) {
  socket.on("createGame", function (data) {
    createNewRoom(data);
  });

  socket.on("joinGame", function (data) {
    const { gameId, playerName, id } = data;
    joinRoom(playerName, gameId, id);
    io.emit("players", rooms);
  });

  socket.on("rollDice", function () {
    const dice = diceRoll();
    io.emit("rolledDice", dice);
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
