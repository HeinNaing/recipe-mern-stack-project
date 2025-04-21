import React, { useState } from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Function to generate the pagination list
  const generatePagination = () => {
    const pagination = new Set();

    // Add first two pages
    pagination.add(1);
    if (totalPages >= 2) pagination.add(2);

    // Add pages around the current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 2 && i < totalPages - 1) pagination.add(i);
    }

    // Add last two pages
    pagination.add(totalPages - 1);
    pagination.add(totalPages);

    // Convert Set to array and sort
    const pages = Array.from(pagination).sort((a, b) => a - b);

    // Add '...' where needed
    const finalPagination = [];
    let lastPage = 0;
    for (let page of pages) {
      if (page - lastPage > 1) {
        finalPagination.push('...');
      }
      finalPagination.push(page);
      lastPage = page;
    }
    // console.log(finalPagination)
    return finalPagination;
  };

  // Handle page click
  const handlePageChange = (page) => {
    if (page === '...') return; // Prevent click on '...'
    onPageChange(page); // Call parent callback to update currentPage
  };

  // Generate pagination
  const pages = generatePagination();

  return (
    <div>
      <div className="pagination">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const totalPages = 20; // Example total pages
  const [currentPage, setCurrentPage] = useState(11); // Initial current page

  // Handle page change from child component
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update currentPage state
    console.log('Navigating to page', page); // For debugging
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default Pagination;
