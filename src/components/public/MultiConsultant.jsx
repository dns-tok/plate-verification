import React from "react";

const MultiConsultant = ({
  id,
  isSelected,
  onClick,
  planName,
  planNumber,
  priceDescription,
  price,
  discount,
  description,
  buttonText,
  isUserChoice = false,
}) => {
  return id === 9 ? (
    <div
      className={`md:col-span-2 xl:col-span-4 md:justify-self-center flex flex-col md:flex-row justify-between items-center gap-0 md:gap-10 backdrop-blur-xl  py-6 w-full md:w-auto px-6 rounded-md relative transition-all duration-300 ${
        isSelected ? "bg-[#1AABFE]/20 border-[#1AABFE] border-2" : ""
      }`}
    >
      <div className="w-full md:w-auto">
        <p className="text-white text-[0.8rem] md:text-[1.2rem] font-medium">
          Test Drive
        </p>
        <h2 className="text-white text-[1.5rem] md:text-[2.5rem] font-bold">
          Pacote R$ 150,00
        </h2>
        <p className="text-white text-sm md:text-[1rem] font-light">
          Compre R$ 150,00 e pague
        </p>
        <div className="flex flex-col gap-2 items-start mt-2">
          <p className="text-white text-[2.2rem] md:text-[2.8rem] leading-none">
            R$ 140,00
          </p>
          <h2 className="text-white text-[2.2rem] md:text-[2.8rem] leading-none">
            7%
          </h2>
          <p className="text-white text-sm md:text-[1rem] font-light">
            de economia
          </p>
        </div>
      </div>
      <div className="w-full md:w-auto ms-auto mt-6 text-center">
        <button
          onClick={onClick}
          className={`rounded-full mx-auto px-8 py-2 cursor-pointer whitespace-nowrap font-bold md:text-[1.2rem]  ${
            isSelected
              ? "bg-[#1AABFE] text-white"
              : "bg-white text-black hover:bg-[#1AABFE] hover:text-white transition-all duration-500"
          }`}
        >
          Comprar Pacote
        </button>
      </div>
    </div>
  ) : (
    <div
      className={`relative flex flex-col justify-between backdrop-blur-xl rounded-lg py-4 px-5 border h-full w-[18rem] transition-all duration-300 ${
        isSelected ? "bg-[#1AABFE]/20 border-[#1AABFE] border-2" : "border-none"
      }`}
    >
      <p className="text-white text-[0.8rem] md:text-[1.2rem] font-medium">
        {planName}
      </p>
      {planNumber && (
        <h2 className="text-white text-[1.5rem] md:text-[2.5rem] font-bold">
          {planNumber}
        </h2>
      )}
      <p className="text-white text-sm md:text-[1rem] font-light">
        {priceDescription}
      </p>

      <p className="text-white text-[2.2rem] md:text-[2.8rem] leading-none mt-2">
        {price}
      </p>
      {discount && (
        <h2 className="text-white text-[2.2rem] md:text-[2.8rem]">
          {discount}
        </h2>
      )}
      <p className="text-white text-[1rem] md:text-[1.1rem]  font-normal">
        {description}
      </p>
      <div className="w-[100%] my-2 text-center">
        <button
          onClick={onClick}
          className={`rounded-full w-[80%] mx-auto px-6 py-2 cursor-pointer font-bold ${
            isSelected
              ? "bg-[#1AABFE] text-white"
              : "bg-white text-black hover:bg-[#1AABFE] hover:text-white transition-all duration-500"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default MultiConsultant;
