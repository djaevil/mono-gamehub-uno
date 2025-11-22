import { io } from "socket.io-client";
import registerEventRouter from "./router.js";

const serverURL = import.meta.env.VITE_SERVER_URL;
const socket = io(serverURL);

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  registerEventRouter(socket);
});

export default socket;
