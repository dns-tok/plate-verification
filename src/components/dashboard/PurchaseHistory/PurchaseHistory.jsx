import React, { useState, useEffect } from "react";
import Pagination from "../../common/Pagination";
import { getCurrentAccount } from "../../../services/authService";
import { toast } from "react-toastify";

const Purchases = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadTransactions();
  }, [currentPage, itemsPerPage]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await getCurrentAccount(currentPage, itemsPerPage);
      setTransactions(response.account?.transactions?.data || []);
      setPagination(response.account?.transactions?.meta);
      setTotalItems(response.account?.transactions?.meta?.total_count || 0);
    } catch (error) {
      console.error("Failed to load transactions:", error);
      toast.error("Failed to load transactions. Please try again.");
      setTransactions([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Format date from API response
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const paginatedData = transactions;

  return (
    <div
      className={`flex flex-col justify-between gap-4 ${
        paginatedData.length <= 10 ? "h-[99%]" : "   "
      }`}
    >
      <div className="space-y-4">
        <p className="text-2xl font-semibold mb-4 text-center">
          Histórico de compras
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="">
                <tr className="bg-black text-white [&>th]:p-2 [&>th]:text-left text-[0.75rem] [&>th]:!font-[400]">
                  <th className="!rounded-l-md">Data de conclusão</th>
                  <th>Tipo de relatório escolhido</th>
                  <th>Placa do veículo</th>
                  <th>Status</th>
                  <th className="!rounded-r-md">Compras</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={item.lago_id || item.id || index}
                    className="hover:bg-gray-50 text-[0.75rem] [&>td]:!font-[500] [&>td]:!text-[0.75rem] [&>td]:!p-2"
                  >
                    <td>{formatDate(item.created_at || item.date)}</td>
                    <td>{item?.name?.split(" - ")[0] || "N/A"}</td>
                    <td>{item?.name?.split(" - ")[1] || "N/A"}</td>
                    <td>
                      <button
                        className={`text-[#194D9A] hover:text-[#1AABFE] underline cursor-pointer ${
                          item.status === "settled" ||
                          item.transaction_status === "purchased"
                            ? "text-green-500"
                            : "text-orange-400"
                        }`}
                      >
                        {item.status === "settled" ||
                        item.transaction_status === "purchased"
                          ? "Pago"
                          : "Pending"}
                      </button>
                    </td>
                    <td>
                      <button
                        className={`text-[#194D9A] hover:text-[#1AABFE] underline cursor-pointer ${
                          item.status === "settled" ||
                          item.transaction_status === "purchased"
                            ? "text-green-500"
                            : "text-orange-400"
                        }`}
                      >
                        {item.status === "settled" ||
                        item.transaction_status === "purchased"
                          ? "Finalizado"
                          : "Complete Purchase"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Component */}
      {!loading && totalItems > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
};

export default Purchases;
