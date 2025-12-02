import React, { useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { TbInfoCircle } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import ReportSection from "./components/ReportSection";
import ReportField from "./components/ReportField";
import TwoColumnFieldSection from "./components/TwoColumnFieldSection";
import SimpleContentSection from "./components/SimpleContentSection";
import ReportTableSection from "./components/ReportTableSection";
import ScoreBar from "./components/ScoreBar";
import Gauge from "./components/Gauge";
import PriceEvolutionChart from "./components/PriceEvolutionChart";
import BarGauge from "./components/BarGauge";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { formatCurrency, parseCurrency } from "../../../utils/currencyUtils";
import {
  isSummaryBoxVisible,
  filterTwoColumnFields,
} from "../../../utils/reportFieldFilter";

const ReportMobile = ({
  data,
  reportData,
  responseItem,
  plate,
  make,
  model,
  chassis,
  consultationDate,
  queryId,
  vehicleAge,
  valorFipeFormatted,
  valorFipe,
  planName,
  baseEstadual,
  baseNacional,
  decodificador,
  precificadorI,
  precificadorII,
  codigoFipe,
  valorAtual,
  valuations,
  hasLeilao,
  hasSinistro,
  hasBancosFinanceiras,
  hasRestricoesNacionais,
  hasRestricoesEstaduais,
  hasMotorAlterado,
  hasChassiRemarcado,
  hasRecall,
  hasAlertaGravame,
  hasHistoricoRoubo,
  hasCSV,
  hasRENAJUD,
  hasMultasRENAINF,
  hasIssues,
  nivelRisco,
  exigenciaVistoriaEspecial,
  percentualSobreRef,
  leilaoScoreValue,
  analiseRiscoScoreValue,
  downloading,
  sharing,
  downloadPDF,
  shareReport,
  formatDate,
  renderSectionTitle,
  renderStatusBox,
  renderWarningBox,
  renderGauge,
  renderAiSummary,
  renderField,
  renderTwoColumnSection,
}) => {
  // State for collapsible sections
  const [isSummaryVisible, setIsSummaryVisible] = useState(true);
  const [isRiscoVisible, setIsRiscoVisible] = useState(true);
  const [isGeralVisible, setIsGeralVisible] = useState(true);
  const [isDadosBasicosVisible, setIsDadosBasicosVisible] = useState(true);
  const [isLeilaoVisible, setIsLeilaoVisible] = useState(true);
  const [isScoreLeilaoVisible, setIsScoreLeilaoVisible] = useState(true);
  const [isSinistroVisible, setIsSinistroVisible] = useState(true);
  const [isBancosFinanceirasVisible, setIsBancosFinanceirasVisible] =
    useState(true);
  const [
    isDecodificadorPrecificadorVisible,
    setIsDecodificadorPrecificadorVisible,
  ] = useState(true);
  const [isCadastroNacionalVisible, setIsCadastroNacionalVisible] =
    useState(true);
  const [isRestricoesNacionaisVisible, setIsRestricoesNacionaisVisible] =
    useState(true);
  const [isFaturamentoVisible, setIsFaturamentoVisible] = useState(true);
  const [isCadastroEstadualVisible, setIsCadastroEstadualVisible] =
    useState(true);
  const [isRestricoesEstaduaisVisible, setIsRestricoesEstaduaisVisible] =
    useState(true);
  const [isDetalhamentoGravameVisible, setIsDetalhamentoGravameVisible] =
    useState(true);
  const [isAlertaDebitosVisible, setIsAlertaDebitosVisible] = useState(true);
  const [isDetalhamentoDebitosVisible, setIsDetalhamentoDebitosVisible] =
    useState(true);
  const [isHistoricoProprietariosVisible, setIsHistoricoProprietariosVisible] =
    useState(true);
  const [isInfoParceirosVisible, setIsInfoParceirosVisible] = useState(true);
  const [isOpcionaisVisible, setIsOpcionaisVisible] = useState(true);
  const [isPrecificadorMercadoVisible, setIsPrecificadorMercadoVisible] =
    useState(true);
  const [isPrecificadorFipeVisible, setIsPrecificadorFipeVisible] =
    useState(true);
  const [isPorcentagemFipeVisible, setIsPorcentagemFipeVisible] =
    useState(true);
  const [isExigenciaVistoriaVisible, setIsExigenciaVistoriaVisible] =
    useState(true);
  const [isRecallVisible, setIsRecallVisible] = useState(true);
  const [isDescricaoCompletaVisible, setIsDescricaoCompletaVisible] =
    useState(true);
  const [isRecallPendentesVisible, setIsRecallPendentesVisible] =
    useState(true);
  const [isHistoricoRouboVisible, setIsHistoricoRouboVisible] = useState(true);
  const [isGravameVisible, setIsGravameVisible] = useState(true);
  const [isRegistroLocadoraVisible, setIsRegistroLocadoraVisible] =
    useState(true);
  const [isCSVVisible, setIsCSVVisible] = useState(true);
  const [isMultasRenainfVisible, setIsMultasRenainfVisible] = useState(true);
  const [isSeguradorasVisible, setIsSeguradorasVisible] = useState(true);
  const [isHistoricoAnunciosVisible, setIsHistoricoAnunciosVisible] =
    useState(true);
  const [isHistoricoConsultaVisible, setIsHistoricoConsultaVisible] =
    useState(true);
  const [isObservacaoVendedorVisible, setIsObservacaoVendedorVisible] =
    useState(true);
  const [isRemarketingVisible, setIsRemarketingVisible] = useState(true);
  const [isRemarketingDadosVisible, setIsRemarketingDadosVisible] =
    useState(true);
  const [isFotosVisible, setIsFotosVisible] = useState(true);
  const [isHistoricoKmVisible, setIsHistoricoKmVisible] = useState(true);
  const [isDecodificadorBasicosVisible, setIsDecodificadorBasicosVisible] =
    useState(true);
  const [isCSVINMETROVisible, setIsCSVINMETROVisible] = useState(true);
  const [isSEFAZVisible, setIsSEFAZVisible] = useState(true);

  // Reusable CollapsibleSection component
  const CollapsibleSection = ({
    title,
    isVisible,
    setIsVisible,
    children,
    breakSection = false,
    hasData = true,
  }) => {
    return (
      <div className="space-y-2 my-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsVisible(!isVisible)}
        >
          {renderSectionTitle(title)}
          <IoIosArrowDropdownCircle
            className={`min-w-[28px] text-[28px] text-[#1AABFE] transition-transform mb-2 ${
              isVisible ? "rotate-180" : ""
            }`}
          />
        </div>
        {isVisible && (
          <div className={breakSection ? "page-break-after " : ""}>
            {hasData ? (
              <div className="overflow-auto  ">
                <div className="w-full">{children}</div>
              </div>
            ) : (
              children
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="block md:hidden w-full fixed h-screen overflow-y-auto overflow-x-hidden">
      <div className=" w-full px-2 border">
        <div className="bg-white space-y-4 custom-scrollbar w-full h-full">
          {/* Mobile Header Section */}
          <div className="bg-[#194D9A] border-b-4 border-yellow-300 flex flex-col gap-3 text-white p-4 mb-4">
            <div className="w-full flex items-center justify-center relative py-4">
              <img src="/reportLogo.png" alt="" className="h-24 mx-auto" />
              <span className="text-yellow-300 absolute bottom-7 right-0 left-0 mx-auto w-fit text-2xl">
                {plate.slice(0, 9)}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-yellow-300 text-lg font-bold capitalize text-center">
                Relatório Plano {data.planName} - Placa Verificada
              </h1>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {vehicleAge !== "Nada Consta" && (
                    <div className="bg-[#1AABFE] text-white p-2 rounded-xl flex items-center gap-2 w-full">
                      <span className="text-2xl">
                        <TbInfoCircle />
                      </span>
                      <span className="flex flex-col text-xs">
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
                    <div className="bg-[#1AABFE] text-white p-2 rounded-lg flex items-center gap-2 text-xs w-full">
                      <span className="text-2xl">
                        <AiFillDollarCircle />
                      </span>
                      <span className="flex flex-col text-xs">
                        Valor FIPE <strong>{valorFipeFormatted}</strong>
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center gap-1 pt-2">
                  <img
                    src={
                      reportData?.dadosBasicosDoVeiculo?.marca_logo ||
                      "/whiteLogo.svg"
                    }
                    alt={`${make} Logo`}
                    className="w-12 h-12 object-contain aspect-square"
                  />
                  <div className="text-xs text-white/90 text-center">
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

          {/* Mobile Action Buttons */}
          <div className="border-t-2 border-transparent pt-4 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col gap-2 w-full">
              <button
                disabled={downloading}
                onClick={downloadPDF}
                className="bg-[#194D9A] hover:bg-[#1AABFE] text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm w-full"
              >
                {downloading ? "Baixando..." : "Baixar PDF"}
              </button>
              <button
                onClick={shareReport}
                disabled={sharing}
                className="bg-[#1AABFE] hover:bg-[#1590d4] text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm w-full"
              >
                {sharing ? "Compartilhando..." : "Compartilhar relatório"}
              </button>
            </div>
          </div>

          <div className="space-y-4 px-2">
            {/* Resumo IA - Only for Ultra and Premium */}
            {reportData.ia &&
              (planName === "ultra" || planName === "premium") &&
              renderAiSummary()}

            {/* Resumo da consulta - Mobile responsive grid */}
            <CollapsibleSection
              title="Resumo da consulta"
              isVisible={isSummaryVisible}
              setIsVisible={setIsSummaryVisible}
            >
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {isSummaryBoxVisible("Leilão", planName) &&
                  renderStatusBox("Leilão", hasLeilao, "/report/auction.png")}
                {isSummaryBoxVisible("Sinistro", planName) &&
                  renderStatusBox("Sinistro", hasSinistro, "/report/crash.png")}

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
                <div className="col-span-2">
                  {isSummaryBoxVisible(
                    "Bancos, Financeiras ou seguradoras",
                    planName
                  ) &&
                    renderStatusBox(
                      "Bancos, Financeiras ou seguradoras",
                      hasBancosFinanceiras,
                      "/report/bank.png"
                    )}
                </div>
              </div>
              {hasIssues &&
                renderWarningBox(
                  "Atenção: Alguns blocos possuem informações que merecem cuidado."
                )}
            </CollapsibleSection>

            {/* Informações de Risco - Mobile responsive */}
            <CollapsibleSection
              title="Informações de Risco"
              isVisible={isRiscoVisible}
              setIsVisible={setIsRiscoVisible}
            >
              <div className="grid grid-cols-1 gap-4">
                {nivelRisco > 0 &&
                  renderGauge({
                    label: "Aceitacao de mercado",
                    value: nivelRisco,
                    invertColors: true,
                  })}
                {exigenciaVistoriaEspecial !== null &&
                  renderGauge({
                    label: "Exigencia de vistoria especial",
                    value: exigenciaVistoriaEspecial,
                    type: "text",
                  })}
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
                    <p className="text-[#194D9A] text-sm">
                      Informação não encontrada nas bases consultadas.
                    </p>
                  </div>
                )}
            </CollapsibleSection>

            {/* Block 4: Informações gerais do veículo */}
            <CollapsibleSection
              title="Informações gerais do veículo"
              isVisible={isGeralVisible}
              setIsVisible={setIsGeralVisible}
              breakSection={true}
            >
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <div className="space-y-3">
                  {(() => {
                    const filteredFields = filterTwoColumnFields(
                      {
                        left: [
                          {
                            label: "Marca / Modelo",
                            value: reportData.marcaModelo || "Nada Consta",
                          },
                          {
                            label: "Cor",
                            value: reportData.corVeiculo || "Nada Consta",
                          },
                          {
                            label: "RENAVAM",
                            value:
                              reportData.renavam ||
                              baseEstadual.renavam ||
                              "Nada Consta",
                          },
                          {
                            label: "Tipo do Veículo",
                            value:
                              reportData.tipoVeiculo ||
                              baseEstadual.tipo ||
                              "Nada Consta",
                          },
                          {
                            label: "Nacionalidade",
                            value: reportData.nacionalidade || "Nada Consta",
                          },
                          {
                            label: "UF",
                            value:
                              reportData.uf || baseEstadual.uf || "Nada Consta",
                          },
                          {
                            label: "Registro DI",
                            value:
                              reportData.registroDi ||
                              baseNacional.registroDi ||
                              "Nada Consta",
                          },
                        ],
                        right: [
                          {
                            label: "Ano / Modelo",
                            value:
                              reportData.anoFabricacao && reportData.anoModelo
                                ? `${reportData.anoFabricacao}/${reportData.anoModelo}`
                                : reportData.anoFabricacao ||
                                  reportData.anoModelo ||
                                  "Nada Consta",
                          },
                          {
                            label: "Placa",
                            value:
                              responseItem?.response?.body?.headerInfos?.keys
                                ?.placa ||
                              reportData.placa ||
                              "Nada Consta",
                          },
                          {
                            label: "Combustível",
                            value:
                              reportData.combustivel ||
                              baseEstadual.combustivel ||
                              "Nada Consta",
                          },
                          {
                            label: "Número do motor",
                            value:
                              reportData.numMotor ||
                              baseEstadual.motor ||
                              "Nada Consta",
                          },
                          {
                            label: "Chassi",
                            value:
                              reportData.chassi ||
                              baseEstadual.chassi ||
                              "Nada Consta",
                          },
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
                    );
                    return [
                      ...(filteredFields.left || []),
                      ...(filteredFields.right || []),
                    ].map((field, index) => (
                      <ReportField
                        key={index}
                        label={field.label}
                        value={field.value}
                        hasWarning={field.hasWarning}
                      />
                    ));
                  })()}
                </div>
              </div>
            </CollapsibleSection>

            {/* Block 5: Dados Básicos */}
            <CollapsibleSection
              title="Dados Básicos"
              isVisible={isDadosBasicosVisible}
              setIsVisible={setIsDadosBasicosVisible}
            >
              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                <div className="space-y-3">
                  {(() => {
                    const filteredFields = filterTwoColumnFields(
                      {
                        left: [
                          {
                            label: "Caixa Câmbio",
                            value: reportData.caixaCambio || "Nada Consta",
                          },
                          {
                            label: "Cilindradas",
                            value: reportData.cilindradas || "Nada Consta",
                          },
                          {
                            label: "Número 3º Eixo",
                            value: reportData.numTerceiroEixo || "Nada Consta",
                          },
                          {
                            label: "Potência",
                            value: reportData.potencia || "Nada Consta",
                          },
                          {
                            label: "Peso Bruto",
                            value: reportData.pbt || "Nada Consta",
                          },
                        ],
                        right: [
                          {
                            label: "Capacidade Máxima de tração",
                            value: reportData.capMaxTracao || "Nada Consta",
                          },
                          {
                            label: "Eixo Diferencial",
                            value: reportData.eixoTraseiroDif || "Nada Consta",
                          },
                          {
                            label: "Número Carroceria",
                            value: reportData.numCarroceria || "Nada Consta",
                          },
                          {
                            label: "Tipo Carroceria",
                            value: reportData.tipoCarroceria || "Nada Consta",
                          },
                          {
                            label: "Capacidade de Passageiros",
                            value:
                              reportData.capacidadePassageiro || "Nada Consta",
                          },
                        ],
                      },
                      planName
                    );
                    return [
                      ...(filteredFields.left || []),
                      ...(filteredFields.right || []),
                    ].map((field, index) => (
                      <ReportField
                        key={index}
                        label={field.label}
                        value={field.value}
                        hasWarning={field.hasWarning}
                      />
                    ));
                  })()}
                </div>
              </div>
            </CollapsibleSection>

            {/* Block 6: Informações sobre leilão */}
            <CollapsibleSection
              title="Informações sobre leilão"
              isVisible={isLeilaoVisible}
              setIsVisible={setIsLeilaoVisible}
              hasData={
                reportData?.leilao?.registros &&
                reportData.leilao.registros.length > 0
              }
            >
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
                    formatDate(item.dataLeilao) || "-",
                    item.lote || "-",
                    item.placa || "-",
                    item.chassi || "-",
                    item.marca || "-",
                    item.modelo || "-",
                    item.condicaoGeral || "-",
                    item.comitente || "-",
                  ])}
                />
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className=" text-[#1AABFE]">
                    {reportData?.leilao?.descricao ||
                      "Não Consta informações nas bases consultadas"}
                  </p>
                </div>
              )}
              {renderWarningBox(
                "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil."
              )}
            </CollapsibleSection>

            {/* Block 7: Score Leilão */}
            <CollapsibleSection
              title="Score Leilão"
              isVisible={isScoreLeilaoVisible}
              setIsVisible={setIsScoreLeilaoVisible}
            >
              {reportData?.leilao?.score && leilaoScoreValue ? (
                <ScoreBar score={leilaoScoreValue} label="Score Leilão" />
              ) : (
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className=" text-[#1AABFE]">
                    Não Consta informações nas bases consultadas
                  </p>
                </div>
              )}
            </CollapsibleSection>

            {/* Block 8: Indício de Sinistro */}
            <CollapsibleSection
              title="Indício de Sinistro"
              isVisible={isSinistroVisible}
              setIsVisible={setIsSinistroVisible}
            >
              <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                <p className=" text-[#1AABFE]">
                  {reportData?.indicioSinistro?.descricao ||
                    "Não Consta informações nas bases consultadas"}
                </p>
              </div>
            </CollapsibleSection>

            {/* Block 9: Apontamentos em Bancos, Financeiras ou Seguradoras */}
            <CollapsibleSection
              title="Apontamentos em Bancos, Financeiras ou Seguradoras"
              isVisible={isBancosFinanceirasVisible}
              setIsVisible={setIsBancosFinanceirasVisible}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {analiseRiscoScoreValue !== null ? (
                  <div className="w-full md:w-[30%]">
                    {renderGauge({
                      label: "",
                      value: analiseRiscoScoreValue,
                    })}
                  </div>
                ) : (
                  <div className="w-full md:w-[30%] flex items-center justify-center border-2 border-[#1AABFE]/80 rounded-xl bg-white p-4">
                    <p className=" text-[#1AABFE]">
                      Não Consta informações nas bases consultadas
                    </p>
                  </div>
                )}
                <div className="w-full md:w-[70%] border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                  <div className="space-y-3">
                    <ReportField
                      label="Placa"
                      value={reportData?.placa || plate || "Nada Consta"}
                    />
                    <ReportField
                      label="Chassi"
                      value={reportData?.chassi || "Nada Consta"}
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
            </CollapsibleSection>

            {/* Remarketing */}
            <CollapsibleSection
              title="Remarketing"
              isVisible={isRemarketingVisible}
              setIsVisible={setIsRemarketingVisible}
              hasData={true}
            >
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
                    reportData?.remarketing?.leilao?.organizador || "-",
                    reportData?.remarketing?.leilao?.vendedor || "-",
                    reportData?.remarketing?.leilao?.dataEvento
                      ? formatDate(reportData?.remarketing?.leilao?.dataEvento)
                      : "-",
                    reportData?.remarketing?.leilao?.condicoesVeiculo || "-",
                    reportData?.remarketing?.leilao?.situacaoChassi || "-",
                    reportData?.remarketing?.leilao?.condicoesMotor || "-",
                    reportData?.remarketing?.leilao?.condicoesCambio || "-",
                    reportData?.remarketing?.leilao?.condicoesMecanica || "-",
                    reportData?.remarketing?.leilao?.observacao || "-",
                  ],
                ]}
              />
            </CollapsibleSection>

            {/* Remarketing - Dados do veículo */}
            <CollapsibleSection
              title="Remarketing - Dados do veículo"
              isVisible={isRemarketingDadosVisible}
              setIsVisible={setIsRemarketingDadosVisible}
            >
              {(() => {
                const r = reportData?.remarketing;
                if (!r) {
                  return (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center">
                      <p className="text-[#1AABFE]">
                        Informações não encontradas nas bases consultadas
                      </p>
                    </div>
                  );
                }
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
                  ...(r?.checklist ? Object.values(r.checklist) : []),
                ];
                const allEmpty = fieldsToCheck.every(
                  (v) =>
                    v === null ||
                    v === undefined ||
                    v === "" ||
                    (Array.isArray(v) && v.length === 0)
                );
                return allEmpty ? (
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center">
                    <p className="text-[#1AABFE]">
                      Informações não encontradas nas bases consultadas
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
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
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
            </CollapsibleSection>

            {/* Fotos */}
            <CollapsibleSection
              title="Fotos"
              isVisible={isFotosVisible}
              setIsVisible={setIsFotosVisible}
            >
              {(() => {
                const fotosFromRemarketing =
                  reportData?.remarketing?.checklist?.fotos;
                const fotosFromAnuncio = reportData?.anuncio?.fotos;
                const fotosFromData = reportData?.fotos;
                const allFotos = [];
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
                const getPhotoUrl = (foto) => {
                  if (typeof foto === "string") return foto;
                  return foto.url || foto.src || foto;
                };
                if (fotosFromRemarketing) {
                  if (
                    Array.isArray(fotosFromRemarketing) &&
                    fotosFromRemarketing.length > 0
                  ) {
                    fotosFromRemarketing.forEach((foto) => {
                      if (isValidPhoto(foto)) allFotos.push(foto);
                    });
                  } else if (
                    !Array.isArray(fotosFromRemarketing) &&
                    isValidPhoto(fotosFromRemarketing)
                  ) {
                    allFotos.push(fotosFromRemarketing);
                  }
                }
                if (fotosFromAnuncio) {
                  if (
                    Array.isArray(fotosFromAnuncio) &&
                    fotosFromAnuncio.length > 0
                  ) {
                    fotosFromAnuncio.forEach((foto) => {
                      if (isValidPhoto(foto)) allFotos.push(foto);
                    });
                  } else if (
                    !Array.isArray(fotosFromAnuncio) &&
                    isValidPhoto(fotosFromAnuncio)
                  ) {
                    allFotos.push(fotosFromAnuncio);
                  }
                }
                if (fotosFromData) {
                  if (
                    Array.isArray(fotosFromData) &&
                    fotosFromData.length > 0
                  ) {
                    fotosFromData.forEach((foto) => {
                      if (isValidPhoto(foto)) allFotos.push(foto);
                    });
                  } else if (
                    !Array.isArray(fotosFromData) &&
                    isValidPhoto(fotosFromData)
                  ) {
                    allFotos.push(fotosFromData);
                  }
                }
                const seenUrls = new Set();
                const uniqueFotos = allFotos.filter((foto) => {
                  const url = getPhotoUrl(foto);
                  if (!url || seenUrls.has(url)) return false;
                  seenUrls.add(url);
                  return true;
                });
                if (uniqueFotos.length > 0) {
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {uniqueFotos.map((foto, index) => {
                        const photoUrl = getPhotoUrl(foto);
                        return (
                          <img
                            key={index}
                            src={photoUrl}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border-2 border-[#1AABFE]/80"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                } else {
                  return (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white flex items-center">
                      <p className="text-[#1AABFE]">
                        Informações não encontradas nas bases consultadas
                      </p>
                    </div>
                  );
                }
              })()}
            </CollapsibleSection>

            {/* Histórico de KMs */}
            <CollapsibleSection
              title="Histórico de KMs"
              isVisible={isHistoricoKmVisible}
              setIsVisible={setIsHistoricoKmVisible}
              hasData={true}
            >
              {reportData?.historicoKm && reportData.historicoKm.length > 0 ? (
                <ReportTableSection
                  headers={["Data", "Odômetro"]}
                  rows={reportData.historicoKm.map((item) => [
                    formatDate(item.dataInclusao) || "-",
                    item.km ? `${item.km} km` : "-",
                  ])}
                />
              ) : (
                <ReportTableSection
                  headers={["Data", "Odômetro"]}
                  rows={[["-", "-"]]}
                />
              )}
            </CollapsibleSection>

            {/* Sections for Plus, Ultra, and Premium plans */}
            {planName !== "light" && (
              <>
                {/* Decodificador de Chassi - Dados Básicos */}
                <CollapsibleSection
                  title="Decodificador de Chassi - Dados Básicos"
                  isVisible={isDecodificadorBasicosVisible}
                  setIsVisible={setIsDecodificadorBasicosVisible}
                  breakSection={true}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {(() => {
                        const filteredFields = filterTwoColumnFields(
                          {
                            left: [
                              { label: "Placa", value: plate },
                              {
                                label: "Ano Modelo",
                                value:
                                  baseNacional.anoModelo ||
                                  reportData.anoModelo ||
                                  "Nada Consta",
                              },
                              {
                                label: "Marca",
                                value:
                                  reportData.dadosBasicosDoVeiculo?.marca ||
                                  make ||
                                  "Nada Consta",
                              },
                              {
                                label: "Modelo",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.informacoesFipe?.[0]?.modelo ||
                                  "Nada Consta",
                              },
                              {
                                label: "Versão",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.informacoesFipe?.[0]?.versao ||
                                  decodificador.versao ||
                                  "Nada Consta",
                              },
                              {
                                label: "Código FIPE",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.codigoFipe ||
                                  codigoFipe ||
                                  "Nada Consta",
                              },
                              {
                                label: "Região Geográfica",
                                value:
                                  decodificador.regiao ||
                                  reportData.decodificadorPrecificador
                                    ?.regiao ||
                                  "Nada Consta",
                              },
                              {
                                label: "País",
                                value:
                                  decodificador.pais ||
                                  reportData.decodificadorPrecificador?.pais ||
                                  "Nada Consta",
                              },
                              {
                                label: "Tipo Veículo",
                                value:
                                  baseNacional.tipoVeiculo ||
                                  reportData.tipoVeiculo ||
                                  "Nada Consta",
                              },
                              {
                                label: "Peso Bruto Total",
                                value:
                                  decodificador.pesoBruto ||
                                  reportData.decodificadorPrecificador
                                    ?.pesoBruto ||
                                  reportData.pbt ||
                                  "Nada Consta",
                              },
                              {
                                label: "Capacidade Carga",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.capacidadeCarga ||
                                  reportData.capacidadeCarga ||
                                  "Nada Consta",
                              },
                              {
                                label: "Capacidade Passageiros",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.capacidadePassageiro ||
                                  reportData.capacidadePassageiro ||
                                  "Nada Consta",
                              },
                              {
                                label: "Número Eixos Traseiro",
                                value:
                                  reportData.eixoTraseiroDif || "Nada Consta",
                              },
                              {
                                label: "Número Eixos Auxiliar",
                                value:
                                  reportData.dadosBasicosDoVeiculo?.eixos ||
                                  reportData.eixos ||
                                  "Nada Consta",
                              },
                            ],
                            right: [
                              {
                                label: "Ano Fabricação",
                                value:
                                  baseNacional.anoFabricacao ||
                                  reportData.anoFabricacao ||
                                  "Nada Consta",
                              },
                              {
                                label: "Nacionalidade",
                                value:
                                  reportData.nacionalidade || "Nada Consta",
                              },
                              {
                                label: "Combustível",
                                value:
                                  baseEstadual.combustivel ||
                                  reportData.combustivel ||
                                  "Nada Consta",
                              },
                              {
                                label: "Cilindradas",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.cilindradas ||
                                  reportData.cilindradas ||
                                  "Nada Consta",
                              },
                              {
                                label: "Código Versão",
                                value:
                                  reportData.codigoMarcaModelo || "Nada Consta",
                              },
                              {
                                label: "Valor atual",
                                value: reportData.dadosBasicosDoVeiculo
                                  ?.informacoesFipe?.[0]?.valorAtual
                                  ? formatCurrency(
                                      parseCurrency(
                                        reportData.dadosBasicosDoVeiculo
                                          .informacoesFipe[0].valorAtual
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
                              {
                                label: "Número Carroceria",
                                value:
                                  reportData.numCarroceria || "Nada Consta",
                              },
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
                              {
                                label: "Capacidade Máxima Tração",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.capMaxTracao ||
                                  reportData.capMaxTracao ||
                                  "Nada Consta",
                              },
                              {
                                label: "Eixos",
                                value:
                                  reportData.dadosBasicosDoVeiculo?.eixos ||
                                  reportData.eixos ||
                                  "Nada Consta",
                              },
                              {
                                label: "Caixa Câmbio",
                                value:
                                  reportData.dadosBasicosDoVeiculo
                                    ?.caixaCambio ||
                                  reportData.caixaCambio ||
                                  "Nada Consta",
                              },
                            ],
                          },
                          planName,
                          "Decodificador de Chassi - Dados Básicos"
                        );
                        return [
                          ...(filteredFields.left || []),
                          ...(filteredFields.right || []),
                        ].map((field, index) => (
                          <ReportField
                            key={index}
                            label={field.label}
                            value={field.value}
                            hasWarning={field.hasWarning}
                          />
                        ));
                      })()}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Decodificador de Chassi - Precificadores */}
                {reportData.dadosBasicosDoVeiculo &&
                reportData.dadosBasicosDoVeiculo.informacoesFipe.length > 0 ? (
                  <CollapsibleSection
                    title="Decodificador de Chassi - Precificadores"
                    isVisible={isDecodificadorPrecificadorVisible}
                    setIsVisible={setIsDecodificadorPrecificadorVisible}
                    hasData={true}
                  >
                    {(() => {
                      const historicoPreco =
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.historicoPreco || [];
                      const availableYearsSet = new Set();
                      historicoPreco.forEach((item) => {
                        const year = parseInt(item.ano);
                        if (!isNaN(year)) availableYearsSet.add(year);
                      });
                      const valorAtualNum = parseCurrency(
                        reportData.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual || "0"
                      );
                      if (valorAtualNum > 0) {
                        const currentYear = new Date().getFullYear();
                        availableYearsSet.add(currentYear);
                      }
                      const allYears = Array.from(availableYearsSet)
                        .map(Number)
                        .sort((a, b) => a - b);
                      let last9Years = allYears.slice(-9);
                      if (last9Years.length > 0) {
                        const firstYear = last9Years[0];
                        const firstYearValue = valuations.years[firstYear];
                        if (
                          firstYearValue === "Nada Consta" ||
                          !firstYearValue
                        ) {
                          last9Years = last9Years.slice(1);
                          if (allYears.length > 9 && last9Years.length < 9) {
                            const firstYearInList = last9Years[0];
                            const firstYearIndex =
                              allYears.indexOf(firstYearInList);
                            if (firstYearIndex > 0) {
                              const earlierYear = allYears[firstYearIndex - 1];
                              const earlierYearValue =
                                valuations.years[earlierYear];
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
                      const headers = [
                        "06 Meses",
                        "12 Meses",
                        ...last9Years.map(String),
                      ];
                      const rowData = [
                        valuations.sixMonths,
                        valuations.twelveMonths,
                        ...last9Years.map(
                          (year) => valuations.years[year] || "Nada Consta"
                        ),
                      ];
                      return (
                        <>
                          <ReportTableSection
                            headers={headers}
                            rows={[rowData]}
                          />
                          <div className="">
                            <div className="w-fit min-w-[600px] md:w-auto">
                              <PriceEvolutionChart
                                historicoPreco={
                                  reportData.dadosBasicosDoVeiculo
                                    ?.informacoesFipe?.[0]?.historicoPreco || []
                                }
                                valorAtual={
                                  reportData.dadosBasicosDoVeiculo
                                    ?.informacoesFipe?.[0]?.valorAtual || null
                                }
                              />
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </CollapsibleSection>
                ) : (
                  <CollapsibleSection
                    title="Decodificador de Chassi - Precificadores"
                    isVisible={isDecodificadorPrecificadorVisible}
                    setIsVisible={setIsDecodificadorPrecificadorVisible}
                  >
                    <p className="text-[#194D9A] text-xs px-4 border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      Não há dados disponíveis para exibição.
                    </p>
                  </CollapsibleSection>
                )}

                {/* Cadastro Nacional */}
                <CollapsibleSection
                  title="Cadastro Nacional"
                  isVisible={isCadastroNacionalVisible}
                  setIsVisible={setIsCadastroNacionalVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
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
                        {
                          label: "Combustível",
                          value: reportData.combustivel || "Nada Consta",
                        },
                        {
                          label: "Cor",
                          value: reportData.corVeiculo || "Nada Consta",
                        },
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
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* CSV-INMETRO */}
                <CollapsibleSection
                  title="Certificado de Segurança Veicular (CSV-INMETRO)"
                  isVisible={isCSVINMETROVisible}
                  setIsVisible={setIsCSVINMETROVisible}
                >
                  <p className="text-[#194D9A] border border-[#1AABFE] rounded-full p-4 bg-white text-xs px-4 py-2">
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
                </CollapsibleSection>

                {/* Warning */}
                {hasCSV && isCSVINMETROVisible && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-full px-1">
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
                )}
                {/* Restrições Nacionais */}
                <CollapsibleSection
                  title="Restrições Nacionais"
                  isVisible={isRestricoesNacionaisVisible}
                  setIsVisible={setIsRestricoesNacionaisVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Comunicação de Venda",
                          value:
                            reportData?.baseNacional
                              ?.indicadorComunicacaoVendas || "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.indicadorComunicacaoVendas?.toLowerCase() ===
                              "sim" ||
                            reportData?.baseNacional?.indicadorComunicacaoVendas?.toLowerCase() ===
                              "yes",
                        },
                        {
                          label: "Restrição Financeira",
                          value:
                            reportData?.baseNacional?.restricaoFinanciadora ||
                            "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.restricaoFinanciadora &&
                            !reportData?.baseNacional?.restricaoFinanciadora
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada "),
                        },
                        {
                          label: "Restrição 1",
                          value:
                            reportData?.baseNacional?.restricao1 ||
                            "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.restricao1 &&
                            !reportData?.baseNacional?.restricao1
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada"),
                        },
                        {
                          label: "Indicação Restrição Renajud",
                          value: hasRENAJUD,
                          hasWarning: hasRENAJUD === "Sim",
                        },
                        {
                          label: "Ocorrência",
                          value:
                            reportData?.baseNacional?.ocorrencia ||
                            "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.ocorrencia &&
                            reportData?.baseNacional?.ocorrencia.toLowerCase() !==
                              "veículo sem ocorrência de roubo/furto" &&
                            !reportData?.baseNacional?.ocorrencia
                              ?.toLowerCase()
                              ?.includes("não") &&
                            !reportData?.baseNacional?.ocorrencia
                              ?.toLowerCase()
                              ?.includes("nao"),
                        },
                        {
                          label: "Restrição 2",
                          value:
                            reportData?.baseNacional?.restricao2 ||
                            "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.restricao2 &&
                            !reportData?.baseNacional?.restricao2
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada"),
                        },
                        {
                          label: "Restrição 3",
                          value:
                            reportData?.baseNacional?.restricao3 ||
                            "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.restricao3 &&
                            !reportData?.baseNacional?.restricao3
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada "),
                        },
                        {
                          label: "Restrição 4",
                          value:
                            reportData?.baseNacional?.restricao4 ||
                            "Nada consta",
                          hasWarning:
                            reportData?.baseNacional?.restricao4 &&
                            !reportData?.baseNacional?.restricao4
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nada"),
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                          hasWarning={field.hasWarning}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Faturamento */}
                <CollapsibleSection
                  title="Faturamento"
                  isVisible={isFaturamentoVisible}
                  setIsVisible={setIsFaturamentoVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Documento Faturado",
                          value:
                            reportData?.baseNacional?.docFaturado ||
                            "Nada Consta",
                        },
                        {
                          label: "Tipo Documento Faturado",
                          value:
                            reportData?.baseNacional?.tipoDocFaturado ||
                            "Nada Consta",
                        },
                        {
                          label: "Nome Fantasia",
                          value:
                            reportData?.baseNacional?.documentoFaturado
                              ?.nomeFantasia || "Nada Consta",
                        },
                        {
                          label: "CEP",
                          value:
                            reportData?.baseNacional?.documentoFaturado
                              ?.enderecos?.[0]?.cep || "Nada Consta",
                        },
                        {
                          label: "UF Faturado",
                          value:
                            reportData?.baseNacional?.ufFaturado ||
                            "Nada Consta",
                        },
                        {
                          label: "Razão Social",
                          value:
                            reportData?.baseNacional?.documentoFaturado
                              ?.razaoSocial || "Nada Consta",
                        },
                        {
                          label: "Cidade",
                          value:
                            reportData?.baseNacional?.documentoFaturado
                              ?.enderecos?.[0]?.cidade || "Nada Consta",
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Cadastro Estadual */}
                <CollapsibleSection
                  title="Cadastro Estadual"
                  isVisible={isCadastroEstadualVisible}
                  setIsVisible={setIsCadastroEstadualVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Data Emissão CRV",
                          value: formatDate(baseEstadual.dataEmissaoCrv),
                        },
                        {
                          label: "Exercício Licenciamento",
                          value: baseEstadual.exercicioLicenciamento,
                        },
                        { label: "Motor", value: baseEstadual.motor },
                        { label: "Renavam", value: baseEstadual.renavam },
                        { label: "UF", value: baseEstadual.uf },
                        { label: "Município", value: baseEstadual.municipio },
                        {
                          label: "Situação do Veículo",
                          value: baseEstadual.situacaoVeiculo,
                        },
                        {
                          label: "Data Licenciamento",
                          value: formatDate(baseEstadual.licdata),
                        },
                        { label: "Categoria", value: baseEstadual.categoria },
                        {
                          label: "Espécie do Veículo",
                          value: baseEstadual.especie,
                        },
                        {
                          label: "Combustível",
                          value: baseEstadual.combustivel,
                        },
                        { label: "Cor", value: baseEstadual.cor },
                        {
                          label: "Tipo Marcação do Chassi",
                          value: baseEstadual.tipoMarcacaoChassi,
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Restrições Estaduais */}
                <CollapsibleSection
                  title="Restrições Estaduais"
                  isVisible={isRestricoesEstaduaisVisible}
                  setIsVisible={setIsRestricoesEstaduaisVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Administrativa",
                          value:
                            baseEstadual.restricaoAdminisrativa ||
                            "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoAdminisrativa &&
                            baseEstadual.restricaoAdminisrativa
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Financeira",
                          value:
                            baseEstadual.restricaoFinanceira || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoFinanceira &&
                            baseEstadual.restricaoFinanceira
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Guincho",
                          value: baseEstadual.restricaoGuincho || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoGuincho &&
                            baseEstadual.restricaoGuincho
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Restrição 1",
                          value:
                            !baseEstadual.debitoRenainf ||
                            baseEstadual.debitoRenainf.trim() === "0,00"
                              ? "Nada Consta"
                              : baseEstadual.debitoRenainf,
                          hasWarning:
                            baseEstadual.debitoRenainf &&
                            baseEstadual.debitoRenainf.trim() !== "0,00" &&
                            baseEstadual.debitoRenainf.toLowerCase().trim() !==
                              "nada consta",
                        },
                        {
                          label: "Restrição 2",
                          value: baseEstadual.restricao2 || "Nada consta",
                          hasWarning:
                            baseEstadual.restricao2 &&
                            baseEstadual.restricao2.toLowerCase().trim() !==
                              "nada consta",
                        },
                        {
                          label: "Arrendamento",
                          value:
                            baseEstadual.restricaoArrendatario || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoArrendatario &&
                            baseEstadual.restricaoArrendatario
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Roubo",
                          value:
                            baseEstadual.restricaoRouboFurto || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoRouboFurto &&
                            baseEstadual.restricaoRouboFurto
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Observações",
                          value: baseEstadual.observacoes || "Nada consta",
                          hasWarning:
                            baseEstadual.observacoes &&
                            baseEstadual.observacoes.toLowerCase().trim() !==
                              "nada consta",
                        },
                        {
                          label: "Comunicação de Venda",
                          value:
                            baseEstadual.comunicacaoVenda ||
                            "Não consta comunicação de venda",
                          hasWarning:
                            baseEstadual.comunicacaoVenda &&
                            baseEstadual.comunicacaoVenda !==
                              "NAO CONSTA COMUNICACAO DE VENDAS",
                        },
                        {
                          label: "Data Tributária",
                          value:
                            baseEstadual.restricaoTributaria || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoTributaria &&
                            baseEstadual.restricaoTributaria
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Judicial",
                          value:
                            baseEstadual.restricaoJudicial || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoJudicial &&
                            baseEstadual.restricaoJudicial
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Restrição 3",
                          value:
                            baseEstadual.restricaoFinanceira || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoFinanceira &&
                            baseEstadual.restricaoFinanceira
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Restrição 4",
                          value: baseEstadual.restricao4 || "Nada consta",
                          hasWarning:
                            baseEstadual.restricao4 &&
                            baseEstadual.restricao4.toLowerCase().trim() !==
                              "nada consta",
                        },
                        {
                          label: "Renajud",
                          value: baseEstadual.restricaoRenajud || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoRenajud &&
                            baseEstadual.restricaoRenajud
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                        {
                          label: "Tributária",
                          value:
                            baseEstadual.restricaoTributaria || "Nada consta",
                          hasWarning:
                            baseEstadual.restricaoTributaria &&
                            baseEstadual.restricaoTributaria
                              .toLowerCase()
                              .trim() !== "nada consta",
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                          hasWarning={field.hasWarning}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Detalhamento Intenção de Gravame */}
                <CollapsibleSection
                  title="Detalhamento Intenção de Gravame"
                  isVisible={isDetalhamentoGravameVisible}
                  setIsVisible={setIsDetalhamentoGravameVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Restrições Financeira",
                          value:
                            reportData.gravame?.[0]?.restricaoFinanceira ||
                            "Nada Consta",
                        },
                        {
                          label: "Nome Financeira",
                          value:
                            reportData.gravame?.[0]?.financeira ||
                            "Nada Consta",
                        },
                        {
                          label: "Data Intenção",
                          value: reportData.gravame?.[0]?.intencao
                            ? formatDate(reportData.gravame[0].intencao)
                            : "Nada Consta",
                        },
                        {
                          label: "Documento Financeira",
                          value:
                            reportData.gravame?.[0]?.documentoFinanceira ||
                            "Nada Consta",
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Alerta de Débitos */}
                <CollapsibleSection
                  title="Alerta de Débitos"
                  isVisible={isAlertaDebitosVisible}
                  setIsVisible={setIsAlertaDebitosVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "Débito DPVAT",
                          value: baseEstadual?.existeDebitoDpvat?.includes(
                            "NAO EXISTE"
                          )
                            ? "Nada Consta"
                            : baseEstadual.existeDebitoDpvat || "Nada consta",
                          hasWarning:
                            baseEstadual.existeDebitoDpvat &&
                            !baseEstadual.existeDebitoDpvat
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao"),
                        },
                        {
                          label: "Débitos Licenciamento",
                          value:
                            baseEstadual?.existeDebitoLicenciamento?.includes(
                              "NAO EXISTE"
                            )
                              ? "Nada Consta"
                              : baseEstadual.existeDebitoLicenciamento ||
                                "Nada consta",
                          hasWarning:
                            baseEstadual.existeDebitoLicenciamento &&
                            !baseEstadual?.existeDebitoLicenciamento
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao"),
                        },
                        {
                          label: "Débitos IPVA",
                          value: baseEstadual.existeDebitoIpva?.includes(
                            "NAO EXISTE"
                          )
                            ? "Nada Consta"
                            : baseEstadual.existeDebitoIpva || "Nada consta",
                          hasWarning:
                            baseEstadual.existeDebitoIpva &&
                            !baseEstadual.existeDebitoIpva
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao"),
                        },
                        {
                          label: "Débitos Multa",
                          value: baseEstadual?.existeDebitoMulta?.includes(
                            "NAO EXISTE"
                          )
                            ? "Nada Consta"
                            : baseEstadual?.existeDebitoMulta || "Nada consta",
                          hasWarning:
                            baseEstadual?.existeDebitoMulta &&
                            !baseEstadual?.existeDebitoMulta
                              ?.toLowerCase()
                              ?.trim()
                              ?.includes("nao"),
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                          hasWarning={field.hasWarning}
                        />
                      ))}
                    </div>
                  </div>
                  {renderWarningBox(
                    "Atenção! As informações de débitos e multas em nosso sistema podem não refletir o status atual do veículo consultado, podendo não trazer todos os débitos ou multas do veículo. Orientamos a todos a consultar o site do DETRAN e SECRETARIA DA FAZENDA da UF do veículo."
                  )}
                </CollapsibleSection>

                {/* SEFAZ Link */}
                <CollapsibleSection
                  title="SEFAZ (Secretária de Estado da Fazenda) - Link de Direcionamento"
                  isVisible={isSEFAZVisible}
                  setIsVisible={setIsSEFAZVisible}
                >
                  <p className="text-[#194D9A] text-xs px-4 border border-[#1AABFE] rounded-full p-4 bg-white">
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
                </CollapsibleSection>

                {/* Detalhamento Débito e Multas */}
                <CollapsibleSection
                  title="Detalhamento Débito e Multas"
                  isVisible={isDetalhamentoDebitosVisible}
                  setIsVisible={setIsDetalhamentoDebitosVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-3">
                      {[
                        {
                          label: "CETESB",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoCetesb || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoCetesb || "0,00") >
                            0,
                        },
                        {
                          label: "DETRAN",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoDetran || "0,00")
                          ),
                        },
                        {
                          label: "DER",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoDer || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoDer || "0,00") > 0,
                        },
                        {
                          label: "DERSA",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoDersa || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoDersa || "0,00") >
                            0,
                        },
                        {
                          label: "DPVAT",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoDpvat || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoDpvat || "0,00") >
                            0,
                        },
                        {
                          label: "IPVA",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoIpva || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoIpva || "0,00") >
                            0,
                        },
                        {
                          label: "Licenciamento",
                          value: formatCurrency(
                            parseCurrency(
                              baseEstadual.debitoLicenciamento || "0,00"
                            )
                          ),
                          hasWarning:
                            parseCurrency(
                              baseEstadual.debitoLicenciamento || "0,00"
                            ) > 0,
                        },
                        {
                          label: "Municipais",
                          value: formatCurrency(
                            parseCurrency(
                              baseEstadual.debitoMunicipais || "0,00"
                            )
                          ),
                          hasWarning:
                            parseCurrency(
                              baseEstadual.debitoMunicipais || "0,00"
                            ) > 0,
                        },
                        {
                          label: "PRF",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoPrf || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoPrf || "0,00") > 0,
                        },
                        {
                          label: "Multas",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoMultas || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(baseEstadual.debitoMultas || "0,00") >
                            0,
                        },
                        {
                          label: "RENAINF",
                          value: formatCurrency(
                            parseCurrency(baseEstadual.debitoRenainf || "0,00")
                          ),
                          hasWarning:
                            parseCurrency(
                              baseEstadual.debitoRenainf || "0,00"
                            ) > 0,
                        },
                      ].map((field, index) => (
                        <ReportField
                          key={index}
                          label={field.label}
                          value={field.value}
                          hasWarning={field.hasWarning}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Histórico de Proprietários */}
                <CollapsibleSection
                  title="Histórico de Proprietários"
                  isVisible={isHistoricoProprietariosVisible}
                  setIsVisible={setIsHistoricoProprietariosVisible}
                  hasData={
                    reportData?.historicoProprietarios &&
                    reportData?.historicoProprietarios?.length > 0
                  }
                >
                  <ReportTableSection
                    title=""
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
                </CollapsibleSection>

                {/* Informações de Parceiros */}
                <CollapsibleSection
                  title="Informações de Parceiros"
                  isVisible={isInfoParceirosVisible}
                  setIsVisible={setIsInfoParceirosVisible}
                  hasData={!!reportData?.anuncio}
                >
                  <ReportTableSection
                    title=""
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
                </CollapsibleSection>

                {/* Observação do Vendedor */}
                <CollapsibleSection
                  title="Observação do Vendedor"
                  isVisible={isObservacaoVendedorVisible}
                  setIsVisible={setIsObservacaoVendedorVisible}
                >
                  {reportData?.anuncio?.observacao ? (
                    <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      <p className="text-[#194D9A] leading-relaxed">
                        {reportData?.anuncio?.observacao || "Nada Consta"}
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-[#1AABFE]/80 text-[#194D9A] rounded-full p-4 py-2 bg-white">
                      Nada Consta
                    </div>
                  )}
                </CollapsibleSection>
              </>
            )}

            {/* Opcionais - Only for Plus, Ultra, and Premium */}
            {planName !== "light" && (
              <CollapsibleSection
                title="Opcionais:"
                isVisible={isOpcionaisVisible}
                setIsVisible={setIsOpcionaisVisible}
              >
                {reportData?.anuncio?.opcionais &&
                reportData?.anuncio?.opcionais.length > 0 ? (
                  <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                    <div className="space-y-2">
                      {reportData?.anuncio?.opcionais.map((opcional, index) => (
                        <div key={index} className="text-sm text-[#194D9A]">
                          {typeof opcional === "string"
                            ? opcional
                            : opcional.descricao || opcional || "Nada Consta"}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-[#1AABFE]/80 text-[#194D9A] rounded-full p-4 py-2 bg-white">
                    Nada Consta
                  </div>
                )}
              </CollapsibleSection>
            )}

            {/* Sections for Ultra and Premium plans */}
            {(planName === "ultra" || planName === "premium") && (
              <>
                {/* Precificador - Valor de Mercado */}
                <CollapsibleSection
                  title="Precificador - Valor de Mercado"
                  isVisible={isPrecificadorMercadoVisible}
                  setIsVisible={setIsPrecificadorMercadoVisible}
                  hasData={
                    !!reportData?.comparativoEspecificacoes ||
                    !!reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                  }
                >
                  <ReportTableSection
                    headers={["Modelo", "Marca", "Versão", "Valor"]}
                    rows={[
                      [
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.modelo || "-",
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.marca || "-",
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.versao || "-",
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
                </CollapsibleSection>

                {/* Precificador - FIPE */}
                <CollapsibleSection
                  title="Precificador - FIPE"
                  isVisible={isPrecificadorFipeVisible}
                  setIsVisible={setIsPrecificadorFipeVisible}
                  hasData={
                    !!reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                  }
                >
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
                        reportData?.dadosBasicosDoVeiculo?.codigoFipe || "-",
                        reportData?.dadosBasicosDoVeiculo?.combustivel || "-",
                        reportData?.comparativoEspecificacoes
                          ?.veiculoComparativo?.[0]?.modelo || "-",
                        reportData?.dadosBasicosDoVeiculo?.marca || "-",
                        reportData?.dadosBasicosDoVeiculo?.informacoesFipe?.[0]
                          ?.valorAtual
                          ? formatCurrency(
                              parseCurrency(
                                reportData.dadosBasicosDoVeiculo
                                  .informacoesFipe[0].valorAtual
                              )
                            )
                          : "-",
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
                </CollapsibleSection>

                {/* Porcentagem sobre Tabela FIPE */}
                <CollapsibleSection
                  title="Porcentagem sobre Tabela FIPE em caso de leilão"
                  isVisible={isPorcentagemFipeVisible}
                  setIsVisible={setIsPorcentagemFipeVisible}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-[30%]">
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
                    <div className="w-full md:w-[70%] border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      <p className="text-sm text-[#1AABFE] mb-2">
                        Esse veículo poderá receber uma oferta máxima de{" "}
                        {reportData?.leilao?.score?.percentualSobreRef ?? 100}%
                        do preço do seu valor de tabela.
                      </p>
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Exigência de Vistoria Especial */}
                <CollapsibleSection
                  title="Exigência de Vistoria Especial"
                  isVisible={isExigenciaVistoriaVisible}
                  setIsVisible={setIsExigenciaVistoriaVisible}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-[30%]">
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
                    <div className="w-full md:w-[70%] border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                      {(() => {
                        const exigenciaValue =
                          reportData?.leilao?.score?.exigenciaVistoriaEspecial;
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
                </CollapsibleSection>

                {/* Recall */}
                <CollapsibleSection
                  title="Recall"
                  isVisible={isRecallVisible}
                  setIsVisible={setIsRecallVisible}
                  hasData={
                    !reportData?.recall?.detalhes?.every(
                      (item) => item?.data === null
                    )
                  }
                >
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
                              item?.data
                                ? formatDate(item?.data)
                                : "Informação não encontrada nas bases consultadas",
                              item?.defeito ||
                                "Informação não encontrada nas bases consultadas",
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
                </CollapsibleSection>

                {/* Descrição Completa */}
                <CollapsibleSection
                  title="Descrição Completa"
                  isVisible={isDescricaoCompletaVisible}
                  setIsVisible={setIsDescricaoCompletaVisible}
                >
                  <div
                    className={`border-2 border-[#1AABFE]/80 p-4 py-2 bg-white ${
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
                        <p className="text-[#1AABFE] leading-relaxed">
                          Informação não encontrada nas bases consultadas
                        </p>
                      )}
                    </div>
                  </div>
                </CollapsibleSection>

                {/* Recall Pendentes */}
                <CollapsibleSection
                  title="Recall Pendentes"
                  isVisible={isRecallPendentesVisible}
                  setIsVisible={setIsRecallPendentesVisible}
                  hasData={
                    !(
                      reportData?.recall?.recallsPendente?.every(
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
                      ) || reportData?.recall?.recallsPendente?.length === 0
                    )
                  }
                >
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
                              item?.descricao ||
                                "Informação não encontrada nas bases consultadas",
                              item?.identificador ||
                                "Informação não encontrada nas bases consultadas",
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
                </CollapsibleSection>

                {/* Histórico Roubo e Furto */}
                <CollapsibleSection
                  title="Histórico Roubo e Furto"
                  isVisible={isHistoricoRouboVisible}
                  setIsVisible={setIsHistoricoRouboVisible}
                  hasData={
                    !(
                      reportData?.rouboFurto?.historico?.every(
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
                      ) || reportData?.rouboFurto?.historico?.length === 0
                    )
                  }
                >
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
                                item?.data
                                  ? formatDate(item.data)
                                  : "Informação não encontrada nas bases consultadas",
                                item?.ocorrencia || "-",
                                item?.municipioUf || "-",
                                item?.numeroBo || "-",
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
                </CollapsibleSection>

                {/* Gravame */}
                <CollapsibleSection
                  title="Gravame"
                  isVisible={isGravameVisible}
                  setIsVisible={setIsGravameVisible}
                >
                  {reportData?.gravame && reportData?.gravame?.length > 0 ? (
                    reportData?.gravame?.map((gravame, index) => (
                      <div key={index} className="mb-4">
                        <div className="bg-[#1AABFE] text-white px-4 py-2 rounded-full w-fit mb-2">
                          <h4 className="font-semibold px-8">
                            Registro {index + 1}
                          </h4>
                        </div>
                        <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                          <div className="space-y-3">
                            {[
                              {
                                label: "Documento Agente",
                                value:
                                  gravame?.documentoAgente || "Nada Consta",
                              },
                              {
                                label: "Agente",
                                value: gravame?.agente || "Nada Consta",
                              },
                              {
                                label: "Responsável",
                                value: gravame?.responsavel || "Nada Consta",
                              },
                              {
                                label: "Placa",
                                value: gravame?.placa || "Nada Consta",
                              },
                              {
                                label: "Renavam",
                                value: gravame?.renavam || "Nada Consta",
                              },
                              {
                                label: "Chassi",
                                value: gravame?.chassi || "Nada Consta",
                              },
                              {
                                label: "Contrato",
                                value: gravame?.contrato || "Nada Consta",
                              },
                              {
                                label: "Número da Restrição",
                                value: gravame?.numero || "Nada Consta",
                              },
                              {
                                label: "Documento Financiado",
                                value:
                                  gravame?.documentoFinanciado || "Nada Consta",
                              },
                              {
                                label: "Data Situação",
                                value: gravame?.dataSituacao
                                  ? formatDate(gravame.dataSituacao)
                                  : "Nada Consta",
                              },
                              {
                                label: "Data Inclusão",
                                value: gravame?.dataInclusao
                                  ? formatDate(gravame.dataInclusao)
                                  : "Nada Consta",
                              },
                              {
                                label: "Vigência Contrato",
                                value: gravame?.vigenciaContrato
                                  ? formatDate(gravame.vigenciaContrato)
                                  : "Nada Consta",
                              },
                              {
                                label: "Observações",
                                value: gravame?.observacoes || "Nada Consta",
                              },
                              {
                                label: "Situação",
                                value: gravame?.situacao || "Nada Consta",
                              },
                            ].map((field, fieldIndex) => (
                              <ReportField
                                key={fieldIndex}
                                label={field.label}
                                value={field.value}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                      <p className=" text-[#1AABFE] leading-relaxed">
                        Não Consta informações nas bases consultadas
                      </p>
                    </div>
                  )}
                </CollapsibleSection>
              </>
            )}

            {/* Registro em Locadora - Only for Ultra and Premium */}
            {(planName === "ultra" || planName === "premium") && (
              <CollapsibleSection
                title="Registro em Locadora"
                isVisible={isRegistroLocadoraVisible}
                setIsVisible={setIsRegistroLocadoraVisible}
              >
                <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                  <p className="text-[#1AABFE]">
                    {reportData?.registroEmLocadora?.registroEmLocadora === true
                      ? "Sim"
                      : "Não Consta informações nas bases consultadas"}
                  </p>
                </div>
              </CollapsibleSection>
            )}

            {/* Sections for Premium plan only */}
            {planName === "premium" && (
              <>
                {/* CSV */}
                <CollapsibleSection
                  title="CSV"
                  isVisible={isCSVVisible}
                  setIsVisible={setIsCSVVisible}
                >
                  <div className="border-2 border-[#1AABFE]/80 rounded-full p-4 py-2 bg-white">
                    <p className="text-[#1AABFE]">
                      {reportData?.csv?.length > 0
                        ? "Consta informações nas bases consultadas"
                        : "Não Consta informações nas bases consultadas"}
                    </p>
                  </div>
                </CollapsibleSection>

                {/* Histórico de Multas RENAINF */}
                <CollapsibleSection
                  title="Histórico de Multas RENAINF"
                  isVisible={isMultasRenainfVisible}
                  setIsVisible={setIsMultasRenainfVisible}
                  hasData={
                    reportData?.multasRenainf &&
                    Array.isArray(reportData.multasRenainf) &&
                    reportData.multasRenainf.length > 0
                  }
                >
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
                        multa?.autoInfracao ||
                          "Informação não encontrada nas bases consultadas",
                        multa?.dataInfracao
                          ? formatDate(multa.dataInfracao)
                          : "-",
                        multa?.orgaoAutuador || "-",
                        multa?.ufOrgaoAutuador || "-",
                      ])}
                      desc={reportData.multasRenainf.map(
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
                </CollapsibleSection>

                {/* Seguradoras Consultadas */}
                <CollapsibleSection
                  title="Seguradoras Consultadas"
                  isVisible={isSeguradorasVisible}
                  setIsVisible={setIsSeguradorasVisible}
                  hasData={
                    reportData?.radarSecuritario &&
                    Array.isArray(reportData.radarSecuritario) &&
                    reportData.radarSecuritario.length > 0
                  }
                >
                  {reportData?.radarSecuritario &&
                  Array.isArray(reportData.radarSecuritario) &&
                  reportData.radarSecuritario.length > 0 ? (
                    (() => {
                      const radarData = reportData.radarSecuritario[0];
                      return (
                        <div className="space-y-4">
                          {radarData?.cias &&
                            Array.isArray(radarData.cias) &&
                            radarData.cias.length > 0 && (
                              <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                                <div className="flex flex-wrap gap-4 items-center justify-center">
                                  {radarData.cias.map((cia, index) => {
                                    const insurerName =
                                      cia?.Nome || cia?.nome || "-";
                                    return (
                                      <div
                                        key={index}
                                        className="flex items-center justify-center p-4"
                                      >
                                        {cia?.logo_link ? (
                                          <img
                                            src={cia.logo_link}
                                            alt={insurerName}
                                            className="max-h-12 max-w-32 object-contain"
                                            onError={(e) => {
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

                          {(radarData?.franquiaNormal ||
                            radarData?.franquiaReduzida) && (
                            <ReportTableSection
                              headers={[
                                "Tipo da Franquia",
                                "Preço Médio do Seguro",
                                "Franquia Média",
                              ]}
                              rows={[
                                radarData?.franquiaNormal
                                  ? [
                                      "Franquia Normal",
                                      radarData.franquiaNormal?.valorPremio
                                        ?.media
                                        ? formatCurrency(
                                            parseCurrency(
                                              radarData.franquiaNormal
                                                .valorPremio.media
                                            )
                                          )
                                        : "-",
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
                                radarData?.franquiaReduzida
                                  ? [
                                      "Franquia Reduzida",
                                      radarData.franquiaReduzida?.valorPremio
                                        ?.media
                                        ? formatCurrency(
                                            parseCurrency(
                                              radarData.franquiaReduzida
                                                .valorPremio.media
                                            )
                                          )
                                        : "-",
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
                                  <div className="space-y-3 border-2 border-[#1AABFE]/80 text-[#194D9A] p-4 bg-white rounded-xl">
                                    <div className="whitespace-pre-line text-sm text-[#194D9A] leading-relaxed">
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
                </CollapsibleSection>

                {/* Histórico de Anúncios */}
                <CollapsibleSection
                  title="Histórico de Anúncios"
                  isVisible={isHistoricoAnunciosVisible}
                  setIsVisible={setIsHistoricoAnunciosVisible}
                  hasData={
                    reportData?.historicoAnuncios &&
                    (Array.isArray(reportData.historicoAnuncios)
                      ? reportData.historicoAnuncios.length > 0
                      : true)
                  }
                >
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
                                anuncio?.km
                                  ? `${anuncio.km.toLocaleString("pt-BR")}`
                                  : "-",
                                anuncio?.valor
                                  ? formatCurrency(parseCurrency(anuncio.valor))
                                  : "-",
                                anuncio?.data ? formatDate(anuncio.data) : "-",
                              ],
                            ]}
                          />
                          <div className="space-y-2">
                            <p className="text-white bg-[#1AABFE] rounded-full p-2 px-6 w-fit font-semibold text-sm">
                              Fotos
                            </p>
                            <div className="border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white">
                              {anuncio?.fotos &&
                              (Array.isArray(anuncio.fotos)
                                ? anuncio.fotos.length > 0
                                : true) ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                </CollapsibleSection>

                {/* Histórico de Consulta */}
                <CollapsibleSection
                  title="Histórico de Consulta"
                  isVisible={isHistoricoConsultaVisible}
                  setIsVisible={setIsHistoricoConsultaVisible}
                  hasData={!!reportData?.historicoConsultaVeicular}
                >
                  <ReportTableSection
                    headers={[
                      "Primeira Consulta",
                      "Última Consulta",
                      "Total de Consultas",
                    ]}
                    rows={[
                      [
                        reportData?.historicoConsultaVeicular
                          ?.primeiraConsulta || "-",
                        reportData?.historicoConsultaVeicular?.ultimaConsulta ||
                          "-",
                        reportData?.historicoConsultaVeicular?.total?.toString() ||
                          "-",
                      ],
                    ]}
                  />
                </CollapsibleSection>
              </>
            )}
          </div>

          {/* Mobile Footer */}
          {/* Footer with buttons */}
          <div className="border-t-2 border-gray-200 pt-6 mt-6 flex flex-col items-end justify-center mb-8">
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
  );
};

export default ReportMobile;
