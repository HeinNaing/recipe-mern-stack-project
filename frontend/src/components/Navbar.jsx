import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUserName] = useState(null);
  let { user, dispatch } = useContext(AuthContext);
  let logout = async () => {
    let response = await axios.get("/api/user/logout", {
      withCredentials: true,
    });
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: "LOGOUT" });

      navigate("/sign-in");

      setUserName(null);
      console.log("Logout successful");
    }
  };

  return (
    <nav className="flex justify-between px-5 py-6 ">
      <div>
        <Link to="/" className="text-yellow-500 font-bold text-2xl">
          Recipe App
        </Link>
      </div>
      <div className="flex gap-4 text-[18px] font-semibold text-gray-500">
        {user && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes/create"
              className={({ isActive }) => (isActive ? " text-amber-600 " : "")}
            >
              Create
            </NavLink>
            <h1>{user?.data?.username}</h1>
            <NavLink>
              <button onClick={logout}>Logout</button>
            </NavLink>
          </>
        )}

        {!user&& (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}
