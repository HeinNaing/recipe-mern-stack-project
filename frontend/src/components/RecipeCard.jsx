import React from "react";
import Ingredients from "./Ingredients";
export default function RecipeCard({ title, description, ingredients }) {
  return (
    <>
      <div className="card bg-base-100 w-full shadow-sm ">
        <figure>
          <img
            src="https://cicili.tv/wp-content/uploads/2024/08/Chicken-Fried-Rice-Small-2-1200x900.jpg"
            alt="fried rice"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge h-4 w-13 text-[10px] badge-secondary">
              NEW
            </div>
          </h2>
          <p>{description}</p>
          <Ingredients ingredients={ingredients} />
          <p className="text-sm text-gray-500">Published at: 5 mins ago</p>
        </div>
      </div>
    </>
  );
}
