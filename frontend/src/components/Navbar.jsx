import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
export default function Navbar() {
  const [username, setUserName] = useState(null);
  let {name} = useContext(AuthContext);
  console.log(name);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/me", {
          withCredentials: true,
        });
        console.log(response.data.data.username);
        setUserName(response.data.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <nav className="flex justify-between px-5 py-6 ">
      <div>
        <Link to="/" className="text-yellow-500 font-bold text-2xl">
          Recipe App
        </Link>
      </div>
      <div className="flex gap-4 text-[18px] font-semibold text-gray-500">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/sign-in"
          className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
        >
          Login
        </NavLink>
        <NavLink
          to="/sign-up"
          className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/recipes/create"
          className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
        >
          Create
        </NavLink>
        <NavLink
          to="/recipes/create"
          className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
        >
          {username}
        </NavLink>
      </div>
    </nav>
  );
}
