import React from "react";

const RollingCards = () => {
  return (
    <div className="absolute right-0 h-[60%] xl:h-[70%] bottom-0 w-full xl:w-[70%] overflow-hidden  ">
      <div className="relative w-full flex items-center justify-center ">
        {/* Rolling Images Container */}
        <div className="relative w-full  flex items-center justify-center">
          <img
            src="/rollingImages.svg"
            alt="Rolling car images"
            className="w-full h-full object-contain roll-image"
          />
        </div>
      </div>
    </div>
  );
};

export default RollingCards;
