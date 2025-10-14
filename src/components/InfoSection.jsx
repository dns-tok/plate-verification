import React, { useState } from "react";
import InfoSectionCard from "./InfoSectionCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiAuctionFill } from "react-icons/ri";
import { FaPhotoFilm } from "react-icons/fa6";
import {
  MdAppRegistration,
  MdOutlineCarRental,
  MdOutlineCarRepair,
  MdOutlineManageHistory,
  MdOutlinePerson,
  MdOutlinePriceChange,
  MdOutlineSyncProblem,
  MdYoutubeSearchedFor,
} from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { PiNumberSevenFill } from "react-icons/pi";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { AiFillDatabase } from "react-icons/ai";

const infoCards = [
  {
    id: 1,
    title: "Recall​",
    img: "/recall.svg",
  },
  {
    id: 2,
    title: "*KM History​",
    img: "/meter.svg",
  },

  {
    id: 3,
    title: "Acceptance in Insurance​",
    img: "/secure.svg",
  },
  {
    id: 4,
    title: "Car Loss Rate​",
    img: "/carCrash.svg",
  },
  {
    id: 5,
    title: "Gravame",
    img: "/recall.svg",
  },
  {
    id: 6,
    title: "Robbery & Theft​",
    img: "/carThief.svg",
  },
  {
    id: 7,
    title: "Approximate Maintenance​ cost",
    img: "/maintenance.svg",
  },
  {
    id: 8,
    title: "Lighthouse​",
    img: "/lighthouse.svg",
  },
  {
    id: 9,
    title: "Debts & Fines​",
    img: "/debt.svg",
  },
  {
    id: 10,
    title: "Restrictions & impediments​",
    img: "/meter.svg",
  },
  {
    id: 11,
    title: "Beats​",
    img: "/secure.svg",
  },
  {
    id: 12,
    title: "FIPE​",
    img: "/carCrash.svg",
  },
  {
    id: 13,
    title: "Auction Data",
    icon: <RiAuctionFill className="text-[#1AABFE]" />,
  },
  {
    id: 14,
    title: "Vehicle Photos",
    icon: <FaPhotoFilm className="text-[#1AABFE]" />,
  },
  {
    id: 15,
    title: "Search History",
    icon: <MdYoutubeSearchedFor className="text-[#1AABFE]" />,
  },
  {
    id: 16,
    title: "Maintenance History",
    icon: <MdOutlineManageHistory className="text-[#1AABFE]" />,
  },
  {
    id: 17,
    title: "Chassis Explanation",
    icon: <MdOutlineCarRepair className="text-[#1AABFE]" />,
  },
  {
    id: 18,
    title: "Main model problems",
    icon: <MdOutlineSyncProblem className="text-[#1AABFE]" />,
  },
  {
    id: 19,
    title: "Ownership",
    icon: <MdOutlineCarRental className="text-[#1AABFE]" />,
  },
  {
    id: 20,
    title: "Price History",
    icon: <FaHistory className="text-[#1AABFE]" />,
  },
  {
    id: 21,
    title: "Registration data state",
    icon: <MdAppRegistration className="text-[#1AABFE]" />,
  },
  {
    id: 22,
    title: "Vehicle Numbers",
    icon: <PiNumberSevenFill className="text-[#1AABFE]" />,
  },
  {
    id: 23,
    title: "Registration in rental companies",
    icon: <MdOutlineCarRental className="text-[#1AABFE]" />,
  },
  {
    id: 24,
    title: "Technical sheet",
    icon: <BiSolidSpreadsheet className="text-[#1AABFE]" />,
  },
  {
    id: 25,
    title: "Fair Price",
    icon: <MdOutlinePriceChange className="text-[#1AABFE]" />,
  },
  {
    id: 26,
    title: "Owner's Opinion",
    icon: <MdOutlinePerson className="text-[#1AABFE]" />,
  },
  {
    id: 27,
    title: "Vehicle Registration Data",
    icon: <AiFillDatabase className="text-[#1AABFE]" />,
  },
];

const InfoSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);

    scrollToSection("advantages");
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
        {infoCards.slice(0, showMore ? infoCards.length : 12).map((card) => (
          <InfoSectionCard
            key={card.id}
            title={card.title}
            img={card.img}
            icon={card.icon}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 my-10 mb-4 md:mb-6">
        <button
          className="bg-[#1AABFE] rounded-md flex items-center gap-3 py-3 px-8 w-fit cursor-pointer hover:bg-[#1AABFE]/80 transition-all duration-300 text-white"
          onClick={handleShowMore}
        >
          <span className="md:text-[1.4rem] font-medium">
            {showMore ? "View Less" : "View More"}
          </span>
          <FaArrowRightLong
            className={` md:text-[1.3rem] transition-all duration-300 ${
              showMore ? "rotate-0" : "-rotate-45"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
