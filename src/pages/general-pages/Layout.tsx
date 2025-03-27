import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { RenderFooterInfo } from "../../components/general-components/RenderFooterInfo";

export const Layout = () => {
  const { cart } = useContext(CartContext);

  const cartItemAmounts = cart.map((ci) => ci.amount);

  const initialValue = 0;
  const totalAmountInCart: number = cartItemAmounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );

  const onHover =
    "hover:text-[#ffffff] hover:scale-120 duration-200 ease-in-out";

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-black h-25 flex">
          <nav className=" h-full flex items-center font-hanken w-full pl-5 pr-5 justify-between font-normal text-xl text-[#b3b3b3] ">
            <Link className={onHover} to={"/"}>
              stringify music
            </Link>
            <div className="mr-4 flex gap-4 list-none">
              <NavLink className={onHover} to={"/"}>
                Home
              </NavLink>

              <NavLink className={onHover} to={"/products"}>
                Products
              </NavLink>

              <NavLink className={onHover} to={"/admin-login"}>
                Admin-Login
              </NavLink>

              <NavLink className={onHover} to={"/cart"}>
                <FontAwesomeIcon icon={faCartShopping} /> {totalAmountInCart}
              </NavLink>
            </div>
          </nav>
        </header>
        <main className="flex-grow bg-white">
          <Outlet></Outlet>
        </main>
        <footer className="bg-black h-30">
          <RenderFooterInfo></RenderFooterInfo>
        </footer>
      </div>
    </>
  );
};
