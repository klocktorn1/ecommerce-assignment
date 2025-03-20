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

  // TESTING STRIPE API


  // const handleSubmit = async () => {
    
  //   console.log("asd");

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/create-checkout-session-embedded",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({}), //????????
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  // TESTING STRIPE API

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
              <li>
                  <NavLink to={"/checkout"}><button>Confirm details (send details to api and create payment url)</button></NavLink>
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
