import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { consultaSaldo } from "../../services/authService";

export const TopBar = () => {
  const { user } = useAuth();
  const { openCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWalletInfo();
  }, []);

  const loadWalletInfo = async () => {
    try {
      const response = await consultaSaldo();
      const balance = response.saldo || "0.00";
      setWalletBalance(balance);
    } catch (error) {
      console.error("Failed to load wallet info:", error);
      setWalletBalance("0.00");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/assets/topBarBg2.png')] bg-cover bg-center bg-no-repeat rounded-3xl flex justify-between  overflow-hidden relative z-20">
      <div className="flex flex-col gap-2 p-6">
        <div className="flex items-center gap-1">
          <p className="text-white font-medium text-xl me-1">
            Hi, {user?.full_name || user?.nome_completo}
          </p>
          <div className="relative">
            <img
              src="/assets/cart.svg"
              alt="cart"
              className="size-[1.3rem] cursor-pointer hover:opacity-80 transition-opacity"
              onClick={openCart}
            />
            <p className="absolute -top-2 -right-4 text-white text-xs bg-red-500 rounded-full size-4 flex items-center justify-center leading-none p-1">
              {cartItems.length}
            </p>
          </div>
        </div>
        <div className="flex items-end gap-8">
          <div className="">
            <p className="text-white font-[400] text-md">Balance</p>
            <p className="text-white font-medium text-2xl whitespace-nowrap">
              {loading ? (
                <span className="animate-pulse text-md">Loading Wallet...</span>
              ) : (
                `R$ ${walletBalance}`
              )}
            </p>
          </div>
          <button
            className="rounded px-3 py-0.5 font-medium mb-1 whitespace-nowrap cursor-pointer transition-all duration-300 bg-[#F2DF33] text-black hover:drop-shadow"
            onClick={() => navigate("/buy-consultation")}
          >
            Buy Consultations
          </button>
        </div>
      </div>
      <div className=" lg:max-w-[44%] flex items-end mb-1.5 ">
        <img src="/assets/carVector.svg" alt="top bar logo" className="" />
      </div>
    </div>
  );
};
