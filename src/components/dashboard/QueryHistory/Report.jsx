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
import {
  isSummaryBoxVisible,
  filterTwoColumnFields,
} from "../../../utils/reportFieldFilter";

const Report = ({ data, onClose, loading }) => {
  const reportRef = useRef(null);

  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Extract plan name from data
  const planName = data?.planName || "light";
  // Helper function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "Nada Consta";
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
        <div className="grid grid-cols-2 gap-4">{children}</div>
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
  let queryId = "Nada Consta";
  // let status = "N/A";

  if (responseItem?.response?.body?.data) {
    reportData = responseItem.response.body.data;
    consultationDate = responseItem.response.body.headerInfos?.date
      ? formatDate(responseItem.response.body.headerInfos.date)
      : formatDate(responseItem.requested_at || new Date().toISOString());
    // ID da consulta: response.body._id
    queryId = responseItem._id || "Nada Consta";
    // Status da consulta: response.status → "Em processamento" if status_code !== 200
    status = responseItem.status_code === 200 ? "Sucesso" : "Em processamento";
  } else if (responseItem?.body?.data) {
    reportData = responseItem.body.data;
    consultationDate = responseItem.body.headerInfos?.date
      ? formatDate(responseItem.body.headerInfos.date)
      : formatDate(new Date().toISOString());
    // ID da consulta: response.body._id
    queryId = responseItem._id || "Nada Consta";
    // Status da consulta: response.status → "Em processamento" if status_code !== 200
    status = responseItem.status_code === 200 ? "Sucesso" : "Em processamento";
  } else if (responseItem?.data) {
    reportData = responseItem.data;
    queryId = responseItem._id || "Nada Consta";
    status = responseItem.status_code === 200 ? "Sucesso" : "Em processamento";
  } else if (responseItem?.response?.body) {
    reportData = responseItem.response.body;
    queryId = responseItem._id || "Nada Consta";
    status = responseItem.status_code === 200 ? "Sucesso" : "Em processamento";
  } else {
    reportData = responseItem;
    queryId = responseItem?._id || "Nada Consta";
    status = responseItem?.status_code === 200 ? "Sucesso" : "Em processamento";
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
  const plate = reportData?.placa || "";

  const make =
    reportData.marcaModelo?.split("/")[0] ||
    reportData.dadosBasicosDoVeiculo?.marca ||
    "Nada Consta";
  const model =
    reportData.marcaModelo?.split("/")[1] ||
    reportData.dadosBasicosDoVeiculo?.descricao ||
    "Nada Consta";
  const chassis =
    reportData.chassi || reportData.baseEstadual?.chassi || "Nada Consta";
  // const year =
  //   reportData.anoModelo || reportData.baseEstadual?.anoModelo || "N/A";
  const color =
    reportData.corVeiculo || reportData.baseEstadual?.cor || "Nada Consta";
  const fuel =
    reportData.combustivel ||
    reportData.baseEstadual?.combustivel ||
    "Nada Consta";
  const baseEstadual = reportData.baseEstadual || {};
  const baseNacional = reportData.baseNacional || {};
  const decodificador = reportData.decodificadorPrecificador || {};
  const precificadorI = decodificador.precificadorI?.[0] || {};
  const precificadorII = decodificador.precificadorII?.[0] || {};
  const codigoFipe =
    reportData.codigoFipe?.[0]?.codigo ||
    precificadorI?.codigo ||
    "Nada Consta";

    // Valor FIPE: response.body.data.dadosBasicosDoVeiculo.informacoesFipe.0.valorAtual
    const valorFipe = reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
      ?.valorAtual
      ? reportData.dadosBasicosDoVeiculo.informacoesFipe[0].valorAtual
      : "Nada Consta";
    // Formatted for display in BRL (R$ XX.XXX,XX)
    const valorFipeFormatted =
      valorFipe && valorFipe !== "Nada Consta"
        ? formatCurrency(parseCurrency(valorFipe))
        : "Nada Consta";
  const valorAtual = precificadorII?.valor
    ? formatCurrency(parseCurrency(precificadorII.valor))
    : "Nada Consta";

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
        sixMonths: "Nada Consta",
        twelveMonths: "Nada Consta",
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
    let sixMonthsVal = "Nada Consta";
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
    let twelveMonthsVal = "Nada Consta";
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
      years[firstYear] = "Nada Consta"; // First year can't be calculated (no previous year data)
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
        years[year] = "Nada Consta";
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
          years[calcCurrentYear] = "Nada Consta";
        }
      } else {
        years[calcCurrentYear] = "Nada Consta";
      }
    } else if (yearKeys?.includes(calcCurrentYear)) {
      // If current year is in data but we don't have valorAtual, show N/A
      years[calcCurrentYear] = "Nada Consta";
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
    : "Nada Consta";

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
        trimmed === "0,00" ||
        trimmed === "n/a" ||
        trimmed === "nao" ||
        trimmed === "não" ||
        trimmed === "null" ||
        trimmed === "nada consta" ||
        trimmed?.toLowerCase()?.includes("nao existe") ||
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
  // Sinistro: response.body.data.indicioSinistro.id
  // If ID field doesn't exist inside indicioSinistro → "Não" (blue)
  // If ID field exists → "Sim" (red)
  const hasSinistro = (() => {
    const indicioSinistro = reportData.indicioSinistro;
    // Check if indicioSinistro exists and has an id field
    if (!indicioSinistro) {
      return "Não";
    }
    // Check if id field exists (regardless of its value)
    if (indicioSinistro.id !== undefined) {
      return "Sim";
    }
    // If id doesn't exist, return "Não"
    return "Não";
  })();
  // Bancos, Financeiras ou seguradoras: response.body.data.baseEstadual.restricaoFinanceira
  const hasBancosFinanceiras = checkSimNao(baseEstadual.restricaoFinanceira);
  
  // Restrições nacionais: response.body.data.restricoes
  //const hasRestricoesNacionais = checkSimNao(reportData.restricoes);

  const comunicacaovnac = baseNacional.indicadorComunicacaoVendas?.toUpperCase().trim();
  const restricaofnac = baseNacional.restricaoFinanciadora?.toUpperCase().trim();
  const restricao1nac = baseNacional.restricao1?.toUpperCase().trim();

  const hasRestricoesNacionais =
  comunicacaovnac === "CONSTA COMUNICACAO DE VENDAS" ||
  restricao1nac === "ALIENACAO FIDUCIARIA" ||
  restricao1nac === "ALTERACAO DOC" ||
  restricao1nac === "RENAINF" ||
  restricao1nac === "RESTRICAO ADMINISTRATIVA" ||
  restricaofnac === "CONSTA RESTRICAO ADMINISTRATIVA" ||
  restricaofnac === "ALIENACAO FIDUCIARIA"
    ? "Sim"
    : !comunicacaovnac || comunicacaovnac === "NAO" || comunicacaovnac === "NADA CONSTA" 
    ? "Não"
    : !restricao1nac || restricao1nac === "NADA CONSTA" 
    ? "Não"
    : !restricaofnac || restricaofnac === "NADA CONSTA" 
    ? "Não"
    : "Não"; 
  
  // Restrições estaduais: response.body.data.baseEstadual.existeDebitoMulta
  //const hasRestricoesEstaduais = checkSimNao(baseEstadual.existeDebitoMulta)  || checkSimNao(baseEstadual.comunicacaoVenda);
  
  // Estava o parâmetro anterior, entretanto, temos N condições que o atual fornecedor não traz em uma única variável, sendo assim, a condição abaixo foi criada
  const comunicacaov = baseEstadual.comunicacaoVenda?.toUpperCase().trim();
  const restricaof = baseEstadual.restricaoFinanceira?.toUpperCase().trim();
  const resadministrativa = baseEstadual.restricaoAdminisrativa?.toUpperCase().trim();

  const hasRestricoesEstaduais =
  comunicacaov === "CONSTA COMUNICACAO DE VENDAS" ||
  resadministrativa === "CONSTA RESTRICAO ADMINISTRATIVA" ||
  restricaof === "ALIENACAO FIDUCIARIA"
    ? "Sim"
    : !comunicacaov || comunicacaov === "NAO CONSTA COMUNICACAO DE VENDAS"
    ? "Não"
    : !resadministrativa || resadministrativa === "NADA CONSTA"
    ? "Não"
    : !restricaof || restricaof === "NADA CONSTA"
    ? "Não"
    : "Não"; 
  
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
  // Check all items in gravame array - if any has observacoes="Atual", show "Sim"
  const hasAlertaGravame = reportData?.gravame?.some(
    (g) => g?.observacoes === "Atual"
  )
    ? "Sim"
    : "Não";
  // Historico de Roubo: response.body.data.rouboFurto.constaOcorrenciaAtiva
  const hasHistoricoRoubo = checkSimNao(
    reportData.rouboFurto?.constaOcorrenciaAtiva
  );
  // CSV: response.body.data.csv
  // If null, show "Não" (blue). If has any information, show "Sim" (red).
  const hasCSV = (() => {
    const csv = reportData.csv;
    // If null or undefined, show "Não" (blue)
    if (csv === null || csv === undefined) {
      return "Não";
    }
    // If it's an array, check if it has items
    if (Array.isArray(csv)) {
      return csv.length > 0 ? "Sim" : "Não";
    }
    // If it has any truthy value, show "Sim" (red)
    if (csv) {
      return "Sim";
    }
    // Otherwise (empty string, false, etc.), show "Não" (blue)
    return "Não";
  })();
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
  const leilaoScoreAceitacao = leilaoScore.aceitacao || "Nada Consta";
  const nivelRisco =
    leilaoScoreAceitacao !== "Nada Consta"
      ? parseInt(leilaoScoreAceitacao) || 0
      : 0;
  // Exigência de Vistoria Especial (Barra exigencia de vistoria): response.body.data.leilao.score.percentualSobreRef
  const leilaoScoreExigenciaVistoria =
    leilaoScore.exigenciaVistoriaEspecial || null;
  // Convert to low/high: if value exists and is a number, use it; otherwise check if it's a string "low"/"high"
  const exigenciaVistoriaEspecial =
    leilaoScoreExigenciaVistoria !== null &&
    leilaoScoreExigenciaVistoria !== "Nada Consta"
      ? parseInt(leilaoScoreExigenciaVistoria) || 0
      : null;
  // Percentual sobre Tabela FIPE: response.body.data.leilao.score.percentualSobreRef
  const leilaoScorePercentualRef =
    leilaoScore.percentualSobreRef || "Nada Consta";
  const percentualSobreRef =
    leilaoScorePercentualRef !== "Nada Consta"
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

  const analiseRiscoScore = reportData?.analiseRisco?.indiceRisco || null;
  const analiseRiscoScoreValue =
    analiseRiscoScore === "1"
      ? 0
      : analiseRiscoScore === "2"
      ? 50
      : analiseRiscoScore === "3"
      ? 90
      : null;

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

  // Helper function to generate PDF and return as Blob
  const generatePDFBlob = async () => {
    const element = reportRef.current;

    // 🔧 Ensure full content is visible
    // Using scale: 1.2 for good quality while keeping file size reasonable
    // Lower scale = smaller file, but scale 1.2 maintains good readability
    const canvas = await html2canvas(element, {
      scale: 1.2,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      useCORS: true,
      logging: false, // Disable logging for better performance
      backgroundColor: "#ffffff", // Ensure white background
    });

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

      // Use JPEG format with compression to reduce file size (quality: 0.85 = 85% quality)
      const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.85);
      const pageImgHeight = contentHeightOnPage;

      // Add image to PDF with margins
      pdf.addImage(
        pageImgData,
        "JPEG",
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

    // Return PDF as Blob
    return pdf.output("blob");
  };

  // Function to generate and download PDF
  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const pdfBlob = await generatePDFBlob();

      // Generate filename
      const fileName = `Relatorio_${plate || "Veiculo"}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Error downloading PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Function to share report
  const shareReport = async () => {
    setSharing(true);
    try {
      // Generate PDF as Blob
      const pdfBlob = await generatePDFBlob();

      // Generate filename
      const fileName = `Relatorio_${plate || "Veiculo"}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      // Create File object from Blob
      const pdfFile = new File([pdfBlob], fileName, {
        type: "application/pdf",
      });

      // Check if Web Share API is available and supports files
      if (navigator.share) {
        const shareData = {
          title: `Relatório Veicular - Placa ${plate || "N/A"}`,
          text: `Confira o relatório completo do veículo.`,
          files: [pdfFile],
        };

        // Check if we can share files (if canShare is available)
        if (navigator.canShare && navigator.canShare(shareData)) {
          try {
            await navigator.share(shareData);
            toast.success("Relatório compartilhado com sucesso!");
            return;
          } catch (error) {
            // User cancelled or error occurred
            if (error.name === "AbortError") {
              // User cancelled, don't show error
              return;
            }
            console.error("Error sharing file:", error);
            // Fall through to URL sharing fallback
          }
        } else if (!navigator.canShare) {
          // If canShare is not available, try sharing anyway (some browsers support it but don't have canShare)
          try {
            await navigator.share(shareData);
            toast.success("Relatório compartilhado com sucesso!");
            return;
          } catch (error) {
            // If file sharing fails, fall through to URL sharing
            if (error.name !== "AbortError") {
              console.warn(
                "File sharing not supported, falling back to URL:",
                error
              );
            } else {
              return; // User cancelled
            }
          }
        }
      }

      // Fallback: Try sharing URL if file sharing is not supported
      // Always get queryId from the URL path (source of truth)
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      let currentQueryId = null;

      // Find the queryId in the path (should be after "/report/")
      const reportIndex = pathParts.indexOf("report");
      if (reportIndex !== -1 && pathParts.length > reportIndex + 1) {
        currentQueryId = pathParts[reportIndex + 1];
      }

      // Fallback: try to get from the last path segment
      if (!currentQueryId && pathParts.length > 0) {
        const lastSegment = pathParts[pathParts.length - 1];
        if (lastSegment && lastSegment !== "report") {
          currentQueryId = lastSegment;
        }
      }

      if (currentQueryId) {
        // Generate shareable URL
        const baseUrl = window.location.origin;
        const shareUrl = `${baseUrl}/report/${currentQueryId}?planName=${planName}`;

        // Try Web Share API with URL
        if (navigator.share) {
          try {
            await navigator.share({
              title: `Relatório Veicular - Placa ${plate || "N/A"}`,
              text: `Confira o relatório completo do veículo.`,
              url: shareUrl,
            });
            toast.success("Link compartilhado com sucesso!");
            return;
          } catch (error) {
            // User cancelled or error occurred, fall back to clipboard
            if (error.name !== "AbortError") {
              console.error("Error sharing:", error);
            }
          }
        }

        // Fallback: Copy to clipboard
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Link copiado para a área de transferência!");
        } catch (error) {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = shareUrl;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
            toast.success("Link copiado para a área de transferência!");
          } catch (err) {
            toast.error(
              "Não foi possível copiar o link. Por favor, copie manualmente."
            );
            // Show the URL in an alert as last resort
            prompt("Copie o link do relatório:", shareUrl);
          }
          document.body.removeChild(textArea);
        }
      } else {
        // If we can't get queryId, trigger download as fallback
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.info(
          "PDF baixado. Você pode compartilhar o arquivo manualmente."
        );
      }
    } catch (error) {
      console.error("Error sharing report:", error);
      toast.error("Erro ao compartilhar relatório. Tente novamente.");
    } finally {
      setSharing(false);
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
    <div className="h-screen overflow-auto rounded-xl py-4 ">
      <div className=" mx-auto max-w-[1080px] ">
        <div
          ref={reportRef}
          data-pdf-content
          className="bg-white space-y-6 custom-scrollbar  w-[1050px] mx-auto"
        >
          {/* Header Section */}
          <div className="bg-[#194D9A] border-b-6 border-yellow-300 flex justify-between items-center gap-2 h-[210px] text-white p-2 mb-6">
            <div className="w-[25%] h-full relative p-2 ">
              <img src="/reportLogo.png" alt="" className="h-full mx-auto" />
              <span className="text-yellow-300 absolute bottom-7 right-0 left-0 mx-auto w-fit text-[2.5rem]  ">
                {plate.slice(0, 9)}
              </span>
            </div>
            <div className="flex flex-col w-[75%] gap-2 justify-between h-full">
              <h1 className="text-yellow-300 text-[1.9rem] font-bold mt-2 whitespace-nowrap capitalize">
                Relatório Plano {data.planName} - Placa Verificada
              </h1>
              <div className="flex items-center justify-between overflow-hidden">
                <div className="flex gap-4">
                  {vehicleAge !== "Nada Consta" && (
                    <div className="bg-[#1AABFE] text-white p-2 rounded-xl flex items-center gap-2 w-[180px]">
                      <span className="text-3xl">
                        <TbInfoCircle />
                      </span>
                      <span className="flex flex-col text-sm whitespace-nowrap">
                        Idade do Veiculo{" "}
                        <strong>
                          {vehicleAge !== "Nada Consta"
                            ? `${vehicleAge} Anos`
                            : "Nada Consta"}
                        </strong>
                      </span>
                    </div>
                  )}

                  {valorFipe !== "Nada Consta" && (
                    <div className="bg-[#1AABFE] text-white p-2 rounded-lg flex items-center gap-2 text-sm w-[180px]">
                      <span className="text-3xl">
                        <AiFillDollarCircle />
                      </span>
                      <span className="flex flex-col text-sm whitespace-nowrap">
                        Valor FIPE <strong>{valorFipeFormatted}</strong>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <img
                    src={
                      reportData?.dadosBasicosDoVeiculo?.marca_logo ||
                      "/whiteLogo.svg"
                    }
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

            {/* Botões de compartilhamento no cabeçalho do relatório */}
            <div className="border-t-2 border-transparent pt-6 mt-6 flex flex-col items-end justify-center">
              <div className="flex  gap-4 justify-center">
                <button
                  disabled={downloading}
                  onClick={downloadPDF}
                  className="bg-[#194D9A] hover:bg-[#1AABFE] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {downloading ? "Baixando..." : "Baixar PDF"}
                </button>
                <button
                  onClick={shareReport}
                  disabled={sharing}
                  className="bg-[#1AABFE] hover:bg-[#1590d4] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {sharing ? "Compartilhando..." : "Compartilhar relatório"}
                </button>
              </div>
            </div>

          <div className="space-y-6 max-w-[88%] mx-auto">
            {/* Resumo IA - Only for Ultra and Premium */}
            {reportData.ia &&
              (planName === "ultra" || planName === "premium") &&
              renderAiSummary()}
            {/* Resumo da consulta - Block 2 mapping */}
            <div className="space-y-4">
              {renderSectionTitle("Resumo da consulta")}
           
              <div className="grid grid-cols-3 gap-3 gap-x-5">
                {isSummaryBoxVisible("Leilão", planName) &&
                  renderStatusBox("Leilão", hasLeilao, "/report/auction.png")}
                {isSummaryBoxVisible("Sinistro", planName) &&
                  renderStatusBox("Sinistro", hasSinistro, "/report/crash.png")}
                {isSummaryBoxVisible(
                  "Bancos, Financeiras ou seguradoras",
                  planName
                ) &&
                  renderStatusBox(
                    "Bancos, Financeiras ou seguradoras",
                    hasBancosFinanceiras,
                    "/report/bank.png"
                  )}
                {isSummaryBoxVisible("Restrições Nacionais", planName) &&
                  renderStatusBox(
                    "Restrições Nacionais",
                    hasRestricoesNacionais,
                    "/report/national.webp"
                  )}
                {isSummaryBoxVisible("Restrições Estaduais", planName) &&
                  renderStatusBox(
                    "Restrições Estaduais",
                    hasRestricoesEstaduais,
                    "/report/restrict.png"
                  )}
                {isSummaryBoxVisible("motor alterado", planName) &&
                  renderStatusBox(
                    "motor alterado",
                    hasMotorAlterado,
                    "/report/engine.png"
                  )}
                {isSummaryBoxVisible("Chassi remarcado", planName) &&
                  renderStatusBox(
                    "Chassi remarcado",
                    hasChassiRemarcado,
                    "/report/!.svg"
                  )}
                {isSummaryBoxVisible("Recall", planName) &&
                  renderStatusBox("Recall", hasRecall, "/report/tools.svg")}
                {isSummaryBoxVisible("Alerta de Gravame", planName) &&
                  renderStatusBox(
                    "Alerta de Gravame",
                    hasAlertaGravame,
                    "/report/alert.webp"
                  )}
                {isSummaryBoxVisible("Historico de Roubo", planName) &&
                  renderStatusBox(
                    "Historico de Roubo",
                    hasHistoricoRoubo,
                    "/report/theft.png"
                  )}
                {isSummaryBoxVisible("CSV", planName) &&
                  renderStatusBox("CSV", hasCSV, "/report/csv.png")}
                {isSummaryBoxVisible("RENAJUD", planName) &&
                  renderStatusBox("RENAJUD", hasRENAJUD, "/report/renajud.svg")}
                {isSummaryBoxVisible("Historico de multas RENAINF", planName) &&
                  renderStatusBox(
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
              {renderSectionTitle("Informações de Risco")}
              <div className="grid grid-cols-3 gap-6">
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
                    <p className="text-[#194D9A]">
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
                fields={filterTwoColumnFields(
                  {
                    left: [
                      // Marca / Modelo: response.body.data.marcaModelo
                      {
                        label: "Marca / Modelo",
                        value: reportData.marcaModelo || "Nada Consta",
                      },
                      // Cor: response.body.data.corVeiculo
                      {
                        label: "Cor",
                        value: reportData.corVeiculo || "Nada Consta",
                      },
                      // RENAVAM: response.body.data.renavam
                      {
                        label: "RENAVAM",
                        value:
                          reportData.renavam ||
                          baseEstadual.renavam ||
                          "Nada Consta",
                      },
                      // Tipo do Veículo: response.body.data.tipoVeiculo
                      {
                        label: "Tipo do Veículo",
                        value:
                          reportData.tipoVeiculo ||
                          baseEstadual.tipo ||
                          "Nada Consta",
                      },
                      // Nacionalidade: response.body.data.nacionalidade
                      {
                        label: "Nacionalidade",
                        value: reportData.nacionalidade || "Nada Consta",
                      },
                      // UF: response.body.data.uf
                      {
                        label: "UF",
                        value:
                          reportData.uf || baseEstadual.uf || "Nada Consta",
                      },
                      // Registro DI: response.body.data.registroDi - Only for Plus, Ultra, Premium
                      {
                        label: "Registro DI",
                        value:
                          reportData.registroDi ||
                          baseNacional.registroDi ||
                          "Nada Consta",
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
                              "Nada Consta",
                      },
                      // Placa: response.body.headerInfos.keys.placa
                      {
                        label: "Placa",
                        value:
                          responseItem?.response?.body?.headerInfos?.keys
                            ?.placa ||
                          reportData.placa ||
                          "Nada Consta",
                      },
                      // Combustível: response.body.data.combustivel
                      {
                        label: "Combustível",
                        value:
                          reportData.combustivel ||
                          baseEstadual.combustivel ||
                          "Nada Consta",
                      },
                      //  motor: response.body.data.numMotor
                      {
                        label: "Número do motor",
                        value:
                          reportData.numMotor ||
                          baseEstadual.motor ||
                          "Nada Consta",
                      },

                      // Chasi: response.body.data.chassi
                      {
                        label: "Chassi",
                        value:
                          reportData.chassi ||
                          baseEstadual.chassi ||
                          "Nada Consta",
                      },

                      // Município: response.body.data.municipio
                      {
                        label: "Município",
                        value:
                          reportData.municipio ||
                          baseEstadual.municipio ||
                          "Nada Consta",
                      },
                    ],
                  },
                  planName
                )}
              />
            </ReportSection>

            {/* Block 5: Dados Básicos */}
            <ReportSection title="Dados Básicos">
              <TwoColumnFieldSection
                fields={filterTwoColumnFields(
                  {
                    left: [
                      // Caixa Câmbio: response.body.data.caixaCambio
                      {
                        label: "Caixa Câmbio",
                        value: reportData.caixaCambio || "Nada Consta",
                      },
                      // Cilindradas: response.body.data.cilindradas
                      {
                        label: "Cilindradas",
                        value: reportData.cilindradas || "Nada Consta",
                      },
                      // Número 3º Eixo: response.body.data.numTerceiroEixo
                      {
                        label: "Número 3º Eixo",
                        value: reportData.numTerceiroEixo || "Nada Consta",
                      },

                      // Potência: response.body.data.potencia
                      {
                        label: "Potência",
                        value: reportData.potencia || "Nada Consta",
                      },
                      // Peso Bruto: response.body.data.pbt
                      {
                        label: "Peso Bruto",
                        value: reportData.pbt || "Nada Consta",
                      },
                    ],
                    right: [
                      // Capacidade Máxima de tração: response.body.data.capMaxTracao
                      {
                        label: "Capacidade Máxima de tração",
                        value: reportData.capMaxTracao || "Nada Consta",
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
                        value: reportData.tipoCarroceria || "Nada Consta",
                      },

                      // Capacidade de Passageiros: response.body.data.capacidadePassageiro
                      {
                        label: "Capacidade de Passageiros",
                        value: reportData.capacidadePassageiro || "Nada Consta",
                      },
                    ],
                  },
                  planName
                )}
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
                    formatDate(item.dataLeilao) || "-",
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
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className="text-gray-800">
                    {reportData?.leilao?.descricao || "Nada Consta"}
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
                  <p className="text-[#194D9A]">Nada Consta</p>
                </div>
              )}
            </ReportSection>

            {/* Block 8: Indício de Sinistro */}
            <ReportSection title="Indício de Sinistro">
              <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                {/* inside the box: response.body.data.indicioSinistro.descricao */}
                <p className="text-[#194D9A] ">
                  {reportData?.indicioSinistro?.descricao || "Nada Consta"}
                </p>
              </div>
            </ReportSection>

            {/* Block 9: Apontamentos em Bancos, Financeiras ou Seguradoras */}
            <ReportSection title="Apontamentos em Bancos, Financeiras ou Seguradoras">
              <div className="flex  gap-6 h-[215px]">
                {analiseRiscoScoreValue !== null ? (
                  <div className="shrink-0 w-[30%] h-full">
                    {renderGauge({
                      label: "",
                      value: analiseRiscoScoreValue,
                    })}
                  </div>
                ) : (
                  <div className="shrink-0 w-[30%] h-full flex items-center justify-center border-2 border-[#1AABFE]/80 rounded-xl bg-white">
                    <p className="text-gray-800">Nada Consta</p>
                  </div>
                )}
                <div className="w-[70%] h-full flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                  <div className="space-y-3">
                    {/* Placa: response.body.data.leilao.registros[0].placa */}
                    <ReportField
                      label="Placa"
                      value={reportData?.placa || plate || "Nada Consta"}
                    />
                    {/* Chasi: response.body.data.leilao.registros[0].chassi */}
                    <ReportField
                      label="Chassi"
                      value={reportData?.chassi || chassis || "Nada Consta"}
                    />
                    <ReportField
                      label="Análise"
                      value={
                        reportData?.analiseRisco?.parecer ||
                        "Não consta informações nas bases consultadas."
                      }
                    />
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
                    reportData?.remarketing?.leilao?.organizador || "-",
                    // Vendedor: response.body.data.remarketing.leilao.vendedor
                    reportData?.remarketing?.leilao?.vendedor || "-",
                    // Data evento: response.body.data.remarketing.leilao.dataEvento
                    reportData?.remarketing?.leilao?.dataEvento
                      ? formatDate(reportData?.remarketing?.leilao?.dataEvento)
                      : "-",
                    // Condições do veículo: response.body.data.remarketing.leilao.condicoesVeiculo
                    reportData?.remarketing?.leilao?.condicoesVeiculo || "-",
                    // Situação chassi: response.body.data.remarketing.leilao.situacaoChassi
                    reportData?.remarketing?.leilao?.situacaoChassi || "-",
                    // Condições motor: response.body.data.remarketing.leilao.condicoesMotor
                    reportData?.remarketing?.leilao?.condicoesMotor || "-",
                    // Condições câmbio: response.body.data.remarketing.leilao.condicoesCambio
                    reportData?.remarketing?.leilao?.condicoesCambio || "-",
                    // Condições mecânicas: response.body.data.remarketing.leilao.condicoesMecanica
                    reportData?.remarketing?.leilao?.condicoesMecanica || "-",
                    // Observação: response.body.data.remarketing.leilao.observacao
                    reportData?.remarketing?.leilao?.observacao || "-",
                  ],
                ]}
              />
            </ReportSection>

            {/* Block 11: Remarketing - Dados do veículo */}
            <ReportSection title="Remarketing - Dados do veículo">
              {(() => {
                const r = reportData?.remarketing;

                if (!r) {
                  return (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center">
                      <p className="text-gray-500">
                        Informações não encontradas nas bases consultadas
                      </p>
                    </div>
                  );
                }

                // Flatten fields from remarketing and its checklist
                const fieldsToCheck = [
                  r?.renavam,
                  r?.situacaoChassi,
                  r?.marcamodelo || r?.marcaModelo,
                  r?.segmento,
                  r?.placa,
                  r?.motor || r?.nummotor,
                  r?.chassi,
                  r?.subSegmento,
                  r?.observacao,
                  r?.checklist?.dataInspecao,
                  r?.checklist?.garantia,
                  // Optionally: include other checklist fields if needed
                  ...(r?.checklist ? Object.values(r.checklist) : []),
                ];

                // Check if all are null, undefined, empty, or empty arrays
                const allEmpty = fieldsToCheck.every(
                  (v) =>
                    v === null ||
                    v === undefined ||
                    v === "" ||
                    (Array.isArray(v) && v.length === 0)
                );

                return allEmpty ? (
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center">
                    <p className="text-gray-500">
                      Informações não encontradas nas bases consultadas
                    </p>
                  </div>
                ) : (
                  <TwoColumnFieldSection
                    fields={{
                      left: [
                        {
                          label: "RENAVAM",
                          value: r?.renavam || "Nada Consta",
                        },
                        {
                          label: "Situação Chassi",
                          value: r?.situacaoChassi || "Nada Consta",
                        },
                        {
                          label: "Marca / Modelo",
                          value:
                            r?.marcamodelo || r?.marcaModelo || "Nada Consta",
                        },
                        {
                          label: "Segmento",
                          value: r?.segmento || "Nada Consta",
                        },
                        {
                          label: "Data da Inspeção",
                          value: r?.checklist?.dataInspecao || "Nada Consta",
                        },
                        {
                          label: "Garantia",
                          value: r?.checklist?.garantia || "Nada Consta",
                        },
                      ],
                      right: [
                        { label: "Placa", value: r?.placa || "Nada Consta" },
                        {
                          label: "Motor",
                          value: r?.nummotor || r?.motor || "Nada Consta",
                        },
                        { label: "Chassi", value: r?.chassi || "Nada Consta" },
                        {
                          label: "Auto Sub segmento",
                          value: r?.subSegmento || "Nada Consta",
                        },
                        {
                          label: "Observação",
                          value: r?.observacao || "Nada Consta",
                        },
                      ],
                    }}
                  />
                );
              })()}
            </ReportSection>

            {/* Block 12: Fotos */}
            <ReportSection title="Fotos">
              {(() => {
                // Check all three mappings for photos
                // 1. response.body.data.remarketing.checklist.fotos
                // 2. response.body.data.anuncio.fotos
                // 3. response.body.data.fotos
                const fotosFromRemarketing =
                  reportData?.remarketing?.checklist?.fotos;
                const fotosFromAnuncio = reportData?.anuncio?.fotos;
                const fotosFromData = reportData?.fotos;

                // Collect all photos from all three locations
                const allFotos = [];

                // Helper function to check if a photo is valid
                const isValidPhoto = (foto) => {
                  if (!foto) return false;
                  if (typeof foto === "string") {
                    return (
                      foto.trim().length > 0 &&
                      foto !== "null" &&
                      foto !== "undefined"
                    );
                  }
                  if (typeof foto === "object") {
                    const url = foto.url || foto.src || foto;
                    return (
                      url &&
                      typeof url === "string" &&
                      url.trim().length > 0 &&
                      url !== "null" &&
                      url !== "undefined"
                    );
                  }
                  return false;
                };

                // Helper function to extract URL from photo
                const getPhotoUrl = (foto) => {
                  if (typeof foto === "string") return foto;
                  return foto.url || foto.src || foto;
                };

                // Check remarketing.checklist.fotos
                if (fotosFromRemarketing) {
                  if (
                    Array.isArray(fotosFromRemarketing) &&
                    fotosFromRemarketing.length > 0
                  ) {
                    fotosFromRemarketing.forEach((foto) => {
                      if (isValidPhoto(foto)) {
                        allFotos.push(foto);
                      }
                    });
                  } else if (
                    !Array.isArray(fotosFromRemarketing) &&
                    isValidPhoto(fotosFromRemarketing)
                  ) {
                    allFotos.push(fotosFromRemarketing);
                  }
                }

                // Check anuncio.fotos
                if (fotosFromAnuncio) {
                  if (
                    Array.isArray(fotosFromAnuncio) &&
                    fotosFromAnuncio.length > 0
                  ) {
                    fotosFromAnuncio.forEach((foto) => {
                      if (isValidPhoto(foto)) {
                        allFotos.push(foto);
                      }
                    });
                  } else if (
                    !Array.isArray(fotosFromAnuncio) &&
                    isValidPhoto(fotosFromAnuncio)
                  ) {
                    allFotos.push(fotosFromAnuncio);
                  }
                }

                // Check fotos (direct)
                if (fotosFromData) {
                  if (
                    Array.isArray(fotosFromData) &&
                    fotosFromData.length > 0
                  ) {
                    fotosFromData.forEach((foto) => {
                      if (isValidPhoto(foto)) {
                        allFotos.push(foto);
                      }
                    });
                  } else if (
                    !Array.isArray(fotosFromData) &&
                    isValidPhoto(fotosFromData)
                  ) {
                    allFotos.push(fotosFromData);
                  }
                }

                // Remove duplicates (if any) based on URL
                const seenUrls = new Set();
                const uniqueFotos = allFotos.filter((foto) => {
                  const url = getPhotoUrl(foto);
                  if (!url || seenUrls.has(url)) {
                    return false;
                  }
                  seenUrls.add(url);
                  return true;
                });

                if (uniqueFotos.length > 0) {
                  return (
                    <div className="grid grid-cols-4 gap-4">
                      {uniqueFotos.map((foto, index) => {
                        const photoUrl = getPhotoUrl(foto);
                        return (
                          <img
                            key={index}
                            src={photoUrl}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border-2 border-[#1AABFE]/80"
                            onError={(e) => {
                              // Hide broken images
                              e.target.style.display = "none";
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                } else {
                  return (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center ">
                      <p className="text-gray-500">
                        Informações não encontradas nas bases consultadas
                      </p>
                    </div>
                  );
                }
              })()}
            </ReportSection>

            {/* Block 13: Histórico de KMs */}
            <ReportSection title="Histórico de KMs">
              {reportData?.historicoKm && reportData.historicoKm.length > 0 ? (
                <ReportTableSection
                  headers={["Data", "Odômetro"]}
                  rows={reportData.historicoKm.map((item) => [
                    // Data: response.body.data.historicoKm.0.dataInclusao
                    formatDate(item.dataInclusao) || "-",
                    // Odômetro: response.body.data.historicoKm.0.km
                    item.km ? `${item.km} km` : "-",
                  ])}
                />
              ) : (
                <ReportTableSection
                  headers={["Data", "Odômetro"]}
                  rows={[["-", "-"]]}
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
                    fields={filterTwoColumnFields(
                      {
                        left: [
                          // Ano Modelo: response.body.data.baseNacional.anoModelo
                          { label: "Placa", value: plate },
                          {
                            label: "Ano Modelo",
                            value:
                              baseNacional.anoModelo ||
                              reportData.anoModelo ||
                              "Nada Consta",
                          },

                          // Marca: response.body.data.dadosBasicosDoVeiculo.marca
                          {
                            label: "Marca",
                            value:
                              reportData.dadosBasicosDoVeiculo?.marca ||
                              make ||
                              "Nada Consta",
                          },
                          // Modelo: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].modelo
                          {
                            label: "Modelo",
                            value:
                              reportData.dadosBasicosDoVeiculo
                                ?.informacoesFipe?.[0]?.modelo ||
                              model ||
                              "Nada Consta",
                          },
                          // Versão: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].versao
                          {
                            label: "Versão",
                            value:
                              reportData.dadosBasicosDoVeiculo
                                ?.informacoesFipe?.[0]?.versao ||
                              decodificador.versao ||
                              "Nada Consta",
                          },
                          // Código FIPE: response.body.data.dadosBasicosDoVeiculo.codigoFipe
                          {
                            label: "Código FIPE",
                            value:
                              reportData.dadosBasicosDoVeiculo?.codigoFipe ||
                              codigoFipe ||
                              "Nada Consta",
                          },
                          // Região Geográfica: response.body.data.decodificadorPrecificador.regiao
                          {
                            label: "Região Geográfica",
                            value:
                              decodificador.regiao ||
                              reportData.decodificadorPrecificador?.regiao ||
                              "Nada Consta",
                          },
                          // País: response.body.data.decodificadorPrecificador.pais
                          {
                            label: "País",
                            value:
                              decodificador.pais ||
                              reportData.decodificadorPrecificador?.pais ||
                              "Nada Consta",
                          },
                          // Tipo Veículo: response.body.data.baseNacional.tipoVeiculo
                          {
                            label: "Tipo Veículo",
                            value:
                              baseNacional.tipoVeiculo ||
                              reportData.tipoVeiculo ||
                              "Nada Consta",
                          },
                          // Peso Bruto Total: response.body.data.decodificadorPrecificador.pesoBruto
                          {
                            label: "Peso Bruto Total",
                            value:
                              decodificador.pesoBruto ||
                              reportData.decodificadorPrecificador?.pesoBruto ||
                              reportData.pbt ||
                              "Nada Consta",
                          },
                          // Capacidade Carga: response.body.data.dadosBasicosDoVeiculo.capacidadeCarga
                          {
                            label: "Capacidade Carga",
                            value:
                              reportData.dadosBasicosDoVeiculo
                                ?.capacidadeCarga ||
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
                              "Nada Consta",
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
                              "Nada Consta",
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
                              "Nada Consta",
                          },
                          // Cilindradas: response.body.data.dadosBasicosDoVeiculo.cilindradas
                          {
                            label: "Cilindradas",
                            value:
                              reportData.dadosBasicosDoVeiculo?.cilindradas ||
                              reportData.cilindradas ||
                              "Nada Consta",
                          },
                          // Código Versão: (no path provided in mapping, keeping existing)
                          {
                            label: "Código Versão",
                            value:
                              reportData.codigoMarcaModelo || "Nada Consta",
                          },
                          // Valor atual: response.body.data.dadosBasicosDoVeiculo.informacoesFipe[0].valorAtual
                          {
                            label: "Valor atual",
                            value: reportData.dadosBasicosDoVeiculo
                              ?.informacoesFipe?.[0]?.valorAtual
                              ? formatCurrency(
                                  parseCurrency(
                                    reportData.dadosBasicosDoVeiculo.informacoesFipe[0].valorAtual
                                  )
                                )
                              : valorAtual || "Nada Consta",
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
                              "Nada Consta",
                          },
                          {
                            label: "Potência",
                            value:
                              reportData.dadosBasicosDoVeiculo?.potencia ||
                              reportData.potencia ||
                              "Nada Consta",
                          },
                          // Capacidade Máxima Tração: response.body.data.dadosBasicosDoVeiculo.capMaxTracao
                          {
                            label: "Capacidade Máxima Tração",
                            value:
                              reportData.dadosBasicosDoVeiculo?.capMaxTracao ||
                              reportData.capMaxTracao ||
                              "Nada Consta",
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
                              "Nada Consta",
                          },
                        ],
                      },
                      planName,
                      "Decodificador de Chassi - Dados Básicos"
                    )}
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
                        if (
                          firstYearValue === "Nada Consta" ||
                          !firstYearValue
                        ) {
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
                                earlierYearValue !== "Nada Consta"
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
                          (year) => valuations.years[year] || "Nada Consta"
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
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada ")
                        )}
                        {/* Restrição 1: response.body.data.baseNacional.restricao1 */}
                        {renderField(
                          "Restrição 1",
                          reportData?.baseNacional?.restricao1 || "Nada consta",
                          reportData?.baseNacional?.restricao1 &&
                            !reportData?.baseNacional?.restricao1
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada")
                        )}

                        {/* Restrição 3: response.body.data.baseNacional.restricao3 */}
                        {renderField(
                          "Restrição 3",
                          reportData?.baseNacional?.restricao3 || "Nada consta",
                          reportData?.baseNacional?.restricao3 &&
                            !reportData?.baseNacional?.restricao3
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada ")
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
                              ?.includes("não") &&
                            !reportData?.baseNacional?.ocorrencia
                              ?.toLowerCase()
                              ?.includes("nao")
                        )}

                        {/* Restrição 2: response.body.data.baseNacional.restricao2 */}
                        {renderField(
                          "Restrição 2",
                          reportData?.baseNacional?.restricao2 || "Nada consta",
                          reportData?.baseNacional?.restricao2 &&
                            !reportData?.baseNacional?.restricao2
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada")
                        )}
                        {/* Restrição 4: response.body.data.baseNacional.restricao4 */}
                        {renderField(
                          "Restrição 4",
                          reportData?.baseNacional?.restricao4 || "Nada consta",
                          reportData?.baseNacional?.restricao4 &&
                            !reportData?.baseNacional?.restricao4
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada")
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
                          reportData?.baseNacional?.docFaturado || "Nada Consta"
                        )}
                        {/* Tipo Documento Faturado: response.body.data.faturamento.tipoDocumentoFaturado */}
                        {renderField(
                          "Tipo Documento Faturado",
                          reportData?.baseNacional?.tipoDocFaturado ||
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
                          reportData?.baseNacional?.documentoFaturado
                            ?.enderecos?.[0]?.cep || "Nada Consta"
                        )}
                      </div>
                      <div className="space-y-3">
                        {/* UF Faturado: response.body.data.faturamento.ufFaturado */}
                        {renderField(
                          "UF Faturado",
                          reportData?.baseNacional?.ufFaturado || "Nada Consta"
                        )}
                        {/* Razão Social: response.body.data.faturamento.razaoSocial */}
                        {renderField(
                          "Razão Social",
                          reportData?.baseNacional?.documentoFaturado
                            ?.razaoSocial || "Nada Consta"
                        )}

                        {/* Cidade: response.body.data.faturamento.cidade */}
                        {renderField(
                          "Cidade",
                          reportData?.baseNacional?.documentoFaturado
                            ?.enderecos?.[0]?.cidade || "Nada Consta"
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
                        !baseEstadual.debitoRenainf || baseEstadual.debitoRenainf.trim() === "0,00"
                            ? "Nada Consta"
                          : baseEstadual.debitoRenainf,
                          baseEstadual.debitoRenainf &&
                          baseEstadual.debitoRenainf.trim() !== "0,00" &&
                          baseEstadual.debitoRenainf.toLowerCase().trim() !== "nada consta"
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
                          baseEstadual?.existeDebitoDpvat?.includes(
                            "NAO EXISTE"
                          )
                            ? "Nada Consta"
                            : baseEstadual.existeDebitoDpvat || "Nada consta",
                          baseEstadual.existeDebitoDpvat &&
                            !baseEstadual.existeDebitoDpvat
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao")
                        )}
                        {/* Débitos Licenciamento: response.body.data.baseEstadual.existeDebitoLicenciamento */}
                        {renderField(
                          "Débitos Licenciamento",
                          baseEstadual?.existeDebitoLicenciamento?.includes(
                            "NAO EXISTE"
                          )
                            ? "Nada Consta"
                            : baseEstadual.existeDebitoLicenciamento ||
                                "Nada consta",
                          baseEstadual.existeDebitoLicenciamento &&
                            !baseEstadual?.existeDebitoLicenciamento
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao")
                        )}
                      </div>

                      <div className="space-y-3">
                        {/* Débitos IPVA: response.body.data.baseEstadual.existeDebitoIpva */}
                        {renderField(
                          "Débitos IPVA",
                          baseEstadual.existeDebitoIpva?.includes("NAO EXISTE")
                            ? "Nada Consta"
                            : baseEstadual.existeDebitoIpva || "Nada consta",
                          baseEstadual.existeDebitoIpva &&
                            !baseEstadual.existeDebitoIpva
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao")
                        )}
                        {/* Débitos Multa: response.body.data.baseEstadual.existeDebitoMulta */}
                        {renderField(
                          "Débitos Multa",
                          baseEstadual?.existeDebitoMulta?.includes(
                            "NAO EXISTE"
                          )
                            ? "Nada Consta"
                            : baseEstadual?.existeDebitoMulta || "Nada consta",
                          baseEstadual?.existeDebitoMulta &&
                            !baseEstadual?.existeDebitoMulta
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao")
                        )}
                      </div>
                    </>
                  )}
                  {renderWarningBox(
                    "Atenção! As informações de débitos e multas em nosso sistema podem não refletir o status atual do veículo consultado, podendo não trazer todos os débitos ou multas do veículo. Orientamos a todos a consultar o site do DETRAN e SECRETARIA DA FAZENDA da UF do veículo."
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
                        "Nada Consta"
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
                      </div>
                      <div className="space-y-3">
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
                            parseCurrency(baseEstadual.debitoMultas || "0,00")
                          );
                          const numericValue = parseCurrency(
                            baseEstadual.debitoMultas || "0,00"
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
                          item?.municipio || "-",
                          item?.uf || "-",
                          item?.anoExercicio || "-",
                          item?.proprietario || "-",
                          item?.data ? formatDate(item?.data) : "-",
                          item?.motivo || "-",
                        ])
                      : [["-", "-", "-", "-", "-", "-"]]
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
                        : "-",
                      reportData?.anuncio?.km
                        ? `${reportData?.anuncio?.km} KM`
                        : "-",
                      reportData?.anuncio?.valor
                        ? formatCurrency(reportData?.anuncio?.valor)
                        : "-",
                    ],
                  ]}
                />
                {/* Observação do Vendedor */}
                <ReportSection title="Observação do Vendedor">
                  {reportData?.anuncio?.observacao ? (
                    <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      {/* Observação do Vendedor: response.body.data.anuncio.observacao */}
                      <p className="text-[#194D9A] leading-relaxed">
                        {reportData?.anuncio?.observacao || "Nada Consta"}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 border-2 border-[#1AABFE]/80 text-[#194D9A] rounded-full p-4 py-2 bg-white">
                      Nada Consta
                    </div>
                  )}
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
                                : opcional.descricao ||
                                  opcional ||
                                  "Nada Consta"}
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
                                : opcional.descricao ||
                                  opcional ||
                                  "Nada Consta"}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 border-2 border-[#1AABFE]/80 text-[#194D9A] rounded-full p-4 py-2 bg-white">
                    Nada Consta
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
                          ?.veiculoComparativo?.[0]?.modelo || "-",
                        // Precificador - Valor de Mercado - Marca: response.body.data.comparativoEspecificacoes.veiculoComparativo.0.marca
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.marca || "-",
                        // Precificador - Valor de Mercado - Versão: response.body.data.dadosBasicosDoVeiculo.informacoesFipe.0.versao
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.versao || "-",
                        // Precificador - Valor de Mercado - Valor: response.body.data.dadosBasicosDoVeiculo.informacoesFipe.0.valorAtual
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual
                          ? formatCurrency(
                              parseCurrency(
                                reportData.dadosBasicosDoVeiculo
                                  .informacoesFipe[0].valorAtual
                              )
                            )
                          : "Nada Consta",
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
                        reportData?.dadosBasicosDoVeiculo?.codigoFipe || "-",
                        // FIPE - Combustível: response.body.data.dadosBasicosDoVeiculo.combustivel
                        reportData?.dadosBasicosDoVeiculo?.combustivel || "-",
                        // FIPE - Modelo: response.body.data.dadosBasicosDoVeiculo.modelo
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.modelo || "-",
                        // FIPE - Marca: response.body.data.dadosBasicosDoVeiculo.marca
                        reportData?.dadosBasicosDoVeiculo?.marca || "-",
                        // FIPE - Valor: response.body.data.cestaBasica.veiculosFipe[0].registros[0].valor
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual
                          ? formatCurrency(
                              parseCurrency(
                                reportData.dadosBasicosDoVeiculo
                                  .informacoesFipe[0].valorAtual
                              )
                            )
                          : "-",
                        // FIPE - Valor 0 KM: response.body.data.cestaBasica.veiculosFipe[0].registros[0].valorZeroKm
                        reportData?.cestaBasica?.veiculosFipe?.[0]
                          ?.registros?.[0]?.valorZeroKm
                          ? formatCurrency(
                              parseCurrency(
                                reportData.cestaBasica.veiculosFipe[0]
                                  .registros[0].valorZeroKm
                              )
                            )
                          : "Nada Consta",
                      ],
                    ]}
                  />
                </ReportSection>

                {/* Porcentagem sobre Tabela FIPE */}
                <ReportSection title="Porcentagem sobre Tabela FIPE em caso de leilão">
                  <div className="flex  gap-6 ">
                    <div className="shrink-0 w-[30%]">
                      {/* Porcentagem sobre Tabela FIPE - Percentual Máximo de Oferta: response.body.data.leilao.score.aceitacao */}
                      {(() => {
                        const percentualSobreRef =
                          reportData?.leilao?.score?.percentualSobreRef;
                        const isNull =
                          percentualSobreRef === null ||
                          percentualSobreRef === undefined;
                        return renderGauge({
                          label: "",
                          value: isNull ? 100 : percentualSobreRef,
                          invertColors: true,
                        });
                      })()}
                    </div>
                    <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      <div className="space-y-3">
                        <div className="mt-4">
                          <p className="text-sm  text-[#1AABFE] mb-2">
                            Esse veículo poderá receber uma oferta máxima de{" "}
                            {reportData?.leilao?.score?.percentualSobreRef ??
                              100}
                            % do preço do seu valor de tabela.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ReportSection>

                {/* Exigência de Vistoria Especial */}
                <ReportSection title="Exigência de Vistoria Especial">
                  <div className="flex  gap-6">
                    <div className="shrink-0 w-[30%]">
                      <BarGauge
                        value={
                          reportData?.leilao?.score
                            ?.exigenciaVistoriaEspecial || 0
                        }
                        min={0}
                        max={10}
                        label="Exigência de Vistoria Especial"
                      />
                    </div>
                    <div className="w-[70%] flex-1 border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      <div className="space-y-3">
                        {/* Exigência de Vistoria Especial (Barra exigencia de vistoria): response.body.data.leilao.score.percentualSobreRef */}
                        {(() => {
                          const exigenciaValue =
                            reportData?.leilao?.score
                              ?.exigenciaVistoriaEspecial;
                          const numericValue =
                            exigenciaValue === null ||
                            exigenciaValue === undefined
                              ? null
                              : parseInt(exigenciaValue) || 0;

                          let message = "";
                          if (numericValue === null || numericValue === 1) {
                            message =
                              "Este veículo possui uma pequena chance de vistoria especial, para a realização do seguro.";
                          } else if (numericValue >= 2 && numericValue <= 10) {
                            message =
                              "Este veículo possui uma chance de vistoria especial, para a realização do seguro.";
                          } else {
                            // Fallback for values outside the specified range
                            message =
                              "Este veículo possui uma chance de exigência de vistoria especial, para a realização do seguro.";
                          }

                          return (
                            <p className="text-sm text-[#1AABFE] mb-2">
                              {message}
                            </p>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </ReportSection>

                {/* Recall */}
                <ReportSection title="Recall">
                  {reportData?.recall?.detalhes?.every(
                    (item) => item?.data === null
                  ) ? (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className="text-[#1AABFE]">
                        Informação não encontrada nas bases consultadas
                      </p>
                    </div>
                  ) : (
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
                  )}
                </ReportSection>

                {/* Descrição Completa */}
                <ReportSection title="Descrição Completa">
                  <div
                    className={`border-2 border-[#1AABFE]/80  p-4 py-2 bg-white ${
                      reportData?.recall?.detalhes &&
                      reportData?.recall?.detalhes?.length > 0
                        ? "rounded-xl"
                        : "rounded-full"
                    }`}
                  >
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
                                "Nada Consta";

                          return (
                            <p
                              key={index}
                              className="text-sm text-[#194D9A] leading-relaxed"
                            >
                              {descricao}
                            </p>
                          );
                        })
                      ) : (
                        <p className=" text-[#1AABFE] leading-relaxed">
                          Informação não encontrada nas bases consultadas
                        </p>
                      )}
                    </div>
                  </div>
                </ReportSection>

                {/* Recall Pendentes */}
                <ReportSection title="Recall Pendentes">
                  {reportData?.recall?.recallsPendente?.every(
                    (item) =>
                      (item?.descricao === null ||
                        item?.descricao === undefined ||
                        item?.descricao === "") &&
                      (item?.identificador === null ||
                        item?.identificador === undefined ||
                        item?.identificador === "") &&
                      (item?.situacao === null ||
                        item?.situacao === undefined ||
                        item?.situacao === "")
                  ) || reportData?.recall?.recallsPendente?.length === 0 ? (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className="text-[#1AABFE]">
                        Informação não encontrada nas bases consultadas
                      </p>
                    </div>
                  ) : (
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
                  )}
                </ReportSection>

                {/* Histórico Roubo e Furto */}
                <ReportSection title="Histórico Roubo e Furto">
                  {reportData?.rouboFurto?.historico?.every(
                    (item) =>
                      (item?.data === null ||
                        item?.data === undefined ||
                        item?.data === "") &&
                      (item?.ocorrencia === null ||
                        item?.ocorrencia === undefined ||
                        item?.ocorrencia === "" ||
                        item?.ocorrencia === "-") &&
                      (item?.municipioUf === null ||
                        item?.municipioUf === undefined ||
                        item?.municipioUf === "" ||
                        item?.municipioUf === "-") &&
                      (item?.numeroBo === null ||
                        item?.numeroBo === undefined ||
                        item?.numeroBo === "" ||
                        item?.numeroBo === "-") &&
                      (item?.informante === null ||
                        item?.informante === undefined ||
                        item?.informante === "" ||
                        item?.informante === "-")
                  ) || reportData?.rouboFurto?.historico?.length === 0 ? (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className="text-[#1AABFE]">
                        Informação não encontrada nas bases consultadas
                      </p>
                    </div>
                  ) : (
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
                          ? reportData.rouboFurto.historico.map(
                              (item, index) => [
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
                              ]
                            )
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
                  )}
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
                                  value:
                                    gravame?.documentoAgente || "Nada Consta",
                                },
                                {
                                  label: "Agente",
                                  // Gravame - Agente: response.body.data.gravame[0].agente
                                  value: gravame?.agente || "Nada Consta",
                                },
                                {
                                  label: "Responsável",
                                  // Gravame - Responsável: response.body.data.gravame[0].responsavel
                                  value: gravame?.responsavel || "Nada Consta",
                                },
                                {
                                  label: "Placa",
                                  // Gravame - Placa: response.body.data.gravame[0].placa
                                  value: gravame?.placa || "Nada Consta",
                                },
                                {
                                  label: "Renavam",
                                  // Gravame - Renavam: response.body.data.gravame[0].renavam
                                  value: gravame?.renavam || "Nada Consta",
                                },
                                {
                                  label: "Chassi",
                                  // Gravame - Chassi: response.body.data.gravame[0].chassi
                                  value: gravame?.chassi || "Nada Consta",
                                },
                                {
                                  label: "Contrato",
                                  // Gravame - Contrato: response.body.data.gravame[0].contrato
                                  value: gravame?.contrato || "Nada Consta",
                                },
                              ],
                              right: [
                                {
                                  label: "Número da Restrição",
                                  // Gravame - Número da Restrição: response.body.data.gravame[0].numeroRestricao
                                  value: gravame?.numero || "Nada Consta",
                                },
                                {
                                  label: "Documento Financiado",
                                  // Gravame - Documento Financiado: response.body.data.gravame[0].documentoFinanciado
                                  value:
                                    gravame?.documentoFinanciado ||
                                    "Nada Consta",
                                },
                                {
                                  label: "Data Situação",
                                  // Gravame - Data Situação: response.body.data.gravame[0].dataSituacao
                                  value: gravame?.dataSituacao
                                    ? formatDate(gravame.dataSituacao)
                                    : "Nada Consta",
                                },
                                {
                                  label: "Data Inclusão",
                                  // Gravame - Data Inclusão: response.body.data.gravame[0].dataInclusao
                                  value: gravame?.dataInclusao
                                    ? formatDate(gravame.dataInclusao)
                                    : "Nada Consta",
                                },
                                {
                                  label: "Vigência Contrato",
                                  // Gravame - Vigência Contrato: response.body.data.gravame[0].vigenciaContrato
                                  value: gravame?.vigenciaContrato
                                    ? formatDate(gravame.vigenciaContrato)
                                    : "Nada Consta",
                                },
                                {
                                  label: "Observações",
                                  // Gravame - Observações: response.body.data.gravame[0].observacoes
                                  value: gravame?.observacoes || "Nada Consta",
                                },
                                {
                                  label: "Situação",
                                  // Gravame - Situação: response.body.data.gravame[0].situacao
                                  value: gravame?.situacao || "Nada Consta",
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
                        Nada Consta
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
                    {reportData?.registroEmLocadora?.registroEmLocadora === true
                      ? "Sim"
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
                      {reportData?.csv?.length > 0
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

                {/* Seguradoras Consultadas */}
                <ReportSection title="Seguradoras Consultadas">
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
                                <div className="flex flex-wrap gap-4 items-center justify-center">
                                  {/* seguradoras: response.body.data.radarSecuritario.cias */}
                                  {radarData.cias.map((cia, index) => {
                                    const insurerName =
                                      cia?.Nome || cia?.nome || "-";
                                    return (
                                      <div
                                        key={index}
                                        className="flex items-center justify-center p-4 "
                                      >
                                        {cia?.logo_link ? (
                                          <img
                                            src={cia.logo_link}
                                            alt={insurerName}
                                            className="max-h-12 max-w-32 object-contain"
                                            onError={(e) => {
                                              // Fallback to name if image fails to load
                                              e.target.style.display = "none";
                                              const fallback =
                                                e.target.parentElement.querySelector(
                                                  ".insurer-fallback"
                                                );
                                              if (fallback) {
                                                fallback.style.display =
                                                  "inline";
                                              }
                                            }}
                                          />
                                        ) : null}
                                        <span
                                          className="text-gray-800 text-sm insurer-fallback"
                                          style={{
                                            display: cia?.logo_link
                                              ? "none"
                                              : "inline",
                                          }}
                                        >
                                          {insurerName}
                                        </span>
                                      </div>
                                    );
                                  })}
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

                          <div className="relative mb-6">
                            <div className="mb-4">
                              <div className="bg-[#1AABFE] text-white px-4 py-2 rounded-full w-fit mb-2">
                                <h4 className="font-semibold px-8">
                                  Conclusão
                                </h4>
                              </div>

                              {/* Legend content */}
                              {(() => {
                                const radarSecuritario =
                                  reportData?.radarSecuritario;
                                const hasData =
                                  radarSecuritario &&
                                  Array.isArray(radarSecuritario) &&
                                  radarSecuritario.length > 0;

                                const conclusionText = hasData
                                  ? 'O sistema de análise "Radar Securitário" aponta condições iniciais favoráveis para que o veículo seja aceito por seguradoras, considerando os tipos de cobertura disponíveis. Essa indicação representa uma tendência positiva, mas não garante a contratação, pois está sujeita à avaliação individual de cada empresa.\n\nA decisão final pode variar conforme fatores como:\n\nPerfil do condutor: idade, histórico de acidentes, multas ou infrações.\n\nSituação financeira: score de crédito e possíveis restrições em nome do segurado, condutor ou proprietário.\n\nCaracterísticas do veículo: quilometragem alta, uso comercial ou por aplicativos como Uber.\n\nFatores externos: índices de sinistros ou violência na área onde o veículo circula.\n\nPortanto, a sinalização de aprovação é preliminar e pode sofrer alterações no valor ou até ser recusada após análise detalhada pela seguradora.'
                                  : "No momento, não identificamos seguradoras com condições favoráveis para este veículo ou não há dados suficientes para realizar uma análise completa.\n\nEssa ausência pode ocorrer por diversos motivos, como falta de histórico disponível, características específicas do veículo ou limitações nas fontes de consulta.\n\nRecomendamos que você consulte diretamente uma corretora de seguros para uma avaliação personalizada, considerando seu perfil e as coberturas desejadas";

                                return (
                                  <div
                                    className={`space-y-3 border-2 border-[#1AABFE]/80 text-[#194D9A] p-4  bg-white rounded-xl`}
                                  >
                                    <div className="whitespace-pre-line text-sm leading-relaxed">
                                      {conclusionText}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
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
                                <div className="grid grid-cols-4 gap-4">
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
            <div className="border-t-2 border-gray-200 pt-6 mt-6 flex flex-col items-end justify-center">
              <div className="flex  gap-4 justify-center">
                <button
                  disabled={downloading}
                  onClick={downloadPDF}
                  className="bg-[#194D9A] hover:bg-[#1AABFE] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {downloading ? "Baixando..." : "Baixar PDF"}
                </button>
                <button
                  onClick={shareReport}
                  disabled={sharing}
                  className="bg-[#1AABFE] hover:bg-[#1590d4] text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {sharing ? "Compartilhando..." : "Compartilhar relatório"}
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
