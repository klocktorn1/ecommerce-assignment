import { useContext, useEffect, useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../services/customersService";

import { ICustomer, IUpdateAndCreateCustomer } from "../models/ICustomer";
import { ICustomersActionType } from "../reducers/CustomersReducer";
import { CustomersContext } from "../contexts/CustomerContext";

export const useCustomers = () => {
  const { customers, customersDispatch } = useContext(CustomersContext);
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // setTimeout(() => {
    //   localStorage.removeItem("customers");
    // }, 1000 * 60 * 60);
    if (customers.length > 0) return;
    getCustomersHandler();
  }, []);

  const getCustomersHandler = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCustomers();
      localStorage.setItem("customers", JSON.stringify(data));
      customersDispatch({
        type: ICustomersActionType.FETCHED,
        payload: JSON.stringify(data),
      });
    } catch (error) {
      setError("Error fetching customers");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCachedProductById = (id: string) => {
    const cachedProduct = customers.find((p) => p.id === +id);
    if (!cachedProduct) return null;
    setCustomer(cachedProduct);
    return cachedProduct;
  };

  const getCustomerByIdHandler = async (id: string) => {
    const cachedProduct = fetchCachedProductById(id);
    if (cachedProduct) return cachedProduct;
    setIsLoading(true);
    try {
      const data = await getCustomerById(id);
      setCustomer(data);
      return data;
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomerHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteCustomer(id);
      customersDispatch({
        type: ICustomersActionType.DELETED,
        id: id,
      });
    } catch (error) {
      setError("Error deleting customer");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomerHandler = async (
    id: number,
    payload: IUpdateAndCreateCustomer
  ) => {
    setIsLoading(true);
    try {
      await updateCustomer(id, payload);

      customersDispatch({
        type: ICustomersActionType.UPDATED,
        payload: JSON.stringify(payload),
        id: id,
      });
    } catch (error) {
      setError("Error updating customer" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomerHandler = async (payload: IUpdateAndCreateCustomer) => {
    setIsLoading(true);
    try {
      await createCustomer(payload);
      
      customersDispatch({
        type: ICustomersActionType.CREATED,
        payload: JSON.stringify(payload),
      });
    } catch (error) {
      setError("Error creating customer" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    customers,
    customer,
    isLoading,
    error,
    getCustomersHandler,
    getCustomerByIdHandler,
    updateCustomerHandler,
    deleteCustomerHandler,
    createCustomerHandler,
  };
};
