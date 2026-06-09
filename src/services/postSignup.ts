import axios from "axios";
import type { UserType } from "../types/users";

const URL = import.meta.env.VITE_BFF_URI;

export const postSignup: (formData: FormData) => Promise<UserType> = async (
  // user: UserSignupType,
  formData: FormData,
) => {
  try {
    const result = await axios.post(`${URL}/user/signup`, formData);
    return result.data || [];
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
