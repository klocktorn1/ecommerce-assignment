import { useContext, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { CartContext } from "../../contexts/CartContext";
import { ICartActionType } from "../../reducers/CartReducer";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus } from "lucide-react";

interface IRenderProductProps {
  id: string;
}

export const RenderProduct = ({ id }: IRenderProductProps) => {
  const { getProductByIdHandler, product } = useProducts();

  useEffect(() => {
    getProductByIdHandler(id);
  }, []);
  const { cartDispatch } = useContext(CartContext);

  const addToCart = () => {
    cartDispatch({
      type: ICartActionType.ADDED,
      payload: JSON.stringify(product),
    });
  };

  if (product) {
    return (
      <>
        <div className=" h-full m-1">
          <div className="flex md:items-center flex-col">
            <div className="md:w-1/2 ">
              <h1 className="text-2xl font-bebas mt-2 mb-2">{product.name}</h1>
              <hr className="text-[#e1e1e1]" />
              <img
                className="size-80 md:m-auto md:mt-6"
                src={product.image}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1 md:w-1/2">
              <div className="flex items-center justify-center gap-5 mt-3">
                <p className="font-semibold text-2xl">{product.price} SEK</p>
                <button
                  disabled={product.stock < 1}
                  className="relative duration-500 ease-in-out bg-[#476d45] shadow-sm shadow-[#939393] cursor-pointer p-2 rounded-b-sm group flex items-center gap-3"
                  onClick={addToCart}
                >
                  Add to cart <FontAwesomeIcon icon={faCartShopping} />{" "}
                  <Plus className="duration-500 ease-in-out  opacity-0 group-hover:opacity-100"></Plus>
                </button>
              </div>
              <hr className=" m-2 text-[#e1e1e1]" />
              <p className="text-sm mb-2 mt-2">{product.description}</p>
              {product.stock > 10 ? (
                <p className="text-[#476d45] text-sm">In stock</p>
              ) : product.stock < 1 ? (
                <p className="text-[#cf1d19] text-sm">Out of stock</p>
              ) : (
                <p className="text-[#fbc900] text-sm">Less than 10 left</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};
