import axios from "axios";
import { handleRequest } from "./baseService";
import { ICustomer, IUpdateAndCreateCustomer } from "../models/ICustomer";

export const getAllCustomers = async () => {
  const data: ICustomer[] = await handleRequest(
    axios.get("http://localhost:3000/customers")
  );
  return data;
};

export const getCustomerById = async (id: string) => {
  const data: ICustomer = await handleRequest(
    axios.get(`http://localhost:3000/customers/${id}`)
  );
  return data;
};
export const getCustomerByEmail = async (email: string) => {
  const response: ICustomer = await handleRequest(
    axios.get(`http://localhost:3000/customers/email/${email}`)
  );
  return response;
};

export const deleteCustomer = async (id: number) => {
  await handleRequest(axios.delete(`http://localhost:3000/customers/${id}`));
};

export const updateCustomer = async (
  id: number,
  payload: IUpdateAndCreateCustomer
) => {
  await handleRequest(
    axios.patch(`http://localhost:3000/customers/${id}`, payload)
  );
};

export const createCustomer = async (payload: IUpdateAndCreateCustomer) => {
  const response = await handleRequest(
    axios.post(`http://localhost:3000/customers`, payload)
  );
  return response;
};
