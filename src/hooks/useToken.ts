import Cookies from "js-cookie";

export const useToken = () => {
  const token = Cookies.get("oauth.access.token");

  if (token) return token;
  else return null;
};
