import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus } from "lucide-react";

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
      <div className="bg-[#efefef]">
        {products.map((p, i) => (
          <ul key={i} className="p-2 ">
            <li className="flex p-3 bg-white shadow-md shadow-[#939393] rounded-b-sm">
              <div className=" w-full flex justify-between md:justify-start md:gap-10   bg-white  mr-3 ml-3">
                <Link to={`/product/${p.id}`}>
                  <img className="size-25 md:size-40" src={p.image} alt="" />
                </Link>
                <div className="flex flex-col gap-2 md:gap-8">
                  <Link to={`/product/${p.id}`}>
                    <h2 className="font-bebas text-md md:text-lg  ">{p.name}</h2>
                  </Link>
                  <div className="flex gap-4 h-full md:h-1/4 items-center">
                    <h2>${p.price}</h2>
                    <button
                      disabled={p.stock < 1}
                      className="relative duration-500 ease-in-out bg-[#476d45] shadow-sm shadow-[#939393] cursor-pointer p-2 rounded-b-sm group flex text-sm items-center gap-3"
                      onClick={() => {
                        addToCartHandler(p);
                      }}
                    >
                      Add to cart <FontAwesomeIcon icon={faCartShopping} />{" "}
                      <Plus className="duration-500 ease-in-out  opacity-0 group-hover:opacity-100"></Plus>
                    </button>
                  </div>
                  {p.stock > 10 ? (
                    <p className="text-[#476d45] text-sm">In stock</p>
                  ) : p.stock < 1 ? (
                    <p className="text-[#cf1d19] text-sm">Out of stock</p>
                  ) : (
                    <p className="text-[#fbc900] text-sm">Less than 10 left</p>
                  )}
                </div>

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
                      
                      <p>Stock: {p.stock}</p>
                      <p>Category: {p.category}</p>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};
