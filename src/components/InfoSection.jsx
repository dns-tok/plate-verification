import React, { useState } from "react";
import InfoSectionCard from "./InfoSectionCard";
import { FaArrowRightLong } from "react-icons/fa6";

const infoCards = [
  {
    id: 1,
    title: "Recall​",
    icon: "/recall.svg",
  },
  {
    id: 2,
    title: "*KM History​",
    icon: "/meter.svg",
  },

  {
    id: 3,
    title: "Acceptance in Insurance​",
    icon: "/secure.svg",
  },
  {
    id: 4,
    title: "Car Loss Rate​",
    icon: "/carCrash.svg",
  },
  {
    id: 5,
    title: "Gravame",
    icon: "/recall.svg",
  },
  {
    id: 6,
    title: "Robbery & Theft​",
    icon: "/carThief.svg",
  },
  {
    id: 7,
    title: "Approximate Maintenance​ cost",
    icon: "/maintenance.svg",
  },
  {
    id: 8,
    title: "Lighthouse​",
    icon: "/lighthouse.svg",
  },
  {
    id: 9,
    title: "Debts & Fines​",
    icon: "/debt.svg",
  },
  {
    id: 10,
    title: "Restrictions & impediments​",
    icon: "/meter.svg",
  },
  {
    id: 11,
    title: "Beats​",
    icon: "/secure.svg",
  },
  {
    id: 12,
    title: "Fipe​",
    icon: "/carCrash.svg",
  },
];

const InfoSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  return (
    <div className="text-black commonPadding flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <div className=" lg:w-[50%]">
          <h1 className="text-[#194D9A] text-[1.5rem] md:text-[2rem] font-bold tracking-tight">
            The best for you​
          </h1>
          <h2 className="text-black text-[1.5rem] md:text-[2rem] font-medium">
            Complete Vehicle X-ray
          </h2>
          <p className="text-black text-[0.8rem] font-normal">
            Buying a vehicle and don't want to discover hidden issues later?
            Verified Plate guarantees peace of mind when you purchase the
            complete vehicle inspection for your dream vehicle. It provides
            peace of mind against fraud and losses by automatically validating
            information about the vehicle's history, risks, and status.
          </p>
        </div>
        <div className="font-bold text-[1rem] md:text-[1.1rem]">
          28 pieces of information about your dream​
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mt-6 lg:mt-12 gap-4">
        {infoCards.map((card) => (
          <InfoSectionCard
            key={card.id}
            title={card.title}
            icon={card.icon}
            onClick={() => handleCardClick(card.id)}
            isSelected={selectedCard === card.id}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-10 mb-4 md:mb-6">
        <button className="bg-[#1AABFE] rounded-md flex items-center gap-3 py-3 px-8 w-fit cursor-pointer hover:bg-[#1AABFE]/80 transition-all duration-300 text-white">
          <span className="md:text-[1.4rem] font-medium">View More</span>
          <FaArrowRightLong className=" md:text-[1.3rem] transition-all duration-300 -rotate-45" />
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
