import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:4321",
  },
});

io.listen(3000);

io.on("connect", function (socket) {
  console.log("user connected");

  socket.emit("hello_from_socket");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});
