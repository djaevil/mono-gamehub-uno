import * as errorHandlers from "./handlers/errorHandlers.js";
import * as lobbyHandlers from "./handlers/lobbyHandlers.js";

export default function registerEventRouter(socket) {
  const eventMap = {
    server_error: {
      handler: errorHandlers.handleServerError,
      busEvent: "SERVER_ERROR",
    },
    user_error: {
      handler: errorHandlers.handleUserError,
      busEvent: "USER_ERROR",
    },
    join_failed: {
      handler: errorHandlers.handleJoinFailed,
      busEvent: "JOIN_FAILED",
    },
    no_lobby: {
      handler: errorHandlers.handleNoLobby,
      busEvent: "NO_LOBBY",
    },
    unknown: {
      handler: errorHandlers.handleUnknown,
      busEvent: "UNKNOWN",
    },
    lobby_created: {
      handler: lobbyHandlers.handleLobbyCreated,
      busEvent: "LOBBY_CREATED",
    },
    joined_lobby: {
      handler: lobbyHandlers.handleJoinedLobby,
      busEvent: "JOINED_LOBBY",
    },
    lobby_update: {
      handler: lobbyHandlers.handleLobbyUpdated,
      busEvent: "LOBBY_UPDATE",
    },
    left_lobby: {
      handler: lobbyHandlers.handleLeftLobby,
      busEvent: "LEFT_LOBBY",
    },
  };

  for (const [serverEvent, { handler, busEvent }] of Object.entries(eventMap)) {
    socket.on(serverEvent, (res) => {
      const data = handler(res);

      eventBus.emit(busEvent, data);
    });
  }
}
