import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Faq = ({ question, answer, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="mb-4">
      <div
        className={`bg-[#194D9A] flex justify-between items-center px-5 h-[3.5rem] ${
          isOpen ? "rounded-t-md" : "rounded-md"
        } relative cursor-pointer`}
        onClick={onToggle}
      >
        <h1 className="text-white text-[0.8rem] md:text-[0.9rem] xl:text-[1rem] w-[92%] ">
          {question}
        </h1>
        <FaChevronDown
          className={`text-white transition-transform duration-300  ${
            isOpen ? "rotate-0" : "-rotate-90"
          } w-[5%] `}
        />
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out "
      >
        <div className="text-[0.9rem] md:text-[0.9rem] p-4 border border-[#194D9A] rounded-b-md border-t-0 text-left bg-white">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default Faq;
