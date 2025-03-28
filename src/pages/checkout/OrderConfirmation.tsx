import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { handleRequest } from "../../services/baseService";
import { useEffect, useState } from "react";
import { IOrderById } from "../../models/IOrder";
import { formatDate } from "../../utils/dateUtils";
import { useCart } from "../../hooks/useCart";

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<IOrderById>();
  const { emptyHandler } = useCart();

  useEffect(() => {
    emptyHandler();
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

  const totalAmountArray = order?.order_items.map(
    (oi) => oi.unit_price * oi.quantity
  );
  const initialValue = 0;
  const sumOfCart = totalAmountArray?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  return (
    <>
      {order && (
        <div className="flex justify-center mt-10 font-bebas text-lg">
          <div className="flex flex-col items-center shadow-md shadow-[#939393] w-1/4">
            <h2>Your order has been confirmed!</h2>
            <p>{order.created_at}</p>
            <p>
              Name: {order.customer_firstname} {order.customer_lastname}
            </p>
            <div className=" flex flex-col gap-5">
              {order.order_items.map((oi, i) => (
                <ul className="border-2">
                  <li>
                    {oi.product_name} x {oi.quantity}
                  </li>
                  <li>{oi.unit_price * oi.quantity} SEK </li>
                </ul>
              ))}
            </div>
            <p>Total: {sumOfCart} SEK</p>
            <p>Order placed at: {formatDate(order.created_at)}</p>
          </div>
        </div>
      )}
    </>
  );
};
