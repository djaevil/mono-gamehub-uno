import { createLobby, joinLobby, leaveLobby } from "../modules/lobbyManager.js";

export default function registerLobbyEvents(io, socket) {
  socket.on("create_lobby", async () => handleCreateLobby(socket));
  socket.on("join_lobby", async (code) => handleJoinLobby(io, socket, code));
  socket.on("leave_lobby", async () => handleLeaveLobby(io, socket));
  socket.on("disconnect", async () => handleDisconnect(io, socket));
}

async function handleCreateLobby(socket) {
  const result = await createLobby(socket.id);
  switch (result.status) {
    case "ERROR":
      socket.emit("server_error", result);
      break;
    case "CREATED":
      socket.join(result.data.lobbyCode);
      socket.emit("lobby_created", result.data);
      break;
    default:
      socket.emit("unknown");
  }
}

async function handleJoinLobby(io, socket, code) {
  const lobbyCode = String(code).trim();

  if (lobbyCode.length !== 6) {
    socket.emit("user_error", "Invalid lobby code!");
  } else {
    const result = await joinLobby(socket.id, lobbyCode);

    switch (result.status) {
      case "ERROR":
        socket.emit("server_error", result);
        break;
      case "JOINED":
        socket.join(result.data.lobbyCode);
        socket.emit("joined_lobby");
        io.to(result.data.lobbyCode).emit("lobby_update", result.data);
        break;
      case "FAIL":
        socket.emit("join_failed", result.message);
        break;
      default:
        socket.emit("unknown");
    }
  }
}

async function handleLeaveLobby(io, socket) {
  const result = await leaveLobby(socket.id);

  switch (result.status) {
    case "ERROR":
      socket.emit("server_error", result);
      break;
    case "LEFT":
      socket.leave(result.data.lobbyCode);
      socket.emit("left_lobby");
      io.to(result.data.lobbyCode).emit("lobby_update", result.data);
      break;
    case "DELETED":
      io.to(result.data.lobbyCode).emit("left_lobby");
      io.socketsLeave(result.data.lobbyCode);
      break;
    case "NO_LOBBY":
    case "EMPTY":
      socket.emit("no_lobby", result.message);
      break;
    default:
      socket.emit("unknown");
  }
}

async function handleDisconnect(io, socket) {
  const result = await leaveLobby(socket.id);

  switch (result.status) {
    case "ERROR":
      console.log("server_error", result);
      break;
    case "LEFT":
      io.to(result.data.lobbyCode).emit("lobby_update", result.data);
      break;
    case "DELETED":
      io.to(result.data.lobbyCode).emit("left_lobby");
      io.socketsLeave(result.data.lobbyCode);
      break;
    case "NO_LOBBY":
    case "EMPTY":
      console.log("no_lobby", result.message);
      break;
    default:
      console.log("unknown");
  }
}
