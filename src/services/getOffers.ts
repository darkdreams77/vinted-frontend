import axios from "axios";
import type { OffersDataType } from "../types/offers";

const URL = import.meta.env.VITE_BFF_URI;

type GetOffersProps = {
  title?: string;
  sort?: string;
  priceMin?: string;
  priceMax?: string;
  limit?: number;
  page?: number;
};

export const getOffers: (
  props: GetOffersProps,
) => Promise<OffersDataType> = async ({
  title,
  sort,
  priceMin,
  priceMax,
  limit,
  page,
}: GetOffersProps) => {
  const haveFilter = sort || priceMin || priceMax || limit || page || title;
  const filters = `${haveFilter && "?"}${sort ? `sort=${sort}&` : ``}${priceMin ? `priceMin=${priceMin}&` : ``}${priceMax ? `priceMax=${priceMax}&` : ``}${limit ? `limit=${limit}&` : ``}${page ? `page=${page}&` : ``}${title ? `title=${title}` : ``}`;

  try {
    const result = await axios.get(`${URL}/offers${filters}`);
    return result.data || [];
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
