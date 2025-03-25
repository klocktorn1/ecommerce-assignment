import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { IProduct } from "../models/IProduct";
import { IProductsAction, ProductsReducer } from "../reducers/ProductsReducer";

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


export const ProductsProvider = ({children}: PropsWithChildren) => {
  const [products, productsDispatch] = useReducer(ProductsReducer, [], () => {
    const cachedProducts = localStorage.getItem("products");
    return cachedProducts ? JSON.parse(cachedProducts) : [];
  });

  localStorage.setItem("products", JSON.stringify(products));
  return (
    <ProductsContext.Provider value={{ products, productsDispatch }}>
      {children} 
    </ProductsContext.Provider>
  )
}
