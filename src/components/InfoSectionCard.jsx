import React from "react";

const InfoSectionCard = ({ title, icon, isSelected, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 rounded-2xl border-2 border-gray-400/20 w-full px-4 py-5 shadow cursor-pointer hover:scale-105 transition-all duration-300 ${
        isSelected ? "bg-[#1AABFE] border-[#1AABFE] border-2" : ""
      } transition-all duration-300 text-center`}
      onClick={onClick}
    >
      <img src={icon} alt="" className="size-8 md:size-10" />
      <p className={`font-semibold ${isSelected ? "text-white" : ""}`}>
        {title}
      </p>
    </div>
  );
};

export default InfoSectionCard;
