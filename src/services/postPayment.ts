/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { PaymentData } from "../types/payment";

const URL = import.meta.env.VITE_BFF_URI;

export const postPayment: (
  token: string,
  data: PaymentData,
) => Promise<any> = async (token: string, data: PaymentData) => {
  try {
    const result = await axios.post(`${URL}/payment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data || [];
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};
