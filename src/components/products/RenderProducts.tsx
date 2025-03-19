import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

interface IRenderProductsProps {
  isAdmin?: boolean;
}

export const RenderProducts = ({ isAdmin }: IRenderProductsProps) => {
  const { isLoading, error, products, deleteProductHandler } = useProducts();
  const { addToCartHandler } = useCart();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      {products.map((p, i) => (
        <ul key={i} className="p-5">
          <li className="flex p-3 bg-gray-600">
            <p>id: {p.id}</p>
            <img className="h-40" src={p.image} alt="" />
            <div className=" w-full flex justify-between bg-gray-800 mr-3 ml-3">
              <Link to={`/product/${p.id}`}>
                <h2>{p.name}</h2>
              </Link>
              <h2>${p.price}</h2>

              <button
                onClick={() => {
                  addToCartHandler(p);
                }}
              >
                Add to cart
              </button>

              {isAdmin && (
                <div>
                  <button
                    onClick={() => {
                      deleteProductHandler(p.id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/admin/update-product/${p.id}`}>
                    <button>Update</button>
                  </Link>
                  <div>
                    <p>Description: {p.description}</p>
                    <p>Stock: {p.stock}</p>
                    <p>Category: {p.category}</p>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      ))}
    </>
  );
};
