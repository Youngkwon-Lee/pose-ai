import { Server } from "socket.io";

const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export default io;
