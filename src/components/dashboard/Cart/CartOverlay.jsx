import React, { useRef, useState } from "react";
import { MdClose, MdDelete, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { validateCoupon } from "../../../services/plansService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import { BsCartX } from "react-icons/bs";
import { formatCurrency, parseCurrency } from "../../../utils/currencyUtils";

export default function CartOverlay() {
  const navigate = useNavigate();
  const cartOverlayRef = useRef(null);
  const {
    isCartOpen,
    closeCart,
    cartItems,
    appliedCoupon,
    setAppliedCoupon,
    couponDiscount,
    setCouponDiscount,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Calculate order value
  const orderValue = cartItems.reduce(
    (acc, item) => acc + parseCurrency(item.price) * item.quantity,
    0
  );

  const handlePurchaseClick = () => {
    closeCart(); // Close the cart first
    navigate("/buy-consultation"); // Then navigate
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    try {
      const response = await validateCoupon(couponCode, orderValue);

      if (response && response.discount) {
        setAppliedCoupon({
          code: couponCode,
          discount: response.discount,
        });
        setCouponDiscount(response.discount);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid or expired coupon code");
      }
    } catch (error) {
      console.error("Coupon validation failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to validate coupon"
      );
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const calculateTotal = () => {
    return orderValue - couponDiscount;
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 z-[9998] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Cart Overlay */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[9999] transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full  overflow-hidden relative">
          {/* Header */}
          <div className="fixed top-0 left-0 w-full z-10 bg-white flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <BiArrowBack
                  className="hover:bg-gray-300 bg-gray-100 p-1 text-3xl rounded-full transition-all duration-300 cursor-pointer font-bold text-gray-700 "
                  onClick={closeCart}
                />
                <h2 className="text-xl font-semibold text-gray-800">Carrinho</h2>
              </div>

              <BsCartX
                title="Clear Cart"
                aria-label="Clear Cart"
                onClick={clearCart}
                className={`text-xl transition-all duration-300 cursor-pointer font-bold text-gray-700 hover:text-red-500 ${
                  cartItems.length > 0 ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
          {/* Cart Content */}
          <div className="relative mt-[60px]">
            {cartItems.length > 0 ? (
              <div
                className="px-6 py-4 space-y-4 w-full overflow-y-auto"
                style={{
                  height: `calc(100vh - ${
                    (cartOverlayRef.current?.clientHeight >= 260
                      ? cartOverlayRef.current?.clientHeight
                      : 260) + 65
                  }px)`,
                }}
              >
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm rounded-xl border border-gray-200 px-4 py-2 drop-shadow"
                  >
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-lg font-semibold text-gray-500">
                        {item.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-gray-100 rounded-md px-2 drop-shadow  min-w-22">
                      {item.quantity > 1 ? (
                        <>
                          <button
                            onClick={() => decreaseQuantity(item)}
                            className="text-gray-600 hover:text-gray-800 cursor-pointer text-2xl"
                          >
                            -
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => removeFromCart(item)}
                          className="text-red-600 hover:text-red-800 cursor-pointer text-lg"
                        >
                          <MdDelete />
                        </button>
                      )}
                      <p className="text-gray-600 font-medium">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer text-2xl "
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <MdShoppingCart className="w-12 h-12 text-gray-400" />
                </div>

                <h3 className="text-[1.4rem] font-medium text-gray-800 mb-3">
Seu carrinho está vazio     
           </h3>
                <p className="text-xs font-medium text-gray-500 text-center mb-8 leading-relaxed">
Adicione itens ao seu carrinho para iniciar a compra                </p>
              </div>
            )}
          </div>
          <div className="" ref={cartOverlayRef}>
            {cartItems.length > 0 ? (
              <div>
                <div className="border-t border-[#194D9A]" />
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-6">
                    {appliedCoupon ? (
                      <div className="w-full flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2">
                        <div className="text-sm">
                          <span className="font-medium text-green-800">
                            Coupon: {appliedCoupon.code}
                          </span>
                          <span className="ml-2 text-green-600">
                            {formatCurrency(-couponDiscount)}
                          </span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder="Digite o código do Cupom"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full border border-[#194D9A] rounded-md p-2 text-sm placeholder-[#9F9F9F] font-[400] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:shadow-none bg-white"
                          disabled={isValidatingCoupon}
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon}
                          className="text-sm bg-[#1AABFE] hover:bg-[#1AABFE]/80 text-white font-medium py-[0.55rem] px-4 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                        >
                          {isValidatingCoupon ? (
                            <span className="!animate-spin text-white">
                              <FaSpinner />
                            </span>
                          ) : (
                            "Aplicar"
                          )}
                        </button>
                      </>
                    )}
                  </div>
                  <div>
                    <p className="text-md font-medium mb-1">Resumo da compra</p>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <p>{item.name}</p>
                        <p>
                          {formatCurrency(
                            parseCurrency(item.price) * item.quantity
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#194D9A]" />
                <div className="px-6 py-4 mb-2">
                  <div className="flex flex-col items-end mb-3">
                    {appliedCoupon && (
                      <>
                        <p className="text-sm text-gray-600 mb-1">
                          Subtotal: {formatCurrency(orderValue)}
                        </p>
                        <p className="text-sm text-green-600 mb-1">
                          Discount: {formatCurrency(-couponDiscount)}
                        </p>
                      </>
                    )}
                    <p className="text-lg font-semibold text-[#194D9A] flex items-center justify-end gap-2">
                      total:
                      <span>{formatCurrency(calculateTotal())}</span>
                    </p>
                  </div>
                  <div className="flex  gap-4 text-sm">
                    <button
                      className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/80 text-white font-medium py-3 px-6 rounded-full transition-colors cursor-pointer mt-auto"
                      onClick={() => {
                        closeCart();
                        navigate("/payment");
                      }}
                    >
                      Ir para pagamento
                    </button>
                    <button
                      className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/80 text-white font-medium py-3 px-6 rounded-full transition-colors cursor-pointer mt-auto"
                      onClick={() => {
                        closeCart();
                        navigate("/buy-consultation");
                      }}
                    >
                      Adicionar mais itens
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <button
                  className="w-full bg-[#194D9A] hover:bg-[#1AABFE]/90 text-white font-medium py-3 px-6 rounded-lg transition-colors cursor-pointer mt-auto"
                  onClick={handlePurchaseClick}
                >
                  Comprar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
