import axios from "axios";
import type { OfferType } from "../types/offers";

const URL = import.meta.env.VITE_BFF_URI;

export const getOffer: (id: string) => Promise<OfferType> = async (
  id: string,
) => {
  const result = await axios.get(`${URL}/offers/${id}`);
  return result.data || [];
};
