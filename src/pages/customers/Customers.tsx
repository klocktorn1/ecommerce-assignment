import { NavLink } from "react-router-dom";
import { RenderCustomers } from "../../components/customers/RenderCustomers";



export const HandleCustomers = () => {

  return (
    <>
      <NavLink to={"/admin/create-customer"} className="text-white">Create customer</NavLink>
      <RenderCustomers></RenderCustomers>
    </>
  );
};
