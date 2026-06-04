import { useToken } from "./useToken";

export const useAuthenticated = () => (useToken() ? true : false);
