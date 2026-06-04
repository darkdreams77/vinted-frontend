import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import useAsyncEffect from "../hooks/useAsyncEffect";
import { getOffer } from "../services/getOffer";

import type { OfferType } from "../types/offers";
import { TbChevronLeft } from "react-icons/tb";
import { OfferCard } from "../components/OfferCard";

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
      <div className="my-10">
        <Link to="/" className="flex items-center gap-2">
          <TbChevronLeft /> Retour à l'accueil
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-between gap-8">
          <div className="skeleton w-full h-150"></div>
          <div className="skeleton w-full h-150"></div>
        </div>
      ) : (
        <div className="flex gap-10 justify-around items-stretch">
          {offerData && (
            <>
              <img
                src={offerData.product_image.secure_url}
                className="h-150 object-cover rounded-sm"
              />
              <OfferCard
                id={offerData._id}
                productPrice={offerData.product_price}
                productDetails={offerData.product_details}
                productTitle={offerData.product_name}
                productDescription={offerData.product_description}
                {...(offerData.owner.account.avatar && {
                  userAvatarUrl: offerData.owner.account.avatar.secure_url,
                })}
                username={offerData.owner.account.username}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
