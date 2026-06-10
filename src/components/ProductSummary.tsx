import { formatEuro } from "../helpers/formatCurrency";

type ProductSummaryProps = {
  productName: string;
  totalPrice: number;
};

export const ProductSummary = ({
  productName,
  totalPrice,
}: ProductSummaryProps) => {
  return (
    <div className="my-10 w-1/2 mx-auto">
      Il ne vous reste plus qu'une étape pour vous offrir
      <span className="font-bold"> {productName}</span>. Vous allez payer{" "}
      <span className="font-bold">{formatEuro(totalPrice)}</span> (frais de
      protection et frais de port inclus).
    </div>
  );
};
