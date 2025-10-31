// WalletContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { consultaSaldo } from "../services/plansService";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const { user } = useAuth();

  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);
  const fetchWalletInfo = async () => {
    try {
      setLoading(true);
      const { saldo } = await consultaSaldo();
      setBalance(saldo || "0.00");
    } catch (error) {
      console.error("Failed to fetch wallet info:", error);
      toast.error("Failed to fetch wallet info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWalletInfo();
    }
  }, [user]);

  return (
    <WalletContext.Provider value={{ balance, loading, fetchWalletInfo }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
