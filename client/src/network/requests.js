import socket from "./socket.js";

export function createLobby() {
  console.log("Attempting to create lobby!");
  socket.emit("create_lobby");
}

export function joinLobby(code) {
  socket.emit("join_lobby", code);
}

export function leaveLobby() {
  socket.emit("leave_lobby");
}
