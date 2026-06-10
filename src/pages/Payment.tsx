import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useToken } from "../hooks/useToken";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { PriceSummary } from "../components/PriceSummary";
import { ProductSummary } from "../components/ProductSummary";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export const Payment = () => {
  const token = useToken();
  const location = useLocation();

  if (!token) return;

  const {
    productId,
    productTitle,
    totalPrice,
    protectionFees,
    shippingFees,
    price,
  } = location.state;

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
  };

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          description={productTitle}
          amount={totalPrice}
          currency={options.currency}
          productId={productId}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          price={price}
        />
      </Elements>
    </>
  );
};
