import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  requestPasswordReset,
  resetPassword as apiResetPassword,
  getProfile,
  refreshToken as apiRefreshToken,
} from "../services/authService";
import { AuthContext } from "./AuthContext";

function readStoredTokens() {
  try {
    const raw = localStorage.getItem("authTokens");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStoredTokens(tokens) {
  if (!tokens) {
    localStorage.removeItem("authTokens");
    return;
  }
  localStorage.setItem("authTokens", JSON.stringify(tokens));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate from storage
  useEffect(() => {
    const stored = readStoredTokens();
    if (stored?.accessToken && stored?.refreshToken) {
      setAccessToken(stored.accessToken);
      setRefreshToken(stored.refreshToken);
      getProfile()
        .then(setUser)
        .catch(() => {
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Listen for storage changes (when tokens are refreshed by interceptor)
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = readStoredTokens();
      if (stored?.accessToken && stored?.refreshToken) {
        setAccessToken(stored.accessToken);
        setRefreshToken(stored.refreshToken);
      } else {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogin = useCallback(async ({ email, password }) => {
    const data = await apiLogin({ email, password });
    const tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
    writeStoredTokens(tokens);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    // Fetch full user profile after login
    try {
      const profileData = await getProfile();
      setUser(profileData);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(data.user || null);
    }

    return data;
  }, []);

  const handleRegister = useCallback(async (payload) => {
    const data = await apiRegister(payload);
    const tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    };
    writeStoredTokens(tokens);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);

    // Fetch full user profile after registration
    try {
      const profileData = await getProfile();
      setUser(profileData);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(data.user || null);
    }

    return data;
  }, []);

  const handleLogout = useCallback(() => {
    writeStoredTokens(null);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const handleRefresh = useCallback(async () => {
    if (!refreshToken) return null;
    const data = await apiRefreshToken(refreshToken);
    const tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || refreshToken,
      expiresIn: data.expires_in,
    };
    writeStoredTokens(tokens);
    setAccessToken(tokens.accessToken);
    if (data.refresh_token) setRefreshToken(data.refresh_token);
    return data;
  }, [refreshToken]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      loading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      refresh: handleRefresh,
      requestPasswordReset,
      resetPassword: apiResetPassword,
      getProfile,
    }),
    [
      user,
      accessToken,
      refreshToken,
      loading,
      handleLogin,
      handleRegister,
      handleLogout,
      handleRefresh,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
