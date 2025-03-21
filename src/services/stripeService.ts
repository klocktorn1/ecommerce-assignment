import { loadStripe } from "@stripe/stripe-js";
import { handleRequest } from "./baseService";
import axios from "axios";

const fetchClientSecret = () => {
  // Create a Checkout Session
  return fetch("http://localhost:3000/create-checkout-session-embedded", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

export const options = { fetchClientSecret };

export const stripePromise = loadStripe(
  "pk_test_51R4KznRteeBh27q3nnAbsA2ih5HV2vyzmWzq2yWxccm2551bekfb03jb1Bxy32klh5KpqhvG2oRtEwHQgWe6Ru0W00jjcSutvD"
);



// Cant get axios request to work for some reason


// export const getClientSecret = async () => {
//   const data = await handleRequest(
//     axios.post("http://localhost:3000/create-checkout-session-embedded")
//   );
//   return data;
// };
