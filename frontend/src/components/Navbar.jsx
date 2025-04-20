import React from "react";
import { NavLink, Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-5 py-6 ">
      <div>
        <Link to="/" className="text-yellow-500 font-bold text-2xl">
          Recipe App
        </Link>
      </div>
      <div className="flex gap-4 text-[18px] font-semibold text-gray-500">
        <NavLink to="/" className={ ({isActive}) => isActive ? " text-amber-600 " : ""}>
          Home
        </NavLink>
        <NavLink to="/login" className={({isActive}) => isActive ? " text-amber-600 " : ""}>
          Login
        </NavLink>
        <NavLink to="/recipes/create" className={({isActive}) => isActive ? " text-amber-600 " : ""}>
          Create
        </NavLink>
      </div>
    </nav>
  );
}
