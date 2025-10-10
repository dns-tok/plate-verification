import React from "react";
import Button from "./Button";

const HeroSection = () => {
  return (
    <div className="min-h-[36rem] bg-[url('/heroBg.svg')] bg-cover bg-center bg-no-repeat overflow-hidden relative commonPadding flex flex-col lg:flex-row gap-10 lg:gap-0 items-end py-8">
      {/* Left Content */}
      <div className="w-full flex flex-col z-10 text-center md:text-start">
        <h1 className="text-white text-[2rem] md:text-[3.5rem] font-bold pb-6 md:pb-[3rem]">
          Before purchasing, consult.
          <br />
          <span className="text-[#1AABFE]">Protect your dream</span>
        </h1>
        <div className="md:hidden w-full  h-[60%]  flex items-end justify-center lg:justify-end z-0 p-6">
          <img
            src="/car.svg"
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
              className="text-[0.9rem] resize-none border-none outline-none w-full h-6 px-2 md:px-4 bg-transparent text-gray-700 placeholder-gray-500"
            />

            <button
              className={`text-[0.8rem] md:text-[0.9rem] bg-[#1AABFE] hover:bg-[#1590d4] font-semibold w-fit whitespace-nowrap text-white  transition-colors duration-300 py-2 md:py-3 px-3 md:px-5  cursor-pointer rounded-full`}
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
            src="/reclame-aqui.png"
            alt="Reclame Aqui"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <img
            src="/olcsorjrgwawyjjyl301.png"
            alt="Trust Seal"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <img
            src="/1e90ea_e08a095cca5746a5bf7d585a8fd4afea~mv2.png"
            alt="Verification Badge"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Car Image */}
      <div className="hidden md:flex lg:absolute bottom-0 right-0 w-full lg:w-[55%] h-[60%] lg:h-full  items-end justify-center lg:justify-end z-0 p-8 md:p-0">
        <img
          src="/car.svg"
          alt="Car"
          className="w-auto h-full object-contain object-bottom transform scale-110 lg:scale-100"
        />
      </div>
    </div>
  );
};

export default HeroSection;
