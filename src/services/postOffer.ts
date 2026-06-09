import axios from "axios";
import type { OfferType } from "../types/offers";

const URL = import.meta.env.VITE_BFF_URI;

export const postOffer: (
  formData: FormData,
  token: string,
) => Promise<OfferType> = async (
  // user: UserSignupType,
  formData: FormData,
  token: string,
) => {
  try {
    const result = await axios.post(`${URL}/offer/publish`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data || [];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};
