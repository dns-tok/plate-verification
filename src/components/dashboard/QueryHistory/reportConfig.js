/**
 * Report Section Configuration
 * Maps plan types to visible sections
 *
 * Plan Types:
 * - premium: Full access to all sections
 * - ultra: Most sections except some advanced ones
 * - plus: Standard sections
 * - light: Basic sections only
 */

export const PLAN_TYPES = {
  PREMIUM: "premium",
  ULTRA: "ultra",
  PLUS: "plus",
  LIGHT: "light",
};

/**
 * Section visibility configuration for each plan
 * Set to true to show the section, false to hide it
 */
export const SECTION_CONFIG = {
  // Header and Summary Sections
  header: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  aiSummary: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  resumoConsulta: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  insights: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  informacoesGerais: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  dadosBasicos: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  informacoesLeilao: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  scoreLeilao: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  indicioSinistro: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  apontamentosBancos: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  remarketing: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  fotos: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  historicoKm: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  decodificadorDadosBasicos: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  decodificadorPrecificadores: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  cadastroNacional: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  csvInmetro: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  restricoesNacionais: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  faturamento: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  cadastroEstadual: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  restricoesEstaduais: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: true,
  },
  detalhamentoGravame: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  alertaDebitos: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  sefazLink: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  detalhamentoDebitos: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  historicoProprietarios: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  informacoesParceiros: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  observacaoVendedor: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  opcionais: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  precificadorValorMercado: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  precificadorFipe: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  porcentagemTabelaFipe: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  exigenciaVistoria: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  recall: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  descricaoCompleta: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  recallPendentes: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  historicoRouboFurto: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  gravame: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  registroLocadora: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  csv: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
  historicoMultasRenainf: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  radarSecundario: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  falhasVeiculo: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  historicoLaudo: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: false,
    [PLAN_TYPES.LIGHT]: false,
  },
  historicoConsulta: {
    [PLAN_TYPES.PREMIUM]: true,
    [PLAN_TYPES.ULTRA]: true,
    [PLAN_TYPES.PLUS]: true,
    [PLAN_TYPES.LIGHT]: false,
  },
};

/**
 * Normalize plan name to match configuration keys
 * @param {string} planName - Plan name from API/URL
 * @returns {string} Normalized plan type
 */
export const normalizePlanName = (planName) => {
  if (!planName) return PLAN_TYPES.LIGHT; // Default to light

  const name = planName.toLowerCase().trim();

  // Map common plan name variations to our standard types
  if (name.includes("premium")) return PLAN_TYPES.PREMIUM;
  if (name.includes("ultra")) return PLAN_TYPES.ULTRA;
  if (name.includes("plus")) return PLAN_TYPES.PLUS;
  if (name.includes("light")) return PLAN_TYPES.LIGHT;

  // Default fallback
  return PLAN_TYPES.LIGHT;
};

/**
 * Check if a section should be visible for a given plan
 * @param {string} sectionKey - Section key from SECTION_CONFIG
 * @param {string} planName - Plan name from API/URL
 * @returns {boolean} True if section should be visible
 */
export const isSectionVisible = (sectionKey, planName) => {
  const normalizedPlan = normalizePlanName(planName);
  const sectionConfig = SECTION_CONFIG[sectionKey];

  if (!sectionConfig) {
    console.warn(`Section key "${sectionKey}" not found in configuration`);
    return false; // Hide by default if not configured
  }

  return sectionConfig[normalizedPlan] === true;
};
