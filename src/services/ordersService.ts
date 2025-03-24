import axios from "axios";
import { handleRequest } from "./baseService";
import {
  ICreateOrder,
  IOrder,
  IOrderById,
  IUpdateOrder,
  IUpdateOrderItemQuantity,
} from "../models/IOrder";

export const getAllOrders = async () => {
  const data: IOrder[] = await handleRequest(
    axios.get("http://localhost:3000/orders")
  );
  return data;
};

export const getOrderById = async (id: string) => {
  const data: IOrderById = await handleRequest(
    axios.get(`http://localhost:3000/orders/${id}`)
  );
  return data;
};

export const deleteOrder = async (id: number) => {
  await handleRequest(axios.delete(`http://localhost:3000/orders/${id}`));
};
export const createOrder = async (payload: ICreateOrder) => {
  const response = await handleRequest(axios.post(`http://localhost:3000/orders`, payload));
  return response;
};

export const updateOrder = async (id: number, payload: IUpdateOrder) => {
  await handleRequest(
    axios.patch(`http://localhost:3000/orders/${id}`, payload)
  );
};

export const updateOrderItemQuantity = async (
  id: number,
  payload: IUpdateOrderItemQuantity
) => {
  await handleRequest(
    axios.patch(`http://localhost:3000/order-items/${id}`, payload)
  );
};
export const deleteOrderItem = async (id: number) => {
  await handleRequest(axios.delete(`http://localhost:3000/order-items/${id}`));
};
