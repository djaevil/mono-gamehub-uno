export function randomCode() {
  return JSON.stringify(Math.floor(100000 + Math.random() * 900000)); //6-digit code STRING for lobbies
}
