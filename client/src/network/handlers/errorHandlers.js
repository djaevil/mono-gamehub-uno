// currently handling many errors similarly, might change in the future as this is only preliminary

export function handleUnknown(res) {
  console.warn("Unknown behavior!", res.message);

  return {
    type: "UNKNOWN",
    message: res.message,
  };
}

export function handleServerError(res) {
  console.error("SERVER ERROR!", res.message);

  return {
    type: "SERVER_ERROR",
    message: res.message,
  };
}

export function handleUserError(res) {
  console.error("USER ERROR!", res.message);

  return {
    type: "USER_ERROR",
    message: res.message,
  };
}

export function handleJoinFailed(res) {
  console.error("JOIN FAILED!", res);

  return {
    type: "JOIN_FAILED",
    message: res,
  };
}

export function handleNoLobby(res) {
  console.warn("Unusual behavior!", res);

  return {
    type: "NO_LOBBY",
    message: "Empty or no Lobby",
  };
}
