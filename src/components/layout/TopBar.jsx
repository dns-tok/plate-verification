import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
export const TopBar = () => {
  const { user } = useAuth();
  const { openCart } = useCart();

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
              R$ 123.52
            </p>
          </div>
          <button className="bg-white rounded px-3 py-0.5 text-[#194D9A] font-medium mb-1 whitespace-nowrap cursor-pointer hover:text-[#1AABFE] transition-all duration-300">
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
