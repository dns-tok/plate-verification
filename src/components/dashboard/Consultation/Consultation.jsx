import React, { useState, useEffect } from "react";
import { multiPlans, singlePlans } from "./plansData";
import {
  fetchSinglePlans,
  transformApiPlans,
} from "../../../services/plansService";
import PlanCard from "./PlanCard";

const Consultation = ({ activeMenu }) => {
  const [apiSinglePlans, setApiSinglePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeMenu === "single") {
      loadSinglePlans();
    }
  }, [activeMenu]);

  const loadSinglePlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const plans = await fetchSinglePlans();
      const transformedPlans = transformApiPlans(plans);
      setApiSinglePlans(transformedPlans);
    } catch (err) {
      console.error("Failed to load single plans:", err);
      setError("Failed to load plans. Using cached data.");
      // Keep empty array to fall back to static data
      setApiSinglePlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Use API data if available, otherwise fall back to static data
  const getSinglePlans = () => {
    return apiSinglePlans.length > 0 ? apiSinglePlans : singlePlans;
  };

  const getPlansToRender = () => {
    return activeMenu === "single" ? getSinglePlans() : multiPlans;
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-2xl font-semibold">Our Plans</p>
        {activeMenu === "single" && (
          <div className="flex items-center gap-2">
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                Loading plans...
              </div>
            )}
            {error && <div className="text-sm text-orange-600">{error}</div>}
          </div>
        )}
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${
          activeMenu === "multiple" ? "gap-4" : "gap-2"
        } max-w-[860px] mx-auto`}
      >
        {getPlansToRender().map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isMultiple={activeMenu === "multiple"}
          />
        ))}
      </div>
    </div>
  );
};

export default Consultation;
