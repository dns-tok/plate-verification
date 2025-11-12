/**
 * Field mapping configuration for report filtering by plan
 * Maps field labels to their sections and defines visibility by plan
 */

// Summary box visibility by plan
const SUMMARY_BOX_VISIBILITY = {
  light: new Set(["Leilão", "Sinistro", "Bancos, Financeiras ou seguradoras"]),

  plus: new Set([
    "Leilão",
    "Sinistro",
    "Bancos, Financeiras ou seguradoras",
    "Restrições Nacionais",
    "Restrições Estaduais",
    "motor alterado",
    "Chassi remarcado",
  ]),

  ultra: new Set([
    "Leilão",
    "Sinistro",
    "Bancos, Financeiras ou seguradoras",
    "Restrições Nacionais",
    "Restrições Estaduais",
    "motor alterado",
    "Chassi remarcado",
    "Recall",
    "Alerta de Gravame",
    "Historico de Roubo",
  ]),

  premium: new Set([
    // All summary boxes
    "Leilão",
    "Sinistro",
    "Bancos, Financeiras ou seguradoras",
    "Restrições Nacionais",
    "Restrições Estaduais",
    "motor alterado",
    "Chassi remarcado",
    "Recall",
    "Alerta de Gravame",
    "Historico de Roubo",
    "CSV",
    "RENAJUD",
    "Historico de multas RENAINF",
  ]),
};

