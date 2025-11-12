import { createLobby, joinLobby, leaveLobby } from "../modules/lobbyManager";

export default function registerLobbyEvents(socket) {
  socket.on("create_lobby", handleCreateLobby);
}

async function handleCreateLobby() {
  const result = await createLobby(socketId);
  if (result.status === "ERROR") {
    socket.emit("serverError", result.message);
  } else {
    socket.join(result.data.lobbyCode);
  }
}
