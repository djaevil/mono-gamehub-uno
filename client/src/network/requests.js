export function createLobby(socket) {
  socket.emit("create_lobby");
}

export function joinLobby(socket, code) {
  socket.emit("join_lobby", code);
}

export function leaveLobby(socket) {
  socket.emit("leave_lobby");
}
