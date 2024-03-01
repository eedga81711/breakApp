import { Outlet } from "react-router-dom";
import "./user.css";

const User = () => {
  return (
    <div className="user">
      <Outlet />
    </div>
  );
};

export default User;
