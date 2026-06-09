import { useState } from "react";

import { Hero } from "../components/Hero";
import { HomeCard } from "../components/HomeCard";
import useAsyncEffect from "../hooks/useAsyncEffect";
import { getOffers } from "../services/getOffers";

import { useSearchParams } from "react-router-dom";
import type { OffersDataType } from "../types/offers";
import { Pagination } from "../components/atoms/Pagination";

const LIMIT = 8;

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [offersData, setOffersData] = useState<OffersDataType | undefined>(
    undefined,
  );

  const [searchParams] = useSearchParams();

  const pagesTab = [];
  let pageNumber = 1;
  if (offersData) {
    for (let i = 1; i <= offersData.count; i = i + LIMIT) {
      pagesTab.push(pageNumber);
      pageNumber++;
    }
  }

  useAsyncEffect(async () => {
    const result = await getOffers({
      sort: searchParams.get("sort")!,
      priceMin: searchParams.get("priceMin")!,
      priceMax: searchParams.get("priceMax")!,
      title: searchParams.get("title")!,
      limit: LIMIT,
      page,
    });
    setOffersData(result);
    setIsLoading(false);
  }, [searchParams, page]);

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
          <>
            <ul className="flex flex-wrap gap-4">
              {offersData?.offers.map((offer) => (
                <HomeCard
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

            {offersData && (
              <Pagination
                setPage={setPage}
                limit={LIMIT}
                pagesTab={pagesTab}
                data={offersData}
                currentPage={page}
              />
            )}
          </>
        )}
      </main>
    </>
  );
};
