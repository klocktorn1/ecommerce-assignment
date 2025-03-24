import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { handleRequest } from "../../services/baseService";
import { useEffect, useState } from "react";
import { IOrderById } from "../../models/IOrder";
import { formatDate } from "../../utils/dateUtils";

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<IOrderById>();

  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  useEffect(() => {
    const getOrderByPaymentId = async () => {
      const response = await handleRequest(
        axios.get(`http://localhost:3000/orders/payment/${sessionId}`)
      );
      setOrder(response);
      return response;
    };
    getOrderByPaymentId();
  }, []);

  return (
    <>
      {order && (
        <div>
          <h2>Your order has been confirmed!</h2>
          <p>{order.created_at}</p>
          <p>
            Name: {order.customer_firstname} {order.customer_lastname}
          </p>
          Items:{" "}
          {order.order_items.map((oi, i) => (
            <ul className="border-2" key={i}>
              <li>
                {oi.product_name} x {oi.quantity}
              </li>
              <li>{oi.unit_price} SEK </li>
            </ul>
          ))}
          <p>Order placed at: {formatDate(order.created_at)}</p>
        </div>
      )}
    </>
  );
};
