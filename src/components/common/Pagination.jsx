import React, { useState } from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination logic
      if (currentPage <= 4) {
        // Show first 5 pages, ellipsis, last page
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show first page, ellipsis, last 5 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, ellipsis, current page and surrounding pages, ellipsis, last page
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleGoToPage = (e) => {
    e.preventDefault();
    const page = parseInt(e.target.pageInput.value);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    e.target.pageInput.value = "";
  };

  return (
    <div className="flex items-center justify-between ">
      {/* Rows per page section */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-xs font-medium">Rows per page</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-1 py-1 text-xs focus:outline-none focus:ring-none focus:ring-blue-500 bg-white cursor-pointer [&>option]:!text-xs [&>option]:! [&>option]!:text-gray-700"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Page navigation section */}
      <div className="flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-3">
          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="text-gray-700 text-xs font-medium ">
                  ......
                </span>
              ) : (
                <button
                  onClick={() => handlePageClick(page)}
                  className={`text-xs font-medium px-2 py-1 transition-colors relative cursor-pointer ${
                    page === currentPage
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {page}
                  {page === currentPage && (
                    <div className="flex justify-center absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Current page indicator - positioned below the page numbers */}
      </div>

      {/* Go to page section */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-xs font-medium">Go to page</span>
        <form onSubmit={handleGoToPage} className="flex items-center space-x-1">
          <input
            name="pageInput"
            type="number"
            min="1"
            max={totalPages}
            placeholder="Page"
            className="w-16 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded text-xs  hover:bg-blue-700 cursor-pointer transition-colors"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagination;
