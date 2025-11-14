import React, { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import MultiConsultant from "./MultiConsultant";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  fetchPublicPlans,
  transformPublicPlans,
} from "../../services/plansService";

const singlePlans = [
  {
    id: 1,
    name: "Relatório Premium",
    price: "R$ 58,00",
    desc: "Consulta única",
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
    name: "Relatório Ultra",
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
    name: "Relatório Plus",
    price: "R$ 55,90",
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
    name: "Relatório Light",
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
      "Chassi number verification",
    ],
  },
];

const multiPlans = [
  {
    id: 5,
    name: "Sempre Presente",
    planNumber: "Pacote R$ 1.200,00",
    priceDesc: "Compre R$ 1.200,00 e pague",
    price: "R$ 900,00",
    discount: "25%",
    desc: "de economia",
  },
  {
    id: 6,
    name: "Olho na Segurança",
    planNumber: "Pacote R$ 700,00",
    priceDesc: "Compre R$ 700,00 e pague",
    price: "R$ 500,00",
    discount: "21%",
    desc: "de economia",
  },
  {
    id: 7,
    name: "Profissional",
    planNumber: "Pacote R$ 500,00",
    priceDesc: "Compre R$ 500,00 e pague",
    price: "R$ 410,00",
    discount: "18%",
    desc: "de economia",
  },
  {
    id: 8,
    name: "Negociador",
    planNumber: "Pacote R$ 300,00",
    priceDesc: "Compre R$ 300,00 e pague",
    price: "R$ 250,00",
    discount: "17%",
    desc: "de economia",
  },
  {
    id: 9,
    name: "Test Drive",
    planNumber: "Pacote R$ 150,00",
    priceDesc: "Compre R$ 150,00 e pague",
    price: "R$ 140,00",
    discount: "7%",
    desc: "de economia",
  },
];

const PriceSection = () => {
  const [selectedCard, setSelectedCard] = useState(2);
  const [showMulti, setShowMulti] = useState(false);
  const [apiSinglePlans, setApiSinglePlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPublicPlans();
  }, []);

  const loadPublicPlans = async () => {
    setLoading(true);
    try {
      const plans = await fetchPublicPlans();
      const transformedPlans = transformPublicPlans(plans);
      setApiSinglePlans(transformedPlans);
    } catch (err) {
      console.error("Failed to load public plans:", err);
      // Keep empty array to fall back to static data
      setApiSinglePlans([]);
    } finally {
      setLoading(false);
    }
  };

  // Use API data if available, otherwise fall back to static data
  const getSinglePlans = () => {
    return apiSinglePlans.length > 0 ? apiSinglePlans : singlePlans;
  };

  const handleChoosePlan = (id) => {
    setSelectedCard(id);
    setShowMulti(false);
    // Navigate to home with hash to trigger login modal
    window.location.href = "/#showLogin";
  };

  useEffect(() => {
    setSelectedCard(2);
  }, [showMulti]);

  return (
    <section className="text-white commonPadding bg-[url('/plansBg.svg')] bg-cover bg-center bg-no-repeat">
      {/* Header */}
      <div className="text-center mb-10 md:mb-12 lg:mb-20">
        <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem] font-bold leading-none mb-3">
          O melhor relatório para você
        </h1>
        <p className="md:text-[1rem] lg:text-[1.3rem] font-normal">
          Preços válidos por unidade. Em caso de dúvidas, entre em contato
          conosco.
        </p>
      </div>
      {/* Plans */}
      {!showMulti ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-fit mx-auto">
          {loading ? (
            <div className="col-span-4 text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="mt-2">Carregando planos...</p>
            </div>
          ) : (
            getSinglePlans().map((plan) => (
              <PriceCard
                key={plan.id}
                id={plan.id}
                isSelected={selectedCard === plan.id}
                onClick={() => handleChoosePlan(plan.id)}
                planName={plan.name}
                price={plan.price}
                originalPrice={plan.apiData?.originalPriceFormatted}
                description={plan.desc}
                features={plan.features}
                buttonText="Comprar Relatório"
                isUserChoice={plan.id === selectedCard}
              />
            ))
          )}
        </div>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-fit mx-auto">
          {multiPlans.map((plan) => (
            <MultiConsultant
              key={plan.id}
              id={plan.id}
              isSelected={selectedCard === plan.id}
              onClick={() => handleChoosePlan(plan.id)}
              planName={plan.name}
              planNumber={plan.planNumber}
              priceDescription={plan.priceDesc}
              price={plan.price}
              discount={plan.discount}
              description={plan.desc}
              buttonText="Comprar"
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
          <span className="md:text-[1.2rem] font-medium">Consulta única</span>
          <FaArrowRightLong className=" md:text-[1.3rem] transition-all duration-300 -rotate-45" />
        </button>
        <button
          onClick={() => setShowMulti(true)}
          className="bg-[#1AABFE] rounded-md flex items-center gap-3 py-3 px-8 w-fit cursor-pointer bg-[#1AABFE]hover:text-[#1AABFE] transition-all duration-300 border-[#1AABFE] group "
        >
          <span className="md:text-[1.2rem] font-medium">
            Multiplas consultas / Pacotes
          </span>
          <FaArrowRightLong className="md:text-[1.3rem] transition-all duration-300 -rotate-45" />
        </button>
      </div>
      <p className="font-extralight text-xs ms-1">
        * Essas informações dependem da disponibilidade nas bases de dados
        públicas.
      </p>
      <p className="font-extralight text-xs">
        ** Essas informações dependem da disponibilidade na base de dados de
        nossos parceiros.
      </p>
    </section>
  );
};

export default PriceSection;
