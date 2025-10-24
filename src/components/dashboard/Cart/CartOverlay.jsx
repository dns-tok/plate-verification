import React from "react";
import { MdClose, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function CartOverlay({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    onClose(); // Close the cart first
    navigate("/new-consultation"); // Then navigate
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Cart Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer font-bold text-gray-700 h-6 w-6 flex items-center justify-center"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Cart</h2>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            {/* Empty Cart Icon */}
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <MdShoppingCart className="w-12 h-12 text-gray-400" />
            </div>

            {/* Empty Cart Message */}
            <h3 className="text-[1.4rem] font-medium text-gray-800 mb-3">
              Your Cart is Empty
            </h3>
            <p className="text-xs font-medium text-gray-500 text-center mb-8 leading-relaxed">
              Lorem ipsum quia dolor sit porro quisquam est qui dolorem ipsum
              quia dolor sit amet consectetur adipisci velit sed quia non
              numquam eius modi.
            </p>

            {/* Purchase Button */}
          </div>
          <div className="p-6">
            <button
              className="w-full bg-[#194D9A] hover:bg-[#1AABFE]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer mt-auto"
              onClick={handlePurchaseClick}
            >
              Purchase Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
