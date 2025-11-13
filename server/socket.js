import { Server } from "socket.io";
import { initRedisClient } from "./modules/redisClient.js";
import registerLobbyEvents from "./events/lobbyEvents.js";

export default function initSockets(server, clientURL, redisPort) {
  const io = new Server(server, {
    cors: {
      origin: clientURL,
    },
  });

  initRedisClient(io, redisPort);

  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);
    registerLobbyEvents(io, socket);
  });
}
