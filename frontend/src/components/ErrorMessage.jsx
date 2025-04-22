import React from "react";

export default function ErrorMessage(error) {
  return (
    <div className="alert alert-error shadow-lg">
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
        {Array.isArray(error) ? (
          <span className="ml-2">{error.join(", ")} is invalid</span>

        ) : (
          <span className="ml-2">{error}</span>
        )}
      </div>
    </div>
  );
}
