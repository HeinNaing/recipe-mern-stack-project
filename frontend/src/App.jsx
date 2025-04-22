import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="">
      <div className="shadow-lg bg-white">
        <div className="max-w-7xl m-auto ">
          <Navbar />
        </div>
      </div>
      <div className=" px-20 py-5">
        <Outlet />
      </div>
    </div>
  );
}
