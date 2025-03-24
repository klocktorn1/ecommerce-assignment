import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { handleRequest } from "../../services/baseService";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { IStripePayment } from "../../models/IStripePayment";
import { useParams } from "react-router-dom";

function Payment() {
  const {id} = useParams()  
  const { cart } = useContext(CartContext);

  const payload: IStripePayment = {
    client_reference_id: +id!,
    line_items: cart.map((ci) => ({
      price_data: {
        currency: "sek",
        product_data: {
          name: ci.product.name,
        },
        unit_amount: ci.product.price,
      },
      quantity: ci.amount,
    })),
  };

 
useEffect(() => {
  localStorage.removeItem("cart")
}, [])


  const fetchClientSecret = async () => {
    const response = await handleRequest(
      axios.post(
        "http://localhost:3000/create-checkout-session-embedded",
        payload
      )
    );
    console.log(response.session_id);
    

    return response.clientSecret;
  };

  const stripePromise = loadStripe(
    "pk_test_51R4KznRteeBh27q3nnAbsA2ih5HV2vyzmWzq2yWxccm2551bekfb03jb1Bxy32klh5KpqhvG2oRtEwHQgWe6Ru0W00jjcSutvD"
  );

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default Payment;