// Define which fields are visible for each plan
const PLAN_FIELDS = {
  light: new Set([
    // Header fields
    "RELATÓRIO DE CONSULTA VEICULAR",
    "ABC1D23",
    "Data da consulta:",
    "ID da consulta:",
    "Status da consulta:",
    "Plano",
    "Idade do Veiculo",
    "Valor FIPE",

    // Resumo da consulta
    "Leilão",
    "Sinistro",
    "Bancos, Financeiras ou seguradoras",
    "Atenção: Alguns blocos possuem informações que merecem cuidado.",

    // Insights do veículo
    "Nível de risco geral",
    "Exigência de Vistoria Especial",
    "Percentual sobre Tabela FIPE",

    // Informações gerais do veículo
    "Marca / Modelo:",
    "Ano / Modelo:",
    "Cor:",
    "Placa:",
    "RENAVAM:",
    "Combustível:",
    "Tipo do Veículo:",
    "Número do motor:",
    "Nacionalidade:",
    "Chasi:",
    "UF:",
    "Município:",

    // Dados Básicos
    "Caixa Câmbio:",
    "Capacidade Máxima de tração:",
    "Cilindradas:",
    "Eixo Diferencial:",
    "Número 3º Eixo:",
    "Número Carroceria:",
    "Potência:",
    "Tipo Carroceria:",
    "Peso Bruto:",
    "Capacidade de Passageiros",

    // Informações sobre leilão
    "Data Leilão",
    "Id Leilão",
    "Lote",
    "Placa",
    "Chassi",
    "Marca",
    "Modelo",
    "Condição",
    "Comitente",
    "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil.",

    // Score Leilão
    "Score",
    "Score Pontuação:",

    // Indício de Sinistro
    "inside the box",

    // Apontamentos em Bancos
    "Placa:",
    "Chasi:",
    "Análise:",

    // Remarketing
    "Organizador",
    "Vendedor",
    "Data evento",
    "Condições do veículo",
    "Situação chassi",
    "Condições motor",
    "Condições câmbio",
    "Condições mecânicas",
    "Observação",

    // Remarketing - Dados do veículo
    "RENAVAM:",
    "Placa:",
    "Situação Chassi:",
    "Motor:",
    "Marca / Modelo:",
    "Chassi:",
    "Segmento:",
    "Auto Sub segmento:",
    "Data da Inspeção:",
    "Observação:",
    "Garantia: Nada Consta",

    // Fotos
    "Fotos",

    // Histórico de KMs
    "Data",
    "Odômetro",
    "Fonte",
    "Data (Histórico de KM) 1",
    "Odômetro 1",
    "Fonte 1",
    "Data (Histórico de KM) 2",
    "Odômetro 2",
    "Fonte 2",
  ]),

  plus: new Set([
    // All Light fields (included explicitly - no inheritance)
    "RELATÓRIO DE CONSULTA VEICULAR",
    "ABC1D23",
    "Data da consulta:",
    "ID da consulta:",
    "Status da consulta:",
    "Plano",
    "Idade do Veiculo",
    "Valor FIPE",
    "Leilão",
    "Sinistro",
    "Bancos, Financeiras ou seguradoras",
    "Atenção: Alguns blocos possuem informações que merecem cuidado.",
    "Nível de risco geral",
    "Exigência de Vistoria Especial",
    "Percentual sobre Tabela FIPE",
    "Marca / Modelo:",
    "Ano / Modelo:",
    "Cor:",
    "Placa:",
    "RENAVAM:",
    "Combustível:",
    "Tipo do Veículo:",
    "Número do motor:",
    "Nacionalidade:",
    "Chasi:",
    "UF:",
    "Município:",
    "Caixa Câmbio:",
    "Capacidade Máxima de tração:",
    "Cilindradas:",
    "Eixo Diferencial:",
    "Número 3º Eixo:",
    "Número Carroceria:",
    "Potência:",
    "Tipo Carroceria:",
    "Peso Bruto:",
    "Capacidade de Passageiros",
    "Data Leilão",
    "Id Leilão",
    "Lote",
    "Placa",
    "Chassi",
    "Marca",
    "Modelo",
    "Condição",
    "Comitente",
    "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil.",
    "Score",
    "Score Pontuação:",
    "inside the box",
    "Placa:",
    "Chasi:",
    "Análise:",
    "Organizador",
    "Vendedor",
    "Data evento",
    "Condições do veículo",
    "Situação chassi",
    "Condições motor",
    "Condições câmbio",
    "Condições mecânicas",
    "Observação",
    "RENAVAM:",
    "Situação Chassi:",
    "Motor:",
    "Marca / Modelo:",
    "Chassi:",
    "Segmento:",
    "Auto Sub segmento:",
    "Data da Inspeção:",
    "Observação:",
    "Garantia: Nada Consta",
    "Fotos",
    "Data",
    "Odômetro",
    "Fonte",
    "Data (Histórico de KM) 1",
    "Odômetro 1",
    "Fonte 1",
    "Data (Histórico de KM) 2",
    "Odômetro 2",
    "Fonte 2",

    // Additional Plus fields:
    "Restriçoes nacionais",
    "Restriçoes estaduais",
    "motor alterado",
    "Chassi remarcado",

    // Decodificador de Chassi - Dados Básicos (only these 12 specific fields for Plus)
    "Placa", // for Decodificador section
    "Ano Modelo",
    "Ano Fabricação",
    "Marca", // for Decodificador section
    "Modelo", // for Decodificador section
    "Versão",
    "Código FIPE",
    "Nacionalidade", // for Decodificador section
    "Combustível", // for Decodificador section (note: different from "Combustível:" in other sections)
    "Cilindradas", // for Decodificador section (note: different from "Cilindradas:" in other sections)
    "Código Versão",
    "Valor atual",
    "Variação 2017",
    "Variação 2018",
    "Variação 2019",
    "Variação 2020",
    "Variação 2021",
    "Variação 2022",
    "Variação 2023",
    "Variação 2024",
    "Variação 2025",
    "Valor Atual (Gráfico)",

    // Cadastro Nacional
    "Tipo Marcação de Chassi",
    "Motor",
    "Renavam",
    "Data Última Atualização",
    "Categoria",
    "Espécie de Veículo",
    "Combustível",
    "Cor",
    "UF",
    "Município",
    "Tipo de Veículo",
    "Situação Veículo",
    "CSV - Acesso Site",
    "CSV - Observação",
    "Comunicação de Venda",
    "Restrição Financeira",
    "Restrição 1",
    "Restrição 2",
    "Restrição 3",
    "Restrição 4",
    "Indicação Restrição Renajud",
    "Ocorrência",
    "Documento Faturado",
    "UF Faturado",
    "Tipo Documento Faturado",
    "Razão Social",
    "Cidade",
    "CEP",
    "Data Emissão CRV",
    "Data Licenciamento",
    "Exercício Licenciamento",
    "Situação do Veículo",
    "Categoria",
    "Espécie do Veículo",
    "Tipo Marcação do Chassi",
    "Restricao estadual",
    "Administrativa",
    "Financeira",
    "Guincho",
    "Arrendamento",
    "Roubo",
    "Observações",
    "Data Tributária",
    "Judicial",
    "Renajud",
    "Tributária",
    "Detalhamento Gravame",
    "Restrições Financeira",
    "Nome Financeira",
    "Data Intenção",
    "Documento Financeira",
    "Alertas Debitos",
    "Débito DPVAT",
    "Débitos Licenciamento",
    "Débitos IPVA",
    "Débitos Multa",
    "SEFAZ Link",
    "CETESB",
    "DETRAN",
    "DER",
    "DERSA",
    "DPVAT",
    "IPVA",
    "Licenciamento",
    "Municipais",
    "PRF",
    "Multas",
    "RENAINF",
    "Hist. Proprietários - Município",
    "Hist. Proprietários - UF",
    "Hist. Proprietários - Exercício",
    "Hist. Proprietários - Proprietário",
    "Hist. Proprietários - Data",
    "Hist. Proprietários - Motivo",
    "Informações de Parceiros - Data",
    "Informações de Parceiros - KM",
    "Informações de Parceiros - Valor do Anúncio",
    "Observação do Vendedor",
    "Opcional 1",
    "Opcional 2",
    "Opcional 3",
    "Opcional 4",
    "Opcional 5",
    "Opcional 6",
    "Opcional 7",
    "Opcional 8",
    "Opcional 9",
    "Opcional 10",
    "Opcional 11",
    "Opcional 12",
    "Opcional 13",
    "Opcional 14",
    "Opcional 15",
    "Opcional 16",
    "Opcional 17",
    "Opcional 18",
    "Opcional 19",
    "Opcional 20",
    "Opcional 21",
    "Opcional 22",
    "Opcional 23",
    "Opcional 24",
    "Opcional 25",
    "Registro DI",
  ]),

  ultra: new Set([
    // All Plus fields (included explicitly - no inheritance)
    "RELATÓRIO DE CONSULTA VEICULAR",
    "ABC1D23",
    "Data da consulta:",
    "ID da consulta:",
    "Status da consulta:",
    "Plano",
    "Idade do Veiculo",
    "Valor FIPE",
    "Leilão",
    "Sinistro",
    "Bancos, Financeiras ou seguradoras",
    "Atenção: Alguns blocos possuem informações que merecem cuidado.",
    "Nível de risco geral",
    "Exigência de Vistoria Especial",
    "Percentual sobre Tabela FIPE",
    "Marca / Modelo:",
    "Marca / Modelo", // without colon
    "Ano / Modelo:",
    "Ano / Modelo", // without colon
    "Cor:",
    "Cor", // without colon
    "Placa:",
    "Placa", // without colon
    "RENAVAM:",
    "RENAVAM", // without colon
    "Combustível:",
    "Combustível", // without colon
    "Tipo do Veículo:",
    "Tipo do Veículo", // without colon
    "Número do motor:",
    "Número do motor", // without colon
    "Nacionalidade:",
    "Nacionalidade", // without colon
    "Chasi:",
    "Chassi", // without colon (also check for Chassi spelling)
    "UF:",
    "UF", // without colon
    "Município:",
    "Município", // without colon
    "Caixa Câmbio:",
    "Capacidade Máxima de tração:",
    "Cilindradas:",
    "Eixo Diferencial:",
    "Número 3º Eixo:",
    "Número Carroceria:",
    "Potência:",
    "Tipo Carroceria:",
    "Peso Bruto:",
    "Capacidade de Passageiros",
    "Data Leilão",
    "Id Leilão",
    "Lote",
    "Placa",
    "Chassi",
    "Marca",
    "Modelo",
    "Condição",
    "Comitente",
    "Atenção: As informações de leilão são provenientes de diversos leiloeiros do país, ou seja, não são dados de bases públicas, como, por exemplo, o Detran. Além disso, muitas vezes, as informações de leilão precisam ser coletadas presencialmente, o que faz com que os fornecedores não tenham acesso em tempo real a 100% dos veículos de leilões realizados no Brasil.",
    "Score",
    "Score Pontuação:",
    "inside the box",
    "Placa:",
    "Chasi:",
    "Análise:",
    "Organizador",
    "Vendedor",
    "Data evento",
    "Condições do veículo",
    "Situação chassi",
    "Condições motor",
    "Condições câmbio",
    "Condições mecânicas",
    "Observação",
    "RENAVAM:",
    "Situação Chassi:",
    "Motor:",
    "Marca / Modelo:",
    "Chassi:",
    "Segmento:",
    "Auto Sub segmento:",
    "Data da Inspeção:",
    "Observação:",
    "Garantia: Nada Consta",
    "Fotos",
    "Data",
    "Odômetro",
    "Fonte",
    "Data (Histórico de KM) 1",
    "Odômetro 1",
    "Fonte 1",
    "Data (Histórico de KM) 2",
    "Odômetro 2",
    "Fonte 2",
    "Restriçoes nacionais",
    "Restriçoes estaduais",
    "motor alterado",
    "Chassi remarcado",
    "Placa",
    "Ano Modelo",
    "Ano Fabricação",
    "Marca",
    "Modelo",
    "Versão",
    "Código FIPE",
    "Nacionalidade",
    "Combustível",
    "Cilindradas",
    "Código Versão",
    "Valor atual",
    "Variação 2017",
    "Variação 2018",
    "Variação 2019",
    "Variação 2020",
    "Variação 2021",
    "Variação 2022",
    "Variação 2023",
    "Variação 2024",
    "Variação 2025",
    "Valor Atual (Gráfico)",
    "Tipo Marcação de Chassi",
    "Motor",
    "Renavam",
    "Data Última Atualização",
    "Categoria",
    "Espécie de Veículo",
    "Combustível",
    "Cor",
    "UF",
    "Município",
    "Tipo de Veículo",
    "Situação Veículo",
    "CSV - Acesso Site",
    "CSV - Observação",
    "Comunicação de Venda",
    "Restrição Financeira",
    "Restrição 1",
    "Restrição 2",
    "Restrição 3",
    "Restrição 4",
    "Indicação Restrição Renajud",
    "Ocorrência",
    "Documento Faturado",
    "UF Faturado",
    "Tipo Documento Faturado",
    "Razão Social",
    "Cidade",
    "CEP",
    "Data Emissão CRV",
    "Data Licenciamento",
    "Exercício Licenciamento",
    "Situação do Veículo",
    "Categoria",
    "Espécie do Veículo",
    "Tipo Marcação do Chassi",
    "Restricao estadual",
    "Administrativa",
    "Financeira",
    "Guincho",
    "Arrendamento",
    "Roubo",
    "Observações",
    "Data Tributária",
    "Judicial",
    "Renajud",
    "Tributária",
    "Detalhamento Gravame",
    "Restrições Financeira",
    "Nome Financeira",
    "Data Intenção",
    "Documento Financeira",
    "Alertas Debitos",
    "Débito DPVAT",
    "Débitos Licenciamento",
    "Débitos IPVA",
    "Débitos Multa",
    "SEFAZ Link",
    "CETESB",
    "DETRAN",
    "DER",
    "DERSA",
    "DPVAT",
    "IPVA",
    "Licenciamento",
    "Municipais",
    "PRF",
    "Multas",
    "RENAINF",
    "Hist. Proprietários - Município",
    "Hist. Proprietários - UF",
    "Hist. Proprietários - Exercício",
    "Hist. Proprietários - Proprietário",
    "Hist. Proprietários - Data",
    "Hist. Proprietários - Motivo",
    "Informações de Parceiros - Data",
    "Informações de Parceiros - KM",
    "Informações de Parceiros - Valor do Anúncio",
    "Observação do Vendedor",
    "Opcional 1",
    "Opcional 2",
    "Opcional 3",
    "Opcional 4",
    "Opcional 5",
    "Opcional 6",
    "Opcional 7",
    "Opcional 8",
    "Opcional 9",
    "Opcional 10",
    "Opcional 11",
    "Opcional 12",
    "Opcional 13",
    "Opcional 14",
    "Opcional 15",
    "Opcional 16",
    "Opcional 17",
    "Opcional 18",
    "Opcional 19",
    "Opcional 20",
    "Opcional 21",
    "Opcional 22",
    "Opcional 23",
    "Opcional 24",
    "Opcional 25",
    "Registro DI",
    "Registro DI:", // with colon

    // Additional Ultra fields:
    "Resumo IA",
    "Recall",
    "Alerta de Gravame",
    "Historico de Roubo",
    "Precificador - Valor de Mercado - Modelo",
    "Precificador - Valor de Mercado - Marca",
    "Precificador - Valor de Mercado - Versão",
    "Precificador - Valor de Mercado - Valor",
    "FIPE - Código FIPE",
    "FIPE - Combustível",
    "FIPE - Modelo",
    "FIPE - Marca",
    "FIPE - Valor",
    "FIPE - Valor 0 KM",
    "Porcentagem sobre Tabela FIPE - Percentual Máximo de Oferta",
    "Porcentagem sobre Tabela FIPE - Observação",
    "Barra exigencia de vistoria",
    "Exigência de Vistoria Especial - Chance",
    "Recall - Data",
    "Recall - Defeito",
    "Recall - Risco",
    "Descrição Completa - Item 1",
    "Recall Pendentes - Descrição",
    "Recall Pendentes - Identificador",
    "Recall Pendentes - Situação",
    "Histórico Roubo e Furto - 1 - Data",
    "Histórico Roubo e Furto - 1 - Ocorrência",
    "Histórico Roubo e Furto - 1 - Município/Estado",
    "Histórico Roubo e Furto - 1 - Nº B.O.",
    "Histórico Roubo e Furto - 1 - Informante",
    "Histórico Roubo e Furto - 2 - Data",
    "Histórico Roubo e Furto - 2 - Ocorrência",
    "Histórico Roubo e Furto - 2 - Município/Estado",
    "Histórico Roubo e Furto - 2 - Nº B.O.",
    "Histórico Roubo e Furto - 2 - Informante",
    "Histórico Roubo e Furto - 3 - Data",
    "Histórico Roubo e Furto - 3 - Ocorrência",
    "Histórico Roubo e Furto - 3 - Município/Estado",
    "Histórico Roubo e Furto - 3 - Nº B.O.",
    "Histórico Roubo e Furto - 3 - Informante",
    "Gravame - Documento Agente",
    "Gravame - Agente",
    "Gravame - Responsável",
    "Gravame - Placa",
    "Gravame - Renavam",
    "Gravame - Chassi",
    "Gravame - Contrato",
    "Gravame - Número da Restrição",
    "Gravame - Documento Financiado",
    "Gravame - Data Situação",
    "Gravame - Data Inclusão",
    "Gravame - Vigência Contrato",
    "Gravame - Observações",
    "Gravame - Situação",
    "Gravame - Registro 2 - Documento Agente",
    "Gravame - Registro 2 - Agente",
    "Gravame - Registro 2 - Responsável",
    "Gravame - Registro 2 - Placa",
    "Gravame - Registro 2 - Renavam",
    "Gravame - Registro 2 - Chassi",
    "Gravame - Registro 2 - Contrato",
    "Gravame - Registro 2 - Número da Restrição",
    "Gravame - Registro 2 - Documento Financiado",
    "Gravame - Registro 2 - Data Situação",
    "Gravame - Registro 2 - Data Inclusão",
    "Gravame - Registro 2 - Vigência Contrato",
    "Gravame - Registro 2 - Observações",
    "Gravame - Registro 2 - Situação",
    "Registro em Locadora",
    "Região Geográfica",
    "País",
    "Tipo Veículo",
    "Peso Bruto Total",
    "Capacidade Carga",
    "Número Eixos Traseiro",
    "Número Eixos Auxiliar",
    "Espécie Veículo",
    "Tipo de Carroceria",
  ]),

  premium: new Set([
    // All fields - premium has everything
    // This will be handled by checking if field is NOT in any lower plan
  ]),
};

