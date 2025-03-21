import { IProduct } from "../models/IProduct";

export interface IProductsAction {
  payload?: string;
  id?: number;
  type: IProductsActionType;
}

export enum IProductsActionType {
  CREATED,
  FETCHED,
  UPDATED,
  DELETED,
}

export const ProductsReducer = (
  productsState: IProduct[],
  action: IProductsAction
): IProduct[] => {
  switch (action.type) {
    case IProductsActionType.FETCHED: {
      localStorage.setItem("products", JSON.stringify(productsState));
      return JSON.parse(action.payload!);
    }
    case IProductsActionType.CREATED: {
      const updatedProducts = [...productsState, JSON.parse(action.payload!)];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    }
    case IProductsActionType.UPDATED: {
      const productId: number = action.id!;
      const updatedProducts: IProduct[] = productsState.map((p) =>
        p.id === productId ? { ...p, ...JSON.parse(action.payload!) } : p
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    }
    case IProductsActionType.DELETED: {
      const productId: number = action.id!;
      return productsState.filter((p) => p.id !== productId);
    }
  }
};
