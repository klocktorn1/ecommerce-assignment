import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useCart } from "../../hooks/useCart";
import { NavLink } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";

export const RenderCartItems = () => {
  const { cart } = useContext(CartContext);
  const { increaseHandler, decreaseHandler, removeHandler, emptyHandler } =
    useCart();

  const onHover = "hover:scale-150 duration-200 ease-in-out cursor-pointer";

  return (
    <>
      {cart.map((ci, i) => (
        <div className="flex p-3 gap-4 m-2 bg-white shadow-md shadow-[#939393] rounded-b-sm">
          <img src={ci.product.image} className="size-25" alt="" />
          <div className="flex flex-col gap-6 w-full">
            <h2 className="font-bebas text-lg">
              {ci.amount}x {ci.product.name}
            </h2>

            <div className="flex justify-between">
              <div>
                <button
                  className={onHover}
                  onClick={() => {
                    increaseHandler(ci.product.id);
                  }}
                >
                  <Plus></Plus>
                </button>
                <button
                  className={onHover}
                  disabled={ci.amount === 1}
                  onClick={() => {
                    decreaseHandler(ci.product.id);
                  }}
                >
                  <Minus></Minus>
                </button>
              </div>
              <button
                className={onHover}
                onClick={() => {
                  removeHandler(ci.product.id);
                }}
              >
                <Trash></Trash>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-5 m-4">
        <NavLink to={"/checkout"}>
          <button className="hover:scale-120 duration-200 ease-in-out cursor-pointer bg-[#476d45] shadow-sm shadow-[#939393]">Proceed to checkout</button>
        </NavLink>
        <div>
          <button
          className="hover:scale-120 duration-200 ease-in-out cursor-pointer bg-[#cf1d19] shadow-sm shadow-[#939393]"
            onClick={() => {
              emptyHandler();
            }}
          >
            Empty cart
          </button>
        </div>
      </div>
    </>
  );
};