// Section visibility by plan
const SECTION_VISIBILITY = {
  light: new Set([
    "Resumo da consulta",
    "Insights do veículo",
    "Informações gerais do veículo",
    "Dados Básicos",
    "Informações sobre leilão",
    "Score Leilão",
    "Indício de Sinistro",
    "Apontamentos em Bancos, Financeiras ou Seguradoras",
    "Remarketing",
    "Remarketing - Dados do veículo",
    "Fotos",
    "Histórico de KMs",
  ]),

  plus: new Set([
    // All Light sections plus:
    "Decodificador de Chassi - Dados Básicos",
    "Decodificador de Chassi - Precificadores",
    "Cadastro Nacional",
    "Opcionais:",
  ]),

  ultra: new Set([
    // All Plus sections plus:
    "Resumo IA",
    "Precificador - Valor de Mercado",
    "Precificador - FIPE",
    "Porcentagem sobre Tabela FIPE em caso de leilão",
    "Exigência de Vistoria Especial",
    "Recall",
    "Descrição Completa",
    "Recall Pendentes",
    "Histórico Roubo e Furto",
    "Gravame",
    "Registro em Locadora",
  ]),

  premium: new Set([
    // All sections - premium has everything
  ]),
};

/**
 * Normalize field label for comparison (remove colons, trim, handle variations)
 * @param {string} label - The field label
 * @returns {string} - Normalized label
 */
