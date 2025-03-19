import { ChangeEvent, FormEvent, useState } from "react";
import { IUpdateAndCreateCustomer } from "../../models/ICustomer";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../../hooks/useCustomers";

export const RenderCreateCustomerForm = () => {
  const { createCustomerHandler, error, isLoading } = useCustomers();
  const navigate = useNavigate();
  const [createdCustomer, setCreatedCustomer] =
    useState<IUpdateAndCreateCustomer | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !createdCustomer?.firstname ||
      !createdCustomer?.lastname ||
      !createdCustomer?.city ||
      !createdCustomer?.country ||
      !createdCustomer?.email ||
      !createdCustomer?.password ||
      !createdCustomer?.phone ||
      !createdCustomer?.postal_code ||
      !createdCustomer?.street_address
    ) {
      alert("no");
      return;
    }

    if (createdCustomer) {
      await createCustomerHandler(createdCustomer);
    }

    navigate("/admin/handle-customers");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.type === "text" 
    )
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-center ">
        <form action="" className="flex flex-col gap-5">
          <input
            name="firstname"
            placeholder="firstname"
            type="text"
            onChange={handleChange}
          />
          <input
            name="lastname"
            placeholder="lastname"
            type="text"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="email"
            type="text"
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="password"
            type="text"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="phone"
            type="number"
            onChange={handleChange}
          />
          <input
            name="street_address"
            placeholder="street_address"
            type="text"
            onChange={handleChange}
          />
          <input
            name="postal_code"
            placeholder="postal_code"
            type="text"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="city"
            type="text"
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="country"
            type="text"
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
};
