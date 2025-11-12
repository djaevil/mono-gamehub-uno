export function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000)); //6-digit code STRING for lobbies
}

export const responseHelper = {
  data: (status, message, data) => ({ status, message, data }),
  noData: (status, message) => ({ status, message }),
  error: (message, error) => ({ status: "ERROR", message, error }),
};
