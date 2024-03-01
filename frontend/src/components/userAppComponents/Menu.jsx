/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//images imports
import { favicon, favicon00, logo, odyssey_logo } from "../../assets";

//icon imports
import { IoFastFood, IoCartOutline } from "react-icons/io5";
import { GiCash } from "react-icons/gi";

//context import
import { UserOrderContext } from "../../contexts/UserOrderContext";

const Menu = () => {
  //active State
  const [isActive, setIsActive] = useState(1);

  const toggleActive = (divId) => {
    setIsActive(divId === isActive ? null : divId);
  };

  //order State
  const { count } = useContext(UserOrderContext);

  return (
    <div
      className={`menu w-[250px] h-full fixed flex flex-col justify-between`}
    >
      <div className="items-center flex justify-center mt-3">
        <Link to="/User/home/">
          <img
            src={logo}
            alt="app_logo"
            className="h-[35px] hidden sm:inline"
          />
        </Link>

        <Link to="/User/home/">
          <img
            src={favicon}
            alt="app_logo"
            className="h-[50px] inline sm:hidden"
          />
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-5 ">
        <div
          className={`rounded flex items-center menuSpan ${
            isActive === 1 ? "active" : ""
          }`}
          onClick={() => toggleActive(1)}
        >
          <Link
            to="/User/home/orders/:id/"
            className="flex flex-col justify-center items-center w-full p-2"
          >
            <IoCartOutline className="w-[22px] h-[22px] text-black" />
            <span className="text-black text-[14px] hidden sm:inline-block">
              Orders
            </span>
          </Link>

          {count > 0 && (
            <div
              className="icon.box mr-4 px-1 flex items-center justify-center bg-white rounded"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <span className="text-black font-semibold">{count}</span>
            </div>
          )}
        </div>

        <div
          className={`rounded menuSpan ${isActive === 2 ? "active" : ""}`}
          onClick={() => toggleActive(2)}
        >
          <Link
            to="/User/home/food_menu/"
            className="flex flex-col justify-center items-center w-full p-2"
          >
            <IoFastFood className="w-[22px] h-[22px] text-black" />
            <span className="text-black text-[14px] hidden sm:inline-block">
              Food Menu
            </span>
          </Link>
        </div>

        <div
          className={`rounded menuSpan ${isActive === 3 ? "active" : ""}`}
          onClick={() => toggleActive(3)}
        >
          <Link
            to="/User/home/finances/:id/"
            className="flex flex-col justify-center items-center w-full p-2"
          >
            <GiCash className="w-[22px] h-[22px] text-black" />
            <span className="text-black text-[14px] hidden sm:inline-block">
              Finances
            </span>
          </Link>
        </div>
      </div>

      <div className="mb-4 sm:mb-2 items-center flex justify-center">
        <Link to="https://www.odysseytech.co/">
          <img
            src={odyssey_logo}
            alt="odyssey_logo"
            className={`h-[50px] hidden sm:inline`}
          />
        </Link>

        <Link to="https://www.odysseytech.co/">
          <img
            src={favicon00}
            alt="odyssey_logo"
            className={`h-[50px] inline sm:hidden`}
          />
        </Link>
      </div>
    </div>
  );
};

// Menu.propTypes = {
//   count: PropTypes.number,
//   decreaseCount: PropTypes.func,
//   increaseCount: PropTypes.func,
// };

{
  /* <div>
        <button onClick={increaseCount}>Increase Count</button>
        <button onClick={decreaseCount}>Decrease Count</button>
      </div> */
}

export default Menu;
