/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { UserOrderContext } from "../../../contexts/UserOrderContext";

import { Menu, Navbar } from "../../../components/userAppComponents";
import "./home.css";

const Home00 = () => {
  //count State
  const [count, setCount] = useState(0);

  return (
    <section className="home h-full">
      <div className="flex">
        <UserOrderContext.Provider value={{ count, setCount }}>
          <Menu />
          <div className="w-full ml-[250px]">
            <Navbar />

            <div className="outlet ">
              <Outlet />
            </div>
          </div>
        </UserOrderContext.Provider>
      </div>
    </section>
  );
};

// Home00.propTypes = {
//   count: PropTypes.number,
//   decreaseCount: PropTypes.func,
//   increaseCount: PropTypes.func,
// };

export default Home00;
