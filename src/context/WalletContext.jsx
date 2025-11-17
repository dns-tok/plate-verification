// WalletContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { consultaSaldo } from "../services/plansService";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const WalletContext = createContext(null);

const POLLING_INTERVAL = 2000; // 30 seconds

export const WalletProvider = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);
  const isInitialLoadRef = useRef(true);
  const pollingTimeoutRef = useRef(null);

  // Check if current page is a report page
  const isReportPage = location.pathname.startsWith("/report/");

  const fetchWalletInfo = useCallback(async (isPolling = false) => {
    try {
      if (!isPolling) setLoading(true);

      const { saldo = "0.00" } = await consultaSaldo();
      setBalance(saldo);
    } catch (error) {
      console.error("Failed to fetch wallet info:", error);
      if (!isPolling || isInitialLoadRef.current) {
        toast.error("Failed to fetch wallet info");
      }
    } finally {
      if (!isPolling) setLoading(false);
      if (!isPolling) isInitialLoadRef.current = false;
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const poll = async () => {
      if (isCancelled || !user || isReportPage) return;
      await fetchWalletInfo(true);
      if (!isCancelled && !isReportPage) {
        pollingTimeoutRef.current = setTimeout(poll, POLLING_INTERVAL);
      }
    };

    // Clear any existing polling timeout
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }

    if (user && !isReportPage) {
      fetchWalletInfo(false); // initial fetch
      poll();
    } else if (isReportPage) {
      // Stop polling on report page
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = null;
      }
    } else {
      // Reset on logout
      setBalance("0.00");
      setLoading(false);
      isInitialLoadRef.current = true;
    }

    return () => {
      isCancelled = true;
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
        pollingTimeoutRef.current = null;
      }
    };
  }, [user, fetchWalletInfo, isReportPage]);

  return (
    <WalletContext.Provider value={{ balance, loading, fetchWalletInfo }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
