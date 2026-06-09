import axios from "axios";
import type { UserType, UserLoginType } from "../types/users";

const URL = import.meta.env.VITE_BFF_URI;

export const postLogin: (user: UserLoginType) => Promise<UserType> = async (
  user: UserLoginType,
) => {
  try {
    const result = await axios.post(`${URL}/user/login`, user);
    return result.data || [];
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
