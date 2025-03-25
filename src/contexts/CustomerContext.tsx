import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

import { ICustomer } from "../models/ICustomer";
import {
  CustomersReducer,
  ICustomersAction,
} from "../reducers/CustomersReducer";

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

export const CustomerProvider = ({ children }: PropsWithChildren) => {
  const [customers, customersDispatch] = useReducer(CustomersReducer, []);

  return (
    <CustomersContext.Provider value={{ customers, customersDispatch }}>
      {children}
    </CustomersContext.Provider>
  );
};
