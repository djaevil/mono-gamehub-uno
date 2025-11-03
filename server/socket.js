import { Server } from "socket.io";

export default function initSockets(server, clientURL) {
  const io = new Server(server, {
    cors: {
      origin: clientURL,
    },
  });

  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Player disconnected:", socket.id);
    });
  });
}
