import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ICustomer, IUpdateAndCreateCustomer } from "../../models/ICustomer";
import { useCustomers } from "../../hooks/useCustomers";

interface IRenderUpdateCustomerFormProps {
  id: string;
  customer: ICustomer;
}

export const RenderUpdateCustomerForm = ({
  id,
  customer,
}: IRenderUpdateCustomerFormProps) => {
  const { updateCustomerHandler, isLoading, error } = useCustomers();
  const navigate = useNavigate();
  const [updatedCustomer, setUpdatedCustomer] =
    useState<IUpdateAndCreateCustomer>({
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      password: customer.password,
      phone: customer.phone,
      street_address: customer.street_address,
      postal_code: customer.postal_code,
      city: customer.city,
      country: customer.country,
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id && updatedCustomer) {
      await updateCustomerHandler(+id, updatedCustomer);
    }
    navigate("/admin/handle-customers");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text")
      setUpdatedCustomer({
        ...updatedCustomer,
        [e.target.name]: e.target.value,
      });

    if (e.target.type === "number") {
      setUpdatedCustomer({
        ...updatedCustomer,
        [e.target.name]: +e.target.value,
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="flex justify-center">
        <form action="" className="flex flex-col gap-5 text-white">
          <label>
            First name:{" "}
            <input
              name="firstname"
              defaultValue={customer?.firstname}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>

          <label>
            Last Name:{" "}
            <input
              name="lastname"
              defaultValue={customer?.lastname}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            Email:{" "}
            <input
              name="email"
              defaultValue={customer?.email}
              type="email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>

          <label>
            Phone:{" "}
            <input
              name="phone"
              defaultValue={customer?.phone}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            Street address:{" "}
            <input
              name="street_address"
              defaultValue={customer?.street_address}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            Postal code:{" "}
            <input
              name="postal_code"
              defaultValue={customer?.postal_code}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            City:{" "}
            <input
              name="city"
              defaultValue={customer?.city}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <label>
            Country:{" "}
            <input
              name="country"
              defaultValue={customer?.country}
              type="text"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </label>
          <button
          className="text-white hover:cursor-pointer"
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
