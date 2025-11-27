import React from "react";
import { BsStarFill } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PriceCard = ({
  id,
  isSelected,
  onClick,
  planName = "Relatório Premium",
  price = "R$ 58,00",
  originalPrice = null,
  features = ["Vehicle registration details"],
  buttonText = "Comprar Relatório",
}) => {
  return (
    <div
      className={`relative flex flex-col justify-between backdrop-blur-xl rounded-lg py-4 px-5 h-full w-[18rem] transition-all duration-300 ${
        isSelected ? "bg-[#1AABFE]/20 border-[#1AABFE] border-2" : "border-none"
      }`}
    >
      <div>
        <p className="text-white text-[0.8rem] md:text-[1.2rem] font-medium">
          {planName}
        </p>
        {originalPrice && (
          <p className="text-white text-[0.7rem] md:text-[1rem] line-through opacity-75 pt-1">
            {originalPrice}
          </p>
        )}
        <h2 className="text-white text-[1.5rem] md:text-[2.5rem] font-bold leading-none pb-2">
          {price}
        </h2>
        <div className="w-[100%] my-2 text-center">
          <button
            onClick={() => {
              // Meta Pixel - InitiateCheckout event
              if (typeof window !== 'undefined' && window.fbq) {
                window.fbq('track', 'InitiateCheckout', {
                  content_name: planName,
                  content_category: 'Plano',
                  value: parseFloat(price.replace('R$', '').replace(',', '.').trim()),
                  currency: 'BRL'
                });
              }
              onClick && onClick();
            }}
            className={`rounded-full w-[80%] mx-auto px-4 py-2 cursor-pointer font-bold ${
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
      <Link
        to="/how-it-works"
        className="ms-6 border-[1.5px] rounded-md flex items-center gap-3 py-1.5 px-4 w-fit cursor-pointer hover:bg-white hover:text-[#1AABFE] transition-all duration-300 border-[#1AABFE] group"
      >
        <span className="font-light text-[0.9rem]">Ver Mais</span>
        <FaArrowRightLong className="text-[#1AABFE] group-hover:translate-x-1 transition-all duration-300" />
      </Link>
      {/* Badge */}
      {id === 2 && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#F2DF33] rounded-xl px-6 py-2 text-center shadow-lg flex items-center gap-2">
          <BsStarFill className="text-black mb-0.5 text-sm" />
          <p className="text-black font-bold whitespace-nowrap text-sm">
            Mais Vendido
          </p>
        </div>
      )}
    </div>
  );
};

export default PriceCard;
