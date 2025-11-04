import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getHistoryDetails } from "../../services/plansService";
import { toast } from "react-toastify";
import Report from "../../components/dashboard/QueryHistory/Report";
import MainContent from "../../components/layout/MainContent";

const ReportPage = () => {
  const { queryId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!queryId) {
        toast.error("Invalid query ID");
        navigate("/history");
        return;
      }

      setLoading(true);
      try {
        const response = await getHistoryDetails(queryId);
        // Get plan name from URL params or response
        const planName =
          searchParams.get("planName") || response?.planName || "Standard";
        setReportData({ ...response, planName });
      } catch (error) {
        console.error("Failed to get history details:", error);
        toast.error("Failed to load report. Please try again.");
        navigate("/history");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [queryId, searchParams, navigate]);

  const handleClose = () => {
    navigate("/history");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#194D9A]"></div>
      </div>
    );
  }
  return <Report data={reportData} loading={loading} onClose={handleClose} />;
};

export default ReportPage;
