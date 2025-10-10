import React from "react";
import Button from "./Button";
import ViewButton from "./ViewButton";

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
}) => {
  return (
    <div
      className={`rounded-md p-6 backdrop-blur-xl cursor-pointer transition-all duration-300 ${
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
    </div>
  );
};

export default MultiConsultant;
