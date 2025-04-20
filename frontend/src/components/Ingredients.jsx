import React from "react";

export default function Ingredients({ ingredients }) {
  return (
    <>
      <div className="card-actions justify-start">
        Ingredients:
        {!!ingredients.length &&
          ingredients.map((ingredients, index) => (
            <div className="badge badge-primary" key={index}>
              {ingredients}
            </div>
          ))}
      </div>
    </>
  );
}
