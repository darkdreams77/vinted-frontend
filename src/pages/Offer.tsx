import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { useState } from "react";
import type { OfferType } from "../types";
import { getOffer } from "../services/getOffer";

export const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [offerData, setOfferData] = useState<OfferType | undefined>(undefined);

  useAsyncEffect(async () => {
    if (id) {
      const result = await getOffer(id);
      setOfferData(result);
      console.log("result.data", result);
      setIsLoading(false);
    }
  }, [id]);

  return (
    <div>
      <div className="my-8">
        <Link to="/">Go back home</Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-between gap-8">
          <div className="skeleton w-full h-42"></div>
          <div className="skeleton w-full h-42"></div>
          <div className="skeleton w-full h-42"></div>
          <div className="skeleton w-full h-42"></div>
        </div>
      ) : (
        <>
          {offerData?.product_name}

          <img src={offerData?.product_image.secure_url} />
        </>
      )}
    </div>
  );
};
