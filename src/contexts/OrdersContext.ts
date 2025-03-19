import { createContext, Dispatch } from "react";
import { IOrdersAction } from "../reducers/OrdersReducer";
import { IOrder } from "../models/IOrder";

export interface IOrdersContext {
  orders: IOrder[];
  ordersDispatch: Dispatch<IOrdersAction>;
}  

export const OrdersContext = createContext<IOrdersContext>({
  orders: [],
  ordersDispatch: () => {
    return;
  },
});
