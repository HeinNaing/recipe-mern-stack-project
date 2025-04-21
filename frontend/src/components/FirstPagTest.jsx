import React from "react";
import { Link } from "react-router";

export default function Pagination({ links, selectedPage }) {
  const totalPages = links.existedPages;
  const currentPages = links.currentPages;
  const nextPage = links.nextPage;
  const prevPage = links.prevPage;
  console.log(prevPage);
  console.log(nextPage);
  const generatePagination = () => {
    let links = new Set();

    //first one
    links.add(1);
    if (totalPages >= 2) links.add(2);

    if (nextPage && prevPage) {
      // round number
      for (let i = currentPages - 1; i <= currentPages + 1; i++) {
        links.add(i);
      }
    }

    // final one
    links.add(totalPages - 1);
    links.add(totalPages);
    let pages = Array.from(links).sort((a, b) => a - b);
    console.log("array " + pages);
    let finalOne = [];

    // adding ...
    let lastPage = 0;
    // 1, 2, 3, 7 diffference 1  when > 1 let's add ...
    for (let page of pages) {
      if (page - lastPage > 1) {
        finalOne.push("...");
      }
      finalOne.push(page);
      lastPage = page;
    }
    return finalOne;
  };
  
  let pages = generatePagination();

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
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 100,
                  behavior: "smooth",
                });
              }}
            >
              «
            </button>
          </Link>

          {pages.map((one, index) =>
            one === "..." ? (
              <button
                key={`dots-${index}`}
                className="join-item btn btn-disabled"
              >
                ...
              </button>
            ) : (
              <Link key={index} to={`/?page=${one}`}>
                <button
                  className={`join-item btn ${
                    selectedPage == one ? "bg-primary" : ""
                  }`}
                >
                  {one}
                </button>
              </Link>
            )
          )}

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
              onClick={() => {
                window.scroll({
                  top: 0,
                  left: 100,
                  behavior: "smooth",
                });
              }}
            >
              »
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
