import { parseCurrency } from "./currencyUtils";

/**
 * Mapping of multi-plan amounts to their item codes and coupon codes
 * Based on the discount table:
 * - Amount 1.200,00 → item code: "plano_1200", coupon: "compra1200"
 * - Amount 700 → item code: "plano_700", coupon: "compra700"
 * - Amount 500 → item code: "plano_500", coupon: "compra500"
 * - Amount 300 → item code: "plano_300", coupon: "compra300"
 * - Amount 150 → item code: "plano_150", coupon: "compra150"
 */
const MULTI_PLAN_MAPPING = {
  1200: { itemCode: "plano_1200", couponCode: "compra1200" },
  700: { itemCode: "plano_700", couponCode: "compra700" },
  500: { itemCode: "plano_500", couponCode: "compra500" },
  300: { itemCode: "plano_300", couponCode: "compra300" },
  150: { itemCode: "plano_150", couponCode: "compra150" },
};

/**
 * Extract amount from planNumber string (e.g., "Pacote R$ 1.200,00" → 1200)
 * @param {string} planNumber - The planNumber string
 * @returns {number|null} The extracted amount or null if not found
 */
export const extractAmountFromPlanNumber = (planNumber) => {
  if (!planNumber || typeof planNumber !== "string") return null;

  // Extract numeric value from planNumber
  // Handles formats like "Pacote R$ 1.200,00", "R$ 1.200,00", etc.
  const amount = parseCurrency(planNumber);
  return amount || null;
};

/**
 * Get item code and coupon code for a multi-plan based on its amount
 * @param {number} amount - The plan amount
 * @returns {{itemCode: string, couponCode: string}|null} The codes or null if not found
 */
export const getMultiPlanCodes = (amount) => {
  if (!amount || isNaN(amount)) return null;

  // Round to nearest integer for matching
  const roundedAmount = Math.round(amount);

  // Find the matching amount in the mapping
  // Check for exact match first
  if (MULTI_PLAN_MAPPING[roundedAmount]) {
    return MULTI_PLAN_MAPPING[roundedAmount];
  }

  // If no exact match, find the closest matching key
  const matchingKey = Object.keys(MULTI_PLAN_MAPPING)
    .map(Number)
    .find((key) => Math.abs(key - roundedAmount) < 1); // Allow small differences

  if (matchingKey) {
    return MULTI_PLAN_MAPPING[matchingKey];
  }

  return null;
};

/**
 * Check if a cart item is a multi-plan
 * @param {object} item - The cart item
 * @returns {boolean} True if the item is a multi-plan
 */
export const isMultiPlan = (item) => {
  // Multi-plans have planNumber field or IDs 5-9
  return item?.planNumber !== undefined || (item?.id >= 5 && item?.id <= 9);
};

/**
 * Get the coupon code for multi-plans in cart
 * If multiple multi-plans exist, returns the last one's coupon code
 * @param {Array} cartItems - Array of cart items
 * @returns {string|null} The coupon code or null if no multi-plans found
 */
export const getMultiPlanCouponCode = (cartItems) => {
  if (!cartItems || cartItems.length === 0) return null;

  // Filter multi-plans
  const multiPlans = cartItems.filter(isMultiPlan);

  if (multiPlans.length === 0) return null;

  // If multiple multi-plans exist, use the last one
  const lastMultiPlan = multiPlans[multiPlans.length - 1];

  // Extract amount from planNumber
  const amount = extractAmountFromPlanNumber(lastMultiPlan.planNumber);

  if (!amount) return null;

  // Get coupon code
  const codes = getMultiPlanCodes(amount);
  return codes?.couponCode || null;
};

/**
 * Get item code for a multi-plan cart item
 * @param {object} item - The cart item (must be a multi-plan)
 * @returns {string|null} The item code or null if not found
 */
export const getMultiPlanItemCode = (item) => {
  if (!isMultiPlan(item)) return null;

  const amount = extractAmountFromPlanNumber(item.planNumber);
  if (!amount) return null;

  const codes = getMultiPlanCodes(amount);
  return codes?.itemCode || null;
};
