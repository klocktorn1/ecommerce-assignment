import { useContext, useEffect, useState } from "react";
import { RenderCartItems } from "../../components/cart/RenderCartItems";
import { CartContext } from "../../contexts/CartContext";

export const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <>{cart.length === 0 ? <div>You cart is empty :( Please add stuff so we can make money</div> : <RenderCartItems></RenderCartItems>}</>
  );
};
