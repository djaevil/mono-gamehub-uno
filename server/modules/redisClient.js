import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

let pubClient;
let subClient;

export function initRedisClient(ioServer, redisPort) {
  pubClient = new Redis(redisPort);
  subClient = pubClient.duplicate();

  ioServer.adapter(createAdapter(pubClient, subClient));

  pubClient.on("error", (err) => {
    console.log("Error: ", err);
  });

  subClient.on("error", (err) => {
    console.log("Error: ", err);
  });

  console.log("Redis initialized!");
}

export function getRedisClient() {
  if (!pubClient) {
    throw new Error("Redis client not initialized yet!");
  }
  return pubClient;
}
