// Redis gets passed as a parameter for better testability and scalability

export async function getLobbyData(redis, lobbyCode) {
  const lobbyData = await redis.hGetAll(`lobby:${lobbyCode}`); // more efficient than using exists() because less calls and lobby has very few fields to fetch

  if (Object.keys(lobbyData).length === 0) {
    return null;
  }

  let players = [];
  try {
    players = JSON.parse(lobbyData.players);
  } catch (err) {
    console.error("Invalid players data:", err);
    players = [];
  }

  return {
    hostId: lobbyData.hostId,
    players: players,
    status: lobbyData.status,
  };
}