const normalizeFieldLabel = (label) => {
  if (!label) return "";
  return label
    .trim()
    .replace(/[:：]$/, "")
    .trim();
};

/**
 * Check if a field should be visible for a given plan
 * @param {string} fieldLabel - The label of the field
 * @param {string} planName - The plan name (light, plus, ultra, premium)
 * @returns {boolean} - True if field should be visible
 */
export const isFieldVisible = (fieldLabel, planName) => {
  if (!planName || !fieldLabel) return true; // Default to visible if no plan specified

  const normalizedPlan = planName.toLowerCase();
  const normalizedLabel = normalizeFieldLabel(fieldLabel);

  // Premium has all fields
  if (normalizedPlan === "premium") {
    return true;
  }

  // Check if field is in the plan's allowed fields (try both with and without colon)
  const planFields = PLAN_FIELDS[normalizedPlan];
  if (planFields) {
    // Check exact match
    if (planFields.has(normalizedLabel)) {
      return true;
    }
    // Check with colon
    if (planFields.has(normalizedLabel + ":")) {
      return true;
    }
    // Check without colon (if label has colon)
    if (fieldLabel.endsWith(":") && planFields.has(normalizedLabel)) {
      return true;
    }
  }

  // For lower plans, check if field exists in any higher plan
  // If it doesn't exist in current plan but exists in higher plans, hide it
  // Inheritance model:
  // Light: only its own fields
  // Plus: all Light fields + Plus-specific fields
  // Ultra: all Plus fields (which includes all Light) + Ultra-specific fields
  // Premium: everything

  if (normalizedPlan === "light") {
    return (
      planFields?.has(normalizedLabel) ||
      planFields?.has(normalizedLabel + ":") ||
      false
    );
  }

  if (normalizedPlan === "plus") {
    // Plus plan: has all Light fields + Plus-specific fields
    const lightFields = PLAN_FIELDS.light;
    return (
      planFields?.has(normalizedLabel) ||
      planFields?.has(normalizedLabel + ":") ||
      lightFields?.has(normalizedLabel) ||
      lightFields?.has(normalizedLabel + ":") ||
      false
    );
  }

  if (normalizedPlan === "ultra") {
    // Ultra plan: has all Plus fields (which includes all Light) + Ultra-specific fields
    const plusFields = PLAN_FIELDS.plus;
    const lightFields = PLAN_FIELDS.light;
    return (
      planFields?.has(normalizedLabel) ||
      planFields?.has(normalizedLabel + ":") ||
      plusFields?.has(normalizedLabel) ||
      plusFields?.has(normalizedLabel + ":") ||
      lightFields?.has(normalizedLabel) ||
      lightFields?.has(normalizedLabel + ":") ||
      false
    );
  }

  return false;
};

