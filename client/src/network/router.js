import * as errorHandlers from "./handlers/errorHandlers.js";

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
    lobby_created: {},
    joined_lobby: {},
    lobby_update: {},
    left_lobby: {},
  };

  for (const [serverEvent, { handler, busEvent }] of Object.entries(eventMap)) {
    socket.on(serverEvent, (res) => {
      const data = handler(res);

      eventBus.emit(busEvent, data);
    });
  }
}
