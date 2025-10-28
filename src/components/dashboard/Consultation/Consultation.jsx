import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { multiPlans, singlePlans } from "./plansData";
import {
  fetchSinglePlans,
  transformApiPlans,
} from "../../../services/plansService";
import PlanCard from "./PlanCard";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../hooks/useAuth";
import Modal from "../../common/Modal";
import SearchPlateForm from "../../common/SearchPlateForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Consultation = ({ activeMenu }) => {
  const [apiSinglePlans, setApiSinglePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showReportPopup, setShowReportPopup] = useState(false);
  const { addToCart, openCart } = useCart();
  const { user } = useAuth();
  const [purchasedPlanIds, setPurchasedPlanIds] = useState([]);

  const navigate = useNavigate();

  const [plateSearchResult, setPlateSearchResult] = useState(null);
  const [isSearchingPlate, setIsSearchingPlate] = useState(false);

  // Validation schema - dynamic based on whether we have results
  const getSearchPlateSchema = (searchMode) => {
    if (searchMode) {
      return z.object({
        licensePlate: z.string().min(1, "License Plate is required"),
      });
    }
    return z.object({
      makeAndModel: z.string().min(1, "Make & Model is required"),
      licensePlate: z.string().min(1, "License Plate is required"),
      chassis: z.string().min(1, "Chassis is required"),
      color: z.string().min(1, "Color is required"),
      yearOfManufacture: z.string().min(1, "Year Of Manufacture is required"),
    });
  };

  const searchMode = !plateSearchResult;

  const form = useForm({
    resolver: zodResolver(getSearchPlateSchema(searchMode)),
    defaultValues: {
      makeAndModel: "",
      licensePlate: "",
      chassis: "",
      color: "",
      yearOfManufacture: "",
    },
  });

  // Update resolver when searchMode changes
  useEffect(() => {
    form.clearErrors();
  }, [searchMode, form]);

  // Helper function to map purchase data to plan ID
  const getPlanIdFromPurchase = (purchase) => {
    // Map purchase.chosen or purchase.plan to plan IDs
    const planMapping = {
      Premium: 1,
      Ultra: 2,
      Plus: 3,
      Light: 4,
      "Always Present": 5,
      "Keep an eye on security": 6,
      Professional: 7,
      Negotiator: 8,
      "Test Drive": 9,
    };

    const purchaseName = purchase.chosen || purchase.plan_name || purchase.plan;
    return planMapping[purchaseName];
  };

  useEffect(() => {
    if (activeMenu === "single") {
      loadSinglePlans();
    }
  }, [activeMenu]);

  useEffect(() => {
    if (user) {
      // Extract purchased plan IDs from user data
      // This assumes the user object contains purchase history
      // Adjust this logic based on your actual API response structure
      const purchasedIds = [];
      if (user.purchases) {
        user.purchases.forEach((purchase) => {
          // Map purchase data to plan IDs
          // Adjust based on your API structure
          const planId = getPlanIdFromPurchase(purchase);
          if (planId) {
            purchasedIds.push(planId);
          }
        });
      }
      setPurchasedPlanIds(purchasedIds);
    }
  }, [user]);

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
    const isPurchased = purchasedPlanIds.includes(plan.id);

    if (isPurchased) {
      // If purchased, show report popup
      setShowReportPopup(true);
    } else {
      // If not purchased, add to cart
      addToCart(plan);
      openCart();
    }
  };

  const handleFormSubmit = async (data) => {
    if (!data.licensePlate?.trim()) {
      toast.error("Please enter a license plate");
      return;
    }
    if (plateSearchResult) {
      navigate("/history");
      return;
    }

    setIsSearchingPlate(true);
    try {
      const { searchPlate } = await import("../../../services/authService");
      const result = await searchPlate(data.licensePlate);
      setPlateSearchResult(result);

      form.reset({
        makeAndModel: result.Marca + "/" + result.Modelo || "",
        licensePlate: result.Placa,
        chassis: result.Chassi || "",
        color: result.Cor || "",
        yearOfManufacture: result.Ano_Fabricacao || "",
      });
      // Don't close modal, show results instead
    } catch (error) {
      console.error("Failed to search plate:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to search plate. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSearchingPlate(false);
    }
  };

  const handleCloseModal = () => {
    setPlateSearchResult(null);
    setShowReportPopup(false);
    form.reset({
      makeAndModel: "",
      licensePlate: "",
      chassis: "",
      color: "",
      yearOfManufacture: "",
    });
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
        {getPlansToRender().map((plan) => {
          const isPurchased = purchasedPlanIds.includes(plan.id);
          return (
            <PlanCard
              key={plan.id}
              plan={plan}
              isMultiple={activeMenu === "multiple"}
              onClick={() => handleChoosePlan(plan)}
              isPurchased={isPurchased}
            />
          );
        })}
      </div>

      {showReportPopup && (
        <Modal
          title={!plateSearchResult ? "Search Plate" : "Confirm Data"}
          onClose={handleCloseModal}
          className="!bg-[#194D9A] !text-white !rounded-3xl !p-8"
        >
          <SearchPlateForm
            form={form}
            onSubmit={handleFormSubmit}
            showCancelButton={true}
            onCancel={handleCloseModal}
            buttonText={
              plateSearchResult
                ? "Confirm"
                : isSearchingPlate
                ? "Searching..."
                : "Search"
            }
            searchMode={searchMode}
            isSearching={isSearchingPlate}
          />
        </Modal>
      )}
    </div>
  );
};

export default Consultation;