/**
 * Check if a section should be visible for a given plan
 * @param {string} sectionTitle - The title of the section
 * @param {string} planName - The plan name (light, plus, ultra, premium)
 * @returns {boolean} - True if section should be visible
 */
export const isSectionVisible = (sectionTitle, planName) => {
  if (!planName || !sectionTitle) return true; // Default to visible

  const normalizedPlan = planName.toLowerCase();
  const normalizedTitle = sectionTitle.trim();

  // Premium has all sections
  if (normalizedPlan === "premium") {
    return true;
  }

  // Check section visibility
  const planSections = SECTION_VISIBILITY[normalizedPlan];
  if (planSections && planSections.has(normalizedTitle)) {
    return true;
  }

  // For lower plans, check if section exists in any higher plan
  if (normalizedPlan === "light") {
    return planSections?.has(normalizedTitle) || false;
  }

  if (normalizedPlan === "plus") {
    return (
      planSections?.has(normalizedTitle) ||
      SECTION_VISIBILITY.light?.has(normalizedTitle) ||
      false
    );
  }

  if (normalizedPlan === "ultra") {
    return (
      planSections?.has(normalizedTitle) ||
      SECTION_VISIBILITY.plus?.has(normalizedTitle) ||
      SECTION_VISIBILITY.light?.has(normalizedTitle) ||
      false
    );
  }

  return false;
};

