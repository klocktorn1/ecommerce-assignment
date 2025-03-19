import { createContext, Dispatch } from "react";

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
