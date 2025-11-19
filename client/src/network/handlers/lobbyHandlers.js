export function handleLobbyCreated(res) {
  console.log("Lobby created");

  return {
    type: "LOBBY_CREATED",
    message: res.message,
    data: res.data,
  };
}

export function handleJoinedLobby(res) {
  console.log("Joined lobby");

  return {
    type: "JOINED_LOBBY",
    message: res,
  };
}

export function handleLobbyUpdated(res) {
  console.log("Updated lobby");

  return {
    type: "LOBBY_UPDATED",
    message: res.message,
    data: res.data,
  };
}

export function handleLeftLobby(res) {
  console.log("Left lobby");

  return {
    type: "LEFT_LOBBY",
    message: res,
  };
}
