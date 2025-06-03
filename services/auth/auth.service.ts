import { TOKEN_KEY } from "./auth.constant";

export const getAccessToken = async () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const deleteAccessToken = () => {
  sessionStorage.clear();
};
