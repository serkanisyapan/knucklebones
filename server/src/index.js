import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:4321",
  },
});

io.listen(3000);

const players = [];

const playerBoard = [
  { id: 0, score: 0, dices: [] },
  { id: 1, score: 0, dices: [] },
  { id: 2, score: 0, dices: [] },
];

io.on("connect", function (socket) {
  socket.on("joinGame", function (data) {
    if (players.length < 2) {
      players.push({
        id: socket.id,
        board: playerBoard,
        playerName: data,
      });
    }
    io.emit("players", players);
  });

  socket.on("disconnect", function () {
    players.splice(
      players.findIndex((player) => player.id === socket.id),
      1
    );
    io.emit("players", players);
  });
});
