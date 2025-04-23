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
          element={<Home />}
        />
        <Route
          path="sign-in"
          element={!user? <SignInForm /> : <Navigate to={"/"} />}
        />
        <Route
          path="sign-up"
          element={!user? <SignUpForm /> : <Navigate to={"/"} />}
        />
        <Route
          path="recipes/create"
          element={user? <RecipeForm /> : <Navigate to={"/sign-in"} />}
        />
      </Route>
    </Routes>
  );
}
