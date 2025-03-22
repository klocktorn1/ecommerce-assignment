import {  useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

export const Layout = () => {
  const { cart } = useContext(CartContext);

  const cartItemAmounts = cart.map((ci) => ci.amount);

  const initialValue = 0;
  const totalAmountInCart: number = cartItemAmounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <header className="bg-gray-600 h-25 flex">
          <nav className=" h-full flex items-center w-full pl-5 pr-5 justify-end">
            <ul className="flex gap-2">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/products"}>Products</NavLink>
              </li>
              <li>
                <NavLink to={"/admin-login"}>Admin-Login</NavLink>
              </li>
              <li>
                <NavLink to={"/cart"}>Cart {totalAmountInCart}</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-grow">
          <Outlet></Outlet>
        </main>
        <footer className="bg-blue-950 h-30">
          <div>Footer</div>
        </footer>
      </div>
    </>
  );
};
