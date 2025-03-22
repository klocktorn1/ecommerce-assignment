import { ICustomer } from "../models/ICustomer";

export interface ICustomersAction {
  payload?: string;
  id?: number;
  type: ICustomersActionType;
}

export enum ICustomersActionType {
  CREATED,
  FETCHED,
  UPDATED,
  DELETED,
}

export const CustomersReducer = (
  customersState: ICustomer[],
  action: ICustomersAction
): ICustomer[] => {
  switch (action.type) {
    case ICustomersActionType.FETCHED: {
      return JSON.parse(action.payload!);
    }
    case ICustomersActionType.CREATED: {
      const updatedCustomers = [...customersState, JSON.parse(action.payload!)];
      return updatedCustomers;
    }
    case ICustomersActionType.UPDATED: {
      const customerId: number = action.id!;
      const updatedCustomers: ICustomer[] = customersState.map((p) =>
        p.id === customerId ? { ...p, ...JSON.parse(action.payload!) } : p
      );
      return updatedCustomers;
    }
    case ICustomersActionType.DELETED: {
      const customerId: number = action.id!;
      const updatedCustomer = customersState.filter((p) => p.id !== customerId)
      return updatedCustomer;
    }
  }
};

