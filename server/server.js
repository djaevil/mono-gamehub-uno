import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import initSockets from "./socket.js";

dotenv.config();

const clientURL = process.env.CLIENT_URL;
const serverPort = process.env.SERVER_PORT;
const redisPort = process.env.REDIS_PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

initSockets(server, clientURL, redisPort);

server.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
