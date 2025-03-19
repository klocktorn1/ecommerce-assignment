import { NavLink } from "react-router-dom";
import { RenderProducts } from "../../components/products/RenderProducts";

export const HandleProducts = () => {
  return (
    <>
      <NavLink to={"/admin/create-product"}>Create Product</NavLink>
      <RenderProducts isAdmin={true}></RenderProducts>
    </>
  );
};
