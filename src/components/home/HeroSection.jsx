import React, { useState } from "react";
import Modal from "../ui/Modal";
import { scrollToSection } from "../../utils/scrollUtils";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    makeAndModel: "VW/Golf GTI AC",
    licensePlate: "",
    chassis: "WBAEA21010B00000",
    color: "Red",
    yearOfManufacture: "2024/2025",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (formData.licensePlate.trim() === "") {
      alert("Please enter a valid license plate");
      return;
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const labelClass = "text-[0.9rem] md:text-[0.8rem] font-semibold";
  const inputClass =
    "bg-white rounded-md py-2 px-2 w-full text-black text-[1rem] md:text-[1rem] outline-none shadow-md";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    scrollToSection("plans");
    closeModal();
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
              className="text-[1rem] resize-none border-none outline-none w-full h-6 px-2 md:px-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:shadow-none !bg-white"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
            />

            <button
              className={`text-[0.8rem] md:text-[0.9rem] bg-[#1AABFE] hover:bg-[#1590d4] font-semibold w-fit whitespace-nowrap text-white  transition-colors duration-300 py-2 md:py-3 px-3 md:px-5  cursor-pointer rounded-full`}
              onClick={openModal}
            >
              Consult Now
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
            src="/verificationBadge1.svg"
            alt="Reclame Aqui"
            className="h-10 md:h-12 w-auto object-contain"
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

      {isModalOpen && (
        <Modal title="Query Data" onClose={closeModal}>
          <form
            className="flex flex-col gap-3"
            action=""
            onSubmit={handleFormSubmit}
          >
            <div className="flex flex-col uppercase">
              <label htmlFor="name" className={labelClass}>
                Make & Modal
              </label>
              <input
                type="text"
                className={inputClass}
                name="makeAndModel"
                value={formData.makeAndModel}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col  uppercase">
              <label htmlFor="email" className={labelClass}>
                License Plate
              </label>
              <input
                type="text"
                className={inputClass}
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col uppercase">
              <label htmlFor="phone" className={labelClass}>
                Chassis
              </label>
              <input
                type="text"
                className={inputClass}
                name="chassis"
                value={formData.chassis}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col uppercase">
              <label htmlFor="city" className={labelClass}>
                Color
              </label>
              <input
                type="text"
                className={inputClass}
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col uppercase">
              <label htmlFor="city" className={labelClass}>
                Year Of Manufacture / Model
              </label>
              <input
                type="text"
                className={inputClass}
                name="yearOfManufacture"
                value={formData.yearOfManufacture}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-white rounded-full mx-auto font-bold px-6 py-2 text-[1rem] md:text-[0.9rem] mt-4 text-[#1AABFE] whitespace-nowrap mb-2 cursor-pointer"
            >
              Release All Information
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default HeroSection;
