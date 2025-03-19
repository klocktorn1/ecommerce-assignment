import { createContext, Dispatch } from "react";
import { IProduct } from "../models/IProduct";
import { IProductsAction } from "../reducers/ProductsReducer";

export interface IProductsContext {
  products: IProduct[];
  productsDispatch: Dispatch<IProductsAction>;
}  

export const ProductsContext = createContext<IProductsContext>({
  products: [],
  productsDispatch: () => {
    return;
  },
});
