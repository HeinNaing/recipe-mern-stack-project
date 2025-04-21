import React from "react";
// import noResultGif from "../assets/NoResult.gif";
import noResultGif from "../assets/NoResult.png";
export default function NoResult() {
  return (
    <div className="flex justify-center items-center">
      <img
        src={noResultGif}
        alt="No Result found"
        className="w-50% h-[500px]  "
      />
    </div>
  );
}
