import React, { useRef, useState, useEffect } from "react";
import { MdClose, MdDelete, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { validateCoupon } from "../../../services/plansService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import { BsCartX } from "react-icons/bs";
import { formatCurrency, parseCurrency } from "../../../utils/currencyUtils";
import { getMultiPlanCouponCode } from "../../../utils/multiPlanUtils";

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
  const [isAutoApplyingCoupon, setIsAutoApplyingCoupon] = useState(false);
  const lastProcessedCouponRef = useRef(null);

  // Calculate order value
  const orderValue = cartItems.reduce(
    (acc, item) => acc + parseCurrency(item.price) * item.quantity,
    0
  );

  // Automatically detect and apply multi-plan coupons
  useEffect(() => {
    // Don't run if already processing
    if (isAutoApplyingCoupon) return;

    const multiPlanCoupon = getMultiPlanCouponCode(cartItems);

    // Always keep coupon code visible when multi-plans exist
    if (multiPlanCoupon) {
      // Set coupon code in input field immediately (always visible)
      if (couponCode !== multiPlanCoupon) {
        setCouponCode(multiPlanCoupon);
      }

      // Only validate if coupon is not already applied or if it's a different coupon
      if (appliedCoupon?.code !== multiPlanCoupon) {
        // Check if we've already processed this coupon
        if (lastProcessedCouponRef.current === multiPlanCoupon) {
          return; // Already processed, skip
        }

        // Mark as processing
        lastProcessedCouponRef.current = multiPlanCoupon;
        setIsAutoApplyingCoupon(true);

        // Validate and apply the coupon
        validateCoupon(multiPlanCoupon, orderValue)
          .then((response) => {
            if (response && response.discount) {
              setAppliedCoupon({
                code: multiPlanCoupon,
                discount: response.discount,
              });
              setCouponDiscount(response.discount);
              // Ensure coupon code stays visible
              setCouponCode(multiPlanCoupon);
            } else {
              // Validation failed, but keep coupon code visible
              setCouponCode(multiPlanCoupon);
              setAppliedCoupon(null);
              setCouponDiscount(0);
              lastProcessedCouponRef.current = null;
            }
          })
          .catch((error) => {
            console.error("Failed to auto-apply multi-plan coupon:", error);
            // On error, keep coupon code visible but clear applied state
            setCouponCode(multiPlanCoupon);
            setAppliedCoupon(null);
            setCouponDiscount(0);
            lastProcessedCouponRef.current = null;
          })
          .finally(() => {
            setIsAutoApplyingCoupon(false);
          });
      } else {
        // Coupon already applied, just ensure it's visible
        if (couponCode !== multiPlanCoupon) {
          setCouponCode(multiPlanCoupon);
        }
      }
    } else {
      // No multi-plans in cart
      // Only clear if we had a multi-plan coupon before
      if (couponCode && couponCode.startsWith("compra")) {
        // Check if there are any multi-plans (double check)
        const hasMultiPlans = cartItems.some(
          (item) =>
            item?.planNumber !== undefined || (item?.id >= 5 && item?.id <= 9)
        );
        if (!hasMultiPlans) {
          setCouponCode("");
          setAppliedCoupon(null);
          setCouponDiscount(0);
          lastProcessedCouponRef.current = null;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]); // Only depend on cartItems, not orderValue

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
        // Reset ref so multi-plan coupons can re-apply if needed
        lastProcessedCouponRef.current = null;
        toast.success(response?.message || "Coupon applied successfully!");
      } else {
        toast.error(
          response?.message ||
            response?.error ||
            "Invalid or expired coupon code"
        );
      }
    } catch (error) {
      console.error("Coupon validation failed:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to validate coupon";
      toast.error(errorMessage);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    lastProcessedCouponRef.current = null;
    toast.info("Coupon removed");
  };

  const calculateTotal = () => {
    return orderValue - couponDiscount;
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 z-[9998] transition-opacity duration-300  ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Cart Overlay */}
      <div
        className={`fixed top-0 right-0 h-dvh w-full md:max-w-[400px] bg-white z-[9999] transform transition-transform duration-300 ease-in-out  ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full  overflow-hidden relative ">
          {/* Header */}
          <div className=" top-0 left-0 w-full z-10 bg-white flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                <BiArrowBack
                  className="hover:bg-gray-300 bg-gray-100 p-1 text-3xl rounded-full transition-all duration-300 cursor-pointer font-bold text-gray-700 "
                  onClick={closeCart}
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  Carrinho
                </h2>
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
          <div className="relative ">
            {cartItems.length > 0 ? (
              <div
                className="px-6 py-4 space-y-4 w-full overflow-y-auto"
                style={{
                  height: `calc(100vh - ${
                    (cartOverlayRef.current?.clientHeight >= 260
                      ? cartOverlayRef.current?.clientHeight
                      : 260) + 100
                  }px)`,
                }}
              >
                {cartItems.map((item) => {
                  const itemPrice = parseCurrency(item.price);
                  const originalPrice =
                    item?.apiData?.originalPrice || itemPrice;
                  const originalPriceFormatted =
                    item?.apiData?.originalPriceFormatted ||
                    formatCurrency(originalPrice);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm rounded-xl border border-gray-200 px-4 py-2 drop-shadow"
                    >
                      <div>
                        <p className="text-lg font-medium text-gray-800">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {originalPrice > itemPrice && (
                            <p className="text-sm font-medium text-gray-400 line-through">
                              {originalPriceFormatted}
                            </p>
                          )}
                          <p className="text-lg font-semibold text-gray-500">
                            {item.price}
                          </p>
                        </div>
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
                  );
                })}
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
                  Adicione itens ao seu carrinho para iniciar a compra{" "}
                </p>
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
                          disabled={isValidatingCoupon || isAutoApplyingCoupon}
                          readOnly={
                            isAutoApplyingCoupon &&
                            couponCode.startsWith("compra")
                          }
                        />
                        <button
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon || isAutoApplyingCoupon}
                          className="text-sm bg-[#1AABFE] hover:bg-[#1AABFE]/80 text-white font-medium py-[0.55rem] px-4 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                        >
                          {isValidatingCoupon || isAutoApplyingCoupon ? (
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
                    {cartItems.map((item) => {
                      const itemPrice = parseCurrency(item.price);
                      const itemTotal = itemPrice * item.quantity;

                      // Calculate discounted price if coupon is applied
                      let discountedTotal = itemTotal;
                      if (appliedCoupon && couponDiscount > 0) {
                        // Calculate proportional discount for this item
                        const itemProportion = itemTotal / orderValue;
                        const itemDiscount = couponDiscount * itemProportion;
                        discountedTotal = itemTotal - itemDiscount;
                      }

                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <p>{item.name}</p>
                          <div className="flex items-center gap-2">
                            {appliedCoupon &&
                              couponDiscount > 0 &&
                              discountedTotal < itemTotal && (
                                <p className="text-xs text-gray-400 line-through">
                                  {formatCurrency(itemTotal)}
                                </p>
                              )}
                            <p>{formatCurrency(discountedTotal)}</p>
                          </div>
                        </div>
                      );
                    })}
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
