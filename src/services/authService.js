import apiClient from "./apiClient";

// Shapes per API collection
// login: { email, password }
// register: {
//   celular, cep, cpf, data_nascimento, email, nome_completo, numero_residencia, password
// }
// forgot-password: { email }
// reset-password: { new_password, token }
// refresh: { refresh_token }

export async function login({ email, password }) {
  const { data } = await apiClient.post("/auth/login", { email, password });
  return data;
}

export async function register(payload) {
  const { data } = await apiClient.post("/auth/register", payload);
  return data;
}

export async function requestPasswordReset(email) {
  const { data } = await apiClient.post("/auth/forgot-password", { email });
  return data;
}

export async function resetPassword({ token, newPassword }) {
  const { data } = await apiClient.post("/auth/reset-password", {
    token,
    new_password: newPassword,
  });
  return data;
}

export async function getProfile() {
  const { data } = await apiClient.get("/auth/profile");
  return data.user; // Extract user data from the response
}

export async function refreshToken(refreshTokenValue) {
  const { data } = await apiClient.post("/auth/refresh", {
    refresh_token: refreshTokenValue,
  });
  return data;
}

export async function updateProfile(update) {
  const { data } = await apiClient.put("/auth/update-profile", update);
  return data;
}

export async function changePassword(update) {
  const { data } = await apiClient.post("/auth/change-password", update);
  return data;
}

export async function deleteAccount(password) {
  const { data } = await apiClient.delete("/auth/delete-account", {
    data: { password },
    _skipAuthRedirect: true, // Flag to prevent automatic redirect
  });
  return data;
}

export async function sendMessage(message) {
  const { data } = await apiClient.post("/message-support", { message });
  return data;
}

export async function getCurrentAccount(page = 1, perPage = 10) {
  const { data } = await apiClient.get("/current-account", {
    params: { page, per_page: perPage },
  });
  return data;
}
