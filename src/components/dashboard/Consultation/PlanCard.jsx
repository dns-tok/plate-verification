import React from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";

const PlanCard = ({ plan, onClick, isMultiple }) => {
  return plan.id === 9 ? (
    <div
      className={`col-span-4 w-[50%] relative flex items-center  backdrop-blur-xl rounded-2xl  mx-auto  justify-between transition-all duration-300 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)] bg-white`}
    >
      <div
        className={`w-[52%] h-full bg-[#1AABFE] rounded-l-2xl z-0 flex flex-col items-start p-4 gap-1`}
        style={{ clipPath: "polygon(0 0, 90% 0%, 100% 100%,  0% 100%)" }}
      >
        <p
          className={`text-white text-[0.6rem] font-medium bg-black/45 rounded-full px-4 py-2 min-w-[65%] text-center mb-2`}
        >
          {plan.name}
        </p>
        <p className="text-white text-[1rem] font-semibold leading-none ms-2">
          {plan.planNumber}
        </p>
        <p className="text-white text-[0.85rem] md:text-[0.5rem] ms-2">
          {plan.priceDesc}
        </p>
        <p className="text-white text-[0.9rem] font-[500] ms-2">{plan.price}</p>
      </div>
      <div className="p-3 flex flex-col items-center gap-2 w-fit mx-auto">
        <p className="text-[1.5rem] font-[600] whitespace-nowrap ">
          {plan.discount} savings
        </p>
        <div
          className={`w-[100%] mb-2 text-center ${
            isMultiple ? "" : "mt-auto"
          } mb-3.5`}
        >
          <button
            onClick={onClick}
            className={`rounded-full mx-auto px-6 py-[7px] bg-[#F2DF33] cursor-pointer font-bold text-[0.8rem] md:text-[0.65rem] min-w-[60%] shadow-md`}
          >
            Choose Plan
          </button>
        </div>
      </div>
      {/* Badge */}
      {plan.id === 2 && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#F2DF33] rounded-xl px-5 py-2 text-center shadow-lg flex items-center gap-2">
          <BsStarFill className="text-black mb-0.5 text-xs" />
          <p className="text-black font-semibold whitespace-nowrap text-[0.9rem]">
            Most Popular
          </p>
        </div>
      )}
    </div>
  ) : (
    <div
      className={`relative flex flex-col  backdrop-blur-xl rounded-2xl  my-auto ${
        plan.id === 2
          ? `h-[25rem]`
          : ` ${isMultiple ? "h-[18rem] justify-between" : "h-[23rem]"}`
      } transition-all duration-300  shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)] bg-white`}
    >
      <div
        className={`${
          isMultiple ? "h-[40%] " : "h-[37%]"
        } w-full bg-[#1AABFE] rounded-t-2xl z-0 flex flex-col items-center ${
          plan.id === 2 ? "pt-5 gap-2" : "pt-4 gap-1"
        }`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 91%, 0% 100%)" }}
      >
        <p
          className={`text-white text-[0.55rem] font-medium bg-black/45 rounded-full px-4 py-2 min-w-[65%] text-center ${
            isMultiple && "mb-2"
          }`}
        >
          {plan.name}
        </p>
        <p
          className={`${
            isMultiple && "hidden"
          } text-white text-[0.8rem] md:text-[0.7rem] line-through`}
        >
          From 33.90 for:
        </p>
        <p
          className={`text-white ${
            isMultiple ? "text-[1rem]" : "text-[1.3rem]"
          } font-semibold leading-none`}
        >
          {isMultiple ? plan.planNumber : plan.price}
        </p>
        <p className="text-white text-[0.85rem] md:text-[0.5rem] ">
          {isMultiple ? plan.priceDesc : "Single Consultation"}
        </p>
      </div>
      {isMultiple ? (
        <div className="p-3 flex flex-col items-center gap-2 w-fit mx-auto">
          <p className="text-[0.9rem] font-[500]">{plan.price}</p>
          <p className="text-[1.5rem] font-[600]  ">{plan.discount}</p>
          <p className="text-[0.9rem] font-[500]">{plan.desc}</p>
        </div>
      ) : (
        <div className="p-3 flex flex-col gap-2.5 ">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex  gap-1 ">
              <IoIosCheckmarkCircle className="text-[#9672FF] !w-[0.8rem] !h-[0.8rem]" />
              <p className="text-[0.56rem] font-[400] w-[90%] ">{feature}</p>
            </div>
          ))}
        </div>
      )}
      <div
        className={`w-[100%] mb-2 text-center ${
          isMultiple ? "" : "mt-auto"
        } mb-4`}
      >
        <button
          onClick={onClick}
          className={`rounded-full mx-auto px-6 py-[7px] bg-[#F2DF33] cursor-pointer font-bold text-[0.8rem] md:text-[0.65rem] min-w-[60%] shadow-md`}
        >
          {plan.id === 2 ? "Check" : "Choose Plan"}
        </button>
      </div>
      {/* Badge */}
      {plan.id === 2 && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#F2DF33] rounded-xl px-5 py-2 text-center shadow-lg flex items-center gap-2">
          <BsStarFill className="text-black mb-0.5 text-xs" />
          <p className="text-black font-semibold whitespace-nowrap text-[0.9rem]">
            Most Popular
          </p>
        </div>
      )}
    </div>
  );
};

export default PlanCard;
