import { formatEuro } from "../helpers/formatCurrency";

type PriceSummaryProps = {
  price: number;
  protectionFees: number;
  shippingFees: number;
  totalPrice: number;
};

export const PriceSummary = ({
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}: PriceSummaryProps) => {
  return (
    <div className="mx-auto w-1/2 mt-10 bg-zinc-100 p-4 rounded-sm border border-zinc-200">
      <h1 className="text-xl font-semibold mb-4">Résumé de la commande</h1>
      <div className="content">
        <ul>
          <li className="flex justify-between">
            Commande <span>{formatEuro(price)}</span>
          </li>
          <li className="flex justify-between">
            Frais protection acheteurs <span>{formatEuro(protectionFees)}</span>
          </li>
          <li className="flex justify-between">
            Frais de port <span>{formatEuro(shippingFees)}</span>
          </li>
        </ul>
      </div>
      <div className="border-b border-b-zinc-200 my-2" />
      <div className="content">
        <ul>
          <li className="flex justify-between font-bold ">
            Total <span>{formatEuro(totalPrice)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
