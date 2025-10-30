import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { toast } from "react-toastify";
import SearchPlateForm from "../common/SearchPlateForm";
import { searchPlate } from "../../services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { scrollToSection } from "../../utils/scrollUtils";

const HeroSection = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [plateSearchResult, setPlateSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilledFormModal, setShowFilledFormModal] = useState(false);

  // Show all fields, these are required
  const schema = z.object({
    makeAndModel: z.string().min(1, "Make & Model is required"),
    licensePlate: z.string().min(1, "License Plate is required"),
    chassis: z.string().min(1, "Chassis is required"),
    color: z.string().min(1, "Color is required"),
    yearOfManufacture: z.string().min(1, "Year Of Manufacture is required"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      makeAndModel: "",
      licensePlate: licensePlate,
      chassis: "",
      color: "",
      yearOfManufacture: "",
    },
  });

  // When car data is fetched, fill the form fields
  useEffect(() => {
    if (plateSearchResult) {
      form.reset({
        makeAndModel:
          plateSearchResult.Marca && plateSearchResult.Modelo
            ? `${plateSearchResult.Marca}/${plateSearchResult.Modelo}`
            : "",
        licensePlate: plateSearchResult.Placa || licensePlate,
        chassis: plateSearchResult.Chassi || "",
        color: plateSearchResult.Cor || "",
        yearOfManufacture: plateSearchResult.Ano_Fabricacao || "",
      });
    }
    // eslint-disable-next-line
  }, [plateSearchResult]);

  // Only handle main hero section input & submit here
  const handleConsultNow = async () => {
    if (!licensePlate.trim()) {
      toast.error("Please enter a valid license plate");
      return;
    }
    setIsSearching(true);
    try {
      const result = await searchPlate(licensePlate);
      setPlateSearchResult(result);
      setShowFilledFormModal(true);
    } catch (error) {
      console.error("Failed to search plate:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to search plate. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSearching(false);
    }
  };

  // When modal closes, clear state and reset form
  const handleModalClose = () => {
    setShowFilledFormModal(false);
    setPlateSearchResult(null);
    form.reset({
      makeAndModel: "",
      licensePlate: licensePlate,
      chassis: "",
      color: "",
      yearOfManufacture: "",
    });
  };

  // Modal submit just closes the modal (or scrolls, etc. - adjust as needed)
  const handleFormSubmit = (data) => {
    // Scroll to plans section before closing modal
    scrollToSection("plans");
    setShowFilledFormModal(false);
    // Optionally, you could do more here
  };

  return (
    <div className="min-h-[36rem] bg-[url('/heroBg.svg')] bg-cover bg-center bg-no-repeat overflow-hidden relative commonPadding flex flex-col lg:flex-row gap-10 lg:gap-0 items-end py-8">
      {/* Left Content */}
      <div className="w-full flex flex-col z-10 text-center md:text-start">
        <h1 className="text-white text-[2rem] md:text-[3.5rem] font-bold md:pb-[3rem]">
          Before purchasing, consult.
          <br />
          <span className="text-[#1AABFE]">Protect your dream</span>
        </h1>
        <div className="md:hidden w-full  h-[60%]  flex items-end justify-center lg:justify-end z-0 p-6">
          <img
            src="/car.png"
            alt="Car"
            className="w-auto h-full object-contain object-bottom transform scale-110 lg:scale-100"
          />
        </div>

        <div className="w-full lg:w-[41%] max-w-[40rem]">
          {/* Search Container */}
          <div className="flex flex-row items-center justify-between bg-white rounded-full py-1.5 px-1.5 shadow-lg ">
            <input
              type="text"
              placeholder="Type here is the vehicle license..."
              className="text-[1rem] resize-none border-none outline-none w-full h-6 px-2 md:px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:shadow-none bg-white"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              required
            />

            <button
              className={`text-[0.8rem] md:text-[0.9rem] bg-[#1AABFE] hover:bg-[#1590d4] font-semibold w-fit whitespace-nowrap text-white  transition-colors duration-300 py-2 md:py-3 px-3 md:px-5   rounded-full ${
                isSearching ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={handleConsultNow}
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Consult Now"}
            </button>
          </div>

          {/* Description */}
          <p className="text-white text-[1rem] md:text-[1.2rem] pt-4 md:pt-[1rem] leading-relaxed">
            Consult everything you need, ultimately want buy a car and not one
            story to tell, report complete
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-[1.6rem] justify-center md:justify-start">
          <img
            onClick={() =>
              window.open(
                "https://www.reclameaqui.com.br/empresa/prototyp3-servicos-de-informatica-ltda/",
                "_blank"
              )
            }
            src="/verificationBadge1.svg"
            alt="Reclame Aqui"
            className="h-10 md:h-12 w-auto object-contain cursor-pointer rounded-lg"
          />
          <img
            src="/verificationBadge2.svg"
            alt="Trust Seal"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <img
            src="/verificationBadge3.svg"
            alt="Verification Badge"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Car Image */}
      <div className="hidden md:flex lg:absolute bottom-0 right-0 w-full lg:w-[55%] h-[60%] lg:h-full  items-end justify-center lg:justify-end z-0 p-8 md:p-0">
        <img
          src="/car.png"
          alt="Car"
          className="w-auto h-full object-contain object-bottom transform scale-110 lg:scale-100"
        />
      </div>

      {/* Only show modal when plateSearchResult (car) is set */}
      {showFilledFormModal && plateSearchResult && (
        <Modal title="Query Data" onClose={handleModalClose}>
          <SearchPlateForm
            form={form}
            onSubmit={handleFormSubmit}
            showCancelButton={true}
            onCancel={handleModalClose}
            buttonText={"Confirm"}
            labelClassName="!text-black"
            searchMode={false} // Always show all fields in modal
            isSearching={false}
          />
        </Modal>
      )}
    </div>
  );
};

export default HeroSection;
