import React from "react";
import MainContent from "../../components/layout/MainContent";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ConnectedPage = () => {
  return (
    <MainContent showMenu={false} bgImage="/assets/privacy.svg">
      <p className="text-2xl font-semibold mb-4">Privacy</p>
      <div className="bg-[#34C759] p-2 rounded-lg flex items-center gap-4 justify-between w-fit">
        <div className="bg-white py-2 px-4 rounded-md">
          <p className="text-[0.8rem] font-[400]">
            <span className="font-[600] text-[0.7rem]">Método de contato:</span>{" "}
            WhatsApp e E-mail
          </p>
          <p className="text-[0.8rem] font-[400]">
            <span className="font-[600] text-[0.7rem]">Objetivo: </span>Comunicação
            direta
            <br /> com o cliente
          </p>
        </div>
        <FaCheckCircle className="text-white text-[2.8rem] " />
      </div>
      <p className="text-[0.8rem] font-[400] max-w-[95%] mt-5">
        Ao utilizar nossa plataforma, você autoriza o uso de seus dados para fins de comunicação via e-mail e WhatsApp. Podemos enviar conteúdo como notícias, promoções, atualizações e informações relevantes sobre nossos serviços. O processamento de dados está em total conformidade com a Lei Geral de Proteção de Dados (LGPD), com segurança e transparência. Você pode gerenciar suas preferências a qualquer momento. Para mais detalhes, consulte nossa Política de Privacidade.{" "}
        <span className="text-[#194D9A] cursor-pointer hover:underline">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </span>
        .
      </p>
    </MainContent>
  );
};

export default ConnectedPage;
