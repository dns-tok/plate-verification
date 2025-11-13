import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { formatCurrency } from "../../utils/currencyUtils";

export const TopBar = () => {
  const { user } = useAuth();
  const { openCart, cartItems } = useCart();
  const navigate = useNavigate();
  const { balance } = useWallet();

  return (
    <div className="bg-[url('/assets/topBarBg2.png')] bg-cover bg-center bg-no-repeat rounded-3xl flex justify-between  overflow-hidden relative z-20">
      <div className="flex flex-col justify-between gap-2 p-6">
        <div className="flex items-center gap-1">
          <p className="text-white font-medium text-xl me-1">
            Olá, {user?.full_name || user?.nome_completo || "Usuário"}
          </p>
          <div className="relative cursor-pointer" onClick={openCart}>
            <img
              src="/assets/cart.svg"
              alt="cart"
              className="size-[1.3rem] cursor-pointer hover:opacity-80 transition-opacity"
            />
            <p className="absolute -top-2 -right-3 text-white text-xs bg-red-500 rounded-full size-4 flex items-center justify-center leading-none p-1">
              {cartItems.length}
            </p>
          </div>
        </div>
        <div className="flex items-end gap-8">
          <div className="">
            <p className="text-white font-[400] text-md">Saldo</p>
            <p className="text-white font-medium text-2xl whitespace-nowrap">
              {formatCurrency(balance)}
            </p>
          </div>
          <button
            className="rounded px-3 py-0.5 font-medium mb-1 whitespace-nowrap cursor-pointer transition-all duration-300 bg-[#F2DF33] text-black hover:drop-shadow"
            onClick={() => navigate("/buy-consultation")}
          >
            Comprar consultas
          </button>
        </div>
      </div>
      <div className=" lg:max-w-[44%] flex items-end mb-1.5 ">
        <img src="/assets/carVector.svg" alt="top bar logo" className="" />
      </div>
    </div>
  );
};
