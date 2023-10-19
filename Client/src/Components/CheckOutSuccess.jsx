import React from "react";
import { FaArrowLeft } from "../assets/icons";
import { NavLink } from "react-router-dom";
import { Header } from "../Components";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";

const CheckOutSuccess = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-32 px-6 md:px-24 2xl:px-96 gap-8 pb-24">
        <img
          src="https://img.freepik.com/free-photo/online-payment-security-concept-3d-phone-bill_107791-16722.jpg?w=900&t=st=1697363135~exp=1697363735~hmac=ef5448d47e4586578e93bddd7be55a61a839e6b227e44b32088a976081c24ee6"
          alt="..."
          className="w-full md:w-[480px]"
        />
        <h1 className="text-[38px] text-textColor font-bold">
          Amaount paid Successful
        </h1>
        <motion.div {...buttonClick}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-xl text-textColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-3xl text-textColor" />
            Get Back To Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
};

export default CheckOutSuccess;
