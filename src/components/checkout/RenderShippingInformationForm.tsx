import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IUpdateAndCreateCustomer } from "../../models/ICustomer";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../../hooks/useCustomers";
import { CartContext } from "../../contexts/CartContext";
import { ICreateOrder } from "../../models/IOrder";
import { useOrders } from "../../hooks/useOrders";

export const RenderShippingInformationForm = () => {
  const { createCustomerHandler, error, isLoading } = useCustomers();
  const {createOrderHandler} = useOrders()
  const navigate = useNavigate();

  const [createdCustomer, setCreatedCustomer] =
    useState<IUpdateAndCreateCustomer | null>(() => {
      const cachedCustomer = localStorage.getItem("customer");
      return cachedCustomer ? JSON.parse(cachedCustomer) : null;
    });

  const { cart } = useContext(CartContext);
  console.log(cart);

  const [createdOrder, setCreatedOrder] = useState<ICreateOrder>();


  useEffect(() => {
    createOrderHandler(createdOrder!)
  }, [createdOrder])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !createdCustomer?.firstname ||
      !createdCustomer?.lastname ||
      !createdCustomer?.city ||
      !createdCustomer?.country ||
      !createdCustomer?.email ||
      !createdCustomer?.phone ||
      !createdCustomer?.postal_code ||
      !createdCustomer?.street_address
    ) {
      alert("no");
      return;
    }

    if (createdCustomer) {
      const customerId = await createCustomerHandler(createdCustomer);
      console.log(customerId);
      setCreatedOrder({
        customer_id: customerId,
        payment_status: "unpaid",
        payment_id: null,
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

      //   localStorage.clear()
    }
    navigate("/");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text")
      setCreatedCustomer({
        ...createdCustomer!,
        [e.target.name]: e.target.value,
      });

    if (e.target.type === "number") {
      setCreatedCustomer({
        ...createdCustomer!,
        [e.target.name]: +e.target.value,
      });
    }
  };

  useEffect(() => {
    if (createdCustomer) {
      localStorage.setItem("customer", JSON.stringify(createdCustomer));
    }
  }, [createdCustomer]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-center ">
        <form action="" className="flex flex-col gap-5">
          <input
            name="firstname"
            placeholder="firstname"
            defaultValue={createdCustomer?.firstname}
            type="text"
            onChange={handleChange}
          />
          <input
            name="lastname"
            placeholder="lastname"
            defaultValue={createdCustomer?.lastname}
            type="text"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="email"
            defaultValue={createdCustomer?.email}
            type="text"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="phone"
            defaultValue={createdCustomer?.phone}
            type="number"
            onChange={handleChange}
          />
          <input
            name="street_address"
            placeholder="street_address"
            defaultValue={createdCustomer?.street_address}
            type="text"
            onChange={handleChange}
          />
          <input
            name="postal_code"
            placeholder="postal_code"
            defaultValue={createdCustomer?.postal_code}
            type="text"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="city"
            defaultValue={createdCustomer?.city}
            type="text"
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="country"
            defaultValue={createdCustomer?.country}
            type="text"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
};
