/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
// import styles, { layout } from "../../style";
import { close, logo, menu } from "../../assets";
import { Link } from "react-router-dom";

//icons
import { FaUser } from "react-icons/fa";
import { IoSettings, IoFastFood } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { Notification } from "../dashboardComponents";

//context import
import { UserOrderContext } from "../../contexts/UserOrderContext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //order State
  const { count } = useContext(UserOrderContext);

  const Username = "eedga";
  return (
    <div className="surface-ground px-2 py-1 md:px-4 lg:px-6 ">
      <div className="grid">
        <div className="flex justify-between col-12">
          <div className="flex flex-col text-black">
            <h5 className="">Hello, {Username}</h5>
            <p className="font-semibold text-[12px]">{formattedDate}</p>
          </div>

          <div className="flex gap-4 items-center">
            <Link to="/User/home/user_account/:id">
              <FaUser className="w-[20px] h-[20px] text-black" />
            </Link>

            <Notification className="w-[20px] h-[20px]" />

            <Link to="/User/home/user_settings/:id">
              <IoSettings className="w-[20px] h-[20px] text-black" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid surface-ground">
        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow p-3 rounded">
            <div className="flex justify-between mb-3">
              <div>
                <span className="block text-primary font-medium mb-3">
                  Orders
                </span>
                <div className="text-black font-medium text-xl">30</div>
              </div>
              <div
                className="flex items-center justify-center bg-cyan rounded"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <i className="pi pi-shopping-cart text-black text-xl"></i>
              </div>
            </div>
            <span className="text-black font-medium">{count} new </span>
            <span className="text-primary">since last visit</span>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow p-3 rounded">
            <div className="flex justify-between mb-3">
              <div>
                <span className="block text-primary font-medium mb-3">
                  Budget
                </span>
                <div className="text-black font-medium text-xl">Shs.2000</div>
              </div>
              <div
                className="flex items-center justify-center bg-cyan rounded"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <GiCash className="text-xl" />
              </div>
            </div>

            <span className="text-primary">daily budget</span>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow p-3 rounded">
            <div className="flex justify-between mb-3">
              <div>
                <span className="block text-primary font-medium mb-3">
                  Products
                </span>
                <div className="text-black font-medium text-xl">40</div>
              </div>
              <div
                className="flex items-center justify-center bg-cyan rounded"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <IoFastFood className="text-xl" />
              </div>
            </div>
            <span className="text-black font-medium">4 </span>
            <span className="text-primary">newly registered</span>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-3">
          <div className="surface-card shadow p-3 rounded">
            <div className="flex justify-between mb-3">
              <div>
                <span className="block text-primary font-medium mb-3">
                  Debt
                </span>
                <div className="text-black font-medium text-xl">-Shs.1000</div>
              </div>
              <div
                className="flex items-center justify-center bg-cyan rounded"
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <GiCash className="text-xl" />
              </div>
            </div>
            <span className="text-success font-medium"> </span>
            <span className="text-primary">have a debt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// <nav className="w-full flex py-6 justify-between items-center navbar">
//   <img src={logo} alt="breakApp_logo" className="w-[130px] h-[36px]" />

//   <ul className="list-none sm:flex hidden justify-end items-center flex-1">
//     <li
//       className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}
//     >
//       Menu
//     </li>
//     <li
//       className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}
//     >
//       Services
//     </li>
//     <li
//       className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-10`}
//     >
//       Status
//     </li>
//     <li
//       className={`font-poppins font-normal cursor-pointer text-[16px] text-white mr-0`}
//     >
//       <div className="flex w-[90px] p-2 gap-3 rounded h-[40px] bg-yellow">
//         <FaUser className="w-[24px] h-[24px] text-black" />
//         <span className="text-black">User</span>
//       </div>
//     </li>
//   </ul>

//   <div className="sm:hidden flex flex-1 justify-end items-center">
//     <img
//       src={toggle ? close : menu}
//       alt="menu"
//       className="w-[26px] h-[24px] object-contain"
//       onClick={() => setToggle((prev) => !prev)}
//     />

//     <div
//       className={`${
//         toggle ? "flex" : "hidden"
//       } p-6 bg-black-gradient absolute my-4 mx-2 top-20 right-0 rounded-xl min-w-[140px] sidebar`}
//     >
//       <ul className="list-nome flex flex-col justify-end items-center flex-1">
//         <li
//           className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}
//         >
//           Menu
//         </li>
//         <li
//           className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}
//         >
//           Services
//         </li>
//         <li
//           className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-4`}
//         >
//           Status
//         </li>
//         <li
//           className={`font-poppins font-normal cursor-pointer text-[16px] text-white mb-0`}
//         >
//           <div className="flex w-[90px] h-[40px] p-2 gap-2 rounded bg-yellow text-black">
//             <FaUser className="w-[24px] h-[24px]" />
//             <span>User</span>
//           </div>
//         </li>
//         ;
//       </ul>
//     </div>
//   </div>
// </nav>
