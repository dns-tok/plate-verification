import React from "react";

export default function AboutSectionTwo() {
  return (
    <div
      className="py-12"
      style={{
        background: "linear-gradient(244deg, #FFF 85.74%, #194D9A 100%)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#194D9A",
          fontFamily: "Poppins",
          fontSize: "40px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "48px",
          marginBottom: "48px",
        }}
      >
        Nossa missão
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-8 items-start w-full px-8 lg:px-20">
        {/* First Column - Image with Text Overlay */}
        <div className="lg:col-span-1 xl:col-span-5 h-full relative">
          <img
            src="/mission-1.png"
            alt="Description of image 1"
            className="w-full h-full rounded-lg"
          />
        </div>

        {/* Second Column - Video */}
        <div className="lg:col-span-1 xl:col-span-4 border">
          <video
            src="/mission-video.mp4"
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Third Column - Car Image and Text */}
        <div className="lg:col-span-2 xl:col-span-3">
          <img
            src="/about-car.png"
            alt="Description of image 3"
            className="w-full h-auto rounded-lg"
          />

          <p
            style={{
              color: "#1D1D1D",
              fontFamily: "Open Sans",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
              marginTop: "16px",
            }}
          >
            Com apenas a placa do veículo, os usuários podem gerar
            instantaneamente um relatório completo com informações confiáveis
            ​​sobre o histórico, riscos, dívidas, participação em leilões e até
            mesmo uma estimativa do valor de mercado do carro.
            <br />
            <br />
            Basta inserir a placa e obter um relatório completo e confiável,
            descubra o histórico, os riscos, as dívidas, os leilões e o valor
            real de mercado do veículo.
          </p>

          <img
            src="/number-plate.png"
            alt="Description of image 4"
            className="w-full h-auto mt-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
