import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { getSearchHistory } from "../../../services/plansService";
import { toast } from "react-toastify";

const History = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadSearchHistory();
  }, [currentPage, itemsPerPage]);

  // Auto refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadSearchHistory();
    }, 5000); // 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [currentPage, itemsPerPage]);

  const loadSearchHistory = async () => {
    setLoading(true);
    try {
      const response = await getSearchHistory(currentPage, itemsPerPage);
      setSearches(response.searches || []);
      setPagination(response.pagination);
      setTotalItems(response.pagination?.total_count || 0);
    } catch (error) {
      console.error("Failed to load Fotos do veículo:", error);
      toast.error("Failed to load Fotos do veículo. Please try again.");
      setSearches([]);
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
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const paginatedData = searches;

  const handleGetHistoryDetails = (queryId, planName) => {
    window.open(
      `/report/${queryId}?planName=${encodeURIComponent(planName)}`,
      "_blank"
    );
  };

  return (
    <div
      className={`flex flex-col justify-between gap-4 ${
        paginatedData.length <= 10 ? "h-[99%]" : "   "
      }`}
    >
      <div className="space-y-4">
        <p className="text-2xl font-semibold mb-4 text-center">
          Histórico de relatórios
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : searches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Você ainda não tem relatórios veiculares.
            <br />
            Que tal gerar o primeiro agora mesmo?
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="">
                <tr className="bg-black text-white [&>th]:p-2 [&>th]:text-left text-[0.75rem] [&>th]:!font-[400]">
                  <th className="!rounded-l-md">Data de conclusão</th>
                  <th>Tipo de relatório escolhido</th>
                  <th>Placa</th>
                  <th>Status</th>
                  <th className="!rounded-r-md">Relatórios</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 text-[0.75rem] [&>td]:!font-[500] [&>td]:!text-[0.75rem] [&>td]:!p-2"
                  >
                    <td>
                      {formatDate(item.date_of_conclusion || item.created_at)}
                    </td>
                    <td className="capitalize">
                      {item.plan_name || item.plan_code || "N/A"}
                    </td>
                    <td>{item.license_plate || item.plate || "N/A"}</td>
                    <td className="capitalize">
                      {item.status === "completed" ? "Finalizado" : "Em processamento"}
                    </td>
                    <td>
                      <button
                        className="text-[#194D9A] hover:text-[#1AABFE] underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() =>
                          handleGetHistoryDetails(
                            item.customer_query_id,
                            item.plan_name || item.plan_code || "N/A"
                          )
                        }
                        disabled={item.status !== "completed"}
                        title={
                          item.status !== "completed"
                            ? "Relatório não concluído ainda"
                            : ""
                        }
                      >
                        Acesse o seu relatório
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

export default History;
