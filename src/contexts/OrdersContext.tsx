import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { IOrdersAction, OrdersReducer } from "../reducers/OrdersReducer";
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


export const OrdersProvider = ({children}: PropsWithChildren) => {
  const [orders, ordersDispatch] = useReducer(OrdersReducer, []);

  return (
    <OrdersContext.Provider value={{ orders, ordersDispatch }}>
      {children} 
    </OrdersContext.Provider>
  )
}
