import { useState } from "react";

import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { getOffers } from "../services/getOffers";

import type { OffersDataType } from "../types";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offersData, setOffersData] = useState<OffersDataType | undefined>(
    undefined,
  );

  useAsyncEffect(async () => {
    const result = await getOffers();
    setOffersData(result);
    console.log("result.data", result);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Hero />

      <main className="">
        {isLoading ? (
          <div className="flex items-center justify-between gap-8">
            <div className="skeleton w-full h-42"></div>
            <div className="skeleton w-full h-42"></div>
            <div className="skeleton w-full h-42"></div>
            <div className="skeleton w-full h-42"></div>
          </div>
        ) : (
          <ul className="flex flex-wrap gap-4">
            {offersData?.offers.map((offer) => (
              <Card
                key={offer._id}
                productId={offer._id}
                {...(offer.owner.account.avatar && {
                  userAvatarUrl: offer.owner.account.avatar.secure_url,
                })}
                username={offer.owner.account.username}
                productImgUrl={offer.product_image.secure_url}
                productPrice={offer.product_price}
                productDetails={offer.product_details}
              />
            ))}
          </ul>
        )}
      </main>
    </>
  );
};
