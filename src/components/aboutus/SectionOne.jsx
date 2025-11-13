import React from "react";

export default function AboutSectionOne() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 justify-between items-center w-full ">
        <div className="flex flex-col relative md:w-[50%] w-full ">
          <img
            src="/golden-car.svg"
            alt="About Us"
            className="w-full h-auto rounded-lg "
          />
        </div>
        <div className="flex flex-col  md:w-[48%] w-full p-4">
          <h3
            className="text-2xl font-bold mb-4 text-center"
            style={{
              color: "#194D9A",
              leadingTrim: "both",
              textEdge: "cap",
              fontFamily: "Poppins",
              fontSize: "40px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "53px",
            }}
          >
            Sobre nós
          </h3>
          <p
            className="text-center lg:text-left"
            style={{
              color: "#000",
              // textAlign: "justify",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "26px" /* 108.333% */,
            }}
          >
            A Placa Verificada foi criada com um propósito simples e essencial:
            proteger quem compra ou vende veículos seminovos.
            <br />
            <br />
            Sabemos que, por trás do sonho de ter um carro, muitos brasileiros
            acabam enfrentando surpresas desagradáveis — veículos com dívidas
            pendentes, acidentes ocultos, histórico de leilão, dados adulterados
            ou problemas legais que só aparecem após a compra. Nossa missão é
            tornar essa jornada mais segura, transparente e acessível.
            <br />
            <br />
            Com apenas o número da placa, os usuários podem gerar
            instantaneamente um relatório completo com informações confiáveis
            sobre o histórico do veículo, riscos, dívidas, participação em
            leilões e até uma estimativa de valor de mercado. Seja em uma
            transação entre particulares ou com concessionárias, a Placa
            Verificada atua como um escudo digital, garantindo que todos os
            envolvidos tenham clareza total antes de fechar o negócio.
            <br />
            <br />
            Mais do que um serviço, somos uma ferramenta de confiança e
            proteção — para que você não acabe “comprando uma história para
            contar”.
            <br />
            Placa Verificada — a escolha segura para quem busca tranquilidade ao
            verificar o histórico de veículos seminovos.
          </p>
        </div>
      </div>
    </>
  );
}
