import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

const Faq = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
  }, [isOpen]);

  return (
    <div className="mb-4">
      <div
        className={`bg-[#194D9A] flex justify-between items-center px-5 h-[3.5rem] ${
          isOpen ? "rounded-t-md" : "rounded-md"
        } relative cursor-pointer`}
        onClick={toggleFaq}
      >
        <h1 className="text-white text-[0.9rem] md:text-[1rem] lg:text-[1.4rem]">
          {question || "How do I purchase a report?"}
        </h1>
        <FaChevronDown
          className={`text-white transition-transform duration-300 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-max-height duration-300 ease-in-out "
      >
        <div className="text-[0.9rem] md:text-[1rem] p-4 border border-[#194D9A] rounded-b-md border-t-0 text-left bg-white">
          {answer ||
            `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s.`}
        </div>
      </div>
    </div>
  );
};

export default Faq;
