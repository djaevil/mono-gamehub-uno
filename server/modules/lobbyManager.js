import { getRedisClient } from "./redisClient.js";
import { redisHelpers, utils } from "../helpers/helpers.js";

export async function createLobby(socketId) {
  try {
    const redis = getRedisClient();

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

    await redis.hset("socket:lobby", socketId, lobbyCode);

    await redis.hset(`lobby:${lobbyCode}`, {
      hostId: socketId,
      players: JSON.stringify([socketId]),
      status: "waiting",
    });

    return utils.responseHelper.data("CREATED", "Lobby has been created", {
      lobbyCode: lobbyCode,
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
    const redis = getRedisClient();
    let newPlayers;

    // using instead of exists() because lobby:lobbycode hash has very few fields to fetch
    const lobbyData = await redisHelpers.getLobbyData(redis, lobbyCode);

    if (lobbyData === null) {
      return utils.responseHelper.noData("FAIL", "Lobby doesn't exist!");
    }

    if (lobbyData.status === "in-game") {
      return utils.responseHelper.noData("FAIL", "Lobby is currently in-game!");
    }

    newPlayers = lobbyData.players;

    if (newPlayers.length >= 4) {
      return utils.responseHelper.noData("FAIL", "Lobby is currently full!");
    } else if (newPlayers.includes(socketId)) {
      throw new Error("Player is already in the lobby!");
    }
    newPlayers.push(socketId);

    await redis.hset("socket:lobby", socketId, lobbyCode);
    await redis.hset(`lobby:${lobbyCode}`, {
      players: JSON.stringify(newPlayers),
      status: "ready",
    });

    return utils.responseHelper.data("JOINED", "Player has joined the lobby!", {
      lobbyCode: lobbyCode,
      players: newPlayers,
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
    const redis = getRedisClient();
    let newPlayers;

    const lobbyCode = await redis.hget("socket:lobby", socketId);

    if (lobbyCode === null) {
      return utils.responseHelper.noData(
        "NO_LOBBY",
        "SocketId not linked to any lobbies!"
      );
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

    const playerAmount = lobbyData.players.length;
    const isEmpty = playerAmount === 0;
    const isHost = socketId === lobbyData.hostId;
    const isAlone = playerAmount === 1;
    const status = playerAmount > 2 ? "ready" : "waiting";

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
      return utils.responseHelper.data("LEFT", "Player left lobby", {
        lobbyCode: lobbyCode,
        players: newPlayers,
        status: status,
      });
    } else {
      await redisHelpers.cleanupLobby(
        redis,
        lobbyCode,
        socketId,
        true,
        false,
        true
      );
      return utils.responseHelper.data(
        "DELETED",
        "Host or last player left, lobby deleted",
        {
          lobbyCode: lobbyCode,
        }
      ); // might add logic for host reassignment
    }
  } catch (error) {
    return utils.responseHelper.error(
      "Unexpected error in leaveLobby: ",
      error.message
    );
  }
}
