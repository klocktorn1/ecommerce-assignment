import { createContext, Dispatch } from "react";
import { Cart } from "../models/Cart";
import { ICartAction } from "../reducers/CartReducer";

export interface ICartContext {
  cart: Cart[];
  cartDispatch: Dispatch<ICartAction>;
}

export const CartContext = createContext<ICartContext>({
  cart: [],
  cartDispatch: () => {
    return;
  },
});




 
