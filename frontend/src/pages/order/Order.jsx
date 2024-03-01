import { Outlet } from "react-router-dom";
import "./order.css";

const Order = () => {
  return (
    <div className="order">
      <Outlet />
    </div>
  );
};

export default Order;
