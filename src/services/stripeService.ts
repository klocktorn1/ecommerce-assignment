import { loadStripe } from "@stripe/stripe-js";
import { handleRequest } from "./baseService";
import axios from "axios";
import { IStripePayment } from "../models/IStripePayment";


const payload: IStripePayment = {
  line_items: {
    price_data: {
      currency: "sek",
      product_data: {
        name: "ci.product.name",
      },
      unit_amount: 2100,
    },
    quantity: 2,
  },
};

// const { cart } = useCart();
// const payload: IStripePayment[] = cart.map((ci) => {
//   return {
//     line_items: {
//       price_data: {
//         currency: "sek",
//         product_data: {
//           name: ci.product.name,
//         },
//         unit_amount: ci.product.price,
//       },
//       quantity: ci.amount,
//     },
//   };
// });

export const fetchClientSecret = async () => {
  const response = await handleRequest(
    axios.post(
      "http://localhost:3000/create-checkout-session-embedded",
      payload
    )
  );

  // const sessionId = response.session_id
  // console.log(sessionId);

  return response.clientSecret;
};

export const stripePromise = loadStripe(
  "pk_test_51R4KznRteeBh27q3nnAbsA2ih5HV2vyzmWzq2yWxccm2551bekfb03jb1Bxy32klh5KpqhvG2oRtEwHQgWe6Ru0W00jjcSutvD"
);

export const options = { fetchClientSecret };

// const fetchClientSecret = () => {
//   // Create a Checkout Session
//   return fetch("http://localhost:3000/create-checkout-session-embedded", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ cartItems }),
//   })
//     .then((res) => res.json())
//     .then((data) => data.clientSecret);
// };
