import { getRedisClient } from "./redisClient.js";
import randomCode from "../utils/codeGenerator.js";

const redis = getRedisClient();

export async function createLobby(socketId) {
  try {
    let lobbyCode;
    let attempts = 0;

    do {
      lobbyCode = randomCode();
      attempts++;
      if (attempts > 20) {
        throw new Error("Error with lobby code generation!");
      }
    } while (await redis.exists(`lobby:${lobbyCode}`));

    await redis.hSet(`lobby:${lobbyCode}`, {
      hostId: socketId,
      players: JSON.stringify([socketId]),
      status: "waiting",
    });

    await redis.hSet("socket:lobby", socketId, lobbyCode);
    await redis.sAdd("active:lobbies", lobbyCode);

    return { success: true, lobbyCode, players: [socketId], status: "waiting" };
  } catch (error) {
    console.error("Error creating lobby:", error);
    return { success: false, message: error.message };
  }
}

export async function joinLobby(socketId, lobbyCode) {
  try {
    if (typeof lobbyCode !== "string" || lobbyCode.length === 0) {
      throw new Error("Invalid lobby code!");
    }

    const findLobby = await redis.exists(`lobby:${lobbyCode}`);

    if (findLobby !== 1) {
      throw new Error("Lobby doesn't exist!");
    }

    const lobbyData = await redis.hGetAll(`lobby:${lobbyCode}`);

    if (lobbyData.status === "in-game") {
      throw new Error("Can't join this lobby!");
    }

    let players = [];
    try {
      players = JSON.parse(lobbyData.players);
    } catch (err) {
      console.error("Invalid players data:", err);
      players = [];
    }

    if (players.length >= 4) {
      throw new Error("This lobby is full!");
    } else if (players.includes(socketId)) {
      throw new Error("Player is already in lobby!");
    }

    players.push(socketId);
    await redis.hSet(`lobby:${lobbyCode}`, "players", JSON.stringify(players));
    await redis.hSet("socket:lobby", socketId, lobbyCode);

    return { success: true, lobbyCode, players, status: "ready" };
  } catch (error) {
    console.error("Error joining lobby: ", error);
    return { success: false, message: error.message };
  }
}

// leaveLobby function
// getLobby helper function (maybe in /utils)
// etc......
