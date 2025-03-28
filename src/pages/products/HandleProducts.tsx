import { NavLink } from "react-router-dom";
import { RenderHandleProducts } from "../../components/products/RenderHandleProducts";

export const HandleProducts = () => {
  return (
    <>
      <NavLink to={"/admin/create-product"} className="text-white">Create Product</NavLink>
      <RenderHandleProducts></RenderHandleProducts>
    </>
  );
};
