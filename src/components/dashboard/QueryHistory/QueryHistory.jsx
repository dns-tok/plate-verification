import React, { useState, useMemo } from "react";
import { queryData } from "./queryData";
import Pagination from "../../common/Pagination";

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return queryData.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div
      className={`flex flex-col justify-between gap-4 ${
        paginatedData.length <= 10 ? "h-[99%]" : "   "
      }`}
    >
      <div className="space-y-4">
        <p className="text-2xl font-semibold mb-4 text-center">Query History</p>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="">
              <tr className="bg-black text-white [&>th]:p-2 [&>th]:text-left text-[0.75rem] [&>th]:!font-[400]">
                <th className="!rounded-l-md">Date of conclusion</th>
                <th>Chosen</th>
                <th>Plate</th>
                <th>Status</th>
                <th className="!rounded-r-md">Purchase</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id || item.plate}
                  className="hover:bg-gray-50 text-[0.75rem] [&>td]:!font-[500] [&>td]:!text-[0.75rem] [&>td]:!p-2"
                >
                  <td>{item.date}</td>
                  <td>{item.chosen}</td>
                  <td>{item.plate}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="text-[#194D9A] hover:text-[#1AABFE] underline cursor-pointer">
                      {item.purchase}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Component */}
      <Pagination
        totalItems={queryData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default History;
