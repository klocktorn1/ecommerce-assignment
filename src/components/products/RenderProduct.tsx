import { useContext, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { CartContext } from "../../contexts/CartContext";
import { ICartActionType } from "../../reducers/CartReducer";

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

  return (
    <>
      <div className="bg-black">
        <h2>{product?.name}</h2>
        <img className="size-50" src={product?.image} alt="" />
        <p>${product?.price}</p>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </>
  );
};
