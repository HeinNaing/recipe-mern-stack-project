import React from "react";
import plus from "../assets/plus.svg";
import Ingredients from "./../components/Ingredients";
import axios from "axios";
import { useNavigate } from "react-router";
export default function RecipeForm() {
  const navigate = useNavigate();
  let [ingredients, setIngredients] = React.useState([]);
  let [newIngredients, setNewIngredients] = React.useState("");
  let [error, setError] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const addIngredient = () => {
    if (newIngredients) {
      setIngredients([...ingredients, newIngredients]);
      setNewIngredients("");
    }
  };

  const createRecipe = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients,
      };
      let results = await axios.post(
        "http://localhost:4000/api/recipes/add",
        recipe
      );
      navigate("/");
      console.log(results);
      console.log(recipe);
    } catch (e) {
      console.log(Object.keys(e.response.data.errors));
      setError(Object.keys(e.response.data.errors));
    }
  };
  return (
    <div className="h-screen mx-auto max-w-md">
      <h1 className="text-primary text-2xl text-center"> Recipe Form</h1>
      <form onSubmit={createRecipe}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xl border p-10 mt-10 mx-auto max-w-md gap-5 ">
          {/* <legend className="fieldset-legend"><Log></Log>in</legend> */}
          {
            !!error.length && (
              <div className="alert alert-error shadow-lg mb-4">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
                    />
                  </svg>
                  <span className="ml-2">{error.join(", ")} is invalid </span>
                </div>
              </div>
            )
          }
          <input
            type="text"
            className="input w-full"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            className="input w-full"
            placeholder="Recipe Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-between items-center gap-3">
            <input
              type="text"
              className="input"
              placeholder="Ingredients"
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
            />

            <img
              src={plus}
              alt=""
              className="cursor-pointer"
              onClick={addIngredient}
            />
          </div>
          {!!ingredients.length && <Ingredients ingredients={ingredients} />}
          <button type="submit" className="btn btn-primary mt-4">
            Create Recipe
          </button>
        </fieldset>
      </form>
    </div>
  );
}
