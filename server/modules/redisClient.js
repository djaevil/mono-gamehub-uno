import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

let pubClient, subClient, generalClient;

export function initRedisClient(io, redisPort) {
  pubClient = new Redis(redisPort);
  subClient = pubClient.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  pubClient.on("error", (err) => {
    console.log("[PubClient] Error: ", err);
  });

  subClient.on("error", (err) => {
    console.log("[SubClient] Error: ", err);
  });

  generalClient = new Redis(redisPort);

  generalClient.on("error", (err) => {
    console.error("[GeneralClient] error:", err);
  });

  console.log("Redis initialized!");
}

export function getRedisClient() {
  if (!generalClient) {
    throw new Error("Redis client not initialized yet!");
  }
  return generalClient;
}
