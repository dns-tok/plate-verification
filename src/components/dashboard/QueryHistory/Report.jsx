import React, { useRef, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbInfoCircle } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import ReportSection from "./components/ReportSection";
import ReportField from "./components/ReportField";
import TwoColumnFieldSection from "./components/TwoColumnFieldSection";
import SimpleContentSection from "./components/SimpleContentSection";
import ReportTableSection from "./components/ReportTableSection";
import ScoreBar from "./components/ScoreBar";
import Gauge from "./components/Gauge";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "react-toastify";
import html2pdf from "html2pdf.js";
const Report = ({ data, onClose, loading }) => {
  const reportRef = useRef(null);

  const [downloading, setDownloading] = useState(false);
  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // Try DD/MM/YYYY format
        const parts = dateString.split("/");
        if (parts.length === 3) {
          const newDate = new Date(
            parseInt(parts[2]),
            parseInt(parts[1]) - 1,
            parseInt(parts[0])
          );
          return newDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
        return dateString;
      }
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Helper function to format currency (Brazilian Real)
  const formatCurrency = (value) => {
    if (!value && value !== 0) return "R$ 0,00";
    if (typeof value === "string") {
      // Handle "0,00" format
      const num = parseFloat(value.replace(",", "."));
      if (isNaN(num)) return value;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(num);
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Helper function to convert string currency to number
  const parseCurrency = (value) => {
    if (!value) return 0;
    if (typeof value === "number") return value;
    return parseFloat(value.replace(/\./g, "").replace(",", ".")) || 0;
  };

  // Helper function to render field in two-column layout
  // NOTE: This is kept for backward compatibility with sections not yet converted to use ReportField component
  const renderField = (label, value, hasWarning = false) => {
    return (
      <div className="flex  gap-1">
        <div className="flex items-start gap-1 text-[#194D9A]">
          {hasWarning && (
            <span className="text-yellow-500 text-lg leading-none">▲</span>
          )}
          <span className="text-[0.875rem] font-semibold">{label}:</span>
        </div>
        <span className={`text-[0.8rem] text-[#194D9A]`}>
          {value || "Nada Consta"}
        </span>
      </div>
    );
  };

  // Helper function to render section title
  // NOTE: This is kept for backward compatibility with sections not yet converted to use ReportSection component
  const renderSectionTitle = (title) => {
    return (
      <h3 className="text-xl text-[#194D9A] mb-2 font-semibold">{title}</h3>
    );
  };

  // Helper function to render two-column section
  const renderTwoColumnSection = (children) => {
    return (
      <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
      </div>
    );
  };

  // Helper function to render warning box
  const renderWarningBox = (text, isYellow = true) => {
    return (
      <div
        className={`rounded-lg p-1 px-2 mt-4 flex items-start gap-2  ${
          isYellow ? "bg-yellow-50 " : "bg-blue-50"
        }`}
      >
        <span className=" text-lg text-[#FFC107]">
          <IoIosWarning />
        </span>
        <p
          className={`text-xs ${isYellow ? "text-gray-800" : "text-gray-700"}`}
        >
          {text}
        </p>
      </div>
    );
  };

  // Helper function to render status box (for summary section)
  const renderStatusBox = (label, value, icon = null) => {
    const hasIssue = value == "Sim";
    return (
      <div
        className={`relative border-3 rounded-xl px-6 py-2 flex items-center gap-4  ${
          hasIssue ? "bg-red-50 border-red-500" : "bg-blue-50 border-blue-300"
        }`}
      >
        {hasIssue && (
          // <IoIosWarning className="text-4xl text-yellow-400 absolute -left-[1.17rem]" />

          <img
            src="/report/warning.png"
            alt=""
            className="size-10 object-contain absolute -left-[1.3rem]"
          />
        )}
        {icon ? (
          <img src={icon} alt="" className="size-10 object-contain" />
        ) : (
          <FaTools className="text-3xl text-[#194D9A]" />
        )}
        <div className=" text-[#194D9A]">
          <p className="text-[0.75rem] font-medium">{label}</p>
          <p
            className={`text-lg font-semibold
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    );
  };

  // Helper function to render gauge chart placeholder
  const renderGauge = (label, value, type = "percentage") => {
    let percentage = 0;
    if (type === "percentage") {
      percentage = typeof value === "string" ? parseInt(value) : value || 0;
    } else if (type === "text") {
      // For text values like "Alta", "Baixa"
      percentage = value === "Alta" || value === "ALTA" ? 75 : 25;
    }

    return (
      <Gauge
        value={percentage}
        label={label}
        isPercentage={type === "percentage"}
      />
    );
  };

  // Helper function to render table
  // const renderTable = (headers, rows) => {
  //   if (!rows || rows.length === 0) return null;

  //   return (
  //     <div className="overflow-x-auto">
  //       <table className="min-w-full border-collapse">
  //         <thead>
  //           <tr className="bg-[#194D9A] text-white">
  //             {headers.map((header, index) => (
  //               <th
  //                 key={index}
  //                 className="p-2 text-left text-sm font-medium border border-blue-600"
  //               >
  //                 {header}
  //               </th>
  //             ))}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {rows.map((row, rowIndex) => (
  //             <tr
  //               key={rowIndex}
  //               className="bg-white border-b border-gray-200 hover:bg-gray-50"
  //             >
  //               {row.map((cell, cellIndex) => (
  //                 <td
  //                   key={cellIndex}
  //                   className="p-2 text-sm text-gray-900 border border-gray-200"
  //                 >
  //                   {cell || "-"}
  //                 </td>
  //               ))}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  const renderAiSummary = () => {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[#194D9A]">Resumo IA</h2>
        <div className="border-2 border-[#1AABFE]/80 rounded-lg p-4 bg-white h-[180px] relative">
          <img
            src="/aiLogo.png"
            alt=""
            className="size-9 object-contain aspect-square absolute bottom-2 right-1"
          />
        </div>
      </div>
    );
  };

  // Extract data - handle both direct response and wrapped response
  // API response can be an array with one object, or a direct object
  let responseItem = null;
  if (data?.[0] && data[0].response?.body?.data) {
    responseItem = data[0];
  } else {
    responseItem = data;
  }

  let reportData = null;
  let consultationDate = formatDate(new Date().toISOString());
  let queryId = "N/A";
  let status = "N/A";

  if (responseItem?.response?.body?.data) {
    reportData = responseItem.response.body.data;
    consultationDate = responseItem.response.body.headerInfos?.date
      ? formatDate(responseItem.response.body.headerInfos.date)
      : formatDate(responseItem.requested_at || new Date().toISOString());
    queryId =
      responseItem.response.body.headerInfos?.queryid ||
      responseItem._id ||
      "N/A";
    status = responseItem.status_code === 200 ? "Sucesso" : "Parcial";
  } else if (responseItem?.body?.data) {
    reportData = responseItem.body.data;
    consultationDate = responseItem.body.headerInfos?.date
      ? formatDate(responseItem.body.headerInfos.date)
      : formatDate(new Date().toISOString());
    queryId =
      responseItem.body.headerInfos?.queryid || responseItem._id || "N/A";
  } else if (responseItem?.data) {
    reportData = responseItem.data;
  } else if (responseItem?.response?.body) {
    reportData = responseItem.response.body;
  } else {
    reportData = responseItem;
  }

  if (!reportData || typeof reportData !== "object") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">No report data available</p>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-[#194D9A] hover:bg-[#1AABFE] text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  // Extract basic vehicle information
  const plate = reportData?.placa || reportData?.baseEstadual?.placa || "N/A";

  const make =
    reportData.marcaModelo?.split("/")[0] ||
    reportData.dadosBasicosDoVeiculo?.marca ||
    "N/A";
  const model =
    reportData.marcaModelo?.split("/")[1] ||
    reportData.dadosBasicosDoVeiculo?.descricao ||
    "N/A";
  const chassis = reportData.chassi || reportData.baseEstadual?.chassi || "N/A";
  const year =
    reportData.anoModelo || reportData.baseEstadual?.anoModelo || "N/A";
  const color = reportData.corVeiculo || reportData.baseEstadual?.cor || "N/A";
  const fuel =
    reportData.combustivel || reportData.baseEstadual?.combustivel || "N/A";
  const baseEstadual = reportData.baseEstadual || {};
  const baseNacional = reportData.baseNacional || {};
  const decodificador = reportData.decodificadorPrecificador || {};
  const precificadorI = decodificador.precificadorI?.[0] || {};
  const precificadorII = decodificador.precificadorII?.[0] || {};
  const codigoFipe =
    reportData.codigoFipe?.[0]?.codigo || precificadorI?.codigo || "N/A";
  const valorFipe = precificadorI?.valor
    ? formatCurrency(parseCurrency(precificadorI.valor))
    : "N/A";
  const valorAtual = precificadorII?.valor
    ? formatCurrency(parseCurrency(precificadorII.valor))
    : "N/A";

  // Calculate vehicle age
  const currentYear = new Date().getFullYear();
  const vehicleAge = year ? currentYear - parseInt(year) : "N/A";

  // Check for issues in summary
  const hasLeilao = reportData.leilao?.registros?.length > 0;
  const hasSinistro =
    reportData.indicioSinistro?.descricao?.toLowerCase().includes("consta") ===
    false;
  const hasRestricoesNacionais =
    baseNacional.restricao1 !== "NADA CONSTA" ||
    baseNacional.restricao2 !== "NADA CONSTA" ||
    baseNacional.restricao3 !== "NADA CONSTA" ||
    baseNacional.restricao4 !== "NADA CONSTA" ||
    baseNacional.outrasRestricoes1 !== "NADA CONSTA" ||
    baseNacional.restricaoFinanciadora !== "NADA CONSTA";
  const hasRestricoesEstaduais =
    baseEstadual.restricaoAdminisrativa !== "NADA CONSTA" ||
    baseEstadual.restricaoFinanceira !== "NADA CONSTA" ||
    baseEstadual.restricaoJudicial !== "NADA CONSTA" ||
    baseEstadual.restricaoTributaria !== "NADA CONSTA";
  const hasBancosFinanceiras =
    reportData.gravame?.length > 0 &&
    reportData.gravame.some((g) => g.situacao?.includes("BAIXADO") === false);
  const hasMotorAlterado = baseEstadual.dataAlteracaoMotor !== null;
  const hasChassiRemarcado =
    baseEstadual.tipoMarcacaoChassi !== "NORMAL" &&
    baseEstadual.tipoMarcacaoChassi !== null;

  const historico = reportData?.rouboFurto?.historico || [];

  // Get risk analysis
  const indiceRisco = reportData.analiseRisco?.indiceRisco || "1";
  const nivelRisco =
    indiceRisco === "1"
      ? 25
      : indiceRisco === "2"
      ? 50
      : indiceRisco === "3"
      ? 75
      : indiceRisco === "4"
      ? 90
      : 50;

  // Get leilao score data
  const leilaoScore = reportData.leilao?.score || {};
  const leilaoScoreValue = leilaoScore.score || leilaoScore.pontuacao || null;
  const leilaoScoreAceitacao = leilaoScore.aceitacao || null;
  const leilaoScoreExigenciaVistoria =
    leilaoScore.exigenciaVistoriaEspecial || null;
  const leilaoScorePercentualRef = leilaoScore.percentualSobreRef || null;

  // Get risk percentage for Banks/Financial Institutions
  // Check for specific risk data in various possible fields
  let riscoBancosFinanceiras = null;
  let analiseBancos = null;

  // First, check if leilao.score.percentualSobreRef is available (this is the gauge value)
  if (leilaoScorePercentualRef) {
    riscoBancosFinanceiras = parseInt(leilaoScorePercentualRef) || null;
  }

  // Check apontamentosBancos field
  if (reportData.apontamentosBancos && !riscoBancosFinanceiras) {
    riscoBancosFinanceiras =
      reportData.apontamentosBancos.risco ||
      reportData.apontamentosBancos.percentual ||
      reportData.apontamentosBancos.indiceRisco ||
      reportData.apontamentosBancos.percentualRisco;
    analiseBancos =
      reportData.apontamentosBancos.analise ||
      reportData.apontamentosBancos.descricao ||
      reportData.apontamentosBancos.parecer ||
      reportData.apontamentosBancos.texto;
  }

  // If not found, check gravame for risk indicators
  if (!riscoBancosFinanceiras && hasBancosFinanceiras) {
    const activeGravame = reportData.gravame?.find(
      (g) => !g.situacao?.includes("BAIXADO")
    );
    if (activeGravame) {
      riscoBancosFinanceiras =
        activeGravame.risco ||
        activeGravame.percentual ||
        activeGravame.indiceRisco;
      analiseBancos = activeGravame.analise || activeGravame.observacoes;
    }
  }

  // Fallback: use indiceRisco if available and has gravame
  if (!riscoBancosFinanceiras && hasBancosFinanceiras) {
    if (indiceRisco === "4") riscoBancosFinanceiras = 90;
    else if (indiceRisco === "3") riscoBancosFinanceiras = 75;
    else if (indiceRisco === "2") riscoBancosFinanceiras = 50;
    else if (indiceRisco === "1") riscoBancosFinanceiras = 25;
    else riscoBancosFinanceiras = 90; // Default high risk if has gravame
  }

  // Default analysis text if not provided by API
  if (!analiseBancos && hasBancosFinanceiras) {
    analiseBancos =
      "Veículo possui alerta de risco alto em Bancos, Financeiras ou Seguradoras. Essa restrição pode ocasionar em uma negativa de financiamento/seguro em sua totalidade ou com um percentual menor que 100% na tabela.";
  }

  // Function to generate and download PDF
  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const element = reportRef.current;

      // 🔧 Ensure full content is visible
      const canvas = await html2canvas(element, {
        scale: 2, // higher quality
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 0,
        windowWidth: document.documentElement.scrollWidth, // 👈 capture full width
        windowHeight: document.documentElement.scrollHeight, // 👈 capture full height
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // Define margins (in pixels)
      const topMargin = 20; // Top margin in pixels
      const bottomMargin = 20; // Bottom margin in pixels
      const leftMargin = 10; // Left margin in pixels
      const rightMargin = 10; // Right margin in pixels

      // Calculate page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate available space for content (page minus margins)
      const availableWidth = pageWidth - leftMargin - rightMargin;
      const availableHeight = pageHeight - topMargin - bottomMargin;

      // Calculate image dimensions to fit available width
      const imgWidth = availableWidth;
      const imgHeight = (canvas.height * availableWidth) / canvas.width;

      let heightLeft = imgHeight;
      let sourceY = 0; // Track the source Y position in the original image

      // 📄 Add multiple pages if needed
      while (heightLeft > 0) {
        // Calculate how much content fits on this page
        const contentHeightOnPage = Math.min(availableHeight, heightLeft);

        // Create a canvas slice for this page
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = (contentHeightOnPage * canvas.height) / imgHeight;
        const pageCtx = pageCanvas.getContext("2d");

        // Fill with white background
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Calculate source slice dimensions
        const sourceHeight = (contentHeightOnPage * canvas.height) / imgHeight;

        // Draw the slice from the original canvas
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );

        const pageImgData = pageCanvas.toDataURL("image/png");
        const pageImgHeight = contentHeightOnPage;

        // Add image to PDF with margins
        pdf.addImage(
          pageImgData,
          "PNG",
          leftMargin,
          topMargin,
          imgWidth,
          pageImgHeight
        );

        // Update tracking variables
        heightLeft -= availableHeight;
        sourceY += sourceHeight;

        // Add new page if there's more content
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      // Generate filename
      const fileName = `Relatorio_${plate || "Veiculo"}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      pdf.save(fileName);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Error downloading PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Early return for loading state

  // Early return for no data state
  if (!data && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">No data available</p>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-[#194D9A] hover:bg-[#1AABFE] text-white font-semibold px-6 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-250px)]  overflow-auto rounded-xl ">
      <div className=" mx-auto max-w-[1080px] ">
        <div
          ref={reportRef}
          data-pdf-content
          className="bg-white space-y-6 custom-scrollbar"
        >
          {/* Header Section */}
          <div className="bg-[#194D9A] border-b-6 border-yellow-300 flex justify-between items-center gap-2 h-[210px] text-white p-2 mb-6">
            <div className="w-[25%] h-full relative p-2">
              <img src="/reportLogo.png" alt="" className="h-full" />
              <span className="text-yellow-300 absolute bottom-7 right-0 left-0 mx-auto w-fit text-[2.5rem]">
                {plate}
              </span>
            </div>
            <div className="flex flex-col w-[75%] gap-2 justify-between h-full">
              <h1 className="text-yellow-300 text-[1.9rem] font-bold mt-2 whitespace-nowrap capitalize">
                Relatório Plano {data.planName} - Placa Verificada
              </h1>
              <div className="flex items-center justify-between overflow-hidden">
                <div className="flex gap-4">
                  {vehicleAge !== "N/A" && (
                    <div className="bg-[#1AABFE] text-white p-2 rounded-xl flex items-center gap-2 w-[180px]">
                      <span className="text-3xl">
                        <TbInfoCircle />
                      </span>
                      <span className="flex flex-col text-sm whitespace-nowrap">
                        Idade do Veiculo <strong>{vehicleAge} Years</strong>
                      </span>
                    </div>
                  )}

                  {valorFipe !== "N/A" && (
                    <div className="bg-[#1AABFE] text-white p-2 rounded-lg flex items-center gap-2 text-sm w-[180px]">
                      <span className="text-3xl">
                        <AiFillDollarCircle />
                      </span>
                      <span className="flex flex-col text-sm whitespace-nowrap">
                        Valor FIPE <strong>{valorFipe}</strong>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <img
                    src={reportData.logo || "/whiteLogo.svg"}
                    alt={`${make} Logo`}
                    className="w-16 h-16 object-contain aspect-square "
                  />
                  <div className="text-[0.6rem] text-white/90 text-right">
                    <p>
                      <strong>Data da Consulta: </strong>
                      {consultationDate}
                    </p>
                    <p>
                      <strong>Id da Consulta: </strong> {queryId}
                    </p>
                    <p>
                      <strong>Status da Consulta: </strong> {status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 max-w-[88%] mx-auto">
            {renderAiSummary()}

            {/* Resumo da consulta */}
            <div className="space-y-4">
              {renderSectionTitle("Resumo da consulta")}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 gap-x-5">
                {renderStatusBox(
                  "Leilão",
                  hasLeilao ? "Sim" : "Não",
                  "/report/auction.png"
                )}
                {renderStatusBox(
                  "Sinistro",
                  hasSinistro ? "Sim" : "Não",
                  "/report/crash.png"
                )}
                {renderStatusBox(
                  "Bancos, Financeiras ou seguradoras",
                  hasBancosFinanceiras ? "Sim" : "Não",
                  "/report/bank.png"
                )}
                {renderStatusBox(
                  "Restrições Nacionais",
                  hasRestricoesNacionais ? "Sim" : "Não",
                  "/report/national.webp"
                )}
                {renderStatusBox(
                  "Restrições Estaduais",
                  hasRestricoesEstaduais ? "Sim" : "Não",
                  "/report/restrict.png"
                )}
                {renderStatusBox(
                  "Motor Alterado",
                  hasMotorAlterado ? "Sim" : "Não",
                  "/report/engine.png"
                )}
                {renderStatusBox(
                  "Chassi Remarcado",
                  hasChassiRemarcado ? "Sim" : "Não",
                  "/report/!.svg"
                )}
                {renderStatusBox(
                  "Recall",
                  hasChassiRemarcado ? "Sim" : "Não",
                  "/report/tools.svg"
                )}
                {renderStatusBox(
                  "Histórico de Roubo e Furto",
                  historico.length > 0 ? "Sim" : "Não",
                  "/report/theft.png"
                )}
              </div>
              {renderWarningBox(
                "Atenção: Alguns blocos possuem informações que merecem cuidado."
              )}
            </div>

            {/* Insights do veículo */}
            <div className="space-y-4">
              {renderSectionTitle("Insights do veículo")}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {renderGauge("Nível de risco geral", nivelRisco)}
                {renderGauge(
                  "Exigência de Vistoria Especial",
                  hasRestricoesNacionais || hasRestricoesEstaduais
                    ? "Alta"
                    : "Baixa",
                  "text"
                )}
                {precificadorI?.valor && precificadorII?.valor && (
                  <>
                    {(() => {
                      const fipe = parseCurrency(precificadorI.valor);
                      const atual = parseCurrency(precificadorII.valor);
                      const percentual = fipe > 0 ? (atual / fipe) * 100 : 0;
                      return renderGauge(
                        "Percentual sobre Tabela FIPE",
                        Math.round(percentual)
                      );
                    })()}
                  </>
                )}
              </div>
            </div>

            <ReportSection
              title="Informacoes gerais do veiculo"
              breakSection={true}
            >
              <TwoColumnFieldSection
                fields={{
                  left: [
                    { label: "Marca / Modelo", value: reportData.marcaModelo },
                    { label: "Cor", value: color },
                    { label: "RENAVAM", value: baseEstadual.renavam },
                    { label: "Tipo de Veículo", value: baseEstadual.tipo },
                    { label: "Nacionalidade", value: reportData.nacionalidade },
                    { label: "UF", value: baseEstadual.uf },
                    { label: "Registro DI", value: baseNacional.di },
                  ],
                  right: [
                    { label: "Ano Modelo", value: year },
                    { label: "Placa", value: plate },
                    { label: "Combustível", value: fuel },
                    { label: "Numero do motor", value: baseEstadual.motor },
                    { label: "Chassi", value: chassis },
                    { label: "Município", value: baseEstadual.municipio },
                  ],
                }}
              />
            </ReportSection>

            <div className="space-y-4">
              {renderSectionTitle("Dados Básicos")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {renderField("Exchange Box", reportData.caixaCambio)}
                    {renderField("Displacement", reportData.cilindradas)}
                    {renderField("Number 3rd Axis", baseEstadual.renavam)}
                    {renderField("Power", baseEstadual.tipo)}
                    {renderField("Gross Weight", reportData.pesoBruto)}
                  </div>
                  <div className="space-y-3">
                    {renderField(
                      "Maximum traction capacity",
                      reportData.capMaxTracao
                    )}
                    {renderField(
                      "Differential Axle",
                      reportData.eixoTraseiroDif
                    )}
                    {renderField("Body Number", reportData.numCarroceria)}
                    {renderField("Body Type", reportData.tipoCarroceria)}
                    {renderField(
                      "Passenger Capacity",
                      reportData.capacidadePassageiro
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Informações sobre leilão */}
            {reportData.leilao && (
              <ReportSection title="Informações sobre leilão">
                {reportData.leilao.registros &&
                reportData.leilao.registros.length > 0 ? (
                  <ReportTableSection
                    headers={[
                      "Data Leilão",
                      "ID Leilão",
                      "Lote",
                      "Placa",
                      "Chassi",
                      "Marca",
                      "Modelo",
                      "Condição",
                      "Comitente",
                    ]}
                    rows={reportData.leilao.registros.map((item) => [
                      formatDate(item.dataLeilao),
                      item.idLeilao || "-",
                      item.lote || "-",
                      item.placa || "-",
                      item.chassi || "-",
                      item.marca || "-",
                      item.modelo || "-",
                      item.condicao || "-",
                      item.comitente || "-",
                    ])}
                  />
                ) : (
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 bg-white">
                    <p className="text-gray-800">
                      {reportData.leilao.descricao}
                    </p>
                  </div>
                )}
                {renderWarningBox(
                  "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil."
                )}
              </ReportSection>
            )}

            {/* Score Leilão */}
            {reportData.leilao?.score && leilaoScoreValue && (
              <ReportSection title="Score Leilão">
                <ScoreBar score={leilaoScoreValue} label="Score Leilão" />
                {leilaoScoreAceitacao && (
                  <div className="mt-4 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <ReportField
                        label="Aceitação"
                        value={`${leilaoScoreAceitacao}%`}
                      />
                      {leilaoScoreExigenciaVistoria && (
                        <ReportField
                          label="Exigência de Vistoria Especial"
                          value={`${leilaoScoreExigenciaVistoria}%`}
                        />
                      )}
                      {leilaoScorePercentualRef && (
                        <ReportField
                          label="Percentual sobre Referência"
                          value={`${leilaoScorePercentualRef}%`}
                        />
                      )}
                    </div>
                  </div>
                )}
              </ReportSection>
            )}

            {/* Apontamentos em Bancos, Financeiras ou Seguradoras */}
            {(hasBancosFinanceiras ||
              riscoBancosFinanceiras ||
              analiseBancos ||
              leilaoScorePercentualRef) && (
              <ReportSection title="Apontamentos em Bancos, Financeiras ou Seguradoras">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {(riscoBancosFinanceiras || leilaoScorePercentualRef) && (
                    <div className="flex-shrink-0 w-[30%]">
                      {renderGauge(
                        "",
                        riscoBancosFinanceiras ||
                          parseInt(leilaoScorePercentualRef) ||
                          90
                      )}
                    </div>
                  )}
                  <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      <ReportField label="Placa" value={plate} />
                      <ReportField label="Chassi" value={chassis} />
                      {analiseBancos && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-[#1AABFE] mb-2">
                            Análise:
                          </p>
                          <p className="text-sm text-gray-800">
                            {analiseBancos}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ReportSection>
            )}

            {/* Indício de Sinistro */}
            {reportData.indicioSinistro && (
              <SimpleContentSection
                title="Indício de Sinistro"
                content={
                  <p className="text-gray-800">
                    {reportData.indicioSinistro.descricao}
                  </p>
                }
              />
            )}
            {/* Remarketing */}
            {/* {reportData.remarketing && ( */}
            <ReportSection title="Remarketing">
              {reportData?.remarketing?.registros &&
              reportData?.remarketing?.registros?.length > 0 ? (
                <>
                  <ReportTableSection
                    headers={[
                      "Organizador",
                      "Vendedor",
                      "Data Evento",
                      "Condições do veículo",
                      "Situação Chassi",
                      "Condições motor",
                      "Condições câmbio",
                      "Condições mecânicas",
                      "Observação",
                    ]}
                    rows={reportData?.remarketing?.registros?.map((item) => [
                      item.organizador || "-",
                      item.vendedor || "-",
                      formatDate(item.dataEvento),
                      item.condicoesVeiculo || "Nao Informado",
                      item.situacaoChassi || "Nao Informado",
                      item.condicoesMotor || "Nao Informado",
                      item.condicoesCambio || "Nao Informado",
                      item.condicoesMecanicas || "Nao Informado",
                      item.observacao || "-",
                    ])}
                  />

                  {/* Remarketing - Dados do veículo */}
                  {reportData?.remarketing?.dadosVeiculo && (
                    <ReportSection title="Remarketing - Dados do veículo">
                      <TwoColumnFieldSection
                        fields={{
                          left: [
                            {
                              label: "RENAVAM",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.renavam || baseEstadual.renavam,
                            },
                            {
                              label: "Situação Chassi",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.situacaoChassi || "Normal",
                            },
                            {
                              label: "Marca / Modelo",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.marcaModelo || `${make} / ${model}`,
                            },
                            {
                              label: "Segmento",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.segmento || "Nada Consta",
                            },
                            {
                              label: "Data da Inspeção",
                              value: formatDate(
                                reportData?.remarketing?.dadosVeiculo
                                  ?.dataInspecao
                              ),
                            },
                            {
                              label: "Garantia",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.garantia || "Nada Consta",
                            },
                          ],
                          right: [
                            {
                              label: "Placa",
                              value:
                                reportData?.remarketing?.dadosVeiculo?.placa ||
                                plate,
                            },
                            {
                              label: "Motor",
                              value:
                                reportData?.remarketing?.dadosVeiculo?.motor ||
                                baseEstadual.motor,
                            },
                            {
                              label: "Chassi",
                              value:
                                reportData?.remarketing?.dadosVeiculo?.chassi ||
                                chassis,
                            },
                            {
                              label: "Sub segmento",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.subSegmento || "Nada Consta",
                            },
                            {
                              label: "Observação",
                              value:
                                reportData?.remarketing?.dadosVeiculo
                                  ?.observacao || "Nada Consta",
                            },
                          ],
                        }}
                      />
                    </ReportSection>
                  )}
                </>
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className="text-gray-800">
                    {reportData?.remarketing?.descricao ||
                      "Informação não encontrada nas bases consultadas."}
                  </p>
                </div>
              )}
            </ReportSection>
            {/* )} */}

            {/* Fotos */}
            {reportData.anuncio?.fotos &&
            reportData.anuncio.fotos.length > 0 ? (
              <ReportSection title="Fotos">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {reportData.anuncio.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto.url}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border-2 border-[#1AABFE]/80"
                    />
                  ))}
                </div>
              </ReportSection>
            ) : (
              <ReportSection title="Fotos">
                <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white h-48 flex items-center justify-center">
                  <p className="text-gray-500">Nenhuma foto disponível</p>
                </div>
              </ReportSection>
            )}

            {/* Histórico de KMs */}
            {reportData.historicoKm && reportData.historicoKm.length > 0 && (
              <ReportTableSection
                title="Histórico de KMs"
                headers={["Data", "Odômetro", "Fonte"]}
                rows={reportData.historicoKm.map((item) => [
                  formatDate(item.data),
                  item.km ? `${item.km} KM` : "-",
                  item.fonte || "-",
                ])}
              />
            )}
            {/* Decodificador de Chassi - Dados Básicos */}
            <ReportSection
              title="Decodificador de Chassi - Dados Básicos"
              breakSection={true}
            >
              <TwoColumnFieldSection
                fields={{
                  left: [
                    { label: "Placa", value: plate },
                    { label: "Ano Modelo", value: year },
                    { label: "Marca", value: make },
                    { label: "Modelo", value: model },
                    { label: "Versão", value: decodificador.versao },
                    { label: "Código FIPE", value: codigoFipe },
                  ],
                  right: [
                    {
                      label: "Ano Fabricação",
                      value: reportData.anoFabricacao,
                    },
                    {
                      label: "Nacionalidade",
                      value:
                        reportData.nacionalidade ||
                        baseNacional.nacionalidade ||
                        "Nacional",
                    },
                    { label: "Combustível", value: fuel },
                    { label: "Cilindradas", value: reportData.cilindradas },
                    {
                      label: "Código Versão",
                      value: reportData.codigoMarcaModelo,
                    },
                    { label: "Valor atual", value: valorAtual },
                  ],
                }}
              />
            </ReportSection>

            {/* Decodificador de Chassi - Precificadores */}
            {precificadorI && (
              <ReportSection title="Decodificador de Chassi - Precificadores">
                {/* Precificadores Info */}
                <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white overflow-x-auto">
                  <div className="text-sm text-gray-600 mb-2">
                    <p>
                      <strong>Precificador I:</strong> {precificadorI.marca}{" "}
                      {precificadorI.modelo}
                    </p>
                    <p>
                      <strong>Valor:</strong>{" "}
                      {formatCurrency(parseCurrency(precificadorI.valor))}
                    </p>
                    {precificadorII && (
                      <>
                        <p className="mt-2">
                          <strong>Precificador II:</strong>{" "}
                          {precificadorII.marca} {precificadorII.modelo}
                        </p>
                        <p>
                          <strong>Versão:</strong> {precificadorII.versao}
                        </p>
                        <p>
                          <strong>Valor:</strong>{" "}
                          {formatCurrency(parseCurrency(precificadorII.valor))}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Percentage Change Table */}
                {decodificador.evolucaoPreco && (
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white overflow-x-auto mt-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-[#1AABFE] text-white">
                            {[
                              "Total Desde 0 KM",
                              "06 Meses",
                              "12 Meses",
                              "2017",
                              "2018",
                              "2019",
                              "2020",
                              "2021",
                              "2022",
                              "2023",
                              "2024",
                              "2025",
                            ].map((header, index) => (
                              <th
                                key={index}
                                className="p-2 text-center text-xs font-medium border border-[#194D9A] whitespace-nowrap"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b border-gray-200">
                            {decodificador.evolucaoPreco.map((value, index) => (
                              <td
                                key={index}
                                className={`p-2 text-sm text-center border border-gray-200 ${
                                  value < 0 ? "text-red-600" : "text-gray-900"
                                }`}
                              >
                                {value > 0 ? "+" : ""}
                                {value.toFixed(2)}%
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Price Evolution Chart */}
                <div className="border-2 border-[#1AABFE]/80 rounded-xl p-6 bg-white mt-4">
                  <h4 className="text-lg font-semibold text-[#194D9A] mb-4">
                    Evolução de Preço
                  </h4>
                  <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                    <p className="text-gray-500">
                      Gráfico de evolução de preço (integrar biblioteca de
                      gráficos)
                    </p>
                  </div>
                </div>
              </ReportSection>
            )}

            {/* Cadastro Nacional */}
            <ReportSection title="Cadastro Nacional">
              <TwoColumnFieldSection
                fields={{
                  left: [
                    { label: "Placa", value: plate },
                    { label: "Chassi", value: chassis },
                    {
                      label: "Tipo Marcação do Chassi",
                      value:
                        baseEstadual.tipoMarcacaoChassi ||
                        baseNacional.tipoMarcacaoChassi ||
                        "Normal",
                    },
                    {
                      label: "Motor",
                      value: baseEstadual.motor || reportData.numMotor,
                    },
                    {
                      label: "Renavam",
                      value: baseEstadual.renavam || reportData.renavam,
                    },
                    { label: "DI", value: baseNacional.di || "Nada Consta" },
                    { label: "UF", value: baseEstadual.uf || reportData.uf },
                    {
                      label: "Município",
                      value: baseEstadual.municipio || reportData.municipio,
                    },
                  ],
                  right: [
                    {
                      label: "Data Última Atualização",
                      value: formatDate(
                        baseNacional.dtUltimaAtualizacao ||
                          reportData.dtUltimaAtualizacao
                      ),
                    },
                    {
                      label: "Categoria",
                      value: baseEstadual.categoria || "Particular",
                    },
                    {
                      label: "Espécie do Veículo",
                      value: baseEstadual.especie || "Passageiro",
                    },
                    { label: "Combustível", value: fuel },
                    { label: "Cor", value: color },
                    {
                      label: "Tipo de Veículo",
                      value: baseEstadual.tipo || "Automovel",
                    },
                    {
                      label: "Tipo Documento Importador",
                      value: baseNacional.tipoDocImportadora || "Nada Consta",
                    },
                    {
                      label: "Situação do Veículo",
                      value: baseEstadual.situacaoVeiculo || "Circulação",
                    },
                  ],
                }}
              />
            </ReportSection>

            {/* CSV-INMETRO */}
            <SimpleContentSection
              title="Certificado de Segurança Veicular (CSV-INMETRO)"
              content={
                <p className="text-gray-800">
                  Acesso a página de validação de CSV no site{" "}
                  <a
                    href="https://www.gov.br/pt-br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1AABFE] hover:underline"
                  >
                    https://www.gov.br/pt-br
                  </a>
                  .
                </p>
              }
            />
            {/* Warning at bottom */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-full px-1 ">
              <div className="flex items-start gap-2">
                <span className="text-yellow-500 text-lg">
                  <IoIosWarning />
                </span>
                <p className="text-sm text-gray-800">
                  <strong>OBS:</strong> Sempre verifique o documento do veículo
                  para outras restrições, observações ou CSV!
                </p>
              </div>
            </div>

            {/* Restrições Nacionais */}
            {(baseNacional.restricao1 ||
              baseNacional.restricao2 ||
              baseNacional.restricao3 ||
              baseNacional.restricao4 ||
              baseNacional.restricaoFinanciadora ||
              baseNacional.outrasRestricoes1) && (
              <div className="space-y-4 page-break-after">
                {renderSectionTitle("Restrições Nacionais")}
                {renderTwoColumnSection(
                  <>
                    <div className="space-y-3">
                      {renderField(
                        "Comunicação de Venda",
                        baseNacional.indicadorComunicacaoVendas === "SIM"
                          ? "Sim"
                          : "Não"
                      )}
                      {renderField(
                        "Restrição Financiadora",
                        baseNacional.restricaoFinanciadora,
                        baseNacional.restricaoFinanciadora !== "NADA CONSTA"
                      )}
                      {renderField("Restrição 1", baseNacional.restricao1)}
                      {renderField(
                        "Restrição 3",
                        baseNacional.restricao3,
                        baseNacional.restricao3 !== "NADA CONSTA"
                      )}
                    </div>

                    <div className="space-y-3">
                      {renderField(
                        "Indicação Restrição Renajud",
                        baseNacional.indicadorRestricaoRenajud === "SIM"
                          ? "Sim"
                          : "Não"
                      )}
                      {renderField("Ocorrência", baseNacional.ocorrencia)}
                      {renderField("Restrição 2", baseNacional.restricao2)}
                      {renderField(
                        "Restrição 4",
                        baseNacional.restricao4,
                        baseNacional.restricao4 !== "NADA CONSTA"
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Faturamento */}
            {baseNacional.docFaturado && (
              <div className="space-y-4">
                {renderSectionTitle("Faturamento")}
                {renderTwoColumnSection(
                  <>
                    <div className="space-y-3">
                      {renderField(
                        "Documento Faturado",
                        baseNacional.docFaturado
                      )}
                      {renderField(
                        "Tipo Documento Faturado",
                        baseNacional.tipoDocFaturado || "Nada Consta"
                      )}
                      {renderField(
                        "Nome Fantasia",
                        baseNacional.nomeFantasia || "Nada Consta"
                      )}
                      {renderField("CEP", baseNacional.cep || "Nada Consta")}
                    </div>
                    <div className="space-y-3">
                      {renderField(
                        "UF Faturado",
                        baseNacional.ufFaturado || "Nada Consta"
                      )}
                      {renderField(
                        "Razão Social",
                        baseNacional.razaoSocial || "Nada Consta"
                      )}
                      {renderField(
                        "Cidade",
                        baseNacional.cidade || "Nada Consta"
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Cadastro Estadual */}
            <div className="space-y-4">
              {renderSectionTitle("Cadastro Estadual")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {renderField(
                      "Data Emissão CRV",
                      formatDate(baseEstadual.dataEmissaoCrv)
                    )}
                    {renderField(
                      "Exercício Licenciamento",
                      baseEstadual.exercicioLicenciamento
                    )}
                    {renderField("Motor", baseEstadual.motor)}
                    {renderField("Renavam", baseEstadual.renavam)}
                    {renderField("UF", baseEstadual.uf)}
                    {renderField("Município", baseEstadual.municipio)}
                    {renderField(
                      "Situação do Veículo",
                      baseEstadual.situacaoVeiculo
                    )}
                  </div>
                  <div className="space-y-3">
                    {renderField(
                      "Data Licenciamento",
                      formatDate(baseEstadual.licdata)
                    )}
                    {renderField("Categoria", baseEstadual.categoria)}
                    {renderField("Espécie do Veículo", baseEstadual.especie)}
                    {renderField("Combustível", baseEstadual.combustivel)}
                    {renderField("Cor", baseEstadual.cor)}
                    {renderField(
                      "Tipo Marcação do Chassi",
                      baseEstadual.tipoMarcacaoChassi
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Restrições Estaduais */}
            {(baseEstadual.restricaoAdminisrativa ||
              baseEstadual.restricaoFinanceira ||
              baseEstadual.restricaoJudicial ||
              baseEstadual.restricaoTributaria) && (
              <div className="space-y-4">
                {renderSectionTitle("Restrições Estaduais")}
                {renderTwoColumnSection(
                  <>
                    <div className="space-y-3">
                      {renderField(
                        "Administrativa",
                        baseEstadual.restricaoAdminisrativa
                      )}
                      {renderField(
                        "Financeira",
                        baseEstadual.restricaoFinanceira,
                        baseEstadual.restricaoFinanceira !== "NADA CONSTA"
                      )}
                      {renderField("Guincho", baseEstadual.restricaoGuincho)}
                      {renderField(
                        "Restrição 1",
                        baseEstadual.outrasRestricoes1,
                        baseEstadual.outrasRestricoes1 !== "NADA CONSTA"
                      )}
                      {renderField(
                        "Restrição 2",
                        baseEstadual.outrasRestricoes2
                      )}
                      {renderField(
                        "Arrendamento",
                        baseEstadual.restricaoArrendatario || "Nada Consta"
                      )}
                      {renderField("Roubo", baseEstadual.restricaoRouboFurto)}
                      {renderField(
                        "Observações",
                        baseEstadual.observacoes || "Nada Consta"
                      )}
                    </div>
                    <div className="space-y-3">
                      {renderField(
                        "Comunicação de Venda",
                        baseEstadual.comunicacaoVenda
                      )}
                      {renderField(
                        "Data Tributária",
                        baseEstadual.dataLimiteRestricaoTributaria ||
                          "Nada Consta"
                      )}
                      {renderField("Judicial", baseEstadual.restricaoJudicial)}
                      {renderField(
                        "Restrição 3",
                        baseEstadual.outrasRestricoes3,
                        baseEstadual.outrasRestricoes3 !== "NADA CONSTA"
                      )}
                      {renderField(
                        "Restrição 4",
                        baseEstadual.outrasRestricoes4
                      )}
                      {renderField("Renajud", baseEstadual.restricaoRenajud)}
                      {renderField(
                        "Tributária",
                        baseEstadual.restricaoTributaria
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Alerta de Débitos */}
            {(parseCurrency(baseEstadual.debitoDpvat || "0,00") > 0 ||
              parseCurrency(baseEstadual.debitoLicenciamento || "0,00") > 0 ||
              parseCurrency(baseEstadual.debitoIpva || "0,00") > 0 ||
              parseCurrency(baseEstadual.debitoMultas || "0,00") > 0) && (
              <ReportSection title="Alerta de Débitos">
                {renderTwoColumnSection(
                  <>
                    <div className="space-y-3">
                      <ReportField
                        label="Débito DPVAT"
                        value={
                          parseCurrency(baseEstadual.debitoDpvat || "0,00") > 0
                            ? formatCurrency(
                                parseCurrency(
                                  baseEstadual.debitoDpvat || "0,00"
                                )
                              )
                            : "Nada Consta"
                        }
                        hasWarning={
                          parseCurrency(baseEstadual.debitoDpvat || "0,00") > 0
                        }
                      />
                      <ReportField
                        label="Débitos Licenciamento"
                        value={
                          parseCurrency(
                            baseEstadual.debitoLicenciamento || "0,00"
                          ) > 0
                            ? formatCurrency(
                                parseCurrency(
                                  baseEstadual.debitoLicenciamento || "0,00"
                                )
                              )
                            : "Nada Consta"
                        }
                        hasWarning={
                          parseCurrency(
                            baseEstadual.debitoLicenciamento || "0,00"
                          ) > 0
                        }
                      />
                    </div>

                    <div className="space-y-3">
                      <ReportField
                        label="Débitos IPVA"
                        value={
                          parseCurrency(baseEstadual.debitoIpva || "0,00") > 0
                            ? formatCurrency(
                                parseCurrency(baseEstadual.debitoIpva || "0,00")
                              )
                            : "Nada Consta"
                        }
                        hasWarning={
                          parseCurrency(baseEstadual.debitoIpva || "0,00") > 0
                        }
                      />
                      <ReportField
                        label="Débitos Multa"
                        value={
                          parseCurrency(baseEstadual.debitoMultas || "0,00") > 0
                            ? "Existe débito de multa"
                            : "Nada Consta"
                        }
                        hasWarning={
                          parseCurrency(baseEstadual.debitoMultas || "0,00") > 0
                        }
                      />
                    </div>
                  </>
                )}
                {renderWarningBox(
                  "Atenção! As informações de débitos e multas em nosso sistema são uma cortesia ao nosso cliente e podem não refletir o status atual do veículo consultado, podendo não trazer todos os débitos ou multas do veículo. Orientamos a todos a consultar o site do DETRAN e SECRETARIA DA FAZENDA da UF do veículo."
                )}
              </ReportSection>
            )}

            {/* SEFAZ / SEF Link */}
            <SimpleContentSection
              title="SEFAZ (Secretária de Estado da Fazenda) - Link de Direcionamento"
              content={
                <p className="text-[#194D9A] text-xs px-4">
                  Orientamos a todos a consultar o site da SECRETÁRIA DA FAZENDA
                  da UF do veículo -{" "}
                  {baseEstadual.uf === "SP" && (
                    <a
                      href="https://portal.fazenda.sp.gov.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1AABFE] hover:underline"
                    >
                      https://portal.fazenda.sp.gov.br/
                    </a>
                  )}
                  {baseEstadual.uf !== "SP" && (
                    <span className="text-gray-600">
                      (consulte o site oficial do estado {baseEstadual.uf})
                    </span>
                  )}{" "}
                  ({baseEstadual.uf})
                </p>
              }
            />

            {/* Detalhamento Débito e Multas */}
            <div className="space-y-4 page-break-after">
              {renderSectionTitle("Detalhamento Débito e Multas")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {renderField(
                      "CETESB",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoCetesb || "0,00")
                      )
                    )}
                    {renderField(
                      "DETRAN",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDetran || "0,00")
                      ),
                      parseCurrency(baseEstadual.debitoDetran || "0,00") > 0
                    )}
                    {renderField(
                      "DER",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDer || "0,00")
                      )
                    )}
                    {renderField(
                      "DERSA",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDersa || "0,00")
                      )
                    )}
                    {renderField(
                      "DPVAT",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDpvat || "0,00")
                      )
                    )}
                    {renderField(
                      "IPVA",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoIpva || "0,00")
                      )
                    )}
                  </div>
                  <div className="space-y-3">
                    {renderField(
                      "Licenciamento",
                      formatCurrency(
                        parseCurrency(
                          baseEstadual.debitoLicenciamento || "0,00"
                        )
                      )
                    )}
                    {renderField(
                      "Municipais",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoMunicipais || "0,00")
                      )
                    )}
                    {renderField(
                      "PRF",
                      formatCurrency(
                        parseCurrency(
                          baseEstadual.debitoPoliciaRodoviariaFederal || "0,00"
                        )
                      )
                    )}
                    {renderField(
                      "Multas",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoMultas || "0,00")
                      ),
                      parseCurrency(baseEstadual.debitoMultas || "0,00") > 0
                    )}
                    {renderField(
                      "RENAINF",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoRenainf || "0,00")
                      )
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Histórico de Proprietários */}
            {reportData.historicoProprietarios &&
              reportData.historicoProprietarios.length > 0 && (
                <ReportTableSection
                  title="Histórico de Proprietários"
                  headers={[
                    "Ocorrência",
                    "Município",
                    "UF",
                    "Exercício",
                    "Proprietário",
                    "Data",
                    "Motivo",
                  ]}
                  rows={reportData.historicoProprietarios.map((item) => [
                    item.ocorrencia || "-",
                    item.municipio || "-",
                    item.uf || "-",
                    item.anoExercicio || "-",
                    item.proprietario || "-",
                    formatDate(item.dataEmplacamento) !== "N/A"
                      ? formatDate(item.dataEmplacamento)
                      : "-",
                    item.motivoTipoAutorizacao || "-",
                  ])}
                />
              )}

            {/* Informações de Parceiros */}
            {reportData.historicoAnuncios &&
              reportData.historicoAnuncios.length > 0 && (
                <ReportTableSection
                  title="Informações de Parceiros"
                  headers={["Data", "KM", "Valor do Anúncio"]}
                  rows={reportData.historicoAnuncios.map((item) => [
                    formatDate(item.data),
                    item.km ? `${item.km} KM` : "-",
                    item.valor ? formatCurrency(item.valor) : "-",
                  ])}
                />
              )}
            {/* Observação do Vendedor */}
            {reportData.anuncio?.observacao && (
              <div className="space-y-4">
                <div className="bg-[#1AABFE] text-white px-4 py-1 rounded-full inline-block text-sm font-semibold">
                  Observação do Vendedor
                </div>
                <div className="border-2 border-[#1AABFE]/80 rounded-lg p-4 py-2 bg-white">
                  <p className="text-gray-800 leading-relaxed">
                    {reportData.anuncio.observacao}
                  </p>
                </div>
              </div>
            )}

            {/* Informações gerais do veículo */}
            <ReportSection title="Informações gerais do veículo">
              <TwoColumnFieldSection
                fields={{
                  left: [
                    { label: "Marca / Modelo", value: `${make} / ${model}` },
                    { label: "Cor", value: color },
                    {
                      label: "RENAVAM",
                      value: baseEstadual.renavam || reportData.renavam,
                    },
                    {
                      label: "Tipo do Veículo",
                      value: baseEstadual.tipo || "Automovel",
                    },
                    {
                      label: "Nacionalidade",
                      value: reportData.nacionalidade || "Nacional",
                    },
                    { label: "UF", value: baseEstadual.uf || reportData.uf },
                    {
                      label: "Registro DI",
                      value: baseNacional.di || "Nada Consta",
                    },
                  ],
                  right: [
                    {
                      label: "Ano / Modelo",
                      value: `${reportData.anoFabricacao || year}/${year}`,
                    },
                    { label: "Placa", value: plate },
                    { label: "Combustível", value: fuel },
                    {
                      label: "Número do motor",
                      value: baseEstadual.motor || reportData.numMotor,
                    },
                    { label: "Chassi", value: chassis },
                    {
                      label: "Município",
                      value: baseEstadual.municipio || reportData.municipio,
                    },
                  ],
                }}
              />
            </ReportSection>

            {/* Dados Básicos */}
            {(reportData.caixaCambio ||
              reportData.cilindradas ||
              reportData.numTerceiroEixo !== undefined ||
              reportData.potencia ||
              reportData.pbt) && (
              <div className="space-y-4">
                {renderSectionTitle("Dados Básicos")}
                {renderTwoColumnSection(
                  <>
                    <div className="space-y-3">
                      {renderField(
                        "Caixa Câmbio",
                        reportData.caixaCambio || "Nada Consta"
                      )}
                      {renderField("Cilindradas", reportData.cilindradas)}
                      {renderField(
                        "Número 3º Eixo",
                        reportData.numTerceiroEixo || "Nada Consta"
                      )}
                      {renderField("Potência", reportData.potencia)}
                      {renderField("Peso Bruto", reportData.pbt)}
                    </div>
                    <div className="space-y-3">
                      {renderField(
                        "Capacidade Máxima de tração",
                        reportData.capMaxTracao || "0"
                      )}
                      {renderField(
                        "Eixo Diferencial",
                        reportData.eixoTraseiroDif || "Nada Consta"
                      )}
                      {renderField(
                        "Número Carroceria",
                        reportData.numCarroceria || "Nada Consta"
                      )}
                      {renderField(
                        "Tipo Carroceria",
                        reportData.tipoCarroceria || "Desconhecido"
                      )}
                      {renderField(
                        "Capacidade de Passageiros",
                        reportData.capacidadePassageiro || "5"
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Informações do Anúncio */}
            {reportData.anuncio &&
              (reportData.anuncio.km ||
                reportData.anuncio.valor ||
                reportData.anuncio.data ||
                reportData.anuncio.opcionais?.length > 0) && (
                <ReportSection title="Informações do Anúncio">
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {reportData.anuncio.data && (
                        <ReportField
                          label="Data do Anúncio"
                          value={formatDate(reportData.anuncio.data)}
                        />
                      )}
                      {reportData.anuncio.km && (
                        <ReportField
                          label="Quilometragem"
                          value={`${reportData.anuncio.km} KM`}
                        />
                      )}
                      {reportData.anuncio.valor && (
                        <ReportField
                          label="Valor do Anúncio"
                          value={formatCurrency(
                            parseCurrency(reportData.anuncio.valor)
                          )}
                        />
                      )}
                    </div>
                    {reportData.anuncio.opcionais &&
                      reportData.anuncio.opcionais.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-[#194D9A] mb-2">
                            Opcionais do Anúncio:
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {reportData.anuncio.opcionais.map((item, index) => (
                              <p key={index} className="text-sm text-gray-800">
                                {typeof item === "object"
                                  ? item.descricao || item
                                  : item}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </ReportSection>
              )}

            {/* Opcionais */}
            {reportData.acessoriosCategorizados?.acessorios &&
              reportData.acessoriosCategorizados.acessorios.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-[#1AABFE] text-white px-4 py-2 rounded-lg inline-block">
                    <h3 className="text-lg font-semibold">Opcionais</h3>
                  </div>
                  {renderTwoColumnSection(
                    <>
                      <div className="space-y-2">
                        {reportData.acessoriosCategorizados.acessorios
                          .slice(
                            0,
                            Math.ceil(
                              reportData.acessoriosCategorizados.acessorios
                                .length / 2
                            )
                          )
                          .map((item, index) => (
                            <p key={index} className="text-gray-800">
                              {item}
                            </p>
                          ))}
                      </div>
                      <div className="space-y-2">
                        {reportData.acessoriosCategorizados.acessorios
                          .slice(
                            Math.ceil(
                              reportData.acessoriosCategorizados.acessorios
                                .length / 2
                            )
                          )
                          .map((item, index) => (
                            <p key={index} className="text-gray-800">
                              {item}
                            </p>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              )}

            {/* Ficha Técnica */}
            {reportData.fichaTecnica?.registros &&
              reportData.fichaTecnica.registros.length > 0 && (
                <ReportSection title="Ficha Técnica">
                  <div className="space-y-4">
                    {reportData.fichaTecnica.registros.map((grupo, index) => {
                      // Get the title from various possible fields - check all possible locations
                      let grupoTitle = null;

                      // Try common field names
                      if (grupo.descricao) grupoTitle = grupo.descricao;
                      else if (grupo.nome) grupoTitle = grupo.nome;
                      else if (grupo.titulo) grupoTitle = grupo.titulo;
                      else if (grupo.title) grupoTitle = grupo.title;
                      else if (grupo.category) grupoTitle = grupo.category;
                      else if (grupo.categoria) grupoTitle = grupo.categoria;
                      else if (grupo.name) grupoTitle = grupo.name;
                      else if (grupo.label) grupoTitle = grupo.label;

                      // If still not found, search for any field that might contain the title
                      if (!grupoTitle) {
                        const titleKey = Object.keys(grupo).find(
                          (key) =>
                            (key.toLowerCase().includes("descricao") ||
                              key.toLowerCase().includes("nome") ||
                              key.toLowerCase().includes("titulo") ||
                              key.toLowerCase().includes("title") ||
                              key.toLowerCase().includes("category")) &&
                            typeof grupo[key] === "string" &&
                            grupo[key].trim().length > 0
                        );
                        if (titleKey) grupoTitle = grupo[titleKey];
                      }

                      // Final fallback
                      if (!grupoTitle || grupoTitle.trim() === "") {
                        grupoTitle = `Seção ${index + 1}`;
                      }

                      return (
                        <div
                          key={index}
                          className="border-2 border-[#1AABFE]/80 rounded-xl overflow-hidden bg-white"
                        >
                          {/* Blue Title Header - Always show */}
                          <div className="bg-[#1AABFE] text-white px-4 py-3">
                            <h4 className="text-lg font-semibold">
                              {grupoTitle}
                            </h4>
                          </div>
                          {/* Content */}
                          <div className="p-4">
                            {grupo.especificacoes &&
                            Array.isArray(grupo.especificacoes) &&
                            grupo.especificacoes.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {grupo.especificacoes.map((spec, specIndex) => (
                                  <div
                                    key={specIndex}
                                    className="flex justify-between border-b border-gray-200 pb-2"
                                  >
                                    <span className="text-sm font-medium text-gray-700">
                                      {spec.descricao ||
                                        spec.nome ||
                                        spec.label ||
                                        spec.key ||
                                        spec.name ||
                                        spec.propriedade ||
                                        "-"}
                                      :
                                    </span>
                                    <span className="text-sm text-gray-900 font-semibold">
                                      {spec.valor ||
                                        spec.value ||
                                        spec.descricao ||
                                        "-"}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              // Handle if especificacoes is not an array but direct properties
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(grupo)
                                  .filter(
                                    ([key]) =>
                                      key !== "descricao" &&
                                      key !== "nome" &&
                                      key !== "titulo" &&
                                      key !== "title" &&
                                      key !== "category" &&
                                      key !== "categoria" &&
                                      key !== "especificacoes" &&
                                      key !== "name" &&
                                      key !== "label" &&
                                      typeof grupo[key] !== "object" &&
                                      grupo[key] !== null &&
                                      grupo[key] !== undefined
                                  )
                                  .map(([key, value], specIndex) => (
                                    <div
                                      key={specIndex}
                                      className="flex justify-between border-b border-gray-200 pb-2"
                                    >
                                      <span className="text-sm font-medium text-gray-700 capitalize">
                                        {key
                                          .replace(/([A-Z])/g, " $1")
                                          .trim()
                                          .replace(/^\w/, (c) =>
                                            c.toUpperCase()
                                          )}
                                        :
                                      </span>
                                      <span className="text-sm text-gray-900 font-semibold">
                                        {String(value) || "-"}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ReportSection>
              )}

            {/* Comparativo Especificações */}
            {/* {reportData.comparativoEspecificacoes?.veiculoComparativo &&
              reportData.comparativoEspecificacoes.veiculoComparativo.length >
                0 && (
                <ReportSection title="Comparativo Especificações">
                  <div className="space-y-4">
                    {reportData.comparativoEspecificacoes.veiculoComparativo.map(
                      (veiculo, index) => (
                        <div
                          key={index}
                          className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white"
                        >
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-[#194D9A]">
                              {veiculo.marca} {veiculo.modelo} ({veiculo.ano})
                            </h4>
                            {veiculo.descricao && (
                              <div className="mt-2 space-y-1">
                                {veiculo.descricao.posicao && (
                                  <p className="text-sm text-gray-600">
                                    Posição: {veiculo.descricao.posicao}
                                  </p>
                                )}
                                {veiculo.descricao
                                  .seisMesesPorcentagemDeIdade && (
                                  <p className="text-sm text-gray-600">
                                    Idade (%):{" "}
                                    {
                                      veiculo.descricao
                                        .seisMesesPorcentagemDeIdade
                                    }
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                          {veiculo.espesificacoes &&
                            veiculo.espesificacoes.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {veiculo.espesificacoes.map(
                                  (spec, specIndex) => (
                                    <div
                                      key={specIndex}
                                      className="flex justify-between border-b border-gray-200 pb-2"
                                    >
                                      <span className="text-sm font-medium text-gray-700">
                                        {spec.descricao}:
                                      </span>
                                      <span className="text-sm text-gray-900 font-semibold">
                                        {spec.valor} (Posição: {spec.posicao})
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          {veiculo.preco && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-[#194D9A]">
                                Preço:{" "}
                                {formatCurrency(
                                  parseCurrency(veiculo.preco.preco)
                                )}{" "}
                                (Posição: {veiculo.preco.posicao})
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </ReportSection>
              )} */}

            {/* Custo Médio */}
            {reportData.custoMedio && (
              <ReportSection title="Custo Médio">
                <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-md font-semibold text-[#194D9A] mb-3">
                        Custos de Revisão
                      </h4>
                      {reportData.custoMedio.custoPlanoRevisaoTotal > 0 ? (
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(
                            reportData.custoMedio.custoPlanoRevisaoTotal
                          )}
                        </p>
                      ) : (
                        <p className="text-gray-600">Nada Consta</p>
                      )}
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-[#194D9A] mb-3">
                        Custos de Desgaste de Peças
                      </h4>
                      {reportData.custoMedio.custoDesgastePecasTotal > 0 ? (
                        <p className="text-lg font-bold text-gray-900">
                          {formatCurrency(
                            reportData.custoMedio.custoDesgastePecasTotal
                          )}
                        </p>
                      ) : (
                        <p className="text-gray-600">Nada Consta</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-md font-semibold text-[#194D9A] mb-3">
                        Custo Total
                      </h4>
                      {reportData.custoMedio.custoTotal > 0 ? (
                        <p className="text-2xl font-bold text-[#194D9A]">
                          {formatCurrency(reportData.custoMedio.custoTotal)}
                        </p>
                      ) : (
                        <p className="text-gray-600">Nada Consta</p>
                      )}
                    </div>
                  </div>
                  {reportData.custoMedio.custoCada10k &&
                    reportData.custoMedio.custoCada10k.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-[#194D9A] mb-3">
                          Custo a cada 10.000 KM
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full border-collapse">
                            <thead>
                              <tr className="bg-[#194D9A] text-white">
                                <th className="p-2 text-left text-sm font-medium border border-blue-600">
                                  KM
                                </th>
                                <th className="p-2 text-left text-sm font-medium border border-blue-600">
                                  Custo
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reportData.custoMedio.custoCada10k.map(
                                (item, index) => (
                                  <tr
                                    key={index}
                                    className="bg-white border-b border-gray-200 hover:bg-gray-50"
                                  >
                                    <td className="p-2 text-sm text-gray-900 border border-gray-200">
                                      {item.km || "-"}
                                    </td>
                                    <td className="p-2 text-sm text-gray-900 border border-gray-200">
                                      {item.custo
                                        ? formatCurrency(
                                            parseCurrency(item.custo)
                                          )
                                        : "-"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                </div>
              </ReportSection>
            )}

            {/* Gravame */}
            {reportData.gravame && reportData.gravame.length > 0 && (
              <ReportSection title="Gravame">
                {reportData.gravame.map((gravame, index) => (
                  <div key={index} className="mb-4">
                    <div className="bg-[#1AABFE] text-white px-4 py-2 rounded-t-lg">
                      <h4 className="font-semibold">Registro {index + 1}</h4>
                    </div>
                    <div className="border-2 border-[#1AABFE]/80 rounded-b-lg border-t-0 p-4 bg-white">
                      <TwoColumnFieldSection
                        fields={{
                          left: [
                            {
                              label: "Documento Agente",
                              value: gravame.documentoAgente || "Nada Consta",
                            },
                            {
                              label: "Agente",
                              value: gravame.agente || "Nada Consta",
                            },
                            {
                              label: "Responsável",
                              value: gravame.responsavel || "Nada Consta",
                            },
                            { label: "Placa", value: gravame.placa || plate },
                            {
                              label: "Renavam",
                              value: gravame.renavam || baseEstadual.renavam,
                            },
                            {
                              label: "Chassi",
                              value: gravame.chassi || chassis,
                            },
                            {
                              label: "Contrato",
                              value: gravame.contrato || "Nada Consta",
                            },
                          ],
                          right: [
                            {
                              label: "Numero da Restrição",
                              value: gravame.numeroRestricao || "Nada Consta",
                            },
                            {
                              label: "Documento Financiado",
                              value:
                                gravame.documentoFinanciado || "Nada Consta",
                            },
                            {
                              label: "Data Situação",
                              value: formatDate(gravame.dataSituacao),
                            },
                            {
                              label: "Data Inclusão",
                              value: formatDate(gravame.dataInclusao),
                            },
                            {
                              label: "Vigência Contrato",
                              value: formatDate(gravame.vigenciaContrato),
                            },
                            {
                              label: "Observações",
                              value: gravame.observacoes || "Nada Consta",
                            },
                            {
                              label: "Situação",
                              value: gravame.situacao || "Nada Consta",
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </ReportSection>
            )}

            {/* Histórico Roubo e Furto */}
            {reportData.rouboFurto &&
              reportData.rouboFurto.historico &&
              reportData.rouboFurto.historico.length > 0 && (
                <ReportTableSection
                  title="Histórico Roubo e Furto"
                  headers={[
                    "Data",
                    "Ocorrência",
                    "Município / Estado",
                    "Número do B.O.",
                    "Informante",
                  ]}
                  rows={reportData.rouboFurto.historico.map((item) => [
                    formatDate(item.data),
                    item.ocorrencia || "-",
                    item.municipio && item.uf
                      ? `${item.municipio}/${item.uf}`
                      : "-",
                    item.numeroBO || "-",
                    item.informante || "-",
                  ])}
                />
              )}

            {/* Registro em Locadora */}
            <ReportSection title="Registro em Locadora">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {reportData.registroEmLocadora?.registroEmLocadora
                    ? "Veículo possui registro em locadora."
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* Recall Pendentes */}
            {reportData.recall &&
              reportData.recall.recallsPendente &&
              reportData.recall.recallsPendente.length > 0 && (
                <ReportTableSection
                  title="Recall Pendentes"
                  headers={["Descrição", "Identificador", "Situação"]}
                  rows={reportData.recall.recallsPendente.map((item) => [
                    item.descricao || "-",
                    item.identificador || "-",
                    item.situacao || "Pendente de atendimento",
                  ])}
                />
              )}

            {/* Análise de Risco */}
            {/* {reportData.analiseRisco && (
            <div className="space-y-4">
              {renderSectionTitle("Análise de Risco")}
              <div className="border-2 border-blue-100 rounded-lg p-4 bg-white">
                <div className="space-y-2">
                  {renderField(
                    "Índice de Risco",
                    reportData.analiseRisco.indiceRisco
                  )}
                  {reportData.analiseRisco.parecer && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 font-medium">
                        Parecer:
                      </p>
                      <p className="text-gray-800">
                        {reportData.analiseRisco.parecer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )} */}

            {/* Warning at bottom */}
            {/* <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-yellow-500 text-lg">▲</span>
              <p className="text-sm text-gray-800">
                <strong>OBS:</strong> Sempre verifique o documento do veículo
                para outras restrições, observações ou CSV!
              </p>
            </div>
          </div> */}

            {/* Footer with buttons */}
            <div className="border-t-2 border-gray-200 pt-6 mt-6">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  disabled={downloading}
                  onClick={downloadPDF}
                  className="bg-[#194D9A] hover:bg-[#1AABFE] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {downloading ? "Baixando..." : "Baixar PDF"}
                </button>
                <button className="bg-[#1AABFE] hover:bg-[#1590d4] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                  Compartilhar relatório
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">
                © 2025 Placa Verificada — Relatório de consulta veicular.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
