import { useContext, useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByEmail,
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


  const getCustomersHandler = async () => {
    setIsLoading(true);
    try {
      const data = await getAllCustomers();
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

  const fetchCachedCustomerById = (id: string) => {
    const cachedCustomer = customers.find((c) => c.id === +id);
    if (!cachedCustomer) return null;
    setCustomer(cachedCustomer);
    return cachedCustomer;
  };

  const getCustomerByIdHandler = async (id: string) => {
    const cachedCustomer = fetchCachedCustomerById(id);
    if (cachedCustomer) return cachedCustomer;
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

  const getCustomerByEmailHandler = async (email: string) => {
    setIsLoading(true);
    try {
      const data = await getCustomerByEmail(email);
      setCustomer(data);
      return data;
    } catch (error) {
      setError("Error fetching customer");
      return null
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
    const alreadyCreatedCustomer = await getCustomerByEmailHandler(payload.email);
    if (alreadyCreatedCustomer) return alreadyCreatedCustomer.id
    setIsLoading(true);
    try {
      const response = await createCustomer(payload);
      customersDispatch({
        type: ICustomersActionType.CREATED,
        payload: JSON.stringify(payload),
      });
      return response.id;
    } catch (error) {
      console.log("asdasdasd");
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
    getCustomerByEmailHandler,
    updateCustomerHandler,
    deleteCustomerHandler,
    createCustomerHandler,
  };
};
