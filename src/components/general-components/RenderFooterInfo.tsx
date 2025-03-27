import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const onHover = "cursor-pointer hover:text-[#ffffff] hover:scale-120 duration-200 ease-in-out"


export const RenderFooterInfo = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 text-[#ffffff] ">
          <div className="flex gap-3 text-3xl mt-5 ml-3 ">
            <FontAwesomeIcon
              className={onHover}
              icon={faFacebook}
            />
            <FontAwesomeIcon
              className={onHover}
              icon={faTwitter}
            />
            <FontAwesomeIcon
              className={onHover}
              icon={faInstagram}
            />
          </div>
          <div className="text-sm ml-2">
            <p>© 1996–2025 Stringify Music,</p>
            <p>
              <i>Stringify your music</i>
            </p>
          </div>
        </div>
        <div>
          <ul className="text-[#ffffff] flex flex-col text-l h-full justify-center gap-3 mr-3 font-bold">
            <li>
              <NavLink className="hover:text-white" to={"/about-us"}>About us</NavLink>
            </li>
            <li>
            <NavLink className="hover:text-white" to={"/about-us"}>Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
