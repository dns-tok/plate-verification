import React, { useState, useEffect } from "react";
import { multiPlans, singlePlans } from "./plansData";
import {
  fetchSinglePlans,
  transformApiPlans,
} from "../../../services/plansService";
import PlanCard from "./PlanCard";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../hooks/useAuth";
import { getCurrentAccount } from "../../../services/authService";

const Consultation = ({ activeMenu = "single", showSearchPlateInput }) => {
  const [apiSinglePlans, setApiSinglePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { addToCart, openCart } = useCart();
  const { user } = useAuth();
  const [purchasedPlanIds, setPurchasedPlanIds] = useState([]);

  useEffect(() => {
    if (activeMenu === "single") {
      loadSinglePlans();
    }
  }, [activeMenu]);

  useEffect(() => {
    // Fallback: infer purchased plans by matching transaction amounts to plan prices
    const inferPurchasedPlans = async () => {
      try {
        const resp = await getCurrentAccount(1, 100);
        const txs = resp?.account?.transactions?.data || [];

        // Build price to planId map using API single plans if available, otherwise static
        const plansSource =
          apiSinglePlans.length > 0 ? apiSinglePlans : singlePlans;
        const priceToPlanId = new Map();
        plansSource.forEach((plan) => {
          const rawPrice =
            plan.apiData?.originalPrice ??
            Number(
              String(plan.price)
                .replace(/[^0-9.,]/g, "")
                .replace(".", "")
                .replace(",", ".")
            );
          const normalized = Number(parseFloat(rawPrice).toFixed(2));
          if (!Number.isNaN(normalized)) {
            priceToPlanId.set(normalized, plan.id);
          }
        });

        const matchedIds = new Set();
        txs.forEach((tx) => {
          if (
            tx.status === "settled" ||
            tx.transaction_status === "purchased"
          ) {
            const amt = Number(parseFloat(tx.amount).toFixed(2));
            const planId = priceToPlanId.get(amt);
            if (planId) matchedIds.add(planId);
          }
        });

        setPurchasedPlanIds(Array.from(matchedIds));
      } catch (e) {
        // Silent fail; keep current purchasedPlanIds
        console.error("Failed to infer purchased plans from transactions", e);
      }
    };

    inferPurchasedPlans();
  }, [user, apiSinglePlans]);

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

  const handleChoosePlan = (plan) => {
    // Always allow adding to cart, even if previously purchased
    addToCart(plan);
    openCart();
  };

  // Skeleton component for loading state
  const PlanSkeleton = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded mt-4"></div>
    </div>
  );

  return (
    <div className={`${!showSearchPlateInput && "py-3"}`}>
      <div className="flex items-center justify-between mb-2 lg:mb-8">
        <p className="text-2xl font-semibold">Nossos Relatórios</p>
        {activeMenu === "single" && (
          <div className="flex items-center gap-2">
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                Carregando planos...
              </div>
            )}
            {error && <div className="text-sm text-orange-600">{error}</div>}
          </div>
        )}
      </div>

      {activeMenu === "single" && loading ? (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-[860px] mx-auto`}
        >
          {[1, 2, 3, 4].map((i) => (
            <PlanSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${
            activeMenu === "multiple"
              ? "gap-4"
              : "gap-10 lg:gap-2 p-4 md:p-0 mb-4 md:mb-0"
          } mx-auto`}
        >
          {getPlansToRender().map((plan) => {
            const isPurchased = purchasedPlanIds.includes(plan.id);
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                isMultiple={activeMenu === "multiple"}
                onClick={() => handleChoosePlan(plan)}
                isPurchased={isPurchased}
                showSearchPlateInput={showSearchPlateInput}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Consultation;
