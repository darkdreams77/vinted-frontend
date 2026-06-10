import type { StripeElementsOptions } from "@stripe/stripe-js";

export type PaymentData = {
  amount: number;
  currency: StripeElementsOptions["currency"];
  id: string;
  description: string;
};
