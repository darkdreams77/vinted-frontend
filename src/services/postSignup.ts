import axios from "axios";
import type { UserCreatedType, UserSignupType } from "../types/users";

const URL = import.meta.env.VITE_BFF_URI;

export const postSignup: (
  user: UserSignupType,
) => Promise<UserCreatedType> = async (user: UserSignupType) => {
  const formData = new FormData();

  Object.entries(user).forEach(([key, value]) => {
    if (value === undefined) return;

    if (value instanceof File) {
      formData.set(key, value);
      return;
    }

    formData.set(key, String(value));
  });

  const result = await axios.post(`${URL}/user/signup`, formData);
  return result.data || [];
};
