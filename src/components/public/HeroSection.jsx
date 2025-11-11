import React from "react";
import PlateSearchBar from "../common/PlateSearchBar";
import { scrollToSection } from "../../utils/scrollUtils";

const HeroSection = () => {
  const handleSearchConfirm = () => {
    scrollToSection("plans");
  };

  return (
    <div className="min-h-[36rem] bg-[url('/heroBg.svg')] bg-cover bg-center bg-no-repeat overflow-hidden relative commonPadding flex flex-col lg:flex-row gap-10 lg:gap-0 items-end py-8">
      {/* Left Content */}
      <div className="w-full flex flex-col z-10 text-center md:text-start">
        <h1 className="text-white text-[2rem] md:text-[3.5rem] font-bold md:pb-[3rem] max-w-[70vw]">
          Antes de comprar um carro semi-novo, consulte.
          <br />
          <span className="text-[#1AABFE]">Proteja o seu sonho.</span>
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
          <PlateSearchBar onConfirm={handleSearchConfirm} />

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
    </div>
  );
};

export default HeroSection;
