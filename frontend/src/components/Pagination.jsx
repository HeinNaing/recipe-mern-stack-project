import React from "react";
import { Link } from "react-router";
export default function Pagination({ links, selectedPage }) {
  const totalPages = links.existedPages;
  const currentPages = links.currentPages;
  const nextPage = links.nextPage;
  const prevPage = links.prevPage;
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 100,
      behavior: "smooth",
    });
  };
  const generatePagination = () => {
    let newLinks = new Set();
    // adding first , second and third number
    newLinks.add(1);
    if (totalPages >= 2) newLinks.add(2);
    if (totalPages >= 2) newLinks.add(3);

    //adding left and right number near current page
    if (nextPage && prevPage) {
      for (let i = currentPages - 1; i <= currentPages + 1; i++) {
        if (i > 0 && i <= totalPages) {
          newLinks.add(i);
        }
      }
    }
    
    // adding last and near two one

    if (totalPages >= 3) newLinks.add(totalPages - 2);
    if (totalPages >= 2) newLinks.add(totalPages - 1);
    if(totalPages) newLinks.add(totalPages);

    let pages = Array.from(newLinks).sort((a, b) => a - b);
    console.log("page" + pages);
    // 1, 2, 3,  5
    // adding "..." between
    let finalPages = [];
    let lastPage = 0;
    for (let currentPage of pages) {
      if (currentPage - lastPage > 1) {
        finalPages.push("...");
      }
      finalPages.push(currentPage);
      lastPage = currentPage;
    }
    return finalPages;
  };

  let pages = generatePagination();
  console.log(pages);

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
              onClick={scrollToTop}
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
                  onClick={scrollToTop}
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
              onClick={scrollToTop}
            >
              »
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
