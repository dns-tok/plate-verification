import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PublicLayout from "../../components/layout/PublicLayout";
import { FaCheck } from "react-icons/fa";
import FaqSection from "../../components/public/FaqSection";
import RollingCards from "../../components/public/RollingCards";

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleViewModel = () => {
    navigate("/#plans");
  };

  const handleBuy = (planName) => {
    // Map plan names to plan codes
    const planCodeMap = {
      "Relatório Light": "light",
      "Relatório Plus": "plus",
      "Relatório Ultra": "ultra",
      "Relatório Premium": "premium",
    };

    const planCode =
      planCodeMap[planName] || planName.toLowerCase().replace("relatório ", "");

    // Store the selected plan in localStorage to add to cart after login
    localStorage.setItem(
      "pendingPlanToAdd",
      JSON.stringify({
        planCode: planCode,
        planName: planName,
        timestamp: Date.now(),
      })
    );

    window.location.href = "/#showLogin";
  };

  // Plan comparison data based on the image
  const planComparison = [
    {
      category: "Segurança Básica",
      features: [
        {
          name: "Dados gerais do veículo",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Situação do chassi e motor",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Score de risco",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Histórico de quilometragem",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
      ],
    },
    {
      category: "Histórico do Veículo",
      features: [
        {
          name: "Histórico de leilão",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Indícios de sinistro",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Remarketing",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Roubo e furto",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
      ],
    },
    {
      category: "Restrições e Legalidade",
      features: [
        {
          name: "Restrições financeiras e judiciais",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Restrições nacionais e estaduais",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Débitos: IPVA, DPVAT, multas, licenciamento",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Histórico de Gravames / Financiamentos detalhados",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Bloqueios para transferência",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
      ],
    },
    {
      category: "Proprietários & Documentação",
      features: [
        {
          name: "Quantidade de gravames / financiamento",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Proprietário atual",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Transferências e datas",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Cadastro nacional e estadual",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "CSV - Certificado de Segurança Veicular",
          light: false,
          plus: false,
          ultra: false,
          premium: true,
        },
      ],
    },
    {
      category: "Avaliação de Mercado",
      features: [
        {
          name: "Valor FIPE",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Percentual FIPE",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Decodificador de chassi (Histórico FIPE)",
          light: false,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Histórico de anúncios e preços",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
      ],
    },
    {
      category: "Mecânica Ambiental",
      features: [
        {
          name: "Autuação ambiental (CETESB)",
          light: false,
          plus: false,
          ultra: false,
          premium: true,
        },
      ],
    },
    {
      category: "Extras",
      features: [
        {
          name: "Rastreamento de placa e estados anteriores",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Verificação em locadoras",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Fotos do veículo",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
      ],
    },
    {
      category: "Recalls e Seguradoras",
      features: [
        {
          name: "Histórico de recall detalhado",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Registro em seguradoras",
          light: false,
          plus: false,
          ultra: false,
          premium: true,
        },
      ],
    },
    {
      category: "Inteligência Artificial",
      features: [
        {
          name: "Resumo simples dos alertas",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
        {
          name: "Avaliação com consultor automotivo por Inteligência artificial",
          light: false,
          plus: false,
          ultra: true,
          premium: true,
        },
        {
          name: "Atendimento humanizado com Plaquinha",
          light: true,
          plus: true,
          ultra: true,
          premium: true,
        },
      ],
    },
  ];

  const plans = [
    { name: "Relatório Light", id: "light" },
    { name: "Relatório Plus", id: "plus" },
    { name: "Relatório Ultra", id: "ultra" },
    { name: "Relatório Premium", id: "premium" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PublicLayout>
      {/* Header Section with Gradient Background */}
      <div className="relative w-full overflow-hidden">
        <div
          className="relative w-full h-[180px] md:h-[300px] lg:h-[500px] xl:h-[35rem] flex md:items-center py-6"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 84, 161, 0.80) 0%, #00AEFF 100%)",
          }}
        >
          {/* Text Content */}
          <div className=" pl-6 md:pl-12 lg:pl-16 xl:pl-24 z-10">
            <p className="text-black uppercase text-xs md:text-base lg:text-[1.7rem] font-normal mb-2 md:mb-3 tracking-[1rem]">
              VAMOS CONFERIR
            </p>
            <h1 className="text-black uppercase text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-[6.5rem] font-semibold tracking-tight leading-tight">
              COMO FUNCIONA
            </h1>
          </div>

          {/* Rolling Cards Animation */}
          <RollingCards />
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className=" md:max-w-[1400px] mx-auto sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-[#194D9A] mb-6 mx-auto max-w-2xl">
                Escolha o plano que melhor se adapta às suas necessidades e
                evite surpresas na hora da compra.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-4 text-left bg-gray-50 font-semibold text-gray-800">
                      Categoria / Recurso
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className="border border-gray-300 p-4 text-center bg-gray-50 font-semibold text-[#194D9A] min-w-[150px]"
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planComparison.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr>
                        <td
                          colSpan={5}
                          className="border border-gray-300 p-3 bg-blue-100 font-semibold text-gray-800"
                        >
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="hover:bg-gray-50">
                          <td className="border border-gray-300 p-3 text-sm text-gray-700">
                            {feature.name}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {feature.light ? (
                              <FaCheck className="text-[#1AABFE] mx-auto text-lg" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {feature.plus ? (
                              <FaCheck className="text-[#1AABFE] mx-auto text-lg" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {feature.ultra ? (
                              <FaCheck className="text-[#1AABFE] mx-auto text-lg" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            {feature.premium ? (
                              <FaCheck className="text-[#1AABFE] mx-auto text-lg" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  {/* Action Buttons Row */}
                  <tr>
                    <td className="border border-gray-300 p-4"></td>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className="border border-gray-300 p-4 align-top"
                      >
                        <div className="flex flex-col gap-2 items-center">
                          <button
                            onClick={handleViewModel}
                            className="bg-[#1AABFE] hover:bg-[#0F9AE8] text-white font-medium py-2.5 px-6 rounded transition-colors duration-200 text-sm w-full cursor-pointer"
                          >
                            Ver Modelo
                          </button>
                          <button
                            onClick={() => handleBuy(plan.name)}
                            className="bg-[#194D9A] hover:bg-[#0F9AE8] text-white font-medium py-2.5 px-6 rounded transition-colors duration-200 text-sm w-full cursor-pointer"
                          >
                            Comprar
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-600">
                Os dados fornecidos são de domínio público e/ou obtidos de
                fontes oficiais, não havendo qualquer responsabilidade sobre a
                veracidade dos mesmos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FaqSection />
    </PublicLayout>
  );
};

export default HowItWorks;
