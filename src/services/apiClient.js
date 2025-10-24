import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach access token from storage if present
apiClient.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("authTokens");
    if (stored) {
      try {
        const { accessToken } = JSON.parse(stored);
        if (accessToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        console.warn("Invalid authTokens format in localStorage");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const stored = localStorage.getItem("authTokens");
        if (stored) {
          const { accessToken } = JSON.parse(stored);
          if (accessToken) {
            // Import refreshToken function dynamically to avoid circular dependency
            const { refreshToken } = await import("./authService");
            const newTokens = await refreshToken(accessToken);

            // Update stored tokens
            const updatedTokens = {
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token || accessToken,
              expiresIn: newTokens.expires_in,
            };
            localStorage.setItem("authTokens", JSON.stringify(updatedTokens));

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear tokens and redirect to login
        localStorage.removeItem("authTokens");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
