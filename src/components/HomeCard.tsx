import { Link } from "react-router-dom";
import type { ProductDetailsType } from "../types";
import { formatEuro } from "../helpers/formatCurrency";

type CardProps = {
  productId: string;
  userAvatarUrl?: string;
  username: string;
  productImgUrl: string;
  productPrice: number;
  productDetails: ProductDetailsType[];
};

export const HomeCard = ({
  productId,
  userAvatarUrl,
  username,
  productImgUrl,
  productPrice,
  productDetails,
}: CardProps) => {
  return (
    <li key={productId} className="grow-0 flex-[24%] mb-8">
      <Link to={`/offer/${productId}`} className="w-full">
        <div className="mb-2 flex gap-2 items-center px-2">
          {userAvatarUrl && (
            <img
              src={userAvatarUrl}
              alt={username}
              className="size-6 rounded-full"
            />
          )}
          <span className="text-xs text-zinc-400">{username}</span>
        </div>

        <img
          src={productImgUrl}
          className="w-full h-100 object-cover rounded-md"
        />

        <ul className="p-2 text-xs">
          <li>{formatEuro(productPrice)}</li>
          <li className="text-zinc-400">
            {productDetails.map((item) => item.TAILLE)}
          </li>
          <li className="text-zinc-400">
            {productDetails.map((item) => item.MARQUE)}
          </li>
        </ul>
      </Link>
    </li>
  );
};
