import React from "react";
import StarRating from "./StarRatings";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 md:!py-10  !h-full flex flex-col md:flex-row gap-2 md:gap-4 justify-between items-start relative shadow-lg ">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="rounded-full object-cover border-[3.5px] border-[#194D9A] w-[5rem] md:w-auto"
      />
      <div className="text-left relative flex-1 flex flex-col gap-1 md:gap-2">
        <h2 className="font-semibold text-base md:text-2xl text-[#194D9A] ">
          {testimonial.name}
        </h2>
        <StarRating rating={testimonial.rating} />
        <div className="flex items-start gap-1">
          <img src="/quoteSmall.svg" alt="" className="size-4" />
          <p className="text-gray-600 text-xs md:text-[1.2rem] leading-relaxed font-medium ">
            {testimonial.text}
          </p>
        </div>
      </div>
      <img
        src="/quoteBig.svg"
        alt=""
        className="absolute top-4 md:top-7 right-4 md:right-10 size-10 md:size-14 "
      />
    </div>
  );
};

export default TestimonialCard;
