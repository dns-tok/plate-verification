import { apiClient } from "./apiClient";

/**
 * Fetch single plans from API
 * @returns {Promise<Array>} Array of plan objects
 */
export const fetchSinglePlans = async () => {
  try {
    console.log("Fetching single plans from API...");
    const response = await apiClient.get("/plans");
    console.log("API Response:", response.data);
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
  console.log("Transforming API plans:", apiPlans);

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
        price: `R$ ${plan.price.toFixed(2).replace(".", ",")}`,
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

  console.log("Transformed plans in correct order:", transformed);
  return transformed;
};
