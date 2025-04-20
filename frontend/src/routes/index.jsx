import { Route, Routes } from "react-router";
import App from "../App";
//pages import
import Home from '../pages/Home';
import Login from '../pages/Login';
import RecipeForm from '../pages/RecipeForm';


export default function index() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="recipes/create" element={<RecipeForm />} />
      </Route>
    </Routes>
  );
}
