import { NavLink } from "react-router";



interface IRenderMenuOptionsProps {
  isMenuPressed: boolean;
  setIsMenuPressed: (isMenuPressed: boolean) => void;
}

export const RenderMenuOptions = (props: IRenderMenuOptionsProps) => {
  const handleLinkClick = () => {
    props.setIsMenuPressed(false);
  };

  const menuItems = [
    { to: "/", label: "Home"  },
    { to: "/products", label: "Products" },
    { to: "/admin-login", label: "Login" },
  ];



  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full h-full bg-purple bg-[#1b1b1b] text-white duration-300 ease-in opacity-98 z-20 
          ${props.isMenuPressed ? "-translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex">
          <NavLink to={"/"} onClick={handleLinkClick}>
            <div>logo</div>
          </NavLink>
        </div>

        <ul className="flex flex-col items-center justify-around h-[50%] w-full">
          {menuItems.map((m, i) => (
            <li key={i} className="flex gap-2 cursor-pointer group">
              <NavLink to={m.to} onClick={handleLinkClick} className="hover:text-[#ffffff] hover:scale-120 duration-200 ease-in-out">
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};



