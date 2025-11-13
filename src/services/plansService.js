import { apiClient } from "./apiClient";
import { formatCurrency } from "../utils/currencyUtils";
import React from "react";

/**
 * Parse HTML tags and specific patterns in text and convert to React elements
 * Handles:
 * - <strong> tags for bold text
 * - "Todos os itens do relatório [Plan Name]" pattern
 * - "E muito mais...." pattern
 * @param {string} text - Text that may contain HTML tags or patterns to bold
 * @returns {Array|string} Array of React elements and strings, or original text if no patterns
 */
const parseHtmlTags = (text) => {
  if (!text || typeof text !== "string") return text;

  // Check if text should be entirely bold
  const todosOsItensPattern =
    /^Todos os itens do relatório\s+(Ultra|Plus|Light|Premium)/i;
  const muitoMaisPattern = /E muito mais\.\.\.\./i;

  // If the entire line matches these patterns, make it bold with extra weight
  if (
    todosOsItensPattern.test(text.trim()) ||
    muitoMaisPattern.test(text.trim())
  ) {
    return React.createElement(
      "strong",
      { key: "bold-text", className: "font-bold" },
      text
    );
  }

  // Check if text contains <strong> tags
  if (!text.includes("<strong>")) return text;

  const parts = [];
  let currentIndex = 0;
  const regex = /<strong>(.*?)<\/strong>/g;
  let match;
  let matchIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the tag
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }
    // Add bold text as React element with extra weight
    parts.push(
      React.createElement(
        "strong",
        { key: `strong-${matchIndex++}`, className: "font-extrabold" },
        match[1]
      )
    );
    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
};

/**
 * Fetch single plans from API
 * @returns {Promise<Array>} Array of plan objects
 */
export const fetchSinglePlans = async () => {
  try {
    const response = await apiClient.get("/plans");
    return response.data.plans || [];
  } catch (error) {
    console.error("Error fetching single plans:", error);
    throw error;
  }
};

/**
 * Fetch public plans from API
 * @returns {Promise<Array>} Array of plan objects
 */
export const fetchPublicPlans = async () => {
  try {
    const response = await apiClient.get("/plans/public");
    return response.data.plans || [];
  } catch (error) {
    console.error("Error fetching public plans:", error);
    throw error;
  }
};

/**
 * Transform API plan data to match component structure
 * Maintains the same order as static data: Premium, Ultra, Plus, Light
 * Can be used for both protected and public endpoints since they return the same structure
 * @param {Array} apiPlans - Plans from API
 * @returns {Array} Transformed plans in correct order
 */
export const transformApiPlans = (apiPlans) => {
  // Define the correct order to match static data
  const planOrder = ["premium", "ultra", "plus", "light"];

  // Create a map for quick lookup
  const planMap = {};
  apiPlans.forEach((plan) => {
    planMap[plan.code] = plan;
  });

  // Transform plans in the correct order
  const transformed = planOrder
    .map((code, index) => {
      const plan = planMap[code];
      if (!plan) {
        console.warn(`Plan with code '${code}' not found in API response`);
        return null;
      }

      return {
        id: index + 1, // Maintain same IDs as static data
        name: plan.name,
        price: formatCurrency(plan.price),
        desc: "Consulta única",
        features: plan.description
          ? plan.description
              .split("\n")
              .filter((item) => item.trim() !== "")
              .map((item) => parseHtmlTags(item.trim()))
          : [
              "Vehicle Registration Data",
              "*Histórico de KM",
              "Market price",
              "Loss Index",
            ],
        // Keep API data for reference
        apiData: {
          code: plan.code,
          originalName: plan.name,
          originalPrice: plan.price,
          originalPriceFormatted: plan.original_price
            ? formatCurrency(plan.original_price)
            : null,
          originalDescription: plan.description,
        },
      };
    })
    .filter(Boolean); // Remove any null entries

  return transformed;
};

// Alias for backward compatibility - both functions now use the same logic
export const transformPublicPlans = transformApiPlans;

export async function createOrValidateOrder(payload) {
  const { data } = await apiClient.post("/orders/create-or-validate", payload);
  return data;
}

export async function consultaSaldo() {
  const { data } = await apiClient.get("/consulta_saldo");
  return data;
}
export async function searchPlate(plate) {
  const { data } = await apiClient.post("/plate/search_plate", { plate });
  return data;
}

export async function getSearchHistory(page = 1, perPage = 10) {
  const { data } = await apiClient.get("/search-history", {
    params: { page, per_page: perPage },
  });
  return data;
}
export async function getHistoryDetails(queryId) {
  const { data } = await apiClient.get(`/search-history/${queryId}`);
  return data;
}

export async function validateCoupon(couponCode, orderValue) {
  const { data } = await apiClient.post("/validate-coupon", {
    coupon_code: couponCode,
    order_value: orderValue,
  });
  return data;
}

export async function criarOrder(placa, plano, cupom = "") {
  const { data } = await apiClient.post("/criar_order", {
    placa,
    plano,
    cupom,
  });
  return data;
}

export async function checkPaymentStatus(orderId) {
  const { data } = await apiClient.get(`/orders/${orderId}/payment-status`);
  return data;
}
