// WalletContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { consultaSaldo } from "../services/plansService";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const WalletContext = createContext(null);

const POLLING_INTERVAL = 2000; // 30 seconds

export const WalletProvider = ({ children }) => {
  const { user } = useAuth();

  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);
  const isInitialLoadRef = useRef(true);

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
      if (isCancelled || !user) return;
      await fetchWalletInfo(true);
      setTimeout(poll, POLLING_INTERVAL);
    };

    if (user) {
      fetchWalletInfo(false); // initial fetch
      poll();
    } else {
      // Reset on logout
      setBalance("0.00");
      setLoading(false);
      isInitialLoadRef.current = true;
    }

    return () => {
      isCancelled = true;
    };
  }, [user, fetchWalletInfo]);

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
