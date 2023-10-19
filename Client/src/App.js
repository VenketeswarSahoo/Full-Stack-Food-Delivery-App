import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Containers/Login";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useDispatch } from "react-redux";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { setUserDetails } from "./context/actions/userActions";
import { motion } from "framer-motion";
import { fadeInOut } from "./animations";
import Dashboard from "./Containers/Dashboard";
import { Main } from "./Containers";
import { setCartItems } from "./context/actions/cartAction";
import { CheckOutSuccess, UserOrders } from "./Components";

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setisLoading(true);
    firebaseAuth.onAuthStateChanged(cred => {
      if (cred) {
        cred.getIdToken().then(token => {
          validateUserJWTToken(token).then(data => {
            if (data) {
              getAllCartItems(data.user_id).then(items => {
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setisLoading(false);
      // setInterval(() => {
      //   setisLoading(false);
      // }, 2000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading &&
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          Loading...
        </motion.div>}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UserOrders />} />
      </Routes>
    </div>
  );
};

export default App;
