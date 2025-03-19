import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { IUpdateOrder } from "../../models/IOrder";
import { useCustomers } from "../../hooks/useCustomers";
import { IOrder } from "../../models/IOrder";

interface IRenderUpdateOrderFormProps {
  id: string;
  order: IOrder;
}

export const RenderUpdateOrderForm = ({
  id,
  order,
}: IRenderUpdateOrderFormProps) => {
  const { updateOrderHandler, error } = useCustomers();
  const navigate = useNavigate();
  const [updatedOrder, setUpdatedOrder] =
    useState<IUpdateOrder>({
	customer_id: order.id,
	total_price: order.total_price,
	payment_status: order.payment_status,
	order_status: order.order_status
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id && updatedOrder) {
      await updateOrderHandler(+id, updatedOrder);
    }
    navigate("/admin/handle-orders");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text")
      setUpdatedOrder({
        ...updatedOrder,
        [e.target.name]: e.target.value,
      });
  };

  return (
    <>
      <div className="flex justify-center">
        <form action="" className="flex flex-col gap-5">
          <label>
            Order Status:{" "}
            <input
              name="order_status"
              defaultValue={order.order_status}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>







       

      


          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
