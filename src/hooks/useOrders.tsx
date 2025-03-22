import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../contexts/OrdersContext";
import {
  createOrder,
  deleteOrder,
  deleteOrderItem,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderItemQuantity,
} from "../services/ordersService";
import { IOrdersActionType } from "../reducers/OrdersReducer";
import {
  ICreateOrder,
  IOrderById,
  IUpdateOrder,
  IUpdateOrderItemQuantity,
} from "../models/IOrder";

export const useOrders = () => {
  const { orders, ordersDispatch } = useContext(OrdersContext);
  const [order, setOrder] = useState<IOrderById | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getOrdersHandler();
  }, []);

  const getOrdersHandler = async () => {
    setIsLoading(true);
    try {
      const data = await getAllOrders();
      localStorage.setItem("orders", JSON.stringify(data));
      ordersDispatch({
        type: IOrdersActionType.FETCHED,
        payload: JSON.stringify(data),
      });
    } catch (error) {
      setError("Error fetching orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderByIdHandler = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrderHandler = async (payload: ICreateOrder) => {
    setIsLoading(true)
    try {
      await createOrder(payload)
      // ordersDispatch({
      //   type: IOrdersActionType.CREATED,
      //   payload: JSON.stringify(payload)
      // })
      
    } catch (error) {
      
    }
  }

  const removeOrderHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteOrder(id);
      ordersDispatch({
        type: IOrdersActionType.DELETED,
        id: id,
      });
    } catch (error) {
      setError("Error fetching orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const updateOrderHandler = async (id: number, payload: IUpdateOrder) => {
    setIsLoading(true);
    try {
      await updateOrder(id, payload);
      ordersDispatch({
        type: IOrdersActionType.UPDATED,
        payload: JSON.stringify(payload),
        id: id,
      });
    } catch (error) {
      setError("Error fetching orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderItemQuantityHandler = async (
    itemId: number,
    id: string,
    payload: IUpdateOrderItemQuantity
  ) => {
    setIsLoading(true);
    try {
      await updateOrderItemQuantity(itemId, payload);
      await getOrderByIdHandler(id);

      ordersDispatch({
        type: IOrdersActionType.UPDATED_QUANTITY,
        payload: JSON.stringify(payload),
        id: itemId,
      });
    } catch (error) {
      setError("Error fetching orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const deleteOrderItemHandler = async (itemId: number, id: string) => {
    setIsLoading(true);
    try {
      await deleteOrderItem(itemId);
      await getOrderByIdHandler(id);
    } catch (error) {
      setError("Error fetching orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    orders,
    order,
    deleteOrderItemHandler,
    getOrderByIdHandler,
    getOrdersHandler,
    removeOrderHandler,
    updateOrderHandler,
    createOrderHandler,
    updateOrderItemQuantityHandler,
  };
};
