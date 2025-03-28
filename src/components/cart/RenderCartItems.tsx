import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useCart } from "../../hooks/useCart";
import { Link, NavLink } from "react-router-dom";
import { Minus, Plus, Trash } from "lucide-react";

interface IRenderCartItemsProps {
  isOnCheckoutPage?: boolean;
}

export const RenderCartItems = ({
  isOnCheckoutPage,
}: IRenderCartItemsProps) => {
  const { cart } = useContext(CartContext);
  const { increaseHandler, decreaseHandler, removeHandler, emptyHandler } =
    useCart();

  const totalAmountArray = cart.map((ci) => ci.amount * ci.product.price);
  const initialValue = 0;
  const sumOfCart = totalAmountArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const onHover = "hover:scale-150 duration-200 ease-in-out cursor-pointer";

  return (
    <>
      {cart.map((ci, i) => (
        <div
          key={i}
          className="flex p-3 gap-4 m-2 bg-white shadow-md shadow-[#939393] rounded-b-sm"
        >
          <img src={ci.product.image} className=" size-40" alt="" />

          <div className="flex flex-col gap-4 w-full">
            <Link to={`/product/${ci.product.id}`}>
              <h2 className="font-bebas text-lg">{ci.product.name}</h2>
            </Link>
            <p className="font-bebas text-lg">
              {" "}
              {ci.amount}x {ci.product.price} SEK
            </p>

            {!isOnCheckoutPage && (
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
                  <p className="font-bebas text-lg">
                    Total: {ci.amount * ci.product.price} SEK
                  </p>
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
            )}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-5 m-4">
        <div className="font-bebas text-lg">
          Total amount in cart: {sumOfCart} SEK
        </div>

        {!isOnCheckoutPage && (
          <div className="flex gap-5">
            <NavLink to={"/checkout"}>
              <button className="hover:scale-120 duration-200 ease-in-out cursor-pointer bg-[#476d45] shadow-sm shadow-[#939393] p-1 rounded-sm">
                Proceed to checkout
              </button>
            </NavLink>
            <div>
              <button
                className="hover:scale-120 duration-200 ease-in-out cursor-pointer bg-[#cf1d19] shadow-sm shadow-[#939393] p-1 rounded-sm"
                onClick={() => {
                  emptyHandler();
                }}
              >
                Empty cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
