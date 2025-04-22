import { Route, Routes } from "react-router";
import App from "../App";
//pages import
import Home from '../pages/Home';
import SignInForm from '../pages/SignInForm';
import SignUpForm from '../pages/SignUpForm';
import RecipeForm from '../pages/RecipeForm';


export default function index() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignInForm />} />
        <Route path="sign-up" element={<SignUpForm />} />
        <Route path="recipes/create" element={<RecipeForm />} />
      </Route>
    </Routes>
  );
}
