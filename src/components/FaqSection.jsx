import React, { useState } from "react";
import Faq from "./Faq";

const FaqSection = () => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I purchase a report?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 2,
      question: "How do I purchase a plan?",
      answer:
        "The report includes vehicle registration details, accident history, ownership records, and complete vehicle history.",
    },
    {
      id: 3,
      question: "How do I buy credits?",
      answer:
        "You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes.",
    },
    {
      id: 4,
      question: "How do I connect?",
      answer:
        "Currently, the report is available in English and Portuguese. More language options are coming soon.",
    },
    {
      id: 5,
      question: "How do I reset my password?",
      answer:
        "Yes, you can access your purchased reports anytime by logging into your account and visiting your order history.",
    },
    {
      id: 6,
      question: "What types of reports are there?",
      answer:
        "Absolutely. All transactions are encrypted and processed through trusted, secure payment gateways.",
    },
    {
      id: 7,
      question: "What does each report include?",
      answer:
        "Refunds are available only in cases where the report could not be generated due to incomplete vehicle information or technical errors.",
    },
    {
      id: 8,
      question: "How long are reports available?",
      answer:
        "Yes, you can purchase and view reports for as many vehicles as you like — each one is handled separately.",
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
