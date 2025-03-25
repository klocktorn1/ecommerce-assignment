import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { ICartActionType } from "../reducers/CartReducer";
import { IProduct } from "../models/IProduct";

export const useCart = () => {
  const { cart, cartDispatch } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  

  const addToCartHandler = (product: IProduct) => {
    cartDispatch({
      type: ICartActionType.ADDED,
      payload: JSON.stringify(product),
    });
  };

  const increaseHandler = (id: number) => {
    cartDispatch({
      type: ICartActionType.INCREASED,
      payload: JSON.stringify(id),
    });
  };
  const decreaseHandler = (id: number) => {
    cartDispatch({
      type: ICartActionType.DECREASED,
      payload: JSON.stringify(id),
    });
  };

  const removeHandler = (id: number) => {
    cartDispatch({
      type: ICartActionType.REMOVED,
      payload: JSON.stringify(id),
    });    
  };

  return {
    cart,
    addToCartHandler,
    increaseHandler,
    decreaseHandler,
    removeHandler,
  };
};
