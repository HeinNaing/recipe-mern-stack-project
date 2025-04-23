import { Route, Routes, Navigate } from "react-router";
import App from "../App";
//pages import
import Home from "../pages/Home";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";
import RecipeForm from "../pages/RecipeForm";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function index() {
  let { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={user?.data ? <Home /> : <Navigate to={"/sign-in"} />}
        />
        <Route
          path="sign-in"
          element={!user?.data ? <SignInForm /> : <Navigate to={"/"} />}
        />
        <Route
          path="sign-up"
          element={!user?.data ? <SignUpForm /> : <Navigate to={"/"} />}
        />
        <Route
          path="recipes/create"
          element={user?.data ? <RecipeForm /> : <Navigate to={"/sign-in"} />}
        />
      </Route>
    </Routes>
  );
}
