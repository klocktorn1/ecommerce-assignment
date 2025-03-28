import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { handleRequest } from "../../services/baseService";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { IStripePayment } from "../../models/IStripePayment";
import { useParams } from "react-router-dom";
import { ICreateOrder } from "../../models/IOrder";
import { useOrders } from "../../hooks/useOrders";

function Payment() {
  const { id } = useParams();
  const { cart } = useContext(CartContext);
  const [createdOrder, setCreatedOrder] = useState<ICreateOrder>();
  const [orderId, setOrderId] = useState<number>();
  const { createOrderHandler } = useOrders();
  const [payload, setPayload] = useState<IStripePayment>();
  const [sessionId, setSessionId] = useState<string>()

  useEffect(() => {
    setCreatedOrder({
      customer_id: +id!,
      payment_status: "unpaid",
      payment_id: sessionId!,
      order_status: "pending",
      order_items: cart.map((ci) => {
        return {
          product_id: ci.product.id,
          product_name: ci.product.name,
          quantity: ci.amount,
          unit_price: ci.product.price,
        };
      }),
    });
  }, []);

  useEffect(() => {
    const getOrderId = async () => {
      if (createdOrder) {
        const response = await createOrderHandler(createdOrder);
        setOrderId(response.id);
      }
    };
    getOrderId();
  }, [createdOrder]);

  useEffect(() => {
    if (orderId) {
      setPayload({
        client_reference_id: orderId,
        line_items: cart.map((ci) => ({
          price_data: {
            currency: "sek",
            product_data: {
              name: ci.product.name,
              images: [ci.product.image]
            },
            unit_amount: ci.product.price * 100,
          },
          quantity: ci.amount,
        })),
      });
    }
  }, [orderId]);



  if (payload) {
    const fetchClientSecret = async () => {
      const response = await handleRequest(
        axios.post(
          "http://localhost:3000/create-checkout-session-embedded",
          payload
        )
      );
      setSessionId(response.session_id);
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
}

export default Payment;



