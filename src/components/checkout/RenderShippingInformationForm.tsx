import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IUpdateAndCreateCustomer } from "../../models/ICustomer";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../../hooks/useCustomers";


export const RenderShippingInformationForm = () => {
  const { createCustomerHandler, error, isLoading } = useCustomers();
  const navigate = useNavigate();

  const [createdCustomer, setCreatedCustomer] =
    useState<IUpdateAndCreateCustomer | null>(() => {
      const cachedCustomer = localStorage.getItem("customer");
      return cachedCustomer ? JSON.parse(cachedCustomer) : null;
    });

    


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

      navigate(`/payment/${customerId}`);
    }
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
      <div className="flex justify-center">
        <form action="" className="flex flex-col gap-5 ">
          <input
            name="firstname"
            placeholder="First Name"
            defaultValue={createdCustomer?.firstname}
            type="text"
            onChange={handleChange}
          />
          <input
            name="lastname"
            placeholder="Last Name"
            defaultValue={createdCustomer?.lastname}
            type="text"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            defaultValue={createdCustomer?.email}
            type="text"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            defaultValue={createdCustomer?.phone}
            type="number"
            onChange={handleChange}
          />
          <input
            name="street_address"
            placeholder="Street Address"
            defaultValue={createdCustomer?.street_address}
            type="text"
            onChange={handleChange}
          />
          <input
            name="postal_code"
            placeholder="Postal Code"
            defaultValue={createdCustomer?.postal_code}
            type="text"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            defaultValue={createdCustomer?.city}
            type="text"
            onChange={handleChange}
          />
          <input
            name="country"
            placeholder="Country"
            defaultValue={createdCustomer?.country}
            type="text"
            onChange={handleChange}
          />
          <button className="rounded-sm hover:scale-120 duration-200 ease-in-out cursor-pointer bg-[#476d45] shadow-sm shadow-[#939393] mb-5" onClick={handleSubmit}>Proceed to payment</button>
        </form>
      </div>
    </>
  );
};
