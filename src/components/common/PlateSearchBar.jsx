import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { searchPlate, criarOrder } from "../../services/plansService";
import { formatPlateDisplay, unmaskPlate } from "../../utils/plateFormat";
import Modal from "./Modal";
import SearchPlateForm from "./SearchPlateForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PlateSearchBar = ({
  onSuccess,
  onError,
  onConfirm,
  className = "",
  openModalOnSuccess = true,
  planCard = false,
  plan = null,
}) => {
  const [licensePlate, setLicensePlate] = useState("");
  const [plateSearchResult, setPlateSearchResult] = useState(null);
  const [showSearchPlatePopup, setShowSearchPlatePopup] = useState(false);
  const [isSearchingPlate, setIsSearchingPlate] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const schema = z.object({
    makeAndModel: z.string(),
    licensePlate: z.string(),
    chassis: z.string(),
    logo: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      makeAndModel: "",
      licensePlate: "",
      chassis: "",
      logo: "",
    },
  });

  const handleSearch = async () => {
    if (!licensePlate.trim()) {
      toast.error("Please enter a valid license plate");
      return;
    }
    setIsSearchingPlate(true);
    try {
      const result = await searchPlate(unmaskPlate(licensePlate));
      setPlateSearchResult(result);
      onSuccess && onSuccess(result, unmaskPlate(licensePlate));
      if (openModalOnSuccess) {
        setShowSearchPlatePopup(true);
      }
    } catch (error) {
      if (onError) onError(error);
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

  useEffect(() => {
    if (plateSearchResult) {
      form.reset({
        makeAndModel:
          plateSearchResult.Marca && plateSearchResult.Modelo
            ? `${plateSearchResult.Marca}/${plateSearchResult.Modelo}`
            : "",
        licensePlate: formatPlateDisplay(plateSearchResult.Placa) || "",
        chassis: plateSearchResult.Chassi || "",
        logo: plateSearchResult.logo || "",
      });
    }
    // eslint-disable-next-line
  }, [plateSearchResult]);

  const handleModalClose = () => {
    setShowSearchPlatePopup(false);
    setPlateSearchResult(null);
    form.reset({
      makeAndModel: "",
      licensePlate: "",
      chassis: "",
      logo: "",
    });
  };

  const handleFormSubmit = async () => {
    if (!plateSearchResult || !licensePlate.trim()) {
      toast.error("Please search for a plate first");
      return;
    }
    // If plan is provided, call criar_order API
    if (plan) {
      setIsCreatingOrder(true);
      try {
        // Extract plan code - prefer apiData.code, otherwise derive from plan name
        let planCode;
        if (plan.apiData?.code) {
          planCode = plan.apiData.code;
        } else {
          // Extract from plan name (e.g., "Light Plan" -> "light", "Premium Plan" -> "premium")
          const planName = plan.name || "";
          planCode = planName
            .toLowerCase()
            .replace(" plan", "")
            .replace(/\s+/g, "_");
        }

        const unmaskedPlate = unmaskPlate(licensePlate);

        const response = await criarOrder(unmaskedPlate, planCode, "");

        // Order created successfully - redirect to query history
        toast.success("Order created successfully!");
        setShowSearchPlatePopup(false);
        // Call onConfirm callback which redirects to history, or redirect directly
        if (onConfirm) {
          onConfirm();
        }
      } catch (error) {
        // Check for insufficient balance error
        const errorResponse = error?.response?.data;
        if (
          errorResponse?.error === "Saldo Insuficiente" ||
          errorResponse?.message === "Saldo Insuficiente"
        ) {
          toast.error(
            "Insufficient wallet balance. Please add funds to your account."
          );
        } else {
          const errorMessage =
            errorResponse?.message ||
            errorResponse?.error ||
            error?.message ||
            "Failed to create order. Please try again.";
          toast.error(errorMessage);
        }
      } finally {
        setIsCreatingOrder(false);
      }
    } else {
      // If no plan, just call the onConfirm callback
      onConfirm && onConfirm();
      setShowSearchPlatePopup(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-between bg-white rounded-full  ${
        planCard ? "flex-col gap-2 px-4" : "flex-row  shadow-lg py-1.5 px-1.5"
      } ${className}`}
    >
      <input
        type="text"
        placeholder={"Digite a placa…"}
        className={` resize-none  outline-none w-full  text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:shadow-none bg-white ${
          planCard
            ? "h-8 border border-gray-300 rounded-full text-sm px-3 text-center focus:border-[#1AABFE]"
            : "h-6 border-none text-[1rem] px-2 md:px-4"
        }`}
        value={licensePlate}
        onChange={(e) => setLicensePlate(formatPlateDisplay(e.target.value))}
        required
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {planCard ? (
        <button
          type="button"
          onClick={handleSearch}
          disabled={isSearchingPlate || !licensePlate.trim()}
          className={`rounded-full mx-auto px-6 py-[7px] bg-[#F2DF33] text-black font-bold text-[0.8rem] md:text-[0.65rem] min-w-[60%] shadow-md
            ${
              isSearchingPlate || !licensePlate.trim()
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
            `}
        >
          {isSearchingPlate ? "Searching..." : "Check"}
        </button>
      ) : (
        <button
          className={`text-[0.8rem] md:text-[0.9rem] bg-[#1AABFE] hover:bg-[#1590d4] font-semibold w-fit whitespace-nowrap text-white transition-colors duration-300 py-2 md:py-3 px-3 md:px-5 rounded-full ${
            planCard ? "" : "w-fit"
          } ${
            isSearchingPlate || !licensePlate.trim()
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={handleSearch}
          disabled={isSearchingPlate || !licensePlate.trim()}
        >
          {isSearchingPlate ? "Procurando..." : "Consultar agora"}
        </button>
      )}
      {showSearchPlatePopup && (
        <Modal
          title={!plateSearchResult ? "Search Plate" : "Confirmar informações"}
          onClose={handleModalClose}
          className="!bg-[#194D9A] !text-white !rounded-3xl !p-8"
        >
          <SearchPlateForm
            form={form}
            onSubmit={handleFormSubmit}
            showCancelButton={planCard ? true : false}
            onCancel={handleModalClose}
            buttonText={planCard ? "Confirm" : "Liberar todas as informações"}
            isSearching={isSearchingPlate || isCreatingOrder}
          />
        </Modal>
      )}
    </div>
  );
};

export default PlateSearchBar;
