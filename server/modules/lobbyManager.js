import { getRedisClient } from "./redisClient.js";
import { redisHelpers, utilHelpers } from "../helpers/helpers.js";

const redis = getRedisClient();

export async function createLobby(socketId) {
  try {
    let lobbyCode;
    let attempts = 0;

    do {
      lobbyCode = utilHelpers.randomCode();
      attempts++;
      if (attempts > 20) {
        throw new Error("Error with lobby code generation! Try again later.");
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

    const lobbyData = await redisHelpers.getLobbyData(redis, lobbyCode);

    if (lobbyData === null) {
      throw new Error("Lobby doesn't exist!");
    }

    if (lobbyData.status === "in-game") {
      throw new Error("Can't join this lobby!");
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

export async function leaveLobby(socketId) {
  try {
    const getLobbyFromSocket = await redis.hGet("socket:lobby", socketId);

    if (getLobbyFromSocket === null) {
      throw new Error("Player/SocketId not in active lobby!");
    }

    const lobbyData = await redisHelpers.getLobbyData(
      redis,
      getLobbyFromSocket
    );

    if (lobbyData === null) {
      throw new Error("Lobby doesn't exist!"); // ?
    }

    // players.length > 0
    // no ->
    // call remove lobby:lobbycode and remove socket:lobby -> return success: true
    // yes ->
    // check if socketId is in players,
    // no -> ???
    // yes ->
    // check if socketId === hostId
    // no -> remove socketId from players
    // yes ->
  } catch (error) {}
}
