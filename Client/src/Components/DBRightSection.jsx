import React from "react";
import DBHeader from "./DBHeader";
import DBHome from "./DBHome";
import DBOrders from "./DBOrders";
import { Route, Routes } from "react-router-dom";
import DBItems from "./DBItems";
import DBNewItems from "./DBNewItems";
import DBUsers from "./DBUsers";

const DBRightSection = () => {
  return (
    <div className="flex flex-col px-12 py-12 flex-1 h-full">
      <DBHeader />
      <div className=" flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItems />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
