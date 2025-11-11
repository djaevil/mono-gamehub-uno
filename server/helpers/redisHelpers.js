// Redis gets passed as a parameter for better testability and scalability

export async function getLobbyData(redis, lobbyCode) {
  const lobbyData = await redis.hGetAll(`lobby:${lobbyCode}`);

  if (Object.keys(lobbyData).length === 0) {
    return null;
  }

  let players = [];
  try {
    players = JSON.parse(lobbyData.players);
  } catch (error) {
    console.error("Invalid players data:", error);
    players = [];
  }

  return {
    hostId: lobbyData.hostId,
    players: players,
    status: lobbyData.status,
  };
}

export async function cleanupLobby(
  redis,
  lobbyCode,
  socketId,
  delMapping,
  newPlayers,
  delLobby
) {
  const multi = redis.multi();

  if (delMapping === true) {
    multi.hDel("socket:lobby", socketId);
  }

  if (delLobby === true) {
    multi.del(`lobby:${lobbyCode}`);
  } else if (newPlayers !== null) {
    multi.hSet(`lobby:${lobbyCode}`, "players", JSON.stringify(newPlayers));
  }

  await multi.exec();
}
