/**
 * Formats a number or string value as Brazilian currency (R$)
 * @param {number|string} value - The value to format
 * @returns {string} Formatted currency string (e.g., "R$ 2.617.032,00")
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") return "R$ 0,00";

  const numValue =
    typeof value === "string" ? parseCurrency(value) : Number(value);

  if (isNaN(numValue)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numValue);
};

/**
 * Parses a currency string to a number
 * Handles Brazilian format: "2.617.032,00", "R$ 2.617,00", "2617032", "2617032.00"
 * @param {string|number} value - The value to parse
 * @returns {number} Parsed number value
 */
export const parseCurrency = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  if (typeof value === "number") return value;

  const stringValue = String(value).replace(/[^\d.,-]/g, ""); // strip "R$", spaces, etc.

  if (stringValue.includes(",")) {
    return parseFloat(stringValue.replace(/\./g, "").replace(",", ".")) || 0;
  }

  return parseFloat(stringValue) || 0;
};
