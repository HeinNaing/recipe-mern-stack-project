import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useLocation } from "react-router";
import Pagination from "./../components/Pagination";
import NoResult from "../components/NoResult";
export default function Home() {
  let [recipes, setRecipes] = useState([]);
  let [links, setLinks] = useState([]);
  let [result, setResult] = useState(true);
  let location = useLocation();
  let searchQuery = new URLSearchParams(location.search);
  //preventing -1 input
  let selectedPage = Math.max(1, searchQuery.get("page") * 1 || 1);
  console.log(result);
  useEffect(() => {
    let fetchRecipes = async () => {
      let responses = await axios.get(
        "http://localhost:4000/api/recipes?page=" + selectedPage
      );
      console.log(responses.data);
      setRecipes(responses.data.data);
      setLinks(responses.data.links);
      if (responses.data.data.length > 0) {
        setResult(true); // No recipes found
      } else {
        setResult(false);
      }
    };

    fetchRecipes();
  }, [selectedPage, result]);

  return (
    <>
      {result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 w-auto">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                description={recipe.description}
                ingredients={recipe.ingredients}
              />
            ))}
          </div>
        </>
      ) : (
        <NoResult />
      )}
      {/* pagination */}
      {!!links && <Pagination links={links} selectedPage={selectedPage || 1} />}
    </>
  );
}
