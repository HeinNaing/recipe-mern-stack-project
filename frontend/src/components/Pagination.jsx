import React from "react";
import { Link } from "react-router";
export default function Pagination({ links, selectedPage }) {
  return (
    <>
      <div className="flex justify-center items-center mt-4">
        <div className="join">
          <Link
            to={`${
              links.prevPage
                ? `/?page=${links.currentPages - 1}`
                : "/?page=" + links.currentPages
            }`}
          >
            <button
              className={`join-item btn ${
                links.prevPage ? "" : "btn-disabled"
              }`}
            >
              «
            </button>
          </Link>

          {links?.loopableLinks?.map((link) => (
            <Link key={link.number} to={`/?page=${link.number}`}>
              <button
                className={`join-item btn ${
                  selectedPage == link.number ? "bg-primary" : ""
                }`}
              >
                {link.number}
              </button>
            </Link>
          ))}

          <Link
            to={`${
              links.nextPage
                ? `/?page=${links.currentPages + 1}`
                : "/?page=" + links.currentPages
            }`}
          >
            <button
              className={`join-item btn ${
                links.nextPage ? "" : "btn-disabled"
              }`}
              onClick={() => {}}
            >
              »
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
