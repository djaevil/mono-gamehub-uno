import { getRedisClient } from "./redisClient.js";
import { redisHelpers, utils } from "../helpers/helpers.js";

const redis = getRedisClient();

export async function createLobby(socketId) {
  try {
    let lobbyCode;
    let attempts = 0;

    do {
      lobbyCode = utils.randomCode();
      attempts++;
      if (attempts > 5) {
        // increase and/or optimise when scaling?
        throw new Error("Error with lobby code generation! Try again later.");
      }
    } while (await redis.exists(`lobby:${lobbyCode}`));

    await redis.hSet("socket:lobby", socketId, lobbyCode);

    await redis.hSet(`lobby:${lobbyCode}`, {
      hostId: socketId,
      players: JSON.stringify([socketId]),
      status: "waiting",
    });

    return utils.responseHelper.data("CREATED", "Lobby has been created", {
      lobbyCode,
      players: [socketId],
      status: "waiting",
    });
  } catch (error) {
    console.error("Unexpected error in createLobby: ", error);
    return utils.responseHelper.error(
      "Unexpected error while creating lobby: ",
      error.message
    );
  }
}

export async function joinLobby(socketId, lobbyCode) {
  try {
    let newPlayers;

    if (typeof lobbyCode !== "string" || lobbyCode.length !== 6) {
      return utils.responseHelper.noData("INVALID_CODE", "Invalid lobby code!"); // add validation layer later?
    }

    // using instead of exists() because lobby:lobbycode hash has very few fields to fetch
    const lobbyData = await redisHelpers.getLobbyData(redis, lobbyCode);

    if (lobbyData === null) {
      return utils.responseHelper.noData("MISSING", "Lobby doesn't exist!");
    }

    if (lobbyData.status === "in-game") {
      return utils.responseHelper.noData(
        "IN_GAME",
        "Lobby is currently in-game!"
      );
    }

    newPlayers = lobbyData.players;

    if (players.length >= 4) {
      return utils.responseHelper.noData("FULL", "Lobby is currently full!");
    } else if (players.includes(socketId)) {
      throw new Error("Player is already in the lobby!");
    }
    newPlayers.push(socketId);

    await redis.hSet("socket:lobby", socketId, lobbyCode);
    await redis.hSet(`lobby:${lobbyCode}`, {
      players: JSON.stringify(newPlayers),
      status: "ready",
    });

    return utils.responseHelper.data("JOINED", "Player has joined the lobby!", {
      lobbyCode,
      newPlayers,
      status: "ready",
    });
  } catch (error) {
    console.error("Unexpected error in joinLobby: ", error);
    return utils.responseHelper.error(
      "Unexpected error joining lobby: ",
      error.message
    );
  }
}

export async function leaveLobby(socketId) {
  try {
    let newPlayers;

    const lobbyCode = await redis.hGet("socket:lobby", socketId);

    if (lobbyCode === null) {
      throw new Error("SocketId not linked to any lobbies!");
    }

    const lobbyData = await redisHelpers.getLobbyData(redis, lobbyCode);

    if (lobbyData === null || !lobbyData.players.includes(socketId)) {
      await redisHelpers.cleanupLobby(
        redis,
        lobbyCode,
        socketId,
        true,
        null,
        false
      );

      return utils.responseHelper.noData(
        "NO_LOBBY",
        "Mapping cleaned, no lobby"
      );
    }

    const isEmpty = lobbyData.players.length === 0;
    const isHost = socketId === lobbyData.hostId;
    const isAlone = lobbyData.players.length === 1;

    if (isEmpty) {
      await redisHelpers.cleanupLobby(
        redis,
        lobbyCode,
        socketId,
        true,
        null,
        true
      );
      return utils.responseHelper.noData(
        "EMPTY",
        "Cleaned mapping and lobby, empty lobby"
      );
    }

    if (!isAlone && !isHost) {
      newPlayers = lobbyData.players.filter((p) => p !== socketId);

      await redisHelpers.cleanupLobby(
        redis,
        lobbyCode,
        socketId,
        true,
        newPlayers,
        false
      );
      return utils.responseHelper.noData("LEFT", "Player left lobby");
    } else {
      await redisHelpers.cleanupLobby(
        redis,
        lobbyCode,
        socketId,
        true,
        false,
        true
      );
      return utils.responseHelper.noData("DELETED", "Host left, lobby deleted"); // might add logic for host reassignment
    }
  } catch (error) {
    return utils.responseHelper.error(
      "Unexpected error in leaveLobby: ",
      error.message
    );
  }
}
