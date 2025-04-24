import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { useLocation } from "react-router";
import Pagination from "./../components/Pagination";
import NoResult from "../components/NoResult";
import SkeletonCard from "../components/SkeletonCard";
export default function Home() {
  let [recipes, setRecipes] = useState([]);
  let [links, setLinks] = useState([]);
  let [result, setResult] = useState(true);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(true);
  let location = useLocation();

  let searchQuery = new URLSearchParams(location.search);
  //preventing -1 input
  let selectedPage = Math.max(1, searchQuery.get("page") * 1 || 1);
  // console.log(result);
  useEffect(() => {
    let fetchRecipes = async () => {
      try {
        let responses = await axios.get("/api/recipes?page=" + selectedPage);

        if (responses.status === 200) {
          const recipesData = responses.data.data;
          const recipesPageLink = responses.data.links;
          // console.log(recipesData);
          setLoading(true);

          setLinks(recipesPageLink);
          setRecipes(recipesData);
          setResult(recipesData.length > 0); // Recipes found

          setLoading(false);
        } else {
          setResult(false); // No recipes found
        }
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [selectedPage]);

  return (
    <>
      {error ? (
        <div className="text-red-500 text-center">
          Failed to load recipes. Try again.
        </div>
      ) : loading ? (
        <SkeletonCard/>
      ) : result ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 w-auto">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                title={recipe.title}
                description={recipe.description}
                ingredients={recipe.ingredients}
              />
            ))}
          </div>
          {/* pagination */}
        </>
      ) : (
        <>
          <NoResult />
        </>
      )}
      {!error && !!links && (
        <Pagination links={links} selectedPage={selectedPage || 1} />
      )}
    </>
  );
}
