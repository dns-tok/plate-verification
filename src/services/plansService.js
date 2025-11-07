import { apiClient } from "./apiClient";
import { formatCurrency } from "../utils/currencyUtils";

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
 * Transform API plan data to match component structure
 * Maintains the same order as static data: Premium, Ultra, Plus, Light
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
        name: `${plan.name} Plan`,
        price: formatCurrency(plan.price),
        desc: "Single consultation",
        features: plan.description
          ? plan.description.split("\n").filter((item) => item.trim() !== "")
          : [
              "Vehicle Registration Data",
              "KM History",
              "Market price",
              "Loss Index",
            ],
        // Keep API data for reference
        apiData: {
          code: plan.code,
          originalName: plan.name,
          originalPrice: plan.price,
          originalDescription: plan.description,
        },
      };
    })
    .filter(Boolean); // Remove any null entries

  return transformed;
};

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
