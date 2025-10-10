import React from "react";

const ViewButton = ({
  bgColor = "transparent",
  textColor = "white",
  borderColor = "#1AABFE",
  text = "View More",
  icon = "/Group.png",
  onClick,
}) => {
  return (
    <button
      className="border rounded-md flex items-center gap-3 py-1 px-4 w-fit cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
      onClick={onClick}
    >
      <span className="font-light ">{text}</span>
      <img className="" src={icon} alt="" width={20} height={20} />
    </button>
  );
};

export default ViewButton;
