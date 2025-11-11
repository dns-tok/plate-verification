import React, { useRef, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbInfoCircle } from "react-icons/tb";
import { FaTools } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
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
import { formatCurrency, parseCurrency } from "../../../utils/currencyUtils";

const Report = ({ data, onClose, loading }) => {
  const reportRef = useRef(null);

  const [downloading, setDownloading] = useState(false);

  // Extract plan name from data
  const planName = data?.planName || "light";
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

  // Currency formatting functions are now imported from utils/currencyUtils

  // Helper function to render field in two-column layout
  // NOTE: This is kept for backward compatibility with sections not yet converted to use ReportField component
  const renderField = (label, value, hasWarning = false, textColor = null) => {
    return (
      <div className="flex  gap-1">
        <div className="flex items-start gap-1 text-[#194D9A]">
          {hasWarning && (
            <span className="text-yellow-500 text-lg leading-none">▲</span>
          )}
          <span className="text-[0.875rem] font-semibold">{label}:</span>
        </div>
        <span
          className={`text-[0.8rem] ${
            hasWarning ? "text-red-600" : "text-[#194D9A]"
          }`}
        >
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
            className="size-9 object-contain absolute -left-[1.2rem]"
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
  const renderGauge = ({
    label,
    value,
    type = "percentage",
    invertColors = false,
  }) => {
    let percentage = 0;
    if (type === "percentage") {
      percentage = typeof value === "string" ? parseInt(value) : value || 0;
    } else if (type === "text") {
      percentage = parseInt(value);
    }
    return (
      <Gauge
        value={percentage}
        label={label}
        isPercentage={type === "percentage"}
        invertColors={invertColors}
      />
    );
  };

  const renderAiSummary = () => {
    // Resumo IA: em desenvolvimento
    return (
      <div className="space-y-2 ">
        <h2 className="text-xl font-semibold text-[#194D9A]">Resumo IA</h2>
        <div className="flex  ">
          <img src="/plaquinha.png" alt="" className="w-[25%] h-full" />
          <div className="border-2 border-[#1AABFE]/80 rounded-lg p-4 bg-white max-h-[350px] relative  w-full pb-10 before:content-[''] before:absolute before:left-[-1px] before:top-[20%] before:-translate-x-full before:w-0 before:h-0 before:border-t-[30px] before:border-t-transparent before:border-b-[30px] before:border-b-transparent before:border-r-[30px] before:border-r-[#1AABFE]/80 after:content-[''] after:absolute after:left-0 after:top-[20.2%] after:-translate-x-full after:w-0 after:h-0 after:border-t-[29px] after:border-t-transparent after:border-b-[29px] after:border-b-transparent after:border-r-[29px] after:border-r-white">
            <p className="text-gray-500 overflow-auto h-full ">
              {reportData.ia || "em desenvolvimento"}
            </p>
            <img
              src="/aiLogo.png"
              alt=""
              className="size-9 object-contain aspect-square absolute bottom-2 right-2  ms-auto my-auto z-10 bg-white"
            />
          </div>
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
  // let status = "N/A";

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

  // Calculate valuations from historicoPreco
  const calculateValuations = () => {
    const historicoPreco =
      reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]?.historicoPreco ||
      [];
    const valorAtualNum = parseCurrency(
      reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]?.valorAtual || "0"
    );

    if (!historicoPreco.length && !valorAtualNum) {
      return {
        sixMonths: "N/A",
        twelveMonths: "N/A",
        years: {},
      };
    }

    // Get current date to determine previous month
    const now = new Date();
    const calcCurrentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-12
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 1 ? calcCurrentYear - 1 : calcCurrentYear;

    // Create a map of prices by year and month
    const priceMap = {};
    historicoPreco.forEach((item) => {
      const year = parseInt(item.ano);
      const month = parseInt(item.mes);
      // Use parseCurrency to handle values consistently (handles dots, commas, etc.)
      const value = parseCurrency(item.valor) || 0;
      if (!priceMap[year]) priceMap[year] = {};
      priceMap[year][month] = value;
    });

    // Add previous month (Oct/25) from valorAtual
    if (valorAtualNum > 0) {
      if (!priceMap[previousMonthYear]) priceMap[previousMonthYear] = {};
      priceMap[previousMonthYear][previousMonth] = valorAtualNum;
    }

    // Calculate 6 months: (last month / 6 months ago) - 1
    // For Oct 2025, compare against Apr 2025 (6 months ago)
    let sixMonthsVal = "N/A";
    if (valorAtualNum > 0) {
      // Calculate 6 months ago from previous month
      let sixMonthsAgoMonth = previousMonth - 6;
      let sixMonthsAgoYear = previousMonthYear;
      if (sixMonthsAgoMonth <= 0) {
        sixMonthsAgoMonth += 12;
        sixMonthsAgoYear -= 1;
      }
      const sixMonthsAgoValue = priceMap[sixMonthsAgoYear]?.[sixMonthsAgoMonth];
      if (sixMonthsAgoValue && sixMonthsAgoValue > 0) {
        const variation = (valorAtualNum / sixMonthsAgoValue - 1) * 100;
        sixMonthsVal = `${variation >= 0 ? "+" : ""}${variation.toFixed(2)}%`;
      }
    }

    // Calculate 12 months: (oct 2025 / nov 2024) - 1
    // If previous month is Oct, compare with Nov of previous year
    // Formula: (previousMonth / (previousMonth + 1) of previous year) - 1
    let twelveMonthsVal = "N/A";
    if (valorAtualNum > 0) {
      let twelveMonthsAgoMonth = previousMonth + 1;
      let twelveMonthsAgoYear = previousMonthYear - 1;
      if (twelveMonthsAgoMonth > 12) {
        twelveMonthsAgoMonth = 1;
        // If we go to January, it's still the previous year
      }
      const twelveMonthsAgoValue =
        priceMap[twelveMonthsAgoYear]?.[twelveMonthsAgoMonth];
      if (twelveMonthsAgoValue && twelveMonthsAgoValue > 0) {
        const variation = (valorAtualNum / twelveMonthsAgoValue - 1) * 100;
        twelveMonthsVal = `${variation >= 0 ? "+" : ""}${variation.toFixed(
          2
        )}%`;
      }
    }

    // Calculate year valuations: (dez year / dez prev year) - 1
    // Disconsider the first year (2017 won't be calculated because we don't have 2016)
    const years = {};
    const yearKeys = Object.keys(priceMap)
      .map(Number)
      .sort((a, b) => a - b);

    // Include all years from data, but mark first year as "N/A" since it can't be calculated
    if (yearKeys.length > 0) {
      const firstYear = yearKeys[0];
      years[firstYear] = "N/A"; // First year can't be calculated (no previous year data)
    }

    // Calculate variations for years that have previous year data
    for (let i = 1; i < yearKeys.length; i++) {
      const year = yearKeys[i];
      const prevYear = yearKeys[i - 1];

      // Skip current year - it will be calculated separately using valorAtual
      if (year === calcCurrentYear) {
        continue;
      }

      const dezValue = priceMap[year]?.[12]; // December value
      const dezPrevValue = priceMap[prevYear]?.[12]; // Previous year December value

      if (dezValue && dezPrevValue && dezPrevValue > 0) {
        const variation = (dezValue / dezPrevValue - 1) * 100;
        years[year] = `${variation >= 0 ? "+" : ""}${variation.toFixed(2)}%`;
      } else {
        years[year] = "N/A";
      }
    }

    // For current year: use last value (the one inserted in JSON) x dez last year
    // Always calculate current year separately using valorAtual vs December of previous complete year
    if (valorAtualNum > 0) {
      // Find the last complete year (not current year) that has December data
      const completeYears = yearKeys.filter((year) => year !== calcCurrentYear);
      if (completeYears.length > 0) {
        const lastCompleteYear = completeYears[completeYears.length - 1];
        const lastYearDez = priceMap[lastCompleteYear]?.[12];
        if (lastYearDez && lastYearDez > 0) {
          const variation = (valorAtualNum / lastYearDez - 1) * 100;
          years[calcCurrentYear] = `${
            variation >= 0 ? "+" : ""
          }${variation.toFixed(2)}%`;
        } else {
          years[calcCurrentYear] = "N/A";
        }
      } else {
        years[calcCurrentYear] = "N/A";
      }
    } else if (yearKeys.includes(calcCurrentYear)) {
      // If current year is in data but we don't have valorAtual, show N/A
      years[calcCurrentYear] = "N/A";
    }

    return {
      sixMonths: sixMonthsVal,
      twelveMonths: twelveMonthsVal,
      years,
    };
  };

  const valuations = calculateValuations();

  // Idade do Veiculo: response.body.data.anoFabricacao
  const currentYear = new Date().getFullYear();
  const vehicleAge = reportData.anoFabricacao
    ? currentYear - parseInt(reportData.anoFabricacao)
    : "N/A";

  // Helper function to check if value should be "Sim" or "Não"
  // Returns "Não" if value is: "não" (case-insensitive), null, [], "n/a", empty string, or false
  // Otherwise returns "Sim"
  const checkSimNao = (value) => {
    // Check for null or undefined
    if (value === null || value === undefined) {
      return "Não";
    }
    // Check for false
    if (value === false) {
      return "Não";
    }
    // Check for empty array
    if (Array.isArray(value)) {
      return value.length > 0 ? "Sim" : "Não";
    }
    // Check for empty string
    if (typeof value === "string") {
      const trimmed = value.trim().toLowerCase();
      if (
        trimmed === "" ||
        trimmed === "n/a" ||
        trimmed === "nao" ||
        trimmed === "não" ||
        trimmed === "null" ||
        trimmed === "nada consta" ||
        trimmed.includes("nao existe") ||
        trimmed === "empty"
      ) {
        return "Não";
      }
    }
    // Check for object (but not arrays)
    if (typeof value === "object" && !Array.isArray(value)) {
      // If object has no keys, it's effectively empty
      if (Object.keys(value).length === 0) {
        return "Não";
      }
    }
    // Otherwise, it's "Sim"
    return "Sim";
  };

  // Block 2 mapping - Check for issues in summary
  // Leilão: response.body.data.leilao.registros (empty or not empty)
  const hasLeilao = checkSimNao(reportData.leilao?.registros);
  // Sinistro: response.body.data.indicioSinistro
  const hasSinistro = checkSimNao(reportData.indicioSinistro);
  // Bancos, Financeiras ou seguradoras: response.body.data.baseEstadual.restricaoFinanceira
  const hasBancosFinanceiras = checkSimNao(baseEstadual.restricaoFinanceira);
  // Restrições nacionais: response.body.data.restricoes
  const hasRestricoesNacionais = checkSimNao(reportData.restricoes);
  // Restrições estaduais: response.body.data.baseEstadual.existeDebitoMulta
  const hasRestricoesEstaduais = checkSimNao(baseEstadual.existeDebitoMulta);
  // motor alterado: response.body.data.baseEstadual.dataAlteracaoMotor
  const hasMotorAlterado = checkSimNao(baseEstadual.dataAlteracaoMotor);
  // Chassi remarcado: response.body.data.baseEstadual.tipoMarcacaoChassi
  // Returns the actual value: "remarcado" (red), "normal" or "null" (blue)
  const chassiRemarcadoValue = baseEstadual.tipoMarcacaoChassi
    ? baseEstadual.tipoMarcacaoChassi.toLowerCase().trim()
    : null;
  const hasChassiRemarcado =
    chassiRemarcadoValue === "remarcado"
      ? "Sim"
      : chassiRemarcadoValue === "normal" || chassiRemarcadoValue === null
      ? "Não"
      : "Não"; // Default to "normal" for any other value
  // Recall: response.body.data.recall.recallsPendente
  const hasRecall = checkSimNao(reportData.recall?.recallsPendente);
  // Alerta de Gravame: response.body.data.gravame
  const hasAlertaGravame = checkSimNao(
    reportData?.gravame?.[0]?.observacoes === "Atual" ? "Sim" : "Não"
  );
  // Historico de Roubo: response.body.data.rouboFurto.constaOcorrenciaAtiva
  const hasHistoricoRoubo = checkSimNao(
    reportData.rouboFurto?.constaOcorrenciaAtiva
  );
  // CSV: response.body.data.csv
  const hasCSV = checkSimNao(reportData.csv);
  // RENAJUD: response.body.data.baseNacional.indicadorRestricaoRenajud
  // "no" or "null" or "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO" = "Não" (ok), otherwise "Sim" (not ok)
  const renajudValue = baseNacional.indicadorRestricaoRenajud;
  const renajudLowerValue = renajudValue?.toLowerCase()?.trim() || "";
  const hasRENAJUD =
    renajudLowerValue === "no" ||
    renajudLowerValue === "não" ||
    renajudLowerValue === "null" ||
    renajudLowerValue === "" ||
    renajudLowerValue === "nao" ||
    renajudValue === "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO" ||
    renajudValue?.toUpperCase() ===
      "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO"
      ? "Não"
      : "Sim";
  // Historico de multas RENAINF: response.body.data.baseEstadual.debitoRenainf
  const hasMultasRENAINF = checkSimNao(baseEstadual.debitoRenainf);

  const hasIssues =
    hasLeilao === "Sim" ||
    hasSinistro === "Sim" ||
    hasBancosFinanceiras === "Sim" ||
    hasRestricoesNacionais === "Sim" ||
    hasRestricoesEstaduais === "Sim" ||
    hasMotorAlterado === "Sim" ||
    hasChassiRemarcado === "Sim" ||
    hasRecall === "Sim" ||
    hasAlertaGravame === "Sim" ||
    hasHistoricoRoubo === "Sim" ||
    hasRENAJUD === "Sim" ||
    hasMultasRENAINF === "Sim" ||
    hasCSV === "Sim";

  // const historico = reportData?.rouboFurto?.historico || [];

  // Block 3 mapping - Insights do veículo
  // Nível de risco geral: response.body.data.leilao.score.aceitacao
  const leilaoScore = reportData.leilao?.score || {};
  const leilaoScoreAceitacao = leilaoScore.aceitacao || "N/A";
  const nivelRisco =
    leilaoScoreAceitacao !== "N/A" ? parseInt(leilaoScoreAceitacao) || 0 : 0;
  // Exigência de Vistoria Especial (Barra exigencia de vistoria): response.body.data.leilao.score.percentualSobreRef
  const leilaoScoreExigenciaVistoria =
    leilaoScore.exigenciaVistoriaEspecial || null;
  // Convert to low/high: if value exists and is a number, use it; otherwise check if it's a string "low"/"high"
  const exigenciaVistoriaEspecial =
    leilaoScoreExigenciaVistoria !== null &&
    leilaoScoreExigenciaVistoria !== "N/A"
      ? parseInt(leilaoScoreExigenciaVistoria) || 0
      : null;
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 max-w-[88%] mx-auto">
            {reportData.ia && renderAiSummary()}
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
              {/* //show warning box if there are any issues */}
              {hasIssues &&
                renderWarningBox(
                  "Atenção: Alguns blocos possuem informações que merecem cuidado."
                )}
            </div>
            {/* Insights do veículo - Block 3 mapping */}
            <div className="">
              {renderSectionTitle("Informacoes de Risco")}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Nível de risco geral: response.body.data.leilao.score.aceitacao */}
                {nivelRisco > 0 &&
                  renderGauge({
                    label: "Aceitacao de mercado",
                    value: nivelRisco,
                    invertColors: true,
                  })}
                {/* Exigência de Vistoria Especial: response.body.data.leilao.score.exigenciaVistoriaEspecial */}
                {exigenciaVistoriaEspecial !== null &&
                  renderGauge({
                    label: "Exigencia de vistoria especial",
                    value: exigenciaVistoriaEspecial,
                    type: "text",
                  })}

                {/* Percentual sobre Tabela FIPE: response.body.data.leilao.score.percentualSobreRef */}
                {percentualSobreRef > 0 &&
                  renderGauge({
                    label: "Percentual sobre tabela FIPE",
                    value: percentualSobreRef,
                    type: "percentage",
                    invertColors: true,
                  })}
              </div>
              {!nivelRisco &&
                exigenciaVistoriaEspecial === null &&
                !percentualSobreRef && (
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white w-full">
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
                    // Número 3º Eixo: response.body.data.numTerceiroEixo
                    {
                      label: "Número 3º Eixo",
                      value: reportData.numTerceiroEixo || "Nada Consta",
                    },

                    // Potência: response.body.data.potencia
                    {
                      label: "Potência",
                      value: reportData.potencia || "N/A",
                    },
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
                    // Número Carroceria: response.body.data.numCarroceria
                    {
                      label: "Número Carroceria",
                      value: reportData.numCarroceria || "Nada Consta",
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
            <ReportSection title="Informações sobre leilão">
              {reportData?.leilao?.registros &&
              reportData.leilao.registros.length > 0 ? (
                <ReportTableSection
                  headers={[
                    "Data Leilão",
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
                    // Lote: response.body.data.leilao.registros.0.lote
                    item.lote || "N/A",
                    // Placa: response.body.data.leilao.registros.placa
                    item.placa || "N/A",
                    // Chassi: response.body.data.leilao.registros.chassi
                    item.chassi || "N/A",
                    // Marca: response.body.data.leilao.registros.0.marca
                    item.marca || "N/A",
                    // Modelo: response.body.data.leilao.registros.0.modelo
                    item.modelo || "N/A",
                    // Condição: response.body.data.leilao.registros.0.condicaoGeral
                    item.condicaoGeral || "N/A",
                    // Comitente: response.body.data.leilao.registros.0.comitente
                    item.comitente || "N/A",
                  ])}
                />
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 bg-white">
                  <p className="text-gray-800">
                    {reportData?.leilao?.descricao || "N/A"}
                  </p>
                </div>
              )}
              {renderWarningBox(
                "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil."
              )}
            </ReportSection>

            {/* Block 7: Score Leilão Minimizado */}
            <ReportSection title="Score Leilão">
              {reportData?.leilao?.score && leilaoScoreValue ? (
                <>
                  {/* Score: response.body.data.leilao.score */}
                  <ScoreBar score={leilaoScoreValue} label="Score Leilão" />
                  {/* Score Pontuação: tab legenda - already handled by ScoreBar component */}
                </>
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className="text-gray-800">N/A</p>
                </div>
              )}
            </ReportSection>

            {/* Block 8: Indício de Sinistro */}
            <ReportSection title="Indício de Sinistro">
              <div className="border-2 border-[#1AABFE]/80 rounded-full p-2 bg-white">
                {/* inside the box: response.body.data.indicioSinistro.descricao */}
                <p className="text-[#1AABFE] text-xs">
                  {reportData?.indicioSinistro?.descricao || "N/A"}
                </p>
              </div>
            </ReportSection>

            {/* Block 9: Apontamentos em Bancos, Financeiras ou Seguradoras */}
            <ReportSection title="Apontamentos em Bancos, Financeiras ou Seguradoras">
              <div className="flex flex-col md:flex-row gap-6 h-[215px]">
                {riscoBancosFinanceiras || leilaoScorePercentualRef ? (
                  <div className="shrink-0 w-[30%] h-full">
                    {renderGauge({
                      label: "",
                      value:
                        riscoBancosFinanceiras ||
                        parseInt(leilaoScorePercentualRef) ||
                        90,
                    })}
                  </div>
                ) : (
                  <div className="shrink-0 w-[30%] h-full flex items-center justify-center border-2 border-[#1AABFE]/80 rounded-xl bg-white">
                    <p className="text-gray-800">N/A</p>
                  </div>
                )}
                <div className="w-[70%] h-full flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                  <div className="space-y-3">
                    {/* Placa: response.body.data.leilao.registros[0].placa */}
                    <ReportField
                      label="Placa"
                      value={reportData?.placa || plate || "N/A"}
                    />
                    {/* Chasi: response.body.data.leilao.registros[0].chassi */}
                    <ReportField
                      label="Chassi"
                      value={reportData?.chassi || chassis || "N/A"}
                    />
                    {/* Análise: response.body.data... (default text) */}
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-[#1AABFE] mb-2">
                        Análise:
                      </p>
                      <p className="text-sm text-gray-800">
                        {reportData?.analiseRisco?.parecer ||
                          "Não consta informações nas bases consultadas."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ReportSection>
            <ReportSection title="Remarketing">
              <ReportTableSection
                headers={[
                  "Organizador",
                  "Vendedor",
                  "Data evento",
                  "Condições do veículo",
                  "Situação chassi",
                  "Condições motor",
                  "Condições câmbio",
                  "Condições mecânicas",
                  "Observação",
                ]}
                rows={[
                  [
                    // Organizador: response.body.data.remarketing.leilao.organizador
                    reportData?.remarketing?.leilao?.organizador ||
                      "Nada consta",
                    // Vendedor: response.body.data.remarketing.leilao.vendedor
                    reportData?.remarketing?.leilao?.vendedor || "Nada consta",
                    // Data evento: response.body.data.remarketing.leilao.dataEvento
                    reportData?.remarketing?.leilao?.dataEvento
                      ? formatDate(reportData?.remarketing?.leilao?.dataEvento)
                      : "Nada consta",
                    // Condições do veículo: response.body.data.remarketing.leilao.condicoesVeiculo
                    reportData?.remarketing?.leilao?.condicoesVeiculo ||
                      "Nada consta",
                    // Situação chassi: response.body.data.remarketing.leilao.situacaoChassi
                    reportData?.remarketing?.leilao?.situacaoChassi ||
                      "Nada consta",
                    // Condições motor: response.body.data.remarketing.leilao.condicoesMotor
                    reportData?.remarketing?.leilao?.condicoesMotor ||
                      "Nada consta",
                    // Condições câmbio: response.body.data.remarketing.leilao.condicoesCambio
                    reportData?.remarketing?.leilao?.condicoesCambio ||
                      "Nada consta",
                    // Condições mecânicas: response.body.data.remarketing.leilao.condicoesMecanica
                    reportData?.remarketing?.leilao?.condicoesMecanica ||
                      "Nada consta",
                    // Observação: response.body.data.remarketing.leilao.observacao
                    reportData?.remarketing?.leilao?.observacao ||
                      "Nada consta",
                  ],
                ]}
              />
            </ReportSection>

            {/* Block 11: Remarketing - Dados do veículo */}
            <ReportSection title="Remarketing - Dados do veículo">
              <TwoColumnFieldSection
                fields={{
                  left: [
                    // RENAVAM: response.body.data.remarketing.renavam
                    {
                      label: "RENAVAM",
                      value: reportData?.remarketing?.renavam || "N/A",
                    },
                    // Situação Chassi: response.body.data.remarketing.situacaoChassi
                    {
                      label: "Situação Chassi",
                      value: reportData?.remarketing?.situacaoChassi || "N/A",
                    },
                    {
                      label: "Marca / Modelo",
                      value:
                        reportData?.remarketing?.marcamodelo ||
                        reportData?.remarketing?.marcaModelo ||
                        "N/A",
                    },
                    // Segmento: response.body.data.remarketing.segmento
                    {
                      label: "Segmento",
                      value: reportData?.remarketing?.segmento || "N/A",
                    },

                    {
                      label: "Data da Inspeção",
                      value:
                        reportData?.remarketing?.checklist?.dataInspecao ||
                        "N/A",
                    },
                    // Garantia: response.body.data.remarketing.checklist.garantia
                    {
                      label: "Garantia",
                      value:
                        reportData?.remarketing?.checklist?.garantia || "N/A",
                    },
                  ],
                  right: [
                    // Placa: response.body.data.remarketing.placa
                    {
                      label: "Placa",
                      value: reportData?.remarketing?.placa || "N/A",
                    },
                    // Motor: response.body.data.remarketing.nummotor
                    {
                      label: "Motor",
                      value:
                        reportData?.remarketing?.nummotor ||
                        reportData?.remarketing?.motor ||
                        "N/A",
                    },
                    // Chassi: response.body.data.remarketing.chassi
                    {
                      label: "Chassi",
                      value: reportData?.remarketing?.chassi || "N/A",
                    },

                    // Auto Sub segmento: response.body.data.remarketing.subSegmento
                    {
                      label: "Auto Sub segmento",
                      value: reportData?.remarketing?.subSegmento || "N/A",
                    },
                    // Data da Inspeção: response.body.data.remarketing.checklist.dataInspecao

                    // Observação: response.body.data.remarketing.observacao
                    {
                      label: "Observação",
                      value: reportData?.remarketing?.observacao || "N/A",
                    },
                  ],
                }}
              />
            </ReportSection>

            {/* Block 12: Fotos */}
            <ReportSection title="Fotos">
              {reportData?.remarketing?.checklist?.fotos &&
              reportData.remarketing.checklist.fotos.length > 0 ? (
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
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center ">
                  <p className="text-gray-500">N/A</p>
                </div>
              )}
            </ReportSection>

            {/* Block 13: Histórico de KMs */}
            <ReportSection title="Histórico de KMs">
              {reportData?.historicoKm && reportData.historicoKm.length > 0 ? (
                <ReportTableSection
                  headers={["Data", "Odômetro"]}
                  rows={reportData.historicoKm.map((item) => [
                    // Data: response.body.data.historicoKm.0.dataInclusao
                    formatDate(item.dataInclusao) || "N/A",
                    // Odômetro: response.body.data.historicoKm.0.km
                    item.km ? `${item.km} km` : "N/A",
                  ])}
                />
              ) : (
                <ReportTableSection
                  headers={["Data", "Odômetro"]}
                  rows={[["N/A", "N/A"]]}
                />
              )}
            </ReportSection>

            {/* Sections after Histórico de KMs - Only for Plus, Ultra, and Premium plans */}
            {planName !== "light" && (
              <>
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
                            baseNacional.anoModelo ||
                            reportData.anoModelo ||
                            "N/A",
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
                            reportData.dadosBasicosDoVeiculo
                              ?.informacoesFipe?.[0]?.modelo ||
                            model ||
                            "N/A",
                        },
                        // Versão: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].versao
                        {
                          label: "Versão",
                          value:
                            reportData.dadosBasicosDoVeiculo
                              ?.informacoesFipe?.[0]?.versao ||
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
                            reportData.decodificadorPrecificador
                              ?.tipoCarroceria ||
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
                {reportData.dadosBasicosDoVeiculo &&
                reportData.dadosBasicosDoVeiculo.informacoesFipe.length > 0 ? (
                  <ReportSection title="Decodificador de Chassi - Precificadores">
                    {/* Precificadores Info */}
                    {(() => {
                      // Get all available years from the API data (historicoPreco)
                      const historicoPreco =
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.historicoPreco || [];

                      // Extract unique years from historicoPreco
                      const availableYearsSet = new Set();
                      historicoPreco.forEach((item) => {
                        const year = parseInt(item.ano);
                        if (!isNaN(year)) {
                          availableYearsSet.add(year);
                        }
                      });

                      // Add current year if valorAtual exists
                      const valorAtualNum = parseCurrency(
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual || "0"
                      );
                      if (valorAtualNum > 0) {
                        const currentYear = new Date().getFullYear();
                        availableYearsSet.add(currentYear);
                      }

                      // Get all years, sort them
                      const allYears = Array.from(availableYearsSet)
                        .map(Number)
                        .sort((a, b) => a - b);

                      // Take the last 9 years
                      let last9Years = allYears.slice(-9);

                      // If the first year in the last 9 years has "N/A" (nothing to compare),
                      // remove it. If there are more than 9 years available, we can try to include
                      // an earlier year to still show 9 years total (if it has a valid valuation)
                      if (last9Years.length > 0) {
                        const firstYear = last9Years[0];
                        const firstYearValue = valuations.years[firstYear];

                        // If first year is "N/A" (nothing to compare), remove it
                        if (firstYearValue === "N/A" || !firstYearValue) {
                          last9Years = last9Years.slice(1); // Remove first year (now have 8 years)

                          // If we have more than 9 years total, try to add an earlier year to still show 9
                          if (allYears.length > 9 && last9Years.length < 9) {
                            // Find the year before the first year in our list
                            const firstYearInList = last9Years[0];
                            const firstYearIndex =
                              allYears.indexOf(firstYearInList);

                            // Try to add the year immediately before (if it has a valid valuation)
                            if (firstYearIndex > 0) {
                              const earlierYear = allYears[firstYearIndex - 1];
                              const earlierYearValue =
                                valuations.years[earlierYear];

                              // Only add if it has a valid valuation (not N/A)
                              if (
                                earlierYearValue &&
                                earlierYearValue !== "N/A"
                              ) {
                                last9Years = [earlierYear, ...last9Years];
                              }
                            }
                          }
                        }
                      }

                      // Build headers: "06 Meses", "12 Meses", then years (8 or 9)
                      const headers = [
                        "06 Meses",
                        "12 Meses",
                        ...last9Years.map(String),
                      ];

                      // Build row data
                      const rowData = [
                        valuations.sixMonths,
                        valuations.twelveMonths,
                        ...last9Years.map(
                          (year) => valuations.years[year] || "N/A"
                        ),
                      ];

                      return (
                        <ReportTableSection
                          headers={headers}
                          rows={[rowData]}
                        />
                      );
                    })()}

                    <PriceEvolutionChart
                      historicoPreco={
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.historicoPreco || []
                      }
                      valorAtual={
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual || null
                      }
                    />
                  </ReportSection>
                ) : (
                  <ReportSection title="Decodificador de Chassi - Precificadores">
                    <p className="text-[#194D9A] text-xs px-4 border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      Não há dados disponíveis para exibição.
                    </p>
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
                        {
                          label: "DI",
                          value: baseNacional.di || "Nada Consta",
                        },
                        {
                          label: "UF",
                          value: baseEstadual.uf || reportData.uf,
                        },
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
                          value:
                            baseNacional.tipoDocImportadora || "Nada Consta",
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
                      <strong>OBS:</strong> Sempre verifique o documento do
                      veículo para outras restrições, observações ou CSV!
                    </p>
                  </div>
                </div>

                {/* Restrições Nacionais */}
                <div className="space-y-4 page-break-after">
                  {renderSectionTitle("Restrições Nacionais")}
                  {renderTwoColumnSection(
                    <>
                      <div className="space-y-3">
                        {/* Comunicação de Venda: response.body.data.baseNacional.indicadorComunicacaoVendas */}
                        {/* Inverted logic: "Não" = blue (ok), "Sim" = red (not ok) */}
                        {(() => {
                          const value =
                            reportData?.baseNacional
                              ?.indicadorComunicacaoVendas || "Nada consta";
                          const lowerValue = value?.toLowerCase() || "";
                          const isNotOk =
                            lowerValue === "sim" || lowerValue === "yes";
                          return renderField(
                            "Comunicação de Venda",
                            value,
                            isNotOk
                          );
                        })()}
                        {/* Restrição Financeira: response.body.data.baseNacional.restricaoFinanciadora */}
                        {renderField(
                          "Restrição Financeira",
                          reportData?.baseNacional?.restricaoFinanciadora ||
                            "Nada consta",

                          reportData?.baseNacional?.restricaoFinanciadora &&
                            !reportData?.baseNacional?.restricaoFinanciadora
                              .toLowerCase()
                              .trim()
                              .includes("nada ")
                        )}
                        {/* Restrição 1: response.body.data.baseNacional.restricao1 */}
                        {renderField(
                          "Restrição 1",
                          reportData?.baseNacional?.restricao1 || "Nada consta",
                          reportData?.baseNacional?.restricao1 &&
                            !reportData?.baseNacional?.restricao1
                              .toLowerCase()
                              .trim()
                              .includes("nada")
                        )}

                        {/* Restrição 3: response.body.data.baseNacional.restricao3 */}
                        {renderField(
                          "Restrição 3",
                          reportData?.baseNacional?.restricao3 || "Nada consta",
                          reportData?.baseNacional?.restricao3 &&
                            !reportData?.baseNacional?.restricao3
                              .toLowerCase()
                              .trim()
                              .includes("nada ")
                        )}
                      </div>

                      <div className="space-y-3">
                        {/* Indicação Restrição Renajud: response.body.data.baseNacional.indicadorRestricaoRenajud */}
                        {/* "no" or "null" or "VEICULO NAO INDICA OCORRENCIA DE ROUBO/FURTO" = blue (ok), "yes" = red (not ok) */}
                        {renderField(
                          "Indicação Restrição Renajud",
                          hasRENAJUD,
                          hasRENAJUD === "Sim"
                        )}
                        {/* Ocorrência: response.body.data.baseNacional.ocorrencia */}
                        {/* Red if different from "Veículo não indica ocorrência de Roubo/Furto" */}
                        {renderField(
                          "Ocorrência",
                          reportData?.baseNacional?.ocorrencia || "Nada consta",
                          reportData?.baseNacional?.ocorrencia &&
                            reportData?.baseNacional?.ocorrencia.toLowerCase() !==
                              "veículo sem ocorrência de roubo/furto" &&
                            !reportData?.baseNacional?.ocorrencia
                              ?.toLowerCase()
                              .includes("não") &&
                            !reportData?.baseNacional?.ocorrencia
                              ?.toLowerCase()
                              .includes("nao")
                        )}

                        {/* Restrição 2: response.body.data.baseNacional.restricao2 */}
                        {renderField(
                          "Restrição 2",
                          reportData?.baseNacional?.restricao2 || "Nada consta",
                          reportData?.baseNacional?.restricao2 &&
                            !reportData?.baseNacional?.restricao2
                              .toLowerCase()
                              .trim()
                              .includes("nada")
                        )}
                        {/* Restrição 4: response.body.data.baseNacional.restricao4 */}
                        {renderField(
                          "Restrição 4",
                          reportData?.baseNacional?.restricao4 || "Nada consta",
                          reportData?.baseNacional?.restricao4 &&
                            !reportData?.baseNacional?.restricao4
                              .toLowerCase()
                              .trim()
                              .includes("nada")
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
                        {renderField(
                          "Espécie do Veículo",
                          baseEstadual.especie
                        )}
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
                <div className="space-y-4">
                  {renderSectionTitle("Restrições Estaduais")}
                  {renderTwoColumnSection(
                    <>
                      <div className="space-y-3">
                        {/* Administrativa: response.body.data.baseEstadual.restricaoAdminisrativa */}
                        {renderField(
                          "Administrativa",
                          baseEstadual.restricaoAdminisrativa || "Nada consta",
                          baseEstadual.restricaoAdminisrativa &&
                            baseEstadual.restricaoAdminisrativa
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Financeira: response.body.data.baseEstadual.restricaoFinanceira */}
                        {renderField(
                          "Financeira",
                          baseEstadual.restricaoFinanceira || "Nada consta",
                          baseEstadual.restricaoFinanceira &&
                            baseEstadual.restricaoFinanceira
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Guincho: response.body.data.baseEstadual.restricaoGuincho */}
                        {renderField(
                          "Guincho",
                          baseEstadual.restricaoGuincho || "Nada consta",
                          baseEstadual.restricaoGuincho &&
                            baseEstadual.restricaoGuincho
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Restrição 1: response.body.data.baseEstadual.debitoRenainf */}
                        {renderField(
                          "Restrição 1",
                          baseEstadual.debitoRenainf || "Nada consta",
                          baseEstadual.debitoRenainf &&
                            baseEstadual.debitoRenainf.toLowerCase().trim() !==
                              "nada consta"
                        )}
                        {/* Restrição 2: response.body.data.baseEstadual.restricao2 */}
                        {renderField(
                          "Restrição 2",
                          baseEstadual.restricao2 || "Nada consta",
                          baseEstadual.restricao2 &&
                            baseEstadual.restricao2.toLowerCase().trim() !==
                              "nada consta"
                        )}
                        {/* Arrendamento: response.body.data.baseEstadual.restricaoArrendatario */}
                        {renderField(
                          "Arrendamento",
                          baseEstadual.restricaoArrendatario || "Nada consta",
                          baseEstadual.restricaoArrendatario &&
                            baseEstadual.restricaoArrendatario
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Roubo: response.body.data.baseEstadual.restricaoRouboFurto */}
                        {renderField(
                          "Roubo",
                          baseEstadual.restricaoRouboFurto || "Nada consta",
                          baseEstadual.restricaoRouboFurto &&
                            baseEstadual.restricaoRouboFurto
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Observações: response.body.data.baseEstadual.observacoes */}
                        {renderField(
                          "Observações",
                          baseEstadual.observacoes || "Nada consta",
                          baseEstadual.observacoes &&
                            baseEstadual.observacoes.toLowerCase().trim() !==
                              "nada consta"
                        )}
                      </div>
                      <div className="space-y-3">
                        {/* Comunicação de Venda: response.body.data.baseEstadual.comunicacaoVenda */}
                        {renderField(
                          "Comunicação de Venda",
                          baseEstadual.comunicacaoVenda ||
                            "Não consta comunicação de venda",
                          baseEstadual.comunicacaoVenda &&
                            baseEstadual.comunicacaoVenda !==
                              "NAO CONSTA COMUNICACAO DE VENDAS"
                        )}
                        {/* Data Tributária: response.body.data.baseEstadual.restricaoTributaria */}
                        {renderField(
                          "Data Tributária",
                          baseEstadual.restricaoTributaria || "Nada consta",
                          baseEstadual.restricaoTributaria &&
                            baseEstadual.restricaoTributaria
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Judicial: response.body.data.baseEstadual.restricaoJudicial */}
                        {renderField(
                          "Judicial",
                          baseEstadual.restricaoJudicial || "Nada consta",
                          baseEstadual.restricaoJudicial &&
                            baseEstadual.restricaoJudicial
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Restrição 3: response.body.data.baseEstadual.restricaoFinanceira */}
                        {renderField(
                          "Restrição 3",
                          baseEstadual.restricaoFinanceira || "Nada consta",
                          baseEstadual.restricaoFinanceira &&
                            baseEstadual.restricaoFinanceira
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Restrição 4: response.body.data.baseEstadual.restricao4 */}
                        {renderField(
                          "Restrição 4",
                          baseEstadual.restricao4 || "Nada consta",
                          baseEstadual.restricao4 &&
                            baseEstadual.restricao4.toLowerCase().trim() !==
                              "nada consta"
                        )}
                        {/* Renajud: response.body.data.baseEstadual.restricaoRenajud */}
                        {renderField(
                          "Renajud",
                          baseEstadual.restricaoRenajud || "Nada consta",
                          baseEstadual.restricaoRenajud &&
                            baseEstadual.restricaoRenajud
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                        {/* Tributária: response.body.data.baseEstadual.restricaoTributaria */}
                        {renderField(
                          "Tributária",
                          baseEstadual.restricaoTributaria || "Nada consta",
                          baseEstadual.restricaoTributaria &&
                            baseEstadual.restricaoTributaria
                              .toLowerCase()
                              .trim() !== "nada consta"
                        )}
                      </div>
                    </>
                  )}
                </div>

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
                          baseEstadual.existeDebitoDpvat || "Nada consta",
                          baseEstadual.existeDebitoDpvat &&
                            !baseEstadual.existeDebitoDpvat
                              .toLowerCase()
                              .trim()
                              .includes("nao")
                        )}
                        {/* Débitos Licenciamento: response.body.data.baseEstadual.existeDebitoLicenciamento */}
                        {renderField(
                          "Débitos Licenciamento",
                          baseEstadual.existeDebitoLicenciamento ||
                            "Nada consta",
                          baseEstadual.existeDebitoLicenciamento &&
                            !baseEstadual.existeDebitoLicenciamento
                              .toLowerCase()
                              .trim()
                              .includes("nao")
                        )}
                      </div>

                      <div className="space-y-3">
                        {/* Débitos IPVA: response.body.data.baseEstadual.existeDebitoIpva */}
                        {renderField(
                          "Débitos IPVA",
                          baseEstadual.existeDebitoIpva || "Nada consta",
                          baseEstadual.existeDebitoIpva &&
                            !baseEstadual.existeDebitoIpva
                              .toLowerCase()
                              .trim()
                              .includes("nao")
                        )}
                        {/* Débitos Multa: response.body.data.baseEstadual.existeDebitoMulta */}
                        {renderField(
                          "Débitos Multa",
                          baseEstadual.existeDebitoMulta || "Nada consta",
                          baseEstadual.existeDebitoMulta &&
                            !baseEstadual.existeDebitoMulta
                              .toLowerCase()
                              .trim()
                              .includes("nao")
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
                      Orientamos a todos a consultar o site da SECRETÁRIA DA
                      FAZENDA da UF do veículo -{" "}
                      {reportData?.baseEstadual?.SEFAZ_LINK ? (
                        <a
                          href={reportData?.baseEstadual?.SEFAZ_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1AABFE] hover:underline"
                        >
                          {reportData?.baseEstadual?.SEFAZ_LINK}
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
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoCetesb || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoCetesb || "0,00"
                          );
                          return renderField("CETESB", value, numericValue > 0);
                        })()}
                        {/* DETRAN: response.body.data.baseEstadual.debitoDetran */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoDetran || "0,00")
                          );
                          return renderField("DETRAN", value);
                        })()}
                        {/* DER: response.body.data.baseEstadual.debitoDer */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoDer || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoDer || "0,00"
                          );
                          return renderField("DER", value, numericValue > 0);
                        })()}
                        {/* DERSA: response.body.data.baseEstadual.debitoDersa */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoDersa || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoDersa || "0,00"
                          );
                          return renderField("DERSA", value, numericValue > 0);
                        })()}
                        {/* DPVAT: response.body.data.baseEstadual.debitoDpvat */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoDpvat || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoDpvat || "0,00"
                          );
                          return renderField("DPVAT", value, numericValue > 0);
                        })()}
                        {/* IPVA: response.body.data.baseEstadual.debitoIpva */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoIpva || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoIpva || "0,00"
                          );
                          return renderField("IPVA", value, numericValue > 0);
                        })()}
                        {/* Licenciamento: response.body.data.baseEstadual.debitoLicenciamento */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(
                              baseEstadual.debitoLicenciamento || "0,00"
                            )
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoLicenciamento || "0,00"
                          );
                          return renderField(
                            "Licenciamento",
                            value,
                            numericValue > 0
                          );
                        })()}
                      </div>
                      <div className="space-y-3">
                        {/* Municipais: response.body.data.baseEstadual.debitoMunicipais */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(
                              baseEstadual.debitoMunicipais || "0,00"
                            )
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoMunicipais || "0,00"
                          );
                          return renderField(
                            "Municipais",
                            value,
                            numericValue > 0
                          );
                        })()}
                        {/* PRF: response.body.data.baseEstadual.debitoPrf */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoPrf || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoPrf || "0,00"
                          );
                          return renderField("PRF", value, numericValue > 0);
                        })()}
                        {/* Multas: response.body.data.baseEstadual.debitoMulta */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoMulta || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoMulta || "0,00"
                          );
                          return renderField("Multas", value, numericValue > 0);
                        })()}
                        {/* RENAINF: response.body.data.baseEstadual.debitoRenainf */}
                        {(() => {
                          const value = formatCurrency(
                            parseCurrency(baseEstadual.debitoRenainf || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoRenainf || "0,00"
                          );
                          return renderField(
                            "RENAINF",
                            value,
                            numericValue > 0
                          );
                        })()}
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
                  rows={
                    reportData?.historicoProprietarios &&
                    reportData?.historicoProprietarios?.length > 0
                      ? reportData?.historicoProprietarios?.map((item) => [
                          // Hist. Proprietários - Município: response.body.data.historicoProprietarios[0].municipio
                          item?.municipio || "N/A",
                          // Hist. Proprietários - UF: response.body.data.historicoProprietarios[0].uf
                          item?.uf || "N/A",
                          // Hist. Proprietários - Exercício: response.body.data.historicoProprietarios[0].anoExercicio
                          item?.anoExercicio || "N/A",
                          // Hist. Proprietários - Proprietário: response.body.data.historicoProprietarios[0].proprietario
                          item?.proprietario || "N/A",
                          // Hist. Proprietários - Data: response.body.data.historicoProprietarios[0].data
                          item?.data ? formatDate(item?.data) : "N/A",
                          // Hist. Proprietários - Motivo: response.body.data.historicoProprietarios[0].motivo
                          item?.motivo || "N/A",
                        ])
                      : [["N/A", "N/A", "N/A", "N/A", "N/A", "N/A"]]
                  }
                />
                {/* Informações de Parceiros */}

                <ReportTableSection
                  title="Informações de Parceiros"
                  headers={["Data", "KM", "Valor do Anúncio"]}
                  rows={[
                    [
                      reportData?.anuncio?.data
                        ? formatDate(reportData?.anuncio?.data)
                        : "N/A",
                      reportData?.anuncio?.km
                        ? `${reportData?.anuncio?.km} KM`
                        : "N/A",
                      reportData?.anuncio?.valor
                        ? formatCurrency(reportData?.anuncio?.valor)
                        : "N/A",
                    ],
                  ]}
                />
                {/* Observação do Vendedor */}
                <ReportSection title="Observação do Vendedor">
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    {/* Observação do Vendedor: response.body.data.anuncio.observacao */}
                    <p className="text-[#194D9A] leading-relaxed">
                      {reportData?.anuncio?.observacao || "N/A"}
                    </p>
                  </div>
                </ReportSection>
              </>
            )}

            {/* Opcionais section - Only for Plus, Ultra, and Premium plans */}
            {planName !== "light" && (
              <ReportSection title="Opcionais:">
                {reportData?.anuncio?.opcionais &&
                reportData?.anuncio?.opcionais.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
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
                  <div className="grid grid-cols-2 gap-4 border-2 border-[#1AABFE]/80 text-[#194D9A] rounded-full p-4 py-2 bg-white">
                    N/A
                  </div>
                )}
              </ReportSection>
            )}

            {/* Sections after Opcionais - Only for Ultra and Premium plans */}
            {(planName === "ultra" || planName === "premium") && (
              <>
                {/* Precificador - Valor de Mercado */}
                <ReportSection title="Precificador - Valor de Mercado">
                  <ReportTableSection
                    headers={["Modelo", "Marca", "Versão", "Valor"]}
                    rows={[
                      [
                        // Precificador - Valor de Mercado - Modelo: response.body.data.comparativoEspecificacoes.veiculoComparativo.0.modelo
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.modelo || "N/A",
                        // Precificador - Valor de Mercado - Marca: response.body.data.comparativoEspecificacoes.veiculoComparativo.0.marca
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.marca || "N/A",
                        // Precificador - Valor de Mercado - Versão: response.body.data.dadosBasicosDoVeiculo.informacoesFipe.0.versao
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.versao || "N/A",
                        // Precificador - Valor de Mercado - Valor: response.body.data.dadosBasicosDoVeiculo.informacoesFipe.0.valorAtual
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual
                          ? formatCurrency(
                              parseCurrency(
                                reportData.dadosBasicosDoVeiculo
                                  .informacoesFipe[0].valorAtual
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
                        reportData?.cestaBasica?.veiculosFipe?.[0]
                          ?.registros?.[0]?.valor
                          ? formatCurrency(
                              parseCurrency(
                                reportData.cestaBasica.veiculosFipe[0]
                                  .registros[0].valor
                              )
                            )
                          : "N/A",
                        // FIPE - Valor 0 KM: response.body.data.cestaBasica.veiculosFipe[0].registros[0].valorZeroKm
                        reportData?.cestaBasica?.veiculosFipe?.[0]
                          ?.registros?.[0]?.valorZeroKm
                          ? formatCurrency(
                              parseCurrency(
                                reportData.cestaBasica.veiculosFipe[0]
                                  .registros[0].valorZeroKm
                              )
                            )
                          : "-",
                      ],
                    ]}
                  />
                </ReportSection>

                {/* Porcentagem sobre Tabela FIPE */}
                <ReportSection title="Porcentagem sobre Tabela FIPE em caso de leilão">
                  <div className="flex flex-col md:flex-row gap-6 ">
                    <div className="shrink-0 w-[30%]">
                      {/* Porcentagem sobre Tabela FIPE - Percentual Máximo de Oferta: response.body.data.leilao.score.aceitacao */}
                      {renderGauge({
                        label: "",
                        value: reportData?.leilao?.score?.percentualSobreRef,
                      })}
                    </div>
                    <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      <div className="space-y-3">
                        <div className="mt-4">
                          <p className="text-sm  text-[#1AABFE] mb-2">
                            Esse veículo poderá receber uma oferta máxima de{" "}
                            {reportData?.leilao?.score?.percentualSobreRef}% do
                            preço do seu valor de tabela.
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
                      <BarGauge
                        value={
                          reportData?.leilao?.score
                            ?.exigenciaVistoriaEspecial || 0
                        }
                        min={0}
                        max={100}
                        label="Exigência de Vistoria Especial"
                      />
                    </div>
                    <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      <div className="space-y-3">
                        {/* Exigência de Vistoria Especial (Barra exigencia de vistoria): response.body.data.leilao.score.percentualSobreRef */}
                        <p className="text-sm text-[#1AABFE] mb-2">
                          Este veículo possui uma chance de exigência de
                          vistoria especial, para a realização do seguro.
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
                            // Recall - Data: response.body.data.recall.detalhes[0].data
                            item?.data
                              ? formatDate(item?.data)
                              : "Informação não encontrada nas bases consultadas",
                            // Recall - Defeito: response.body.data.recall.detalhes[0].defeito
                            item?.defeito ||
                              "Informação não encontrada nas bases consultadas",
                            // Recall - Risco: response.body.data.recall.detalhes[0].risco
                            item?.risco ||
                              "Informação não encontrada nas bases consultadas",
                          ])
                        : [
                            [
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                            ],
                          ]
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
                                (item?.veiculo &&
                                item?.anoModelo &&
                                item?.chassis
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
                        <p className="text-sm text-gray-800 leading-relaxed">
                          N/A
                        </p>
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
                            item?.descricao ||
                              "Informação não encontrada nas bases consultadas",
                            // Recall Pendentes - Identificador: response.body.data.recall.recallsPendente[0].identificador
                            item?.identificador ||
                              "Informação não encontrada nas bases consultadas",
                            // Recall Pendentes - Situação: response.body.data.recall.recallsPendente[0].situacao
                            item?.situacao ||
                              "Informação não encontrada nas bases consultadas",
                          ])
                        : [
                            [
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                            ],
                          ]
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
                        ? reportData.rouboFurto.historico.map((item, index) => [
                            // Histórico Roubo e Furto - {index + 1} - Data: response.body.data.rouboFurto.historico[index].data
                            item?.data
                              ? formatDate(item.data)
                              : "Informação não encontrada nas bases consultadas",
                            // Histórico Roubo e Furto - {index + 1} - Ocorrência: response.body.data.rouboFurto.historico[index].ocorrencia
                            item?.ocorrencia || "-",
                            // Histórico Roubo e Furto - {index + 1} - Município/Estado: response.body.data.rouboFurto.historico[index].municipioUf
                            item?.municipioUf || "-",
                            // Histórico Roubo e Furto - {index + 1} - Nº B.O.: response.body.data.rouboFurto.historico[index].numeroBo
                            item?.numeroBo || "-",
                            // Histórico Roubo e Furto - {index + 1} - Informante: response.body.data.rouboFurto.historico[index].informante
                            item?.informante || "-",
                          ])
                        : [
                            [
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                              "Informação não encontrada nas bases consultadas",
                            ],
                          ]
                    }
                  />
                </ReportSection>

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
                                  value: gravame?.numero || "N/A",
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
                      <p className="text-sm text-gray-800 leading-relaxed ">
                        N/A
                      </p>
                    </div>
                  )}
                </ReportSection>
              </>
            )}

            {/* Registro em Locadora - Only for Ultra and Premium plans */}
            {(planName === "ultra" || planName === "premium") && (
              <ReportSection title="Registro em Locadora">
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className="text-[#1AABFE]">
                    {/* Registro em Locadora: response.body.data.registroEmLocadora */}
                    {reportData?.registroEmLocadora
                      ? "Consta informações nas bases consultadas"
                      : "Não Consta informações nas bases consultadas"}
                  </p>
                </div>
              </ReportSection>
            )}

            {/* Sections after Registro em Locadora - Only for Premium plan */}
            {planName === "premium" && (
              <>
                {/* CSV */}
                <ReportSection title="CSV">
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                    <p className="text-[#1AABFE]">
                      {/* CSV: response.body.data.csv */}
                      {reportData?.csv
                        ? "Consta informações nas bases consultadas"
                        : "Não Consta informações nas bases consultadas"}
                    </p>
                  </div>
                </ReportSection>

                {/* Histórico de Multas RENAINF */}
                <ReportSection title="Histórico de Multas RENAINF">
                  {reportData?.multasRenainf &&
                  Array.isArray(reportData.multasRenainf) &&
                  reportData.multasRenainf.length > 0 ? (
                    <ReportTableSection
                      headers={[
                        "Auto de Infração",
                        "Data da Infração",
                        "Orgão Autuador",
                        "UF Orgão Autuador",
                      ]}
                      rows={reportData.multasRenainf.map((multa) => [
                        // Auto de Infração: response.body.data.multasRenainf.autoInfracao
                        multa?.autoInfracao ||
                          "Informação não encontrada nas bases consultadas",
                        // Data da Infração: response.body.data.multasRenainf.dataInfracao
                        multa?.dataInfracao
                          ? formatDate(multa.dataInfracao)
                          : "-",
                        // Orgão Autuador: response.body.data.multasRenainf.orgaoAutuador
                        multa?.orgaoAutuador || "-",
                        // UF Orgão Autuador: response.body.data.multasRenainf.ufOrgaoAutuador
                        multa?.ufOrgaoAutuador || "-",
                      ])}
                      desc={reportData.multasRenainf.map(
                        // Descrição: response.body.data.multasRenainf.descricao
                        (multa) =>
                          multa?.descricao ||
                          "Informação não encontrada nas bases consultadas"
                      )}
                    />
                  ) : (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className="text-[#1AABFE]">
                        Informação não encontrada nas bases consultadas.
                      </p>
                    </div>
                  )}
                </ReportSection>

                {/* Radar Secundário */}
                <ReportSection title="Radar Secundário">
                  {reportData?.radarSecuritario &&
                  Array.isArray(reportData.radarSecuritario) &&
                  reportData.radarSecuritario.length > 0 ? (
                    (() => {
                      const radarData = reportData.radarSecuritario[0];
                      return (
                        <div className="space-y-4">
                          {/* Seguradoras */}
                          {radarData?.cias &&
                            Array.isArray(radarData.cias) &&
                            radarData.cias.length > 0 && (
                              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                                <div className="flex flex-wrap gap-2">
                                  {/* seguradoras: response.body.data.radarSecuritario.cias */}
                                  {radarData.cias.map((cia, index) => (
                                    <span
                                      key={index}
                                      className="text-gray-800 text-sm"
                                    >
                                      {cia?.Nome || cia?.nome || "-"}
                                      {index < radarData.cias.length - 1 &&
                                        ", "}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Franquia Normal e Reduzida */}
                          {(radarData?.franquiaNormal ||
                            radarData?.franquiaReduzida) && (
                            <ReportTableSection
                              headers={[
                                "Tipo da Franquia",
                                "Preço Médio do Seguro",
                                "Franquia Média",
                              ]}
                              rows={[
                                // Franquia Normal row
                                radarData?.franquiaNormal
                                  ? [
                                      // Tipo da franquia: response.body.data.radarSecuritario.franquiaNormal
                                      "Franquia Normal",
                                      // preço medio do seguro: response.body.data.radarSecuritario.franquiaNormal.valorPremio.media
                                      radarData.franquiaNormal?.valorPremio
                                        ?.media
                                        ? formatCurrency(
                                            parseCurrency(
                                              radarData.franquiaNormal
                                                .valorPremio.media
                                            )
                                          )
                                        : "-",
                                      // Franquia media: response.body.data.radarSecuritario.franquiaNormal.valorFranquia.media
                                      radarData.franquiaNormal?.valorFranquia
                                        ?.media
                                        ? formatCurrency(
                                            parseCurrency(
                                              radarData.franquiaNormal
                                                .valorFranquia.media
                                            )
                                          )
                                        : "-",
                                    ]
                                  : null,
                                // Franquia Reduzida row
                                radarData?.franquiaReduzida
                                  ? [
                                      // tipo da franquia: response.body.data.radarSecuritario.franquiaReduzida
                                      "Franquia Reduzida",
                                      // preço medio do seguro: response.body.data.radarSecuritario.franquiaReduzida.valorPremio.media
                                      radarData.franquiaReduzida?.valorPremio
                                        ?.media
                                        ? formatCurrency(
                                            parseCurrency(
                                              radarData.franquiaReduzida
                                                .valorPremio.media
                                            )
                                          )
                                        : "-",
                                      // Franquia media: response.body.data.radarSecuritario.franquiaReduzida.valorFranquia.media
                                      radarData.franquiaReduzida?.valorFranquia
                                        ?.media
                                        ? formatCurrency(
                                            parseCurrency(
                                              radarData.franquiaReduzida
                                                .valorFranquia.media
                                            )
                                          )
                                        : "-",
                                    ]
                                  : null,
                              ].filter(Boolean)}
                            />
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className="text-[#1AABFE]">
                        Informação não encontrada nas bases consultadas.
                      </p>
                    </div>
                  )}
                </ReportSection>

                {/* Legenda */}
                <div className="relative mb-6">
                  <div className="mb-4">
                    <div className="bg-[#1AABFE] text-white px-4 py-2 rounded-full w-fit mb-2">
                      <h4 className="font-semibold px-8">Legenda</h4>
                    </div>

                    {/* Legend content */}
                    <div className="space-y-3 border-2 border-[#1AABFE]/80 rounded-xl p-4 py-2 bg-white">
                      {/* Aceitável sem restrições */}
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <p className="text-xs text-[#1AABFE] font-medium">
                          Aceitável sem restrições: Item aprovado para uso sem
                          necessidade de ações corretivas.
                        </p>
                      </div>

                      {/* Aceitável com restrições */}
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                          <IoIosWarning className="text-white text-xs " />
                        </div>
                        <p className="text-xs text-[#1AABFE] font-medium">
                          Aceitável com restrições: Item aprovado, porém sujeito
                          a limitações específicas previamente definidas.
                        </p>
                      </div>

                      {/* Aceitável mediante inspeção */}
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <p className="text-xs text-[#1AABFE] font-medium">
                          Aceitável mediante inspeção: Item condicionado à
                          realização de inspeção adicional para confirmação de
                          sua conformidade.
                        </p>
                      </div>

                      {/* Recusável */}
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                          <FaTimes className="text-white text-xs" />
                        </div>
                        <p className="text-xs text-[#1AABFE] font-medium">
                          Recusável: Item reprovado devido a problemas críticos
                          ou não viáveis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Anúncios */}
                <ReportSection title="Histórico de Anúncios">
                  {reportData?.historicoAnuncios &&
                  (Array.isArray(reportData.historicoAnuncios)
                    ? reportData.historicoAnuncios.length > 0
                    : true) ? (
                    <div className="space-y-4">
                      {(Array.isArray(reportData.historicoAnuncios)
                        ? reportData.historicoAnuncios
                        : [reportData.historicoAnuncios]
                      ).map((anuncio, index) => (
                        <div key={index} className="space-y-4">
                          <ReportTableSection
                            headers={["KM", "Valor", "Data"]}
                            rows={[
                              [
                                // KM: response.body.data.historicoAnuncios.km
                                anuncio?.km
                                  ? `${anuncio.km.toLocaleString("pt-BR")}`
                                  : "-",
                                // Valor: response.body.data.historicoAnuncios.valor
                                anuncio?.valor
                                  ? formatCurrency(parseCurrency(anuncio.valor))
                                  : "-",
                                // Data: response.body.data.historicoAnuncios.data
                                anuncio?.data ? formatDate(anuncio.data) : "-",
                              ],
                            ]}
                          />
                          {/* Fotos Header and Display Area */}
                          <div className="space-y-2">
                            <p className="text-white bg-[#1AABFE] rounded-full p-2 px-6 w-fit font-semibold text-sm">
                              Fotos
                            </p>
                            <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                              {/* fotos: response.body.data.historicoAnuncios.fotos */}
                              {anuncio?.fotos &&
                              (Array.isArray(anuncio.fotos)
                                ? anuncio.fotos.length > 0
                                : true) ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {(Array.isArray(anuncio.fotos)
                                    ? anuncio.fotos
                                    : [anuncio.fotos]
                                  ).map((foto, fotoIndex) => (
                                    <img
                                      key={fotoIndex}
                                      src={
                                        typeof foto === "string"
                                          ? foto
                                          : foto.url || foto
                                      }
                                      alt={`Foto ${fotoIndex + 1}`}
                                      className="w-full h-48 object-cover rounded-lg border-2 border-[#1AABFE]/80"
                                    />
                                  ))}
                                </div>
                              ) : (
                                <div className="p-4 py-2 bg-white flex items-center justify-center min-h-[200px]">
                                  <p className="text-gray-500">
                                    Não consta fotos
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className="text-[#1AABFE]">
                        Informação não encontrada nas bases consultadas.
                      </p>
                    </div>
                  )}
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
                        // Histórico de Consulta - Primeira Consulta: response.body.data.historicoConsultaVeicular.primeiraConsulta
                        reportData?.historicoConsultaVeicular
                          ?.primeiraConsulta || "-",
                        // Histórico de Consulta - Última Consulta: response.body.data.historicoConsultaVeicular.ultimaConsulta
                        reportData?.historicoConsultaVeicular?.ultimaConsulta ||
                          "-",
                        // Histórico de Consulta - Total de Consultas: response.body.data.historicoConsultaVeicular.total
                        reportData?.historicoConsultaVeicular?.total?.toString() ||
                          "-",
                      ],
                    ]}
                  />
                </ReportSection>
              </>
            )}

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
