import { io } from "socket.io-client";

const serverURL = import.meta.env.VITE_SERVER_URL;
const socket = io(serverURL);

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});
