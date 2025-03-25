import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
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

 useEffect(() => {
  localStorage.setItem("products", JSON.stringify(products));
 }, [products])
  return (
    <ProductsContext.Provider value={{ products, productsDispatch }}>
      {children} 
    </ProductsContext.Provider>
  )
}