/**
 * Check if a summary box should be visible for a given plan
 * @param {string} boxLabel - The label of the summary box
 * @param {string} planName - The plan name (light, plus, ultra, premium)
 * @returns {boolean} - True if box should be visible
 */
export const isSummaryBoxVisible = (boxLabel, planName) => {
  if (!planName || !boxLabel) return true; // Default to visible

  const normalizedPlan = planName.toLowerCase();
  const normalizedLabel = boxLabel.trim();

  // Premium has all summary boxes
  if (normalizedPlan === "premium") {
    return true;
  }

  // Check summary box visibility
  const planBoxes = SUMMARY_BOX_VISIBILITY[normalizedPlan];
  if (planBoxes && planBoxes.has(normalizedLabel)) {
    return true;
  }

  // For lower plans, check if box exists in any higher plan
  if (normalizedPlan === "light") {
    return planBoxes?.has(normalizedLabel) || false;
  }

  if (normalizedPlan === "plus") {
    return (
      planBoxes?.has(normalizedLabel) ||
      SUMMARY_BOX_VISIBILITY.light?.has(normalizedLabel) ||
      false
    );
  }

  if (normalizedPlan === "ultra") {
    return (
      planBoxes?.has(normalizedLabel) ||
      SUMMARY_BOX_VISIBILITY.plus?.has(normalizedLabel) ||
      SUMMARY_BOX_VISIBILITY.light?.has(normalizedLabel) ||
      false
    );
  }

  return false;
};

