import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useCart } from "../../hooks/useCart";

export const RenderCartItems = () => {
  const { cart } = useContext(CartContext);
  const { increaseHandler, decreaseHandler, removeHandler } = useCart();

  return (
    <>
      {cart.map((ci, i) => (
        <div key={i}>
          <img src={ci.product.image} alt="" />
          Name: {ci.product.name}
          id: {ci.product.id}
          amount: {ci.amount}
          <button
            onClick={() => {
              increaseHandler(ci.product.id);
            }}
          >
            +
          </button>
          <button
            disabled={ci.amount === 1}
            onClick={() => {
              decreaseHandler(ci.product.id);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              removeHandler(ci.product.id);
            }}
          >
            Remove from cart
          </button>
        </div>
      ))}
    </>
  );
};
