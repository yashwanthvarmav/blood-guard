import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const UserLayout = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className=" w-[25%]  bg-white border-r hidden md:block">
        <SideBar />
      </div>
      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
