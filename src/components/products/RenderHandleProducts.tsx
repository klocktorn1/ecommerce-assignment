import { useProducts } from "../../hooks/useProducts";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Plus } from "lucide-react";

export const RenderHandleProducts = () => {
  const { isLoading, error, products, deleteProductHandler } = useProducts();
  const onHover = "hover:scale-120 duration-200 ease-in-out cursor-pointer bg-blue-800 rounded-md";

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <div className="bg-[#efefef]">
        {products.map((p, i) => (
          <ul key={i} className="p-2 ">
            <li className="flex p-3 bg-white shadow-md shadow-[#939393] rounded-b-sm ">
              <div className=" w-full flex justify-between md:justify-start md:gap-10   bg-white  mr-3 ml-3">
                <Link to={`/product/${p.id}`}>
                  <img className="size-25 md:size-40" src={p.image} alt="" />
                </Link>
                <div className="flex flex-col gap-2 md:gap-8">
                  <Link to={`/product/${p.id}`}>
                    <h2 className="font-bebas text-md md:text-lg  ">
                      {p.name}
                    </h2>
                  </Link>
                  <div className="flex gap-4 h-full md:h-1/4 items-center">
                    <h2>${p.price}</h2>
                  </div>
                </div>
                <div>
                  <div className="flex gap-4">
                    <button
                      className={onHover}
                      onClick={() => {
                        deleteProductHandler(p.id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/admin/update-product/${p.id}`}>
                      <button className={onHover}>Update</button>
                    </Link>
                  </div>
                  <div>
                    <p>Stock: {p.stock}</p>
                    <p>Category: {p.category}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

// {isAdmin && (

//   )}
