import { IOrder } from "../models/IOrder";

export interface IOrdersAction {
  type: IOrdersActionType;
  payload?: string;
  id?: number;
}

export enum IOrdersActionType {
  FETCHED,
  CREATED,
  UPDATED,
  DELETED,
  UPDATED_QUANTITY,
  DELETED_ORDER_ITEM,
  
}

export const OrdersReducer = (
  ordersState: IOrder[],
  action: IOrdersAction
): IOrder[] => {
  switch (action.type) {
    case IOrdersActionType.FETCHED: {
      return JSON.parse(action.payload!);
    }
    case IOrdersActionType.DELETED: {
      const orderId: number = action.id!;
      const updatedOrder = ordersState.filter((o) => o.id !== orderId);
      return updatedOrder;
    }
    case IOrdersActionType.UPDATED: {
      const orderId: number = action.id!;
      const updatedOrders: IOrder[] = ordersState.map((o) =>
        o.id === orderId ? { ...o, ...JSON.parse(action.payload!) } : o
      );
      return updatedOrders;
    }
    case IOrdersActionType.CREATED: {
      
    }
  }
  return ordersState;
};
