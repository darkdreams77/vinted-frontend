import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { postPayment } from "../services/postPayment";
import { useToken } from "../hooks/useToken";
import type {
  StripeCardElementChangeEvent,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { PriceSummary } from "./PriceSummary";
import { ProductSummary } from "./ProductSummary";
import { useNavigate } from "react-router-dom";

type CheckoutFormProps = {
  description: string;
  amount: number;
  currency: StripeElementsOptions["currency"];
  productId: string;
  protectionFees: number;
  shippingFees: number;
  productPrice: number;
};

const CheckoutForm = ({
  amount,
  currency,
  productId,
  description,
  protectionFees,
  shippingFees,
  productPrice,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const token = useToken();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setErrorMessage(event.error?.message ?? null);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    if (stripe == null || elements == null) {
      setIsLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (cardElement == null) {
      setErrorMessage("Le formulaire de carte n'est pas disponible.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await postPayment(token!, {
        amount,
        currency,
        description,
        id: productId,
      });

      const clientSecret = response.client_secret;

      const stripeResponse = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeResponse.error) {
        setErrorMessage(
          stripeResponse.error.message ?? "Le paiement a échoué.",
        );
        return;
      }

      if (stripeResponse.paymentIntent?.status === "succeeded") {
        setComplete(true);

        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur est survenue pendant le paiement.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return complete ? (
    <div className="my-10 w-1/2 mx-auto bg-emerald-100 border border-emerald-200 p-2 rounded-sm text-emerald-800">
      <p>Paiement effectué ✅</p>
    </div>
  ) : (
    <div className="my-10 w-1/2 mx-auto">
      <PriceSummary
        price={productPrice}
        protectionFees={protectionFees}
        shippingFees={shippingFees}
        totalPrice={amount}
      />

      <ProductSummary productName={description} totalPrice={amount} />
      <form onSubmit={handleSubmit}>
        <CardElement
          onChange={handleCardChange}
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#1d1d1b",
                fontFamily: "inherit",
                "::placeholder": {
                  color: "#9ca3af",
                },
              },
              invalid: {
                color: "#e8445a",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !elements || isLoading}
          className="button filled mt-10 w-full p-2"
        >
          Payer l'article
        </button>
        {errorMessage && (
          <div className="mt-2 text-sm text-error">{errorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
