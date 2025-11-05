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
import PriceEvolutionChart from "./components/PriceEvolutionChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { toast } from "react-toastify";
import BarGauge from "./components/BarGauge";
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

  const renderAiSummary = () => {
    // Resumo IA: em desenvolvimento
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[#194D9A]">Resumo IA</h2>
        <div className="border-2 border-[#1AABFE]/80 rounded-lg p-4 bg-white h-[180px] relative">
          <p className="text-gray-500">em desenvolvimento</p>
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
    // ID da consulta: response.body._id
    queryId = responseItem._id || "N/A";
    // Status da consulta: response.status → "Parcial" if status_code !== 200
    status = responseItem.status_code === 200 ? "Sucesso" : "Parcial";
  } else if (responseItem?.body?.data) {
    reportData = responseItem.body.data;
    consultationDate = responseItem.body.headerInfos?.date
      ? formatDate(responseItem.body.headerInfos.date)
      : formatDate(new Date().toISOString());
    // ID da consulta: response.body._id
    queryId = responseItem._id || "N/A";
    // Status da consulta: response.status → "Parcial" if status_code !== 200
    status = responseItem.status_code === 200 ? "Sucesso" : "Parcial";
  } else if (responseItem?.data) {
    reportData = responseItem.data;
    queryId = responseItem._id || "N/A";
    status = responseItem.status_code === 200 ? "Sucesso" : "Parcial";
  } else if (responseItem?.response?.body) {
    reportData = responseItem.response.body;
    queryId = responseItem._id || "N/A";
    status = responseItem.status_code === 200 ? "Sucesso" : "Parcial";
  } else {
    reportData = responseItem;
    queryId = responseItem?._id || "N/A";
    status = responseItem?.status_code === 200 ? "Sucesso" : "Parcial";
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

  // Extract basic vehicle information - Block 1 mapping
  // Placa: response.body.data.placa
  const plate = reportData?.placa || "N/A";

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

  // Valor FIPE: response.body.data.dadosBasicosDoVeiculo.informacoesFipe.0.valorAtual
  const valorFipe = reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
    ?.valorAtual
    ? reportData.dadosBasicosDoVeiculo.informacoesFipe[0].valorAtual
    : "N/A";
  const valorAtual = precificadorII?.valor
    ? formatCurrency(parseCurrency(precificadorII.valor))
    : "N/A";

  // Idade do Veiculo: response.body.data.anoFabricacao
  const currentYear = new Date().getFullYear();
  const vehicleAge = reportData.anoFabricacao
    ? currentYear - parseInt(reportData.anoFabricacao)
    : "N/A";

  // Block 2 mapping - Check for issues in summary
  // Leilão: response.body.data.leilao
  const hasLeilao = reportData.leilao ? "Sim" : "Não";
  // Sinistro: response.body.data.indicioSinistro
  const hasSinistro = reportData.indicioSinistro ? "Sim" : "Não";
  // Bancos, Financeiras ou seguradoras: response.body.data.baseEstadual.restricaoFinanceira
  const hasBancosFinanceiras =
    baseEstadual.restricaoFinanceira &&
    baseEstadual.restricaoFinanceira !== null &&
    baseEstadual.restricaoFinanceira !== "NADA CONSTA"
      ? "Sim"
      : "Não";
  // Restrições nacionais: response.body.data.restricoes
  const hasRestricoesNacionais = reportData.restricoes ? "Sim" : "Não";
  // Restrições estaduais: response.body.data.baseEstadual
  const hasRestricoesEstaduais =
    baseEstadual && Object.keys(baseEstadual).length > 0 ? "Sim" : "Não";
  // motor alterado: response.body.data.baseEstadual.dataAlteracaoMotor
  const hasMotorAlterado = baseEstadual.dataAlteracaoMotor ? "Sim" : "Não";
  // Chassi remarcado: response.body.data.baseEstadual.tipoMarcacaoChassi
  const hasChassiRemarcado =
    baseEstadual.tipoMarcacaoChassi &&
    baseEstadual.tipoMarcacaoChassi !== "NORMAL" &&
    baseEstadual.tipoMarcacaoChassi !== null
      ? "Sim"
      : "Não";
  // Recall: response.body.data.recall
  const hasRecall = reportData.recall ? "Sim" : "Não";
  // Alerta de Gravame: response.body.data.gravame
  const hasAlertaGravame = reportData.gravame ? "Sim" : "Não";
  // Historico de Roubo: response.body.data.rouboFurto
  const hasHistoricoRoubo = reportData.rouboFurto ? "Sim" : "Não";
  // CSV: response.body.data.csv
  const hasCSV = reportData.csv ? "Sim" : "Não";
  // RENAJUD: response.body.data.baseEstadual.restricaoRenajud
  const hasRENAJUD =
    baseEstadual.restricaoRenajud &&
    baseEstadual.restricaoRenajud !== "NADA CONSTA" &&
    baseEstadual.restricaoRenajud !== null
      ? "Sim"
      : "Não";
  // Historico de multas RENAINF: response.body.data.multasRenainf
  const hasMultasRENAINF = reportData.multasRenainf ? "Sim" : "Não";

  const historico = reportData?.rouboFurto?.historico || [];

  // Block 3 mapping - Insights do veículo
  // Nível de risco geral: response.body.data.leilao.score.aceitacao
  const leilaoScore = reportData.leilao?.score || {};
  const leilaoScoreAceitacao = leilaoScore.aceitacao || "N/A";
  const nivelRisco =
    leilaoScoreAceitacao !== "N/A" ? parseInt(leilaoScoreAceitacao) || 0 : 0;
  // Exigência de Vistoria Especial: response.body.data.leilao.score.exigenciaVistoriaEspecial
  const leilaoScoreExigenciaVistoria =
    leilaoScore.exigenciaVistoriaEspecial || "N/A";
  const exigenciaVistoriaEspecial =
    leilaoScoreExigenciaVistoria !== "N/A"
      ? parseInt(leilaoScoreExigenciaVistoria) || 0
      : 0;
  // Percentual sobre Tabela FIPE: response.body.data.leilao.score.percentualSobreRef
  const leilaoScorePercentualRef = leilaoScore.percentualSobreRef || "N/A";
  const percentualSobreRef =
    leilaoScorePercentualRef !== "N/A"
      ? parseInt(leilaoScorePercentualRef) || 0
      : 0;

  // Legacy support for other parts of the code
  const leilaoScoreValue = leilaoScore.score || leilaoScore.pontuacao || null;

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
  if (!riscoBancosFinanceiras && hasBancosFinanceiras === "Sim") {
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
  if (!riscoBancosFinanceiras && hasBancosFinanceiras === "Sim") {
    const indiceRisco = reportData.analiseRisco?.indiceRisco || "1";
    if (indiceRisco === "4") riscoBancosFinanceiras = 90;
    else if (indiceRisco === "3") riscoBancosFinanceiras = 75;
    else if (indiceRisco === "2") riscoBancosFinanceiras = 50;
    else if (indiceRisco === "1") riscoBancosFinanceiras = 25;
    else riscoBancosFinanceiras = 90; // Default high risk if has gravame
  }

  // Default analysis text if not provided by API
  if (!analiseBancos && hasBancosFinanceiras === "Sim") {
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
    <div className="h-screen overflow-auto rounded-xl ">
      <div className=" mx-auto max-w-[1080px] ">
        <div
          ref={reportRef}
          data-pdf-content
          className="bg-white space-y-6 custom-scrollbar"
        >
          {/* Header Section */}
          <div className="bg-[#194D9A] border-b-6 border-yellow-300 flex justify-between items-center gap-2 h-[210px] text-white p-2 mb-6">
            <div className="w-[25%] h-full relative p-2 ">
              <img src="/reportLogo.png" alt="" className="h-full mx-auto" />
              <span className="text-yellow-300 absolute bottom-7 right-0 left-0 mx-auto w-fit text-[2.5rem] ">
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
                        Idade do Veiculo{" "}
                        <strong>
                          {vehicleAge !== "N/A" ? `${vehicleAge} Anos` : "N/A"}
                        </strong>
                      </span>
                    </div>
                  )}

                  {valorFipe !== "N/A" && (
                    <div className="bg-[#1AABFE] text-white p-2 rounded-lg flex items-center gap-2 text-sm w-[180px]">
                      <span className="text-3xl">
                        <AiFillDollarCircle />
                      </span>
                      <span className="flex flex-col text-sm whitespace-nowrap">
                        Valor FIPE <strong>R$ {valorFipe}</strong>
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
                    {/* <p>
                      <strong>Status da Consulta: </strong> {status}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 max-w-[88%] mx-auto">
            {renderAiSummary()}
            {/* Resumo da consulta - Block 2 mapping */}
            <div className="space-y-4">
              {renderSectionTitle("Resumo da consulta")}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 gap-x-5">
                {renderStatusBox("Leilão", hasLeilao, "/report/auction.png")}
                {renderStatusBox("Sinistro", hasSinistro, "/report/crash.png")}
                {renderStatusBox(
                  "Bancos, Financeiras ou seguradoras",
                  hasBancosFinanceiras,
                  "/report/bank.png"
                )}
                {renderStatusBox(
                  "Restrições Nacionais",
                  hasRestricoesNacionais,
                  "/report/national.webp"
                )}
                {renderStatusBox(
                  "Restrições Estaduais",
                  hasRestricoesEstaduais,
                  "/report/restrict.png"
                )}
                {renderStatusBox(
                  "motor alterado",
                  hasMotorAlterado,
                  "/report/engine.png"
                )}
                {renderStatusBox(
                  "Chassi remarcado",
                  hasChassiRemarcado,
                  "/report/!.svg"
                )}
                {renderStatusBox("Recall", hasRecall, "/report/tools.svg")}
                {renderStatusBox(
                  "Alerta de Gravame",
                  hasAlertaGravame,
                  "/report/alert.webp"
                )}
                {renderStatusBox(
                  "Historico de Roubo",
                  hasHistoricoRoubo,
                  "/report/theft.png"
                )}
                {renderStatusBox("CSV", hasCSV, "/report/csv.png")}
                {renderStatusBox("RENAJUD", hasRENAJUD, "/report/renajud.svg")}
                {renderStatusBox(
                  "Historico de multas RENAINF",
                  hasMultasRENAINF,
                  "/report/police.png"
                )}
              </div>
              {renderWarningBox(
                "Atenção: Alguns blocos possuem informações que merecem cuidado."
              )}
            </div>
            {/* Insights do veículo - Block 3 mapping */}
            <div className="">
              {renderSectionTitle("Insights do veículo")}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nível de risco geral: response.body.data.leilao.score.aceitacao */}
                {nivelRisco > 0 &&
                  renderGauge("Nível de risco geral", nivelRisco)}
                {/* Exigência de Vistoria Especial: response.body.data.leilao.score.exigenciaVistoriaEspecial */}
                {exigenciaVistoriaEspecial > 0 &&
                  renderGauge(
                    "Exigência de Vistoria Especial",
                    hasRestricoesNacionais || hasRestricoesEstaduais
                      ? "Alta"
                      : "Baixa",
                    "text"
                  )}

                {/* Percentual sobre Tabela FIPE: response.body.data.leilao.score.percentualSobreRef */}
                {percentualSobreRef > 0 &&
                  renderGauge(
                    "Percentual sobre Tabela FIPE",
                    percentualSobreRef
                  )}
              </div>
              {!nivelRisco &&
                !exigenciaVistoriaEspecial &&
                !percentualSobreRef && (
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white w-full">
                    <p className="text-gray-800">
                      Informação não encontrada nas bases consultadas.
                    </p>
                  </div>
                )}
            </div>
            {/* Block 4: Informações gerais do veículo */}
            <ReportSection
              title="Informações gerais do veículo"
              breakSection={true}
            >
              <TwoColumnFieldSection
                fields={{
                  left: [
                    // Marca / Modelo: response.body.data.marcaModelo
                    {
                      label: "Marca / Modelo",
                      value: reportData.marcaModelo || "N/A",
                    },
                    // Cor: response.body.data.corVeiculo
                    { label: "Cor", value: reportData.corVeiculo || "N/A" },
                    // RENAVAM: response.body.data.renavam
                    {
                      label: "RENAVAM",
                      value:
                        reportData.renavam || baseEstadual.renavam || "N/A",
                    },
                    // Tipo do Veículo: response.body.data.tipoVeiculo
                    {
                      label: "Tipo do Veículo",
                      value:
                        reportData.tipoVeiculo || baseEstadual.tipo || "N/A",
                    },
                    // Nacionalidade: response.body.data.nacionalidade
                    {
                      label: "Nacionalidade",
                      value: reportData.nacionalidade || "N/A",
                    },
                    // UF: response.body.data.uf
                    {
                      label: "UF",
                      value: reportData.uf || baseEstadual.uf || "N/A",
                    },
                    // Registro DI: response.body.data.registroDi
                    {
                      label: "Registro DI",
                      value:
                        reportData.registroDi ||
                        baseNacional.registroDi ||
                        "N/A",
                    },
                  ],
                  right: [
                    // Número do
                    // Ano / Modelo: response.body.data.anoFabricacao/response.body.data.anoModelo
                    {
                      label: "Ano / Modelo",
                      value:
                        reportData.anoFabricacao && reportData.anoModelo
                          ? `${reportData.anoFabricacao}/${reportData.anoModelo}`
                          : reportData.anoFabricacao ||
                            reportData.anoModelo ||
                            "N/A",
                    },
                    // Placa: response.body.headerInfos.keys.placa
                    {
                      label: "Placa",
                      value:
                        responseItem?.response?.body?.headerInfos?.keys
                          ?.placa ||
                        reportData.placa ||
                        "N/A",
                    },
                    // Combustível: response.body.data.combustivel
                    {
                      label: "Combustível",
                      value:
                        reportData.combustivel ||
                        baseEstadual.combustivel ||
                        "N/A",
                    },
                    //  motor: response.body.data.numMotor
                    {
                      label: "Número do motor",
                      value: reportData.numMotor || baseEstadual.motor || "N/A",
                    },

                    // Chasi: response.body.data.chassi
                    {
                      label: "Chassi",
                      value: reportData.chassi || baseEstadual.chassi || "N/A",
                    },

                    // Município: response.body.data.municipio
                    {
                      label: "Município",
                      value:
                        reportData.municipio || baseEstadual.municipio || "N/A",
                    },
                  ],
                }}
              />
            </ReportSection>
            {/* Block 5: Dados Básicos */}
            <ReportSection title="Dados Básicos">
              <TwoColumnFieldSection
                fields={{
                  left: [
                    // Caixa Câmbio: response.body.data.caixaCambio
                    {
                      label: "Caixa Câmbio",
                      value: reportData.caixaCambio || "N/A",
                    },
                    // Cilindradas: response.body.data.cilindradas
                    {
                      label: "Cilindradas",
                      value: reportData.cilindradas || "N/A",
                    },
                    // Número Carroceria: response.body.data.numCarroceria
                    {
                      label: "Número Carroceria",
                      value: reportData.numCarroceria || "Nada Consta",
                    },

                    // Potência: response.body.data.potencia
                    { label: "Potência", value: reportData.potencia || "N/A" },
                    // Peso Bruto: response.body.data.pbt
                    { label: "Peso Bruto", value: reportData.pbt || "N/A" },
                  ],
                  right: [
                    // Capacidade Máxima de tração: response.body.data.capMaxTracao
                    {
                      label: "Capacidade Máxima de tração",
                      value: reportData.capMaxTracao || "N/A",
                    },
                    // Eixo Diferencial: response.body.data.eixoTraseiroDif
                    {
                      label: "Eixo Diferencial",
                      value: reportData.eixoTraseiroDif || "Nada Consta",
                    },
                    // Número 3º Eixo: response.body.data.numTerceiroEixo
                    {
                      label: "Número 3º Eixo",
                      value: reportData.numTerceiroEixo || "Nada Consta",
                    },
                    // Tipo Carroceria: response.body.data.tipoCarroceria
                    {
                      label: "Tipo Carroceria",
                      value: reportData.tipoCarroceria || "N/A",
                    },

                    // Capacidade de Passageiros: response.body.data.capacidadePassageiro
                    {
                      label: "Capacidade de Passageiros",
                      value: reportData.capacidadePassageiro || "N/A",
                    },
                  ],
                }}
              />
            </ReportSection>
            {/* Block 6: Informações sobre leilão */}
            {reportData.leilao && (
              <ReportSection title="Informações sobre leilão">
                {reportData.leilao.registros &&
                reportData.leilao.registros.length > 0 ? (
                  <ReportTableSection
                    headers={[
                      "Data Leilão",
                      "Id Leilão",
                      "Lote",
                      "Placa",
                      "Chassi",
                      "Marca",
                      "Modelo",
                      "Condição",
                      "Comitente",
                    ]}
                    rows={reportData.leilao.registros.map((item) => [
                      // Data Leilão: response.body.data.leilao.registros.0.dataLeilao
                      formatDate(item.dataLeilao) || "N/A",
                      // Id Leilão: response.body.data.leilao.registros.0.leiloeiro
                      item.leiloeiro || "-",
                      // Lote: response.body.data.leilao.registros.0.lote
                      item.lote || "-",
                      // Placa: response.body.data.leilao.registros.placa
                      item.placa || "-",
                      // Chassi: response.body.data.leilao.registros.chassi
                      item.chassi || "-",
                      // Marca: response.body.data.leilao.registros.0.marca
                      item.marca || "-",
                      // Modelo: response.body.data.leilao.registros.0.modelo
                      item.modelo || "-",
                      // Condição: response.body.data.leilao.registros.0.condicaoGeral
                      item.condicaoGeral || "-",
                      // Comitente: response.body.data.leilao.registros.0.comitente
                      item.comitente || "-",
                    ])}
                  />
                ) : (
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 bg-white">
                    <p className="text-gray-800">
                      {reportData.leilao.descricao || "N/A"}
                    </p>
                  </div>
                )}
                {renderWarningBox(
                  "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil."
                )}
              </ReportSection>
            )}
            {/* Block 7: Score Leilão Minimizado */}
            {reportData.leilao?.score && leilaoScoreValue && (
              <ReportSection title="Score Leilão Minimizado">
                {/* Score: response.body.data.leilao.score */}
                <ScoreBar score={leilaoScoreValue} label="Score Leilão" />
                {/* Score Pontuação: tab legenda - already handled by ScoreBar component */}
              </ReportSection>
            )}
            {/* Block 8: Indício de Sinistro */}
            {reportData.indicioSinistro && (
              <ReportSection title="Indício de Sinistro">
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-2 bg-white">
                  {/* inside the box: response.body.data.indicioSinistro.descricao */}
                  <p className="text-gray-800 text-sm">
                    {reportData.indicioSinistro.descricao || "N/A"}
                  </p>
                </div>
              </ReportSection>
            )}
            {/* Block 9: Apontamentos em Bancos, Financeiras ou Seguradoras */}
            {(hasBancosFinanceiras === "Sim" ||
              riscoBancosFinanceiras ||
              analiseBancos ||
              leilaoScorePercentualRef) && (
              <ReportSection title="Apontamentos em Bancos, Financeiras ou Seguradoras">
                <div className="flex flex-col md:flex-row gap-6 h-[215px]">
                  {(riscoBancosFinanceiras || leilaoScorePercentualRef) && (
                    <div className="shrink-0 w-[30%] h-full">
                      {renderGauge(
                        "",
                        riscoBancosFinanceiras ||
                          parseInt(leilaoScorePercentualRef) ||
                          90
                      )}
                    </div>
                  )}
                  <div className="w-[70%] h-full flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {/* Placa: response.body.data.leilao.registros[0].placa */}
                      <ReportField
                        label="Placa"
                        value={
                          reportData.leilao?.registros?.[0]?.placa ||
                          plate ||
                          "N/A"
                        }
                      />
                      {/* Chasi: response.body.data.leilao.registros[0].chassi */}
                      <ReportField
                        label="Chassi"
                        value={
                          reportData.leilao?.registros?.[0]?.chassi ||
                          chassis ||
                          "N/A"
                        }
                      />
                      {/* Análise: response.body.data... (default text) */}
                      <div className="mt-4">
                        <p className="text-sm font-semibold text-[#1AABFE] mb-2">
                          Análise:
                        </p>
                        <p className="text-sm text-gray-800">
                          {analiseBancos ||
                            "Veículo possui alerta de risco alto em Bancos, Financeiras ou Seguradoras. Essa restrição pode ocasionar em uma negativa de financiamento/seguro em sua totalidade ou com um percentual menor que 100% na tabela."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ReportSection>
            )}
            <ReportSection title="Remarketing">
              <ReportTableSection
                headers={[
                  "Organizer",
                  "Seller",
                  "Date Event",
                  "Vehicle Conditions",
                  "Situation Chassi",
                  "Conditions Engine",
                  "Exchange Condition",
                  "Mechanical Conditions",
                  "Observations",
                ]}
                rows={[
                  [
                    "More active Intermediation of Assets LTDA 242346",
                    "General Motors of the Brazil LTDA",
                    "12/18/2025",
                    "No Information",
                    "No Information",
                    "No Information",
                    "No Information",
                    "No Information",
                    "",
                  ],
                ]}
              />
            </ReportSection>

            {/* Block 11: Remarketing - Dados do veículo */}
            {reportData.remarketing && (
              <ReportSection title="Remarketing - Dados do veículo">
                <TwoColumnFieldSection
                  fields={{
                    left: [
                      // RENAVAM: response.body.data.remarketing.renavam
                      {
                        label: "RENAVAM",
                        value: reportData.remarketing.renavam || "N/A",
                      },
                      // Situação Chassi: response.body.data.remarketing.situacaoChassi
                      {
                        label: "Situação Chassi",
                        value: reportData.remarketing.situacaoChassi || "N/A",
                      },
                      {
                        label: "Marca / Modelo",
                        value:
                          reportData.remarketing.marcamodelo ||
                          reportData.remarketing.marcaModelo ||
                          "N/A",
                      },
                      // Segmento: response.body.data.remarketing.segmento
                      {
                        label: "Segmento",
                        value: reportData.remarketing.segmento || "N/A",
                      },

                      {
                        label: "Data da Inspeção",
                        value:
                          reportData.remarketing.checklist?.dataInspecao ||
                          "Nada Consta",
                      },
                      // Garantia: response.body.data.remarketing.checklist.garantia
                      {
                        label: "Garantia",
                        value:
                          reportData.remarketing.checklist?.garantia ||
                          "Nada Consta",
                      },
                    ],
                    right: [
                      // Placa: response.body.data.remarketing.placa
                      {
                        label: "Placa",
                        value: reportData.remarketing.placa || "N/A",
                      },
                      // Motor: response.body.data.remarketing.nummotor
                      {
                        label: "Motor",
                        value:
                          reportData.remarketing.nummotor ||
                          reportData.remarketing.motor ||
                          "N/A",
                      },
                      // Chassi: response.body.data.remarketing.chassi
                      {
                        label: "Chassi",
                        value: reportData.remarketing.chassi || "N/A",
                      },

                      // Auto Sub segmento: response.body.data.remarketing.subSegmento
                      {
                        label: "Auto Sub segmento",
                        value: reportData.remarketing.subSegmento || "N/A",
                      },
                      // Data da Inspeção: response.body.data.remarketing.checklist.dataInspecao

                      // Observação: response.body.data.remarketing.observacao
                      {
                        label: "Observação",
                        value:
                          reportData.remarketing.observacao || "Nada Consta",
                      },
                    ],
                  }}
                />
              </ReportSection>
            )}
            {/* Block 12: Fotos */}
            {reportData.remarketing?.checklist?.fotos &&
            reportData.remarketing.checklist.fotos.length > 0 ? (
              <ReportSection title="Fotos">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {reportData.remarketing.checklist.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={typeof foto === "string" ? foto : foto.url || foto}
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
            {/* Block 13: Histórico de KMs */}
            {reportData.historicoKm && reportData.historicoKm.length > 0 && (
              <ReportSection title="Histórico de KMs">
                <ReportTableSection
                  headers={["Data", "Odômetro", "Fonte"]}
                  rows={reportData.historicoKm.map((item) => [
                    // Data: response.body.data.historicoKm.0.dataInclusao
                    formatDate(item.dataInclusao) || "N/A",
                    // Odômetro: response.body.data.historicoKm.0.km
                    item.km ? `${item.km} km` : "N/A",
                    // Fonte: Vistoria (static or from API if available)
                    "Vistoria",
                  ])}
                />
              </ReportSection>
            )}

            {/* Decodificador de Chassi - Dados Básicos */}
            <ReportSection
              title="Decodificador de Chassi - Dados Básicos"
              breakSection={true}
            >
              <TwoColumnFieldSection
                fields={{
                  left: [
                    // Ano Modelo: response.body.data.baseNacional.anoModelo
                    { label: "Placa", value: plate },
                    {
                      label: "Ano Modelo",
                      value:
                        baseNacional.anoModelo || reportData.anoModelo || "N/A",
                    },

                    // Marca: response.body.data.dadosBasicosDoVeiculo.marca
                    {
                      label: "Marca",
                      value:
                        reportData.dadosBasicosDoVeiculo?.marca ||
                        make ||
                        "N/A",
                    },
                    // Modelo: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].modelo
                    {
                      label: "Modelo",
                      value:
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.modelo ||
                        model ||
                        "N/A",
                    },
                    // Versão: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].versao
                    {
                      label: "Versão",
                      value:
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.versao ||
                        decodificador.versao ||
                        "N/A",
                    },
                    // Código FIPE: response.body.data.dadosBasicosDoVeiculo.codigoFipe
                    {
                      label: "Código FIPE",
                      value:
                        reportData.dadosBasicosDoVeiculo?.codigoFipe ||
                        codigoFipe ||
                        "N/A",
                    },
                    // Região Geográfica: response.body.data.decodificadorPrecificador.regiao
                    {
                      label: "Região Geográfica",
                      value:
                        decodificador.regiao ||
                        reportData.decodificadorPrecificador?.regiao ||
                        "N/A",
                    },
                    // País: response.body.data.decodificadorPrecificador.pais
                    {
                      label: "País",
                      value:
                        decodificador.pais ||
                        reportData.decodificadorPrecificador?.pais ||
                        "N/A",
                    },
                    // Tipo Veículo: response.body.data.baseNacional.tipoVeiculo
                    {
                      label: "Tipo Veículo",
                      value:
                        baseNacional.tipoVeiculo ||
                        reportData.tipoVeiculo ||
                        "N/A",
                    },
                    // Peso Bruto Total: response.body.data.decodificadorPrecificador.pesoBruto
                    {
                      label: "Peso Bruto Total",
                      value:
                        decodificador.pesoBruto ||
                        reportData.decodificadorPrecificador?.pesoBruto ||
                        reportData.pbt ||
                        "N/A",
                    },
                    // Capacidade Carga: response.body.data.dadosBasicosDoVeiculo.capacidadeCarga
                    {
                      label: "Capacidade Carga",
                      value:
                        reportData.dadosBasicosDoVeiculo?.capacidadeCarga ||
                        reportData.capacidadeCarga ||
                        "Nada Consta",
                    },
                    // Capacidade Passageiros: response.body.data.dadosBasicosDoVeiculo.capacidadePassageiro
                    {
                      label: "Capacidade Passageiros",
                      value:
                        reportData.dadosBasicosDoVeiculo
                          ?.capacidadePassageiro ||
                        reportData.capacidadePassageiro ||
                        "N/A",
                    },
                    // Número Eixos Traseiro: response.body.data.eixoTraseiroDif
                    {
                      label: "Número Eixos Traseiro",
                      value: reportData.eixoTraseiroDif || "Nada Consta",
                    },
                    // Número Eixos Auxiliar: response.body.data.dadosBasicosDoVeiculo.eixos
                    {
                      label: "Número Eixos Auxiliar",
                      value:
                        reportData.dadosBasicosDoVeiculo?.eixos ||
                        reportData.eixos ||
                        "Nada Consta",
                    },
                  ],
                  right: [
                    // Ano Fabricação: response.body.data.baseNacional.anoFabricacao
                    {
                      label: "Ano Fabricação",
                      value:
                        baseNacional.anoFabricacao ||
                        reportData.anoFabricacao ||
                        "N/A",
                    },

                    // Nacionalidade: response.body.data.nacionalidade
                    {
                      label: "Nacionalidade",
                      value: reportData.nacionalidade || "Nada Consta",
                    },
                    // Combustível: response.body.data.baseEstadual.combustivel
                    {
                      label: "Combustível",
                      value:
                        baseEstadual.combustivel ||
                        reportData.combustivel ||
                        "N/A",
                    },
                    // Cilindradas: response.body.data.dadosBasicosDoVeiculo.cilindradas
                    {
                      label: "Cilindradas",
                      value:
                        reportData.dadosBasicosDoVeiculo?.cilindradas ||
                        reportData.cilindradas ||
                        "N/A",
                    },
                    // Código Versão: (no path provided in mapping, keeping existing)
                    {
                      label: "Código Versão",
                      value: reportData.codigoMarcaModelo || "N/A",
                    },
                    // Valor atual: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].historicoPreco[0].valor
                    {
                      label: "Valor atual",
                      value: reportData.dadosBasicosDoVeiculo
                        ?.informacoesFipe?.[0]?.historicoPreco?.[0]?.valor
                        ? formatCurrency(
                            parseCurrency(
                              reportData.dadosBasicosDoVeiculo
                                .informacoesFipe[0].historicoPreco[0].valor
                            )
                          )
                        : valorAtual || "N/A",
                    },
                    {
                      label: "Tipo de Carroceria",
                      value:
                        decodificador.tipoCarroceria ||
                        reportData.decodificadorPrecificador?.tipoCarroceria ||
                        reportData.tipoCarroceria ||
                        "Nada Consta",
                    },
                    // Número Carroceria: (no path provided in mapping)
                    {
                      label: "Número Carroceria",
                      value: reportData.numCarroceria || "Nada Consta",
                    },
                    // Espécie Veículo: response.body.data.baseNacional.especieVeiculo
                    {
                      label: "Espécie Veículo",
                      value:
                        baseNacional.especieVeiculo ||
                        reportData.especieVeiculo ||
                        "N/A",
                    },
                    {
                      label: "Potência",
                      value:
                        reportData.dadosBasicosDoVeiculo?.potencia ||
                        reportData.potencia ||
                        "N/A",
                    },
                    // Capacidade Máxima Tração: response.body.data.dadosBasicosDoVeiculo.capMaxTracao
                    {
                      label: "Capacidade Máxima Tração",
                      value:
                        reportData.dadosBasicosDoVeiculo?.capMaxTracao ||
                        reportData.capMaxTracao ||
                        "N/A",
                    },
                    // Eixos: response.body.data.dadosBasicosDoVeiculo.eixos
                    {
                      label: "Eixos",
                      value:
                        reportData.dadosBasicosDoVeiculo?.eixos ||
                        reportData.eixos ||
                        "Nada Consta",
                    },
                    // Caixa Câmbio: response.body.data.dadosBasicosDoVeiculo.caixaCambio
                    {
                      label: "Caixa Câmbio",
                      value:
                        reportData.dadosBasicosDoVeiculo?.caixaCambio ||
                        reportData.caixaCambio ||
                        "N/A",
                    },
                  ],
                }}
              />
            </ReportSection>
            {/* Decodificador de Chassi - Precificadores */}
            {precificadorI && (
              <ReportSection title="Decodificador de Chassi - Precificadores">
                {/* Precificadores Info */}
                <ReportTableSection
                  headers={[
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
                  ]}
                  rows={[
                    [
                      "+43,88%",
                      "4,40%",
                      "+16,68%",
                      "-4,92%",
                      "-4,56%",
                      "-3,00%",
                      "+8,63%",
                      "+32,06%",
                      "+10,99%",
                      "-2,54%",
                      "-2,20%",
                      "+10,36%",
                    ],
                  ]}
                />

                <PriceEvolutionChart
                  basePrice={
                    precificadorII?.valor
                      ? parseCurrency(precificadorII.valor)
                      : precificadorI?.valor
                      ? parseCurrency(precificadorI.valor)
                      : 100000
                  }
                />
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
                <p className="text-[#194D9A] text-xs px-4">
                  Acesse a página de validação do CSV no site:{" "}
                  <a
                    href="https://www.inmetro.gov.br/portal/csv-inmetro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1AABFE] hover:underline"
                  >
                    https://www.inmetro.gov.br/portal/csv-inmetro
                  </a>
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
            <div className="space-y-4 page-break-after">
              {renderSectionTitle("Restrições Nacionais")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {renderField(
                      "Comunicação de Venda",
                      reportData?.restricoes?.comunicacaoVenda || "N/A"
                    )}
                    {/* Restrição Financeira: response.body.data.restricoes.restricaoFinanceira */}
                    {renderField(
                      "Restrição Financeira",
                      reportData?.restricoes?.restricaoFinanceira || "N/A"
                    )}
                    {/* Restrição 1: response.body.data.restricoes.restricao1 */}
                    {renderField(
                      "Restrição 1",
                      reportData?.restricoes?.restricao1 || "Nada Consta"
                    )}

                    {/* Restrição 3: response.body.data.restricoes.restricao3 */}
                    {renderField(
                      "Restrição 3",
                      reportData?.restricoes?.restricao3 || "Nada Consta"
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Indicação Restrição Renajud: response.body.data.restricoes.indicacaoRenajud */}
                    {renderField(
                      "Indicação Restrição Renajud",
                      reportData?.restricoes?.indicacaoRenajud || "Não"
                    )}
                    {/* Ocorrência: response.body.data.restricoes.ocorrencia */}
                    {renderField(
                      "Ocorrência",
                      reportData?.restricoes?.ocorrencia || "N/A"
                    )}
                    {/* Restrição 2: response.body.data.restricoes.restricao2 */}
                    {renderField(
                      "Restrição 2",
                      reportData?.restricoes?.restricao2 || "Nada Consta"
                    )}
                    {/* Restrição 4: response.body.data.restricoes.restricao4 */}
                    {renderField(
                      "Restrição 4",
                      reportData?.restricoes?.restricao4 || "Nada Consta"
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Faturamento */}
            <div className="space-y-4">
              {renderSectionTitle("Faturamento")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {/* Documento Faturado: response.body.data.faturamento.documentoFaturado */}
                    {renderField(
                      "Documento Faturado",
                      reportData?.faturamento?.documentoFaturado || "N/A"
                    )}
                    {/* Tipo Documento Faturado: response.body.data.faturamento.tipoDocumentoFaturado */}
                    {renderField(
                      "Tipo Documento Faturado",
                      reportData?.faturamento?.tipoDocumentoFaturado ||
                        "Nada Consta"
                    )}

                    {renderField(
                      "Nome Fantasia",
                      reportData?.baseNacional?.documentoFaturado
                        ?.nomeFantasia || "Nada Consta"
                    )}
                    {/* CEP: response.body.data.faturamento.cep */}
                    {renderField(
                      "CEP",
                      reportData?.faturamento?.cep || "Nada Consta"
                    )}
                  </div>
                  <div className="space-y-3">
                    {/* UF Faturado: response.body.data.faturamento.ufFaturado */}
                    {renderField(
                      "UF Faturado",
                      reportData?.faturamento?.ufFaturado || "Nada Consta"
                    )}
                    {/* Razão Social: response.body.data.faturamento.razaoSocial */}
                    {renderField(
                      "Razão Social",
                      reportData?.faturamento?.razaoSocial || "Nada Consta"
                    )}

                    {/* Cidade: response.body.data.faturamento.cidade */}
                    {renderField(
                      "Cidade",
                      reportData?.faturamento?.cidade || "Nada Consta"
                    )}
                  </div>
                </>
              )}
            </div>
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
                        baseEstadual.restricaoFinanceira
                      )}
                      {renderField("Guincho", baseEstadual.restricaoGuincho)}
                      {renderField(
                        "Restrição 1",
                        baseEstadual.outrasRestricoes1
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
                        baseEstadual.outrasRestricoes3
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

            {/* Detalhamento Intenção de Gravame */}
            <div className="space-y-4">
              {renderSectionTitle("Detalhamento Intenção de Gravame")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {/* Restrições Financeira: response.body.data.gravame[0].restricaoFinanceira */}
                    {renderField(
                      "Restrições Financeira",
                      reportData.gravame?.[0]?.restricaoFinanceira ||
                        "Nada Consta"
                    )}
                    {/* Nome Financeira: response.body.data.gravame[0].financeira */}
                    {renderField(
                      "Nome Financeira",
                      reportData.gravame?.[0]?.financeira || "Nada Consta"
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Data Intenção: response.body.data.gravame[0].intencao */}
                    {renderField(
                      "Data Intenção",
                      reportData.gravame?.[0]?.intencao
                        ? formatDate(reportData.gravame[0].intencao)
                        : "Nada Consta"
                    )}
                    {/* Documento Financeira: response.body.data.gravame[0].documentoFinanceira */}
                    {renderField(
                      "Documento Financeira",
                      reportData.gravame?.[0]?.documentoFinanceira ||
                        "Nada Consta"
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Alerta de Débitos */}
            <div className="space-y-4">
              {renderSectionTitle("Alerta de Débitos")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {/* Débito DPVAT: response.body.data.baseEstadual.existeDebitoDpvat */}
                    {renderField(
                      "Débito DPVAT",
                      baseEstadual.existeDebitoDpvat === "SIM"
                        ? "Existe débito de DPVAT"
                        : "Nada Consta",
                      baseEstadual.existeDebitoDpvat === "SIM"
                    )}
                    {/* Débitos Licenciamento: response.body.data.baseEstadual.existeDebitoLicenciamento */}
                    {renderField(
                      "Débitos Licenciamento",
                      baseEstadual.existeDebitoLicenciamento === "SIM"
                        ? "Existe débito de Licenciamento"
                        : "Nada Consta",
                      baseEstadual.existeDebitoLicenciamento === "SIM"
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Débitos IPVA: response.body.data.baseEstadual.existeDebitoIpva */}
                    {renderField(
                      "Débitos IPVA",
                      baseEstadual.existeDebitoIpva === "SIM"
                        ? "Existe débito de IPVA"
                        : "Nada Consta",
                      baseEstadual.existeDebitoIpva === "SIM"
                    )}
                    {/* Débitos Multa: response.body.data.baseEstadual.existeDebitoMulta */}
                    {renderField(
                      "Débitos Multa",
                      baseEstadual.existeDebitoMulta === "SIM"
                        ? "Existe débito de multa"
                        : "Nada Consta",
                      baseEstadual.existeDebitoMulta === "SIM"
                    )}
                  </div>
                </>
              )}
              {renderWarningBox(
                "Atenção! As informações de débitos e multas em nosso sistema são uma cortesia ao nosso cliente e podem não refletir o status atual do veículo consultado, podendo não trazer todos os débitos ou multas do veículo. Orientamos a todos a consultar o site do DETRAN e SECRETARIA DA FAZENDA da UF do veículo."
              )}
            </div>
            {/* SEFAZ / SEF Link */}
            <SimpleContentSection
              title="SEFAZ (Secretária de Estado da Fazenda) - Link de Direcionamento"
              content={
                <p className="text-[#194D9A] text-xs px-4">
                  Orientamos a todos a consultar o site da SECRETÁRIA DA FAZENDA
                  da UF do veículo -{" "}
                  {reportData?.sedaz?.link ? (
                    <a
                      href={reportData?.sedaz?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1AABFE] hover:underline"
                    >
                      {reportData?.sedaz?.link}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              }
            />
            {/* Detalhamento Débito e Multas */}
            <div className="space-y-4 page-break-after">
              {renderSectionTitle("Detalhamento Débito e Multas")}
              {renderTwoColumnSection(
                <>
                  <div className="space-y-3">
                    {/* CETESB: response.body.data.baseEstadual.debitoCetesb */}
                    {renderField(
                      "CETESB",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoCetesb || "0,00")
                      )
                    )}
                    {/* DER: response.body.data.baseEstadual.debitoDer */}
                    {renderField(
                      "DER",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDer || "0,00")
                      )
                    )}
                    {/* DERSA: response.body.data.baseEstadual.debitoDersa */}
                    {renderField(
                      "DERSA",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDersa || "0,00")
                      )
                    )}
                    {/* DPVAT: response.body.data.baseEstadual.debitoDpvat */}
                    {renderField(
                      "DPVAT",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoDpvat || "0,00")
                      )
                    )}
                    {/* IPVA: response.body.data.baseEstadual.debitoIpva */}
                    {renderField(
                      "IPVA",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoIpva || "0,00")
                      )
                    )}
                    {/* Licenciamento: response.body.data.baseEstadual.debitoLicenciamento */}
                    {renderField(
                      "Licenciamento",
                      formatCurrency(
                        parseCurrency(
                          baseEstadual.debitoLicenciamento || "0,00"
                        )
                      )
                    )}
                  </div>
                  <div className="space-y-3">
                    {/* Municipais: response.body.data.baseEstadual.debitoMunicipais */}
                    {renderField(
                      "Municipais",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoMunicipais || "0,00")
                      )
                    )}
                    {/* PRF: response.body.data.baseEstadual.debitoPrf */}
                    {renderField(
                      "PRF",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoPrf || "0,00")
                      )
                    )}
                    {/* Multas: response.body.data.baseEstadual.debitoMulta */}
                    {renderField(
                      "Multas",
                      formatCurrency(
                        parseCurrency(baseEstadual.debitoMulta || "0,00")
                      ),
                      parseCurrency(baseEstadual.debitoMulta || "0,00") > 0
                    )}
                    {/* RENAINF: response.body.data.baseEstadual.debitoRenainf */}
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
            <ReportTableSection
              title="Histórico de Proprietários"
              headers={[
                "Município",
                "UF",
                "Exercício",
                "Proprietário",
                "Data",
                "Motivo",
              ]}
              rows={reportData?.historicoProprietarios?.map((item) => [
                // Hist. Proprietários - Município: response.body.data.historicoProprietarios[0].municipio
                item?.municipio || "-",
                // Hist. Proprietários - UF: response.body.data.historicoProprietarios[0].uf
                item?.uf || "-",
                // Hist. Proprietários - Exercício: response.body.data.historicoProprietarios[0].anoExercicio
                item?.anoExercicio || "-",
                // Hist. Proprietários - Proprietário: response.body.data.historicoProprietarios[0].proprietario
                item?.proprietario || "-",
                // Hist. Proprietários - Data: response.body.data.historicoProprietarios[0].data
                item?.data ? formatDate(item?.data) : "-",
                // Hist. Proprietários - Motivo: response.body.data.historicoProprietarios[0].motivo
                item?.motivo || "-",
              ])}
            />
            {/* Informações de Parceiros */}

            <ReportTableSection
              title="Informações de Parceiros"
              headers={["Data", "KM", "Valor do Anúncio"]}
              rows={[
                [
                  formatDate(reportData?.anuncio?.data) || "-",
                  `${reportData?.anuncio?.km} KM` || "-",
                  formatCurrency(reportData?.anuncio?.valor) || "-",
                ],
              ]}
            />
            {/* Observação do Vendedor */}
            <ReportSection title="Observação do Vendedor">
              <div className="border-2 border-[#1AABFE]/80 rounded-lg p-4 py-2 bg-white">
                {/* Observação do Vendedor: response.body.data.anuncio.observacao */}
                <p className="text-[#194D9A] leading-relaxed">
                  {reportData?.anuncio?.observacao || "N/A"}
                </p>
              </div>
            </ReportSection>

            <ReportSection title="Opcionais:">
              {reportData?.anuncio?.opcionais &&
              reportData?.anuncio?.opcionais.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 border-2 border-[#1AABFE]/80 rounded-lg p-4 py-2 bg-white">
                  <div className="space-y-2">
                    {reportData?.anuncio?.opcionais
                      .slice(
                        0,
                        Math.ceil(reportData?.anuncio?.opcionais.length / 2)
                      )
                      .map((opcional, index) => {
                        const actualIndex = index * 2;
                        return (
                          <div
                            key={actualIndex}
                            className="text-sm text-[#194D9A]"
                          >
                            {/* Opcional {actualIndex + 1}: response.body.data.anuncio.opcionais[{actualIndex}] */}
                            {typeof opcional === "string"
                              ? opcional
                              : opcional.descricao || opcional || "N/A"}
                          </div>
                        );
                      })}
                  </div>
                  <div className="space-y-2">
                    {reportData.anuncio.opcionais
                      .slice(
                        Math.ceil(reportData?.anuncio?.opcionais.length / 2)
                      )
                      .map((opcional, index) => {
                        const actualIndex = index * 2 + 1;
                        return (
                          <div
                            key={actualIndex}
                            className="text-sm text-[#194D9A]"
                          >
                            {/* Opcional {actualIndex + 1}: response.body.data.anuncio.opcionais[{actualIndex}] */}
                            {typeof opcional === "string"
                              ? opcional
                              : opcional.descricao || opcional || "N/A"}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 border-2 border-[#1AABFE]/80 text-[#194D9A] rounded-lg p-4 py-2 bg-white">
                  N/A
                </div>
              )}
            </ReportSection>

            {/* Precificador - Valor de Mercado */}
            <ReportSection title="Precificador - Valor de Mercado">
              <ReportTableSection
                headers={["Modelo", "Marca", "Versão", "Valor"]}
                rows={[
                  [
                    // Precificador - Valor de Mercado - Modelo: response.body.data.decodificadorPrecificador.modelo
                    reportData?.decodificadorPrecificador?.modelo || "N/A",
                    // Precificador - Valor de Mercado - Marca: response.body.data.decodificadorPrecificador.marca
                    reportData?.decodificadorPrecificador?.marca || "N/A",
                    // Precificador - Valor de Mercado - Versão: response.body.data.decodificadorPrecificador.versao
                    reportData?.decodificadorPrecificador?.versao || "N/A",
                    // Precificador - Valor de Mercado - Valor: response.body.data.decodificadorPrecificador.valorMercado
                    reportData?.decodificadorPrecificador?.valorMercado
                      ? formatCurrency(
                          parseCurrency(
                            reportData.decodificadorPrecificador.valorMercado
                          )
                        )
                      : "N/A",
                  ],
                ]}
              />
            </ReportSection>

            {/* Precificador - FIPE */}
            <ReportSection title="Precificador - FIPE">
              <ReportTableSection
                headers={[
                  "Código FIPE",
                  "Combustível",
                  "Modelo",
                  "Marca",
                  "Valor",
                  "Valor 0 KM",
                ]}
                rows={[
                  [
                    // FIPE - Código FIPE: response.body.data.dadosBasicosDoVeiculo.codigoFipe
                    reportData?.dadosBasicosDoVeiculo?.codigoFipe || "N/A",
                    // FIPE - Combustível: response.body.data.dadosBasicosDoVeiculo.combustivel
                    reportData?.dadosBasicosDoVeiculo?.combustivel || "N/A",
                    // FIPE - Modelo: response.body.data.dadosBasicosDoVeiculo.modelo
                    reportData?.dadosBasicosDoVeiculo?.modelo || "N/A",
                    // FIPE - Marca: response.body.data.dadosBasicosDoVeiculo.marca
                    reportData?.dadosBasicosDoVeiculo?.marca || "N/A",
                    // FIPE - Valor: response.body.data.cestaBasica.veiculosFipe[0].registros[0].valor
                    reportData?.cestaBasica?.veiculosFipe?.[0]?.registros?.[0]
                      ?.valor
                      ? formatCurrency(
                          parseCurrency(
                            reportData.cestaBasica.veiculosFipe[0].registros[0]
                              .valor
                          )
                        )
                      : "N/A",
                    // FIPE - Valor 0 KM: response.body.data.cestaBasica.veiculosFipe[0].registros[0].valorZeroKm
                    reportData?.cestaBasica?.veiculosFipe?.[0]?.registros?.[0]
                      ?.valorZeroKm
                      ? formatCurrency(
                          parseCurrency(
                            reportData.cestaBasica.veiculosFipe[0].registros[0]
                              .valorZeroKm
                          )
                        )
                      : "-",
                  ],
                ]}
              />
            </ReportSection>

            {/* Porcentagem sobre Tabela FIPE */}
            <ReportSection title="Porcentagem sobre Tabela FIPE">
              <div className="flex flex-col md:flex-row gap-6 ">
                <div className="shrink-0 w-[30%]">
                  {renderGauge("", percentualSobreRef)}
                </div>
                <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                  <div className="space-y-3">
                    <div className="mt-4">
                      <p className="text-sm  text-[#1AABFE] mb-2">
                        Esse veículo poderá receber uma oferta máxima de{" "}
                        {percentualSobreRef}% do preço do seu valor de tabela.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ReportSection>

            {/* Exigência de Vistoria Especial */}
            <ReportSection title="Exigência de Vistoria Especial">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="shrink-0 w-[30%]">
                  {/* {renderGauge("", exigenciaVistoriaEspecial)} */}
                  <BarGauge
                    value={exigenciaVistoriaEspecial}
                    min={0}
                    max={100}
                    label="Exigência de Vistoria Especial"
                  />
                </div>
                <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                  <div className="space-y-3">
                    {/* Exigência de Vistoria Especial - Chance: response.body.data.leilao.score.exigenciaVistoriaEspecial */}
                    <p className="text-sm text-[#1AABFE] mb-2">
                      Este veículo possui uma chance de exigência de vistoria
                      especial, para a realização do seguro.
                    </p>
                  </div>
                </div>
              </div>
            </ReportSection>

            {/* Recall */}

            <ReportSection title="Recall">
              <ReportTableSection
                headers={["Data", "Defeito", "Risco"]}
                rows={
                  reportData?.recall?.detalhes &&
                  reportData?.recall?.detalhes?.length > 0
                    ? reportData?.recall?.detalhes?.map((item) => [
                        item?.data ? formatDate(item?.data) : "-",
                        item?.defeito || "-",
                        item?.risco || "-",
                      ])
                    : [["N/A", "N/A", "N/A"]]
                }
              />
            </ReportSection>

            {/* Descrição Completa */}
            <ReportSection title="Descrição Completa">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <div className="space-y-3">
                  {reportData?.recall?.detalhes &&
                  reportData?.recall?.detalhes?.length > 0 ? (
                    reportData?.recall?.detalhes?.map((item, index) => {
                      const descricao =
                        typeof item === "string"
                          ? item
                          : item?.descricaoCompleta ||
                            item?.descricao ||
                            item?.texto ||
                            item?.textoCompleto ||
                            item?.veiculo ||
                            (item?.veiculo && item?.anoModelo && item?.chassis
                              ? `veículo: ${item.veiculo} — ano/modelo: ${item.anoModelo} — chassis (não sequenciais): ${item.chassis};`
                              : null) ||
                            JSON.stringify(item) ||
                            "N/A";

                      return (
                        <p
                          key={index}
                          className="text-sm text-gray-800 leading-relaxed"
                        >
                          {descricao}
                        </p>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-800 leading-relaxed">N/A</p>
                  )}
                </div>
              </div>
            </ReportSection>

            {/* Recall Pendentes */}
            <ReportSection title="Recall Pendentes">
              <ReportTableSection
                headers={["Descrição", "Identificador", "Situação"]}
                rows={
                  reportData?.recall?.recallsPendente &&
                  reportData.recall.recallsPendente.length > 0
                    ? reportData.recall.recallsPendente.map((item) => [
                        // Recall Pendentes - Descrição: response.body.data.recall.recallsPendente[0].descricao
                        item?.descricao || "N/A",
                        // Recall Pendentes - Identificador: response.body.data.recall.recallsPendente[0].identificador
                        item?.identificador || "N/A",
                        // Recall Pendentes - Situação: response.body.data.recall.recallsPendente[0].situacao
                        item?.situacao || "N/A",
                      ])
                    : [["N/A", "N/A", "N/A"]]
                }
              />
            </ReportSection>

            {/* Histórico Roubo e Furto */}
            <ReportSection title="Histórico Roubo e Furto">
              <ReportTableSection
                headers={[
                  "Data",
                  "Ocorrência",
                  "Município / Estado",
                  "Número do B.O.",
                  "Informante",
                ]}
                rows={
                  reportData?.rouboFurto?.historico &&
                  reportData.rouboFurto.historico.length > 0
                    ? reportData.rouboFurto.historico.map((item) => [
                        // Histórico Roubo e Furto - Data: response.body.data.rouboFurto.historico[0].data
                        item?.data ? formatDate(item.data) : "N/A",
                        // Histórico Roubo e Furto - Ocorrência: response.body.data.rouboFurto.historico[0].ocorrencia
                        item?.ocorrencia || "N/A",
                        // Histórico Roubo e Furto - Município/Estado: response.body.data.rouboFurto.historico[0].municipioUf
                        item?.municipioUf || "N/A",
                        // Histórico Roubo e Furto - Nº B.O.: response.body.data.rouboFurto.historico[0].numeroBo
                        item?.numeroBo || "N/A",
                        // Histórico Roubo e Furto - Informante: response.body.data.rouboFurto.historico[0].informante
                        item?.informante || "N/A",
                      ])
                    : [["N/A", "N/A", "N/A", "N/A", "N/A"]]
                }
              />
            </ReportSection>

            {/* Informações gerais do veículo */}
            {/* <ReportSection title="Informações gerais do veículo">
              <TwoColumnFieldSection
                fields={{
                  left: [
                    { label: "Marca / Modelo", value: `${make} / ${model}` },
                    { label: "Cor", value: reportData?.corVeiculo || "N/A" },
                    {
                      label: "RENAVAM",
                      value:
                        baseEstadual.renavam || reportData?.renavam || "N/A",
                    },
                    {
                      label: "Tipo do Veículo",
                      value: baseEstadual.tipo || "Automovel" || "N/A",
                    },
                    {
                      label: "Nacionalidade",
                      value: reportData?.nacionalidade || "Nacional" || "N/A",
                    },
                    {
                      label: "UF",
                      value: baseEstadual.uf || reportData?.uf || "N/A",
                    },
                    {
                      label: "Registro DI",
                      value: baseNacional.di || "Nada Consta" || "N/A",
                    },
                  ],
                  right: [
                    {
                      label: "Ano / Modelo",
                      value:
                        `${reportData?.anoFabricacao || year}/${year}` || "N/A",
                    },
                    { label: "Placa", value: plate },
                    { label: "Combustível", value: fuel },
                    {
                      label: "Número do motor",
                      value:
                        baseEstadual.motor || reportData?.numMotor || "N/A",
                    },
                    { label: "Chassi", value: chassis },
                    {
                      label: "Município",
                      value:
                        baseEstadual.municipio ||
                        reportData?.municipio ||
                        "N/A",
                    },
                  ],
                }}
              />
            </ReportSection> */}
            {/* Dados Básicos */}
            {/* {(reportData.caixaCambio ||
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
            )} */}
            {/* Informações do Anúncio */}
            {/* {reportData.anuncio &&
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
              )} */}
            {/* Opcionais */}
            {/* {reportData.acessoriosCategorizados?.acessorios &&
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
              )} */}
            {/* Ficha Técnica */}
            {/* {reportData.fichaTecnica?.registros &&
              reportData.fichaTecnica.registros.length > 0 && (
                <ReportSection title="Ficha Técnica">
                  <div className="space-y-4">
                    {reportData.fichaTecnica.registros.map((grupo, index) => {
                      let grupoTitle = null;

                      if (grupo.descricao) grupoTitle = grupo.descricao;
                      else if (grupo.nome) grupoTitle = grupo.nome;
                      else if (grupo.titulo) grupoTitle = grupo.titulo;
                      else if (grupo.title) grupoTitle = grupo.title;
                      else if (grupo.category) grupoTitle = grupo.category;
                      else if (grupo.categoria) grupoTitle = grupo.categoria;
                      else if (grupo.name) grupoTitle = grupo.name;
                      else if (grupo.label) grupoTitle = grupo.label;

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

                      if (!grupoTitle || grupoTitle.trim() === "") {
                        grupoTitle = `Seção ${index + 1}`;
                      }

                      return (
                        <div
                          key={index}
                          className="border-2 border-[#1AABFE]/80 rounded-xl overflow-hidden bg-white"
                        >
                          <div className="bg-[#1AABFE] text-white px-4 py-3">
                            <h4 className="text-lg font-semibold">
                              {grupoTitle}
                            </h4>
                          </div>
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
              )} */}

            {/* Custo Médio */}
            {/* {reportData.custoMedio && (
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
            )} */}
            {/* Gravame */}
            <ReportSection title="Gravame">
              {reportData?.gravame && reportData?.gravame?.length > 0 ? (
                reportData?.gravame?.map((gravame, index) => (
                  <div key={index} className="mb-4">
                    <div className="bg-[#1AABFE] text-white px-4 py-2 rounded-full w-fit mb-2">
                      <h4 className="font-semibold px-8">
                        Registro {index + 1}
                      </h4>
                    </div>
                    <div className=" rounded-lg  bg-white">
                      <TwoColumnFieldSection
                        fields={{
                          left: [
                            {
                              label: "Documento Agente",
                              // Gravame - Documento Agente: response.body.data.gravame[0].documentoAgente
                              value: gravame?.documentoAgente || "N/A",
                            },
                            {
                              label: "Agente",
                              // Gravame - Agente: response.body.data.gravame[0].agente
                              value: gravame?.agente || "N/A",
                            },
                            {
                              label: "Responsável",
                              // Gravame - Responsável: response.body.data.gravame[0].responsavel
                              value: gravame?.responsavel || "N/A",
                            },
                            {
                              label: "Placa",
                              // Gravame - Placa: response.body.data.gravame[0].placa
                              value: gravame?.placa || "N/A",
                            },
                            {
                              label: "Renavam",
                              // Gravame - Renavam: response.body.data.gravame[0].renavam
                              value: gravame?.renavam || "N/A",
                            },
                            {
                              label: "Chassi",
                              // Gravame - Chassi: response.body.data.gravame[0].chassi
                              value: gravame?.chassi || "N/A",
                            },
                            {
                              label: "Contrato",
                              // Gravame - Contrato: response.body.data.gravame[0].contrato
                              value: gravame?.contrato || "N/A",
                            },
                          ],
                          right: [
                            {
                              label: "Número da Restrição",
                              // Gravame - Número da Restrição: response.body.data.gravame[0].numeroRestricao
                              value: gravame?.numeroRestricao || "N/A",
                            },
                            {
                              label: "Documento Financiado",
                              // Gravame - Documento Financiado: response.body.data.gravame[0].documentoFinanciado
                              value: gravame?.documentoFinanciado || "N/A",
                            },
                            {
                              label: "Data Situação",
                              // Gravame - Data Situação: response.body.data.gravame[0].dataSituacao
                              value: gravame?.dataSituacao
                                ? formatDate(gravame.dataSituacao)
                                : "N/A",
                            },
                            {
                              label: "Data Inclusão",
                              // Gravame - Data Inclusão: response.body.data.gravame[0].dataInclusao
                              value: gravame?.dataInclusao
                                ? formatDate(gravame.dataInclusao)
                                : "N/A",
                            },
                            {
                              label: "Vigência Contrato",
                              // Gravame - Vigência Contrato: response.body.data.gravame[0].vigenciaContrato
                              value: gravame?.vigenciaContrato
                                ? formatDate(gravame.vigenciaContrato)
                                : "N/A",
                            },
                            {
                              label: "Observações",
                              // Gravame - Observações: response.body.data.gravame[0].observacoes
                              value: gravame?.observacoes || "N/A",
                            },
                            {
                              label: "Situação",
                              // Gravame - Situação: response.body.data.gravame[0].situacao
                              value: gravame?.situacao || "N/A",
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-lg p-4 bg-white">
                  <p className="text-sm text-gray-800 leading-relaxed ">N/A</p>
                </div>
              )}
            </ReportSection>
            {/* Registro em Locadora */}
            <ReportSection title="Registro em Locadora">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {/* Registro em Locadora: response.body.data.registroEmLocadora */}
                  {reportData?.registroEmLocadora
                    ? reportData.registroEmLocadora.registroEmLocadora?.toString()
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* CSV */}
            <ReportSection title="CSV">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {/* CSV: response.body.data.csv */}
                  {reportData?.csv?.pdf
                    ? reportData.csv.descricao
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* Histórico de Multas RENAINF */}
            <ReportSection title="Histórico de Multas RENAINF">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {/* Histórico de Multas RENAINF: response.body.data.multasRenainf */}
                  {reportData?.multasRenainf &&
                  (Array.isArray(reportData.multasRenainf)
                    ? reportData.multasRenainf.length > 0
                    : Object.keys(reportData.multasRenainf).length > 0)
                    ? Array.isArray(reportData.multasRenainf)
                      ? reportData.multasRenainf
                          .map((item) =>
                            typeof item === "string"
                              ? item
                              : item?.descricao || JSON.stringify(item)
                          )
                          .join(", ")
                      : reportData.multasRenainf.descricao ||
                        JSON.stringify(reportData.multasRenainf)
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* Radar Secuntário */}
            <ReportSection title="Radar Secuntário">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {/* Radar Secuntário: response.body.data.radarSecuritario */}
                  {reportData?.radarSecuritario &&
                  (Array.isArray(reportData.radarSecuritario)
                    ? reportData.radarSecuritario.length > 0
                    : Object.keys(reportData.radarSecuritario).length > 0)
                    ? Array.isArray(reportData.radarSecuritario)
                      ? reportData.radarSecuritario
                          .map((item) =>
                            typeof item === "string"
                              ? item
                              : item?.descricao || JSON.stringify(item)
                          )
                          .join(", ")
                      : reportData.radarSecuritario.descricao ||
                        JSON.stringify(reportData.radarSecuritario)
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* Falhas do Veículo */}
            <ReportSection title="Falhas do Veículo">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {/* Falhas do Veículo: response.body.data.diagnosticoDoVeiculo */}
                  {reportData?.diagnosticoDoVeiculo &&
                  (Array.isArray(reportData.diagnosticoDoVeiculo)
                    ? reportData.diagnosticoDoVeiculo.length > 0
                    : Object.keys(reportData.diagnosticoDoVeiculo).length > 0)
                    ? Array.isArray(reportData.diagnosticoDoVeiculo)
                      ? reportData.diagnosticoDoVeiculo
                          .map((item) =>
                            typeof item === "string"
                              ? item
                              : item?.descricao || JSON.stringify(item)
                          )
                          .join(", ")
                      : reportData.diagnosticoDoVeiculo.descricao ||
                        JSON.stringify(reportData.diagnosticoDoVeiculo)
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* Histórico Laudo */}
            <ReportSection title="Histórico Laudo">
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <p className="text-gray-800">
                  {/* Histórico Laudo: response.body.data.historicoLaudo */}
                  {reportData?.historicoLaudo &&
                  (Array.isArray(reportData.historicoLaudo)
                    ? reportData.historicoLaudo.length > 0
                    : Object.keys(reportData.historicoLaudo).length > 0)
                    ? Array.isArray(reportData.historicoLaudo)
                      ? reportData.historicoLaudo
                          .map((item) =>
                            typeof item === "string"
                              ? item
                              : item?.descricao || JSON.stringify(item)
                          )
                          .join(", ")
                      : reportData.historicoLaudo.descricao ||
                        JSON.stringify(reportData.historicoLaudo)
                    : "Informação não encontrada nas bases consultadas."}
                </p>
              </div>
            </ReportSection>

            {/* Histórico de Consulta */}
            <ReportSection title="Histórico de Consulta">
              <ReportTableSection
                headers={[
                  "Primeira Consulta",
                  "Última Consulta",
                  "Total de Consultas",
                ]}
                rows={[
                  [
                    // Histórico de Consulta - Primeira Consulta: response.body.data.historicoConsultas[0].primeiraConsulta
                    reportData?.historicoConsultas?.[0]?.primeiraConsulta ||
                      "N/A",
                    // Histórico de Consulta - Última Consulta: response.body.data.historicoConsultas[0].ultimaConsulta
                    reportData?.historicoConsultas?.[0]?.ultimaConsulta ||
                      "N/A",
                    // Histórico de Consulta - Total de Consultas: response.body.data.historicoConsultas[0].total
                    reportData?.historicoConsultas?.[0]?.total?.toString() ||
                      "N/A",
                  ],
                ]}
              />
            </ReportSection>

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
