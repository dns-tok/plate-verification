import React, { useState } from "react";
import InfoSectionCard from "./InfoSectionCard";
import { scrollToSection } from "../../utils/scrollUtils";
import { FaArrowRightLong, FaBan, FaHeadset } from "react-icons/fa6";
import { RiAuctionFill, RiGovernmentFill } from "react-icons/ri";
import { FaPhotoFilm } from "react-icons/fa6";
import {
  MdAppRegistration,
  MdOutlineCarRental,
  MdOutlineCarRepair,
  MdOutlineManageHistory,
  MdOutlinePerson,
  MdOutlinePriceChange,
  MdOutlineSyncProblem,
  MdPriceChange,
  MdRestorePage,
  MdYoutubeSearchedFor,
} from "react-icons/md";
import { FaHeartbeat, FaHistory } from "react-icons/fa";
import { PiNumberSevenFill } from "react-icons/pi";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { AiFillDatabase } from "react-icons/ai";

const infoCards = [
  {
    id: 1,
    title: "Recall​",
    img: "/recall.svg",
  },
  {
    id: 2,
    title: "*Histórico de KM​",
    img: "/meter.svg",
  },

  {
    id: 3,
    title: "Aceitação em seguradoras​",
    img: "/secure.svg",
  },
  {
    id: 4,
    title: "Índice de sinistro​",
    img: "/carCrash.svg",
  },
  {
    id: 5,
    title: "Gravame",
    icon: <RiGovernmentFill />,
  },
  {
    id: 6,
    title: "Roubo e Furto​",
    img: "/carThief.svg",
  },
  {
    id: 7,
    title: "Atendimento humanizado",
    icon: <FaHeadset />,
  },
  {
    id: 8,
    title: "Farol",
    img: "/lighthouse.svg",
  },
  {
    id: 9,
    title: "Débitos e Multas​",
    img: "/debt.svg",
  },
  {
    id: 10,
    title: "Restrições & Impedimentos​",
    icon: <FaBan />,
  },
  {
    id: 11,
    title: "Batidas",
    icon: <FaHeartbeat />,
  },
  {
    id: 12,
    title: "Histórico da tabela Fipe",
    icon: <MdRestorePage />,
  },
  {
    id: 13,
    title: "Dados de Leilão",
    icon: <RiAuctionFill className="text-[#1AABFE]" />,
  },
  {
    id: 14,
    title: "Fotos do veículo remarketing (frota)",
    icon: <FaPhotoFilm className="text-[#1AABFE]" />,
  },
  {
    id: 15,
    title: "Fotos de anúncio",
    icon: <MdYoutubeSearchedFor className="text-[#1AABFE]" />,
  },
  {
    id: 16,
    title: "*Histórico de Manutenção",
    icon: <MdOutlineManageHistory className="text-[#1AABFE]" />,
  },
  {
    id: 17,
    title: "Explicação do Chassi",
    icon: <MdOutlineCarRepair className="text-[#1AABFE]" />,
  },
  {
    id: 18,
    title: "Principais problemas com o modelo escolhido",
    icon: <MdOutlineSyncProblem className="text-[#1AABFE]" />,
  },
  {
    id: 19,
    title: "Proprietários",
    icon: <MdOutlineCarRental className="text-[#1AABFE]" />,
  },
  {
    id: 20,
    title: "Histórico de preços",
    icon: <FaHistory className="text-[#1AABFE]" />,
  },
  {
    id: 21,
    title: "Dados cadastrais do veículo (Por estado)",
    icon: <MdAppRegistration className="text-[#1AABFE]" />,
  },
  {
    id: 22,
    title: "Números do veículo (Chassi, Motor, vidros)",
    icon: <PiNumberSevenFill className="text-[#1AABFE]" />,
  },
  {
    id: 23,
    title: "Registro em locadoras",
    icon: <MdOutlineCarRental className="text-[#1AABFE]" />,
  },
  {
    id: 24,
    title: "Tabela com detalhes técnicos",
    icon: <BiSolidSpreadsheet className="text-[#1AABFE]" />,
  },
  {
    id: 25,
    title: "Valor FIPE",
    icon: <MdOutlinePriceChange className="text-[#1AABFE]" />,
  },
  {
    id: 26,
    title: "Opinião do dono",
    icon: <MdOutlinePerson className="text-[#1AABFE]" />,
  },
  {
    id: 27,
    title: "Dados de registro do veículo",
    icon: <AiFillDatabase className="text-[#1AABFE]" />,
  },
];

const InfoSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      scrollToSection("vantagens");
    }
  };

  return (
    <div className="text-black commonPadding flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <div className=" lg:w-[50%]">
          <h1 className="text-[#194D9A] text-[1.5rem] md:text-[2rem] font-bold tracking-tight">
            O melhor para você
          </h1>
          <h2 className="text-black text-[1.5rem] md:text-[2rem] font-medium">
            Radiografia completa do veículo
          </h2>
          <p className="text-black text-[0.8rem] font-normal">
            Vai comprar um veículo e não quer descobrir problemas ocultos mais
            tarde? A Placa Verificada garante tranquilidade ao oferecer a
            inspeção completa do histórico veicular do carro dos seus sonhos.
            Ela protege você contra fraudes e prejuízos, validando
            automaticamente todas as informações sobre o histórico, os riscos e
            o estado do veículo em cada item registrado.
          </p>
        </div>
        <div className="font-bold text-[1rem] md:text-[1.1rem]">
          + de 28 informações sobre o veículo desejado.
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full mt-6 lg:mt-12 gap-4">
        {infoCards.slice(0, showMore ? infoCards.length : 12).map((card) => (
          <InfoSectionCard
            key={card.id}
            title={card.title}
            img={card.img}
            icon={card.icon}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <p className="text-start w-full ms-2 mt-2 text-gray-600 text-[0.7rem] md:text-[0.8rem] font-normal">
        *Informações disponíveis de acordo com as bases de dados públicas e
        privadas consultadas
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-5 mb-4 md:mb-6">
        <button
          className="bg-[#1AABFE] rounded-md flex items-center gap-3 py-3 px-8 w-fit cursor-pointer hover:bg-[#1AABFE]/80 transition-all duration-300 text-white"
          onClick={handleShowMore}
        >
          <span className="md:text-[1.4rem] font-medium">
            {showMore ? "Ver Menos" : "Ver Mais"}
          </span>
          <FaArrowRightLong
            className={` md:text-[1.3rem] transition-all duration-500 ${
              !showMore ? "rotate-0" : "-rotate-90"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoSection;
