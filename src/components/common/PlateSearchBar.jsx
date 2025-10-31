import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { searchPlate } from "../../services/plansService";
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
}) => {
  const [licensePlate, setLicensePlate] = useState("");
  const [plateSearchResult, setPlateSearchResult] = useState(null);
  const [showSearchPlatePopup, setShowSearchPlatePopup] = useState(false);
  const [isSearchingPlate, setIsSearchingPlate] = useState(false);

  const schema = z.object({
    makeAndModel: z.string().min(1, "Make & Model is required"),
    licensePlate: z.string().min(1, "License Plate is required"),
    chassis: z.string().min(1, "Chassis is required"),
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
    console.log(plateSearchResult);
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

  const handleFormSubmit = () => {
    onConfirm && onConfirm();
    setShowSearchPlatePopup(false);
  };

  return (
    <div
      className={`flex items-center justify-between bg-white rounded-full  ${
        planCard ? "flex-col gap-2 px-4" : "flex-row  shadow-lg py-1.5 px-1.5"
      } ${className}`}
    >
      <input
        type="text"
        placeholder={"License Plate..."}
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
          {isSearchingPlate ? "Searching..." : "Consult Now"}
        </button>
      )}
      {showSearchPlatePopup && (
        <Modal
          title={!plateSearchResult ? "Search Plate" : "Confirm Data"}
          onClose={handleModalClose}
          className="!bg-[#194D9A] !text-white !rounded-3xl !p-8"
        >
          <SearchPlateForm
            form={form}
            onSubmit={handleFormSubmit}
            showCancelButton={planCard ? true : false}
            onCancel={handleModalClose}
            buttonText={planCard ? "Confirm" : "Release All Information"}
            isSearching={isSearchingPlate}
          />
        </Modal>
      )}
    </div>
  );
};

export default PlateSearchBar;
