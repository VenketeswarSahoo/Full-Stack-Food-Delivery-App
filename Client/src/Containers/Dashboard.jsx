import React from "react";
import DBLeftSection from "../Components/DBLeftSection";
import DBRightSection from "../Components/DBRightSection";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
