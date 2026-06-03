import { formatEuro } from "../helpers/formatCurrency";
import type { ProductDetailsType } from "../types";

export type OfferCardProps = {
  productPrice: number;
  productDetails: ProductDetailsType[];
  productTitle: string;
  productDescription: string;
  userAvatarUrl?: string;
  username: string;
  id: string;
};

export const OfferCard = ({
  id,
  productPrice,
  productDetails,
  productTitle,
  productDescription,
  userAvatarUrl,
  username,
}: OfferCardProps) => {
  return (
    <div
      className="bg-white rounded-sm border border-zinc-200 w-100 p-8 flex flex-col justify-between"
      id={id}
    >
      <div>
        <h2 className="text-2xl mb-6">{formatEuro(productPrice)}</h2>
        <ul>
          {productDetails.map((item, index) => (
            <li key={index} className="flex justify-between items-start mb-0.5">
              <span className="w-1/2 text-sm text-zinc-400">
                {Object.keys(item)}
              </span>
              <span className="w-1/2 text-sm text-zinc-800">
                {Object.values(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b border-b-zinc-300"></div>
      <div>
        <h1 className="font-semibold">{productTitle}</h1>
        <p className="mt-2 text-zinc-500">{productDescription}</p>
        <div className="mt-2 flex items-center justify-start gap-4">
          {userAvatarUrl && (
            <img
              src={userAvatarUrl}
              alt={`Avatar de ${username}`}
              className="size-12 rounded-full"
            />
          )}
          <span>{username}</span>
        </div>
      </div>
      <div className="mt-4">
        <button className="button filled w-full">Acheter</button>
      </div>
    </div>
  );
};
