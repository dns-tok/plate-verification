import React from "react";

const MultiConsultant = ({
  id,
  isSelected,
  onClick,
  planName,
  planNumber,
  priceDescription,
  discount,
  description,
  buttonText,
  isUserChoice = false,
}) => {
  return id === 9 ? (
    <div
      className={`md:col-span-4 md:justify-self-center flex flex-col md:flex-row justify-between items-center gap-0 md:gap-10 backdrop-blur-xl  py-6 w-full md:w-auto px-6 rounded-md relative ${
        isSelected
          ? "bg-[#1AABFE]/20 border-[#1AABFE] border-2"
          : "bg-[#1AABFE]/20 border border-[#1AABFE]/30"
      }`}
    >
      <div className="w-full md:w-auto">
        <p className="text-white text-[1rem] md:text-[1.1rem] font-medium">
          Test Drive
        </p>
        <h2 className="text-white text-[1.8rem] md:text-[2.5rem] font-bold">
          Plan 150
        </h2>
        <p className="text-white text-sm md:text-[1rem] font-light">
          Buy 150 and pay R$140.00
        </p>
        <div className="flex flex-col  items-start  ">
          <h2 className="text-white text-[2.2rem] md:text-[2.8rem] font-bold">
            -7%
          </h2>
          <p className="text-white text-sm md:text-[1rem] font-light">
            of economy
          </p>
        </div>
      </div>
      <div className="w-full md:w-auto ms-auto mt-6 text-center">
        <button
          onClick={onClick}
          className={`rounded-full w-[90%] mx-auto px-8 py-2 cursor-pointer whitespace-nowrap font-medium md:text-[1.2rem] ${
            isSelected ? "bg-[#1AABFE] text-white" : "bg-white text-black"
          }`}
        >
          Choose plan
        </button>
      </div>
      {/* Badge */}
      {isUserChoice && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-2 text-center shadow-lg">
          <p className="text-red-500 font-bold whitespace-nowrap">
            User's Choice
          </p>
        </div>
      )}
    </div>
  ) : (
    <div
      className={`rounded-md p-6 backdrop-blur-xl cursor-pointer transition-all duration-300 relative ${
        isSelected && "bg-[#1AABFE]/20 border-[#1AABFE] border-2"
      }`}
      onClick={onClick}
    >
      <p className="text-white text-[1rem] md:text-[1.1rem] font-medium">
        {planName}
      </p>
      {planNumber && (
        <h2 className="text-white text-[1.8rem] md:text-[2.5rem] font-bold">
          {planNumber}
        </h2>
      )}
      <p className="text-white text-sm md:text-[1rem] font-light">
        {priceDescription}
      </p>
      {discount && (
        <h2 className="text-white text-[2.2rem] md:text-[2.8rem] font-bold">
          {discount}
        </h2>
      )}
      <p className="text-white text-[1rem] md:text-[1.1rem]  font-normal">
        {description}
      </p>
      <div className="w-[100%] mt-6 text-center">
        <button
          onClick={onClick}
          className={`rounded-full w-[90%] mx-auto px-8 py-2 cursor-pointer font-medium md:text-[1.2rem] ${
            isSelected ? "bg-[#1AABFE] text-white" : "bg-white text-black"
          }`}
        >
          {buttonText}
        </button>
      </div>
      {/* Badge */}
      {isUserChoice && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-2 text-center shadow-lg">
          <p className="text-red-500 font-bold whitespace-nowrap">
            User's Choice
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiConsultant;
