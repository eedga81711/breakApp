/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FiPlusCircle } from "react-icons/fi";

//context imports
import { UserOrderContext } from "../../contexts/UserOrderContext";

const Card = ({ title, price, img }) => {
  //order State
  const { setCount } = useContext(UserOrderContext);

  const increaseCount = () => {
    console.log("increaseCount");
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="col-12 md:col-6 lg:col-4 relative">
      <div className="card flex flex-col rounded bg-white">
        <div className="card.img">
          <img
            src={img}
            alt={title}
            className="w-full h-[200px] rounded-t-md"
          />
        </div>

        <h3 className="text-center font-medium text-[16px]">{title}</h3>

        <span className="text-center text-black font-medium mx-14 mb-1">
          Shs.{price}
        </span>

        <div
          className="icon.box absolute mt-0 mr-0 flex items-center justify-center bg-amber rounded"
          style={{ width: "2.5rem", height: "2.5rem" }}
          onClick={increaseCount}
        >
          <FiPlusCircle className="text-xl text-white font-semibold" />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.number,
};

export default Card;