/**
 * Filter an array of field objects based on plan
 * @param {Array} fields - Array of field objects with 'label' property
 * @param {string} planName - The plan name
 * @returns {Array} - Filtered array of fields
 */
export const filterFields = (fields, planName) => {
  if (!fields || !Array.isArray(fields)) return [];

  return fields.filter((field) => {
    const label = field?.label || field;
    return isFieldVisible(label, planName);
  });
};

/**
 * Filter fields in a TwoColumnFieldSection structure
 * @param {Object} fieldsObj - Object with 'left' and 'right' arrays
 * @param {string} planName - The plan name
 * @param {string} sectionTitle - Optional section title for section-specific filtering
 * @returns {Object} - Filtered fields object
 */
export const filterTwoColumnFields = (
  fieldsObj,
  planName,
  sectionTitle = null
) => {
  if (!fieldsObj) return { left: [], right: [] };

  // Fields that should NOT appear in "Decodificador de Chassi - Dados Básicos" for Plus plan
  // (but should appear in "Dados Básicos" section)
  const excludedFromDecodificadorPlus = new Set([
    "caixa câmbio",
    "potência",
    "número carroceria",
  ]);

  // Fields that ARE allowed in "Decodificador de Chassi - Dados Básicos" for Ultra plan
  // Only these 15 fields should appear for Ultra in this section (Placa is included in all plans)
  const allowedInDecodificadorUltra = new Set([
    "placa",
    "ano modelo",
    "ano fabricação",
    "marca",
    "modelo",
    "versão",
    "código fipe",
    "região geográfica",
    "país",
    "nacionalidade",
    "combustível",
    "cilindradas",
    "código versão",
    "valor atual",
    "tipo de carroceria",
  ]);

  const filterWithSection = (fields) => {
    if (!fields || !Array.isArray(fields)) return [];

    return fields.filter((field) => {
      const label = field?.label || field;
      const normalizedLabel = normalizeFieldLabel(label).toLowerCase();
      const normalizedPlan = planName?.toLowerCase();

      // If this is Decodificador section for Ultra plan, only allow specific fields
      if (
        sectionTitle === "Decodificador de Chassi - Dados Básicos" &&
        normalizedPlan === "ultra"
      ) {
        return allowedInDecodificadorUltra.has(normalizedLabel);
      }

      // If this is Decodificador section for Plus plan, exclude these specific fields
      if (
        sectionTitle === "Decodificador de Chassi - Dados Básicos" &&
        normalizedPlan === "plus" &&
        excludedFromDecodificadorPlus.has(normalizedLabel)
      ) {
        return false;
      }

      return isFieldVisible(label, planName);
    });
  };

  return {
    left: filterWithSection(fieldsObj.left || []),
    right: filterWithSection(fieldsObj.right || []),
  };
};
