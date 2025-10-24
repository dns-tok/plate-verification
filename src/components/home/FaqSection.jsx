import React, { useState } from "react";
import Faq from "./Faq";
import { useNavigate } from "react-router-dom";
import { smartScrollToSection } from "../../utils/scrollUtils";

const FaqSection = () => {
  const [openFaqId, setOpenFaqId] = useState(null);
  const navigate = useNavigate();

  const scrollToPlans = () => {
    smartScrollToSection("plans", navigate);
  };

  const faqs = [
    {
      id: 1,
      question: "What is Verified License Plate?",
      answer:
        "It's an online service that checks a vehicle's history using its license plate, so you can know before you buy.",
    },
    {
      id: 2,
      question: "Why should I check the vehicle before purchasing?",
      answer:
        "Because you can find out if there are restrictions, claims, auctions, blocks, or debits, and avoid surprises. And if the report indicates a risk or irregularity, you have a stronger argument to request a discount or cancel the purchase.",
    },
    {
      id: 3,
      question: "What does the report show?",
      answer:
        "Depends on the plan: may include basic data, auction history, debts, owner, market value, and more.",
    },
    {
      id: 4,
      question:
        "What plans are available and what is the difference between them?",
      answer: (
        <span>
          Plans vary by price and depth of consultation: Light, Plus, Ultra,
          Premium.{" "}
          <button
            onClick={scrollToPlans}
            className="text-[#1AABFE] underline hover:text-[#1590d4] transition-colors duration-300 font-semibold"
          >
            Click here to see the plans
          </button>
        </span>
      ),
    },
    {
      id: 5,
      question: "How long does it take to receive the report after purchase?",
      answer: "The report is sent immediately after payment confirmation.",
    },
    {
      id: 6,
      question:
        "Do I need any information other than the license plate to make the query?",
      answer:
        "No. Simply enter the vehicle's license plate number to perform the query.",
    },
    {
      id: 7,
      question: "Is the data reliable? Where does it come from?",
      answer:
        "Yes. The data is extracted from official databases, competent bodies, and certified suppliers.",
    },
    {
      id: 8,
      question: "How does support work if I have questions or problems?",
      answer:
        "You can contact us via WhatsApp or email. Our team is ready to help.",
    },
  ];

  const handleFaqToggle = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  return (
    <section className="text-center commonPadding bg-gradient-to-tr from-[#194D9A] via-white to-[#ffffff] ">
      {/* Title */}
      <h2 className="text-[#194D9A] text-[1.8rem] md:text-[2rem] lg:text-[2.8rem] font-bold mb-3 md:mb-6 lg:mb-10">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-10 xl:gap-12  mx-auto ">
        {/* Left Image */}
        <div className="md:w-[50%] max-h-[40rem]">
          <img
            src="/faqSideImg.svg"
            alt="FAQ Illustration"
            loading="lazy"
            className=" object-cover w-full h-full"
          />
        </div>

        {/* FAQ List */}
        <div className="md:w-[50%] text-left md:space-y-5 ">
          {faqs.map((faq, index) => (
            <div key={index}>
              <Faq
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaqId === faq.id}
                onToggle={() => handleFaqToggle(faq.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
