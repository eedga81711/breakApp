/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {
  Home,
  Login,
  User,
  Product,
  Order,
  Password,
  Finances,
  Home00,
} from "./pages";
import { ForgotPassword, SetPassword } from "./components";
import {
  Notification,
  OrderHistory,
  ProductList,
  UserList,
  UserSettings,
  UserAccount,
} from "./components/dashboardComponents";
import {
  FoodMenu,
  UserFinances,
  UserHistory,
} from "./components/userAppComponents";
import { FormContext } from "./contexts";

const App = () => {
  const Layout = () => {
    return (
      <div className="w-full h-full font-poppins">
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/password",
          element: <Password />,
          children: [
            {
              path: "/password/set_password/:id",
              element: <SetPassword />,
            },
            {
              path: "/password/reset_password/:id",
              element: <SetPassword />,
            },
            {
              path: "/password/change_password/:id",
              element: <ForgotPassword />,
            },
          ],
        },
        {
          path: "/Admin/Dashboard",
          element: <Home />,
          children: [
            {
              path: "/Admin/Dashboard/orders",
              element: <Order />,
              children: [
                {
                  path: "/Admin/Dashboard/orders/all",
                  element: <OrderHistory />,
                },
              ],
            },
            {
              path: "/Admin/Dashboard/users",
              element: <User />,
              children: [
                {
                  path: "/Admin/Dashboard/users/all",
                  element: <UserList />,
                },
              ],
            },
            {
              path: "/Admin/Dashboard/products",
              element: <Product />,
              children: [
                {
                  path: "/Admin/Dashboard/products/all",
                  element: <ProductList />,
                },
              ],
            },
            {
              path: "/Admin/Dashboard/finances",
              element: <Finances />,
            },
            {
              path: "/Admin/Dashboard/notifications",
              element: <Notification />,
            },
            {
              path: "/Admin/Dashboard/user_settings",
              element: <UserSettings />,
            },
            {
              path: "/Admin/Dashboard/user_account",
              element: <UserAccount />,
            },
            {
              path: "/Admin/Dashboard",
              element: <OrderHistory />,
            },
            {
              path: "/Admin/Dashboard/password",
              element: <Password />,
              children: [
                {
                  path: "/Admin/Dashboard/password/set_password/:id",
                  element: <SetPassword />,
                },
                {
                  path: "/Admin/Dashboard/password/reset_password/:id",
                  element: <ForgotPassword />,
                },
              ],
            },
          ],
        },
        {
          path: "/User/home",
          element: <Home00 />,
          children: [
            {
              path: "/User/home",
              element: <UserHistory />,
            },
            {
              path: "/User/home/food_menu",
              element: <FoodMenu />,
            },
            {
              path: "/User/home/orders/",
              element: <Order />,
              children: [
                {
                  path: "/User/home/orders/:id",
                  element: <UserHistory />,
                },
              ],
            },
            {
              path: "/User/home/finances/:id",
              element: <UserFinances />,
            },
            {
              path: "/User/home/user_settings/:id",
              element: <UserSettings />,
            },
            {
              path: "/User/home/user_account/:id",
              element: <UserAccount />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

// ANOTHER APPROACH

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import {
//   Home,
//   Login,
//   User,
//   Product,
//   Order,
//   Password,
//   Finances,
//   Home00,
// } from "./pages";
// import { ForgotPassword, SetPassword } from "./components";
// import {
//   Notification,
//   OrderHistory,
//   ProductList,
//   UserList,
//   UserSettings,
//   UserAccount,
// } from "./components/dashboardComponents";
// import {
//   FoodMenu,
//   UserFinances,
//   UserHistory,
// } from "./components/userAppComponents";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Simulate fetching user data or JWT token after login
//     // Set user state with role
//     const userRole = "admin"; // Simulated user role, replace it with actual logic
//     setUser({ role: userRole });
//   }, []);

//   return (
//     <Router>
//       <Route exact path="/">
//         {user ? (
//           user.role === "admin" ? (
//             <Redirect to="/Admin/Dashboard" />
//           ) : (
//             <Redirect to="/User/home" />
//           )
//         ) : (
//           <Redirect to="/login" />
//         )}
//       </Route>
//       <Route path="/login" component={Login} />
//       <Route path="/password">
//         <Password>
//           <Route path="/password/set_password/:id" component={SetPassword} />
//           <Route
//             path="/password/reset_password/:id"
//             component={ForgotPassword}
//           />
//         </Password>
//       </Route>
//       <Route path="/Admin/Dashboard">
//         {user && user.role === "admin" ? (
//           <Home>
//             <Route path="/Admin/Dashboard/orders">
//               <Order>
//                 <Route
//                   path="/Admin/Dashboard/orders/all"
//                   component={OrderHistory}
//                 />
//               </Order>
//             </Route>
//             <Route path="/Admin/Dashboard/users">
//               <User>
//                 <Route path="/Admin/Dashboard/users/all" component={UserList} />
//               </User>
//             </Route>
//             <Route path="/Admin/Dashboard/products">
//               <Product>
//                 <Route
//                   path="/Admin/Dashboard/products/all"
//                   component={ProductList}
//                 />
//               </Product>
//             </Route>
//             <Route path="/Admin/Dashboard/finances" component={Finances} />
//             <Route
//               path="/Admin/Dashboard/notifications"
//               component={Notification}
//             />
//             <Route
//               path="/Admin/Dashboard/user_settings"
//               component={UserSettings}
//             />
//             <Route
//               path="/Admin/Dashboard/user_account"
//               component={UserAccount}
//             />
//             <Route path="/Admin/Dashboard/password">
//               <Password>
//                 <Route
//                   path="/Admin/Dashboard/password/set_password/:id"
//                   component={SetPassword}
//                 />
//                 <Route
//                   path="/Admin/Dashboard/password/reset_password/:id"
//                   component={ForgotPassword}
//                 />
//               </Password>
//             </Route>
//           </Home>
//         ) : (
//           <Redirect to="/login" />
//         )}
//       </Route>
//       <Route path="/User/home">
//         {user && user.role !== "admin" ? (
//           <Home00>
//             <Route path="/User/home" component={UserHistory} />
//             <Route path="/User/home/food_menu" component={FoodMenu} />
//             <Route path="/User/home/orders/:id" component={Order} />
//             <Route path="/User/home/finances/:id" component={UserFinances} />
//             <Route
//               path="/User/home/user_settings/:id"
//               component={UserSettings}
//             />
//             <Route path="/User/home/user_account/:id" component={UserAccount} />
//           </Home00>
//         ) : (
//           <Redirect to="/Admin/Dashboard" />
//         )}
//       </Route>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import {
//   Home,
//   Login,
//   User,
//   Product,
//   Order,
//   Password,
//   Finances,
//   Home00,
// } from "./pages";
// import { ForgotPassword, SetPassword } from "./components";
// import {
//   Notification,
//   OrderHistory,
//   ProductList,
//   UserList,
//   UserSettings,
//   UserAccount,
// } from "./components/dashboardComponents";
// import {
//   FoodMenu,
//   UserFinances,
//   UserHistory,
// } from "./components/userAppComponents";

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Simulate fetching user data or JWT token after login
//     // Set user state with role
//     const userRole = "admin"; // Simulated user role, replace it with actual logic
//     setUser({ role: userRole });
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/">
//           {user ? (
//             user.role === "admin" ? (
//               <Navigate to="/Admin/Dashboard" />
//             ) : (
//               <Navigate to="/User/home" />
//             )
//           ) : (
//             <Navigate to="/login" />
//           )}
//         </Route>
//         <Route path="/login" element={<Login />} />
//         <Route path="/password">
//           <Password>
//             <Route
//               path="/password/set_password/:id"
//               element={<SetPassword />}
//             />
//             <Route
//               path="/password/reset_password/:id"
//               element={<ForgotPassword />}
//             />
//           </Password>
//         </Route>
//         <Route path="/Admin/Dashboard">
//           {user && user.role === "admin" ? (
//             <Home>
//               <Route path="/Admin/Dashboard/orders">
//                 <Order>
//                   <Route
//                     path="/Admin/Dashboard/orders/all"
//                     element={<OrderHistory />}
//                   />
//                 </Order>
//               </Route>
//               <Route path="/Admin/Dashboard/users">
//                 <User>
//                   <Route
//                     path="/Admin/Dashboard/users/all"
//                     element={<UserList />}
//                   />
//                 </User>
//               </Route>
//               <Route path="/Admin/Dashboard/products">
//                 <Product>
//                   <Route
//                     path="/Admin/Dashboard/products/all"
//                     element={<ProductList />}
//                   />
//                 </Product>
//               </Route>
//               <Route path="/Admin/Dashboard/finances" element={<Finances />} />
//               <Route
//                 path="/Admin/Dashboard/notifications"
//                 element={<Notification />}
//               />
//               <Route
//                 path="/Admin/Dashboard/user_settings"
//                 element={<UserSettings />}
//               />
//               <Route
//                 path="/Admin/Dashboard/user_account"
//                 element={<UserAccount />}
//               />
//               <Route path="/Admin/Dashboard/password">
//                 <Password>
//                   <Route
//                     path="/Admin/Dashboard/password/set_password/:id"
//                     element={<SetPassword />}
//                   />
//                   <Route
//                     path="/Admin/Dashboard/password/reset_password/:id"
//                     element={<ForgotPassword />}
//                   />
//                 </Password>
//               </Route>
//             </Home>
//           ) : (
//             <Navigate to="/login" />
//           )}
//         </Route>
//         <Route path="/User/home">
//           {user && user.role !== "admin" ? (
//             <Home00>
//               <Route path="/User/home" element={<UserHistory />} />
//               <Route path="/User/home/food_menu" element={<FoodMenu />} />
//               <Route path="/User/home/orders/:id" element={<Order />} />
//               <Route
//                 path="/User/home/finances/:id"
//                 element={<UserFinances />}
//               />
//               <Route
//                 path="/User/home/user_settings/:id"
//                 element={<UserSettings />}
//               />
//               <Route
//                 path="/User/home/user_account/:id"
//                 element={<UserAccount />}
//               />
//             </Home00>
//           ) : (
//             <Navigate to="/Admin/Dashboard" />
//           )}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
