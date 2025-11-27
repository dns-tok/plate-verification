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
      question: "O que é a placa verificada?",
      answer:
        "É um serviço online que verifica o histórico completo de um veículo usando somente a placa, desta manteira será possível saber todos os detalhes antes de efetuar a compra, ou, em caso de venda, será um grande atributo apresentando-o para um futuro comprador que o histórico do carro está totalmente isento de qualquer problema.",
    },
    {
      id: 2,
      question: "Por que devo verificar o veículo antes de comprá-lo?",
      answer:
        "Porque você pode descobrir se existem restrições, reclamações, leilões, bloqueios ou débitos, evitando surpresas. E se o relatório indicar um risco ou irregularidade, você terá um argumento mais forte para solicitar um desconto ou cancelar a compra.",
    },
    {
      id: 3,
      question: "O que o relatório mostra ?",
      answer:
        "Depende do plano: pode incluir dados básicos, histórico de leilões, dívidas, proprietário, valor de mercado e muito mais.",
    },
    {
      id: 4,
      question:
        "Quais relatórios estão disponíveis e qual a diferença entre eles?",
      answer: (
        <span>
          Os relatórios variam de acordo com o preço e a abrangência da consultoria: Light, Plus, Ultra e Premium.{" "}
          <button
            onClick={scrollToPlans}
            className="text-[#1AABFE] underline hover:text-[#1590d4] transition-colors duration-300 font-semibold cursor-pointer"
          >
            Clique aqui para ver os relatórios
          </button>
        </span>
      ),
    },
    {
      id: 5,
      question: "Quanto tempo leva para receber o relatório após a compra?",
      answer: "O relatório é enviado imediatamente após a confirmação do pagamento.",
    },
    {
      id: 6,
      question:
        "Preciso de alguma informação além da placa do veículo para fazer a consulta ?",
      answer:
        "Não. Basta inserir a placa do veículo para realizar a consulta.",
    },
    {
      id: 7,
      question: "Os dados são confiáveis? De onde vêm ?",
      answer:
        "Sim. Os dados são extraídos de bases de dados oficiais, órgãos competentes e fornecedores certificados.",
    },
    {
      id: 8,
      question: "Como funciona o suporte se eu tiver dúvidas ou problemas?",
      answer:
        "Você pode entrar em contato conosco pelo WhatsApp ou por e-mail. Nossa equipe está pronta para ajudar.",
    },
  ];

  const handleFaqToggle = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  return (
    <section className="text-center commonPadding bg-gradient-to-tr from-[#194D9A] via-white to-[#ffffff] ">
      {/* Title */}
      <h2 className="text-[#194D9A] text-[1.8rem] md:text-[2rem] lg:text-[2.8rem] font-bold mb-3 md:mb-6 lg:mb-10">
        Perguntas frequentes
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-6 lg:gap-10 xl:gap-12  mx-auto ">
        {/* Left Image */}
        <div className="md:w-[50%] max-h-[40rem]">
          <img
            src="/faqSideImg.webp"
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
