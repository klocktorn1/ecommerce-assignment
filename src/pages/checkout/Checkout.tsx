import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useCallback } from 'react';
import React from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51R4KznRteeBh27q3nnAbsA2ih5HV2vyzmWzq2yWxccm2551bekfb03jb1Bxy32klh5KpqhvG2oRtEwHQgWe6Ru0W00jjcSutvD');

function Checkout() {
  const fetchClientSecret = React.useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:3000/create-checkout-session-embedded", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Checkout

