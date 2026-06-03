import axios from "axios";
import type { OffersDataType } from "../types";

const URL = import.meta.env.VITE_BFF_URI;

export const getOffers: () => Promise<OffersDataType> = async () => {
  const result = await axios.get(`${URL}/offers`);
  return result.data || [];
};
