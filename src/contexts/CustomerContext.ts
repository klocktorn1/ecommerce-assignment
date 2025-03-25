import { createContext, Dispatch, useReducer } from "react";

import { ICustomer } from "../models/ICustomer";
import { ICustomersAction } from "../reducers/CustomersReducer";

export interface ICustomersContext {
  customers: ICustomer[];
  customersDispatch: Dispatch<ICustomersAction>;
}  

export const CustomersContext = createContext<ICustomersContext>({
  customers: [],
  customersDispatch: () => {
    return;
  },
});


export const CustomerProvider = ({children}: PropsWithChildren) => {
  const [customers, customersDispatch] = useReducer(CustomerReducer, [], () => {
    const cachedCart = localStorage.getItem("cart");
    return cachedCart ? JSON.parse(cachedCart) : [];
  });

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children} 
    </CartContext.Provider>
  )
}