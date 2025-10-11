import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const PriceCard = ({
  id,
  isSelected,
  onClick,
  planName = "Premium Plan",
  price = "R$ 58,00",
  description = "Single consultation",
  features = ["Vehicle registration details"],
  buttonText = "Choose Plan",
  isUserChoice = false,
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between backdrop-blur-xl rounded-lg py-4 px-5 border h-full w-[18rem] cursor-pointer transition-all duration-300 ${
        isSelected ? "bg-[#1AABFE]/20 border-[#1AABFE] border-2" : "border-none"
      }`}
    >
      <div>
        <p className="text-white text-[0.8rem] md:text-[1.2rem] font-medium">
          {planName}
        </p>
        <h2 className="text-white text-[1.5rem] md:text-[2.5rem] font-bold">
          {price}
        </h2>
        <div className="w-[100%] my-2 text-center">
          <button
            onClick={onClick}
            className={`rounded-full w-[80%] mx-auto px-8 py-2 cursor-pointer font-bold ${
              isSelected ? "bg-[#1AABFE] text-white" : "bg-white text-black"
            }`}
          >
            {buttonText}
          </button>
        </div>
        <div className="my-5">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <img src="/yes.svg" alt="" />
              <p className="text-white text-[0.8rem] font-light">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      <button className="ms-6 border-[1.5px] rounded-md flex items-center gap-3 py-1.5 px-4 w-fit cursor-pointer hover:bg-white hover:text-[#1AABFE] transition-all duration-300 border-[#1AABFE] group">
        <span className="font-light text-[0.9rem]">View More</span>
        <FaArrowRightLong className="text-[#1AABFE] group-hover:translate-x-1 transition-all duration-300" />
      </button>
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

export default PriceCard;
