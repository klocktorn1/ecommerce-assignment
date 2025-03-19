import { NavLink, Outlet } from "react-router-dom";

export const AdminHome = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <header className="bg-green-950 h-25 flex ">
          <nav className=" h-full flex items-center w-full pl-5 pr-5 justify-end">
            <ul className="flex gap-4">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/admin"}>Admin Home</NavLink>
              </li>
              <li>
                <NavLink to={"/admin/handle-customers"}>Handle Customers</NavLink>
              </li>
              <li>
                <NavLink to={"/admin/handle-products"}>Handle Products</NavLink>
              </li>
              <li>
                <NavLink to={"/admin/handle-orders"}>Handle Orders</NavLink>
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