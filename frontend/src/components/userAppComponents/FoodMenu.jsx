/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";

// import PropTypes from "prop-types";
import { cards } from "../../constants";
import Card from "./Card";

//context import
import { UserOrderContext } from "../../contexts/UserOrderContext";

const FoodMenu = () => {
  //order State
  const { setCount } = useContext(UserOrderContext);

  const increaseCount = () => {
    console.log("increaseCount");
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    console.log("decreaseCount");
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="surface-ground px-2 py-1 md:px-4 lg:px-6 ">
      <div className="grid">
        <h3>Snacks Available</h3>
      </div>

      {/* <div>
        <button onClick={increaseCount}>Increase Count</button>
        <button onClick={decreaseCount}>Decrease Count</button>
      </div> */}

      <div className="grid cards">
        {cards.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

// FoodMenu.propTypes = {
//   count: PropTypes.number,
//   decreaseCount: PropTypes.func,
//   increaseCount: PropTypes.func,
// };

export default FoodMenu;
