/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import "./product.css";

const Product = () => {
  return (
    <div className="product">
      <Outlet />
    </div>
  );
};

export default Product;
