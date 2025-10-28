import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getCurrentAccount } from "../../services/authService";

export const TopBar = () => {
  const { user } = useAuth();
  const { openCart } = useCart();
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWalletInfo();
  }, []);

  const loadWalletInfo = async () => {
    try {
      const response = await getCurrentAccount(1);
      const balance = response.account?.wallet_info?.current_balance || "0.0";
      setWalletBalance(parseFloat(balance).toFixed(2));
    } catch (error) {
      console.error("Failed to load wallet info:", error);
      setWalletBalance("0.00");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/assets/topBarBg2.png')] bg-cover bg-center bg-no-repeat rounded-3xl flex justify-between  overflow-hidden relative z-20">
      <div className="flex flex-col  gap-2 p-6">
        <div className="flex items-center">
          <img src="/assets/user.svg" alt="user" className="size-12" />
          <p className="text-white font-medium ms-3 me-1">
            {user?.full_name || user?.nome_completo}
          </p>
          <img
            src="/assets/cart.svg"
            alt="cart"
            className="size-[1.1rem] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={openCart}
          />
        </div>
        <div className="flex items-end gap-8">
          <div className="">
            <p className="text-white font-[400] text-lg">Balance</p>
            <p className="text-white font-medium text-2xl whitespace-nowrap">
              {loading ? (
                <span className="animate-pulse text-md">Loading Wallet...</span>
              ) : (
                `R$ ${walletBalance}`
              )}
            </p>
          </div>
          <button
            className="bg-white rounded px-3 py-0.5 text-[#194D9A] font-medium mb-1 whitespace-nowrap cursor-pointer hover:text-[#1AABFE] transition-all duration-300"
            onClick={() => navigate("/new-consultation")}
          >
            Buy Consultations
          </button>
        </div>
      </div>
      <div className=" lg:max-w-[44%] flex items-end mb-1.5">
        <img src="/assets/carVector.svg" alt="top bar logo" className="" />
      </div>
    </div>
  );
};
