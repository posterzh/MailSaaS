import React, { useState, useEffect } from "react";

import {
  formatHeader,
  toggleTopLoader,
  toastOnSuccess,
  toastOnError,
  messages,
} from "../../../../utils/Utils";
import axios from "../../../../utils/axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Upgrade
      </button>
    </form>
  );
};

const UpgradeSubscription = (props) => {
  const [stripeApiKey, setStripeApiKey] = useState(null);

  useEffect(async () => {
    try {
      toggleTopLoader(true);

      const { data } = await axios.get(
        "/subscriptions/api/upgrade-subscription/"
      );
      console.log(data);

      setStripeApiKey(data.stripe_api_key);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  });
  return (
    <>
      <h1>Upgrade Subscription</h1>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default UpgradeSubscription;
