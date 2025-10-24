import React, { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import MultiConsultant from "./MultiConsultant";
import { FaArrowRightLong } from "react-icons/fa6";

const singlePlans = [
  {
    id: 1,
    name: "Premium Plan",
    price: "R$ 58,00",
    desc: "Single consultation",
    features: [
      "Vehicle registration details",
      "License plate status",
      "Vehicle restrictions",
      "Vehicle debts",
      "Traffic fines",
      "IPVA value",
      "Licensing value",
      "DPVAT value",
      "Owner information",
      "Number of previous owners",
    ],
  },
  {
    id: 2,
    name: "Ultra Plan",
    price: "R$ 44,90",
    desc: "Complete consultation",
    features: [
      "Vehicle registration details",
      "License plate status",
      "Vehicle restrictions",
      "Vehicle debts",
      "Traffic fines",
      "Owner information",
      "Number of previous owners",
      "Legal representative details",
      "Vehicle theft records",
      "Vehicle recovery status",
      "Auction history",
    ],
  },
  {
    id: 3,
    name: "Plus Plan",
    price: "R$ 33,90",
    desc: "Multi consultation",
    features: [
      "Vehicle registration details",
      "License plate status",
      "Vehicle restrictions",
      "Vehicle debts",
      "Traffic fines",
      "Owner information",
      "Number of previous owners",
      "Legal representative details",
      "Vehicle theft records",
      "Vehicle recovery status",
      "Auction history",
    ],
  },
  {
    id: 4,
    name: "Light Plan",
    price: "R$ 27,90",
    desc: "Unlimited consultation",
    features: [
      "Vehicle registration details",
      "License plate status",
      "Vehicle restrictions",
      "Vehicle debts",
      "Owner information",
      "Number of previous owners",
      "Legal representative details",
      "Vehicle model and version",
      "Manufacturing year",
      "Fuel type",
      "Chassis number verification",
    ],
  },
];

const multiPlans = [
  {
    id: 5,
    name: "Always Present",
    planNumber: "Plan R$1200",
    priceDesc: "Buy R$1200 and pay R$900.00",
    discount: "-25%",
    desc: "of economy",
  },
  {
    id: 6,
    name: "Eye on security",
    planNumber: "Plan R$700",
    priceDesc: "Buy R$700 and pay R$500.00",
    discount: "-21%",
    desc: "of economy",
  },
  {
    id: 7,
    name: "Professional",
    planNumber: "Plan R$500",
    priceDesc: "Buy R$500 and pay R$410.00",
    discount: "-18%",
    desc: "of economy",
  },
  {
    id: 8,
    name: "Negotiator",
    planNumber: "Plan R$300",
    priceDesc: "Buy R$300 and pay R$250.00",
    discount: "-17%",
    desc: "of economy",
  },
  {
    id: 9,
    name: "Test Drive",
    planNumber: "Plan R$150",
    priceDesc: "Buy R$150 and pay R$140.00",
    discount: "-7%",
    desc: "of economy",
  },
];

const PriceSection = () => {
  const [selectedCard, setSelectedCard] = useState(2);
  const [showMulti, setShowMulti] = useState(false);

  useEffect(() => {
    setSelectedCard(2);
  }, [showMulti]);

  return (
    <section className="text-white commonPadding bg-[url('/plansBg.svg')] bg-cover bg-center bg-no-repeat">
      {/* Header */}
      <div className="text-center mb-10 md:mb-12 lg:mb-20">
        <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold">
          The Best Plan for You
        </h1>
        <p className="md:text-[1rem] lg:text-[1.3rem] font-normal">
          Prices valid per unit​. If you have any questions, please contact us.
        </p>
      </div>
      {/* Plans */}
      {!showMulti ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-fit mx-auto">
          {singlePlans.map((plan) => (
            <PriceCard
              key={plan.id}
              id={plan.id}
              isSelected={selectedCard === plan.id}
              onClick={() => setSelectedCard(plan.id)}
              planName={plan.name}
              price={plan.price}
              description={plan.desc}
              features={plan.features}
              buttonText="Choose Plan"
              isUserChoice={plan.id === selectedCard}
            />
          ))}
        </div>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-fit mx-auto">
          {multiPlans.map((plan) => (
            <MultiConsultant
              key={plan.id}
              id={plan.id}
              isSelected={selectedCard === plan.id}
              onClick={() => setSelectedCard(plan.id)}
              planName={plan.name}
              planNumber={plan.planNumber}
              priceDescription={plan.priceDesc}
              discount={plan.discount}
              description={plan.desc}
              buttonText="Choose Plan"
              isUserChoice={plan.id === selectedCard}
            />
          ))}
        </div>
      )}

      {/* Toggle Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-10 md:mt-20 mb-4 md:mb-6">
        <button
          onClick={() => setShowMulti(false)}
          className="bg-[#1AABFE] rounded-md flex items-center gap-3 py-3 px-8 w-fit cursor-pointer bg-[#1AABFE]hover:text-[#1AABFE] transition-all duration-300 border-[#1AABFE] group "
        >
          <span className="md:text-[1.2rem] font-medium">
            Single Consultation
          </span>
          <FaArrowRightLong className=" md:text-[1.3rem] transition-all duration-300 -rotate-45" />
        </button>
        <button
          onClick={() => setShowMulti(true)}
          className="bg-[#1AABFE] rounded-md flex items-center gap-3 py-3 px-8 w-fit cursor-pointer bg-[#1AABFE]hover:text-[#1AABFE] transition-all duration-300 border-[#1AABFE] group "
        >
          <span className="md:text-[1.2rem] font-medium">
            Multiple Consultation
          </span>
          <FaArrowRightLong className="md:text-[1.3rem] transition-all duration-300 -rotate-45" />
        </button>
      </div>
    </section>
  );
};

export default PriceSection;
