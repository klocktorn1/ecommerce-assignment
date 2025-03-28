import { useState } from "react";
import { RenderMenuOptions } from "./RenderMenuOptions";

export const HamburgerMenu = () => {
  const [isMenuPressed, setIsMenuPressed] = useState(false);

  const menuNotActive = "h-1 w-full rounded-md bg-[#b3b3b3] duration-200 ease-in z-40";

  const menuActive = "h-1 w-full rounded-md bg-[#b3b3b3] relative duration-150 ease-in z-40";

  const hamburgurStyling = "h-10 w-10 flex flex-col justify-around cursor-pointer";

  return (
    <>
      <div className="z-50 md:hidden "
        onClick={() => {
          setIsMenuPressed(!isMenuPressed);
        }}
      >
        {isMenuPressed ? (
          <div className={hamburgurStyling}>
            {" "}
              <div className={`${menuActive} -rotate-45 translate-y-3 `}></div>
              <div className="opacity-0"></div>
              <div className={`${menuActive} rotate-45 -translate-y-3`}></div>
          </div>
        ) : (
          <div className={hamburgurStyling}>
            {" "}
            <div className={menuNotActive}></div>
            <div className={menuNotActive}></div>
            <div className={menuNotActive}></div>
          </div>
        )}
      </div>
      <RenderMenuOptions isMenuPressed={isMenuPressed} setIsMenuPressed={setIsMenuPressed} />
    </>
  );
};
