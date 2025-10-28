import React, { useState, useEffect } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { toast } from "react-toastify";
import { useCart } from "../../../context/CartContext";
import { createOrValidateOrder } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, couponDiscount, appliedCoupon, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [copyCode, setCopyCode] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Map plan names to API codes
  const getPlanCode = (planName) => {
    const codeMap = {
      "Premium Plan": "premium",
      "Ultra Plan": "ultra",
      "Plus Plan": "plus",
      "Light Plan": "light",
      "Always Present": "always_present",
      "Eye on security": "eye_on_security",
      Professional: "professional",
      Negotiator: "negotiator",
      "Test Drive": "test_drive",
    };
    return codeMap[planName] || planName.toLowerCase().replace(" ", "_");
  };

  // Calculate order value
  const calculateTotal = () => {
    const orderValue = cartItems.reduce(
      (acc, item) =>
        acc + Number(item.price.replace("R$", "").replace(",", ".")),
      0
    );
    return orderValue - couponDiscount;
  };

  const totalAmount = calculateTotal();

  // Create order when user clicks on payment method
  const handlePaymentMethodSelect = async (method) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsCreatingOrder(true);
    try {
      // Map cart items to API format
      const items = cartItems.map((item) => ({
        code: getPlanCode(item.name),
        quantity: item.quantity || 1,
      }));

      const payload = {
        items,
        coupon_code: appliedCoupon?.code || "",
        transaction_type: "inbound",
        validation_only: false,
      };

      const response = await createOrValidateOrder(payload);

      if (response && response.success) {
        setPaymentData(response);
        setSelectedPaymentMethod(method);

        if (method === "pix" && response.payment_options?.pix) {
          toast.success("PIX payment details retrieved!");
        } else if (method === "card" && response.payment_options?.cartao) {
          // Redirect to card payment
          window.location.href = response.payment_options.cartao.payment_url;
        }
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to process payment. Please try again."
      );
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleCopyCode = () => {
    if (!paymentData?.payment_options?.pix?.pix_copia_e_cola) {
      toast.error("PIX code not available");
      return;
    }

    navigator.clipboard.writeText(
      paymentData.payment_options.pix.pix_copia_e_cola
    );
    setCopyCode(true);
    setTimeout(() => {
      setCopyCode(false);
    }, 2000);

    toast.success("PIX code copied to clipboard");
  };

  // Handle payment completion
  const handlePaymentComplete = () => {
    toast.success("Payment completed! Order is being processed.");
    clearCart();
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-10 w-full h-screen border items-center justify-center">
      <div className="p-8 w-[180px] fixed top-0 left-0">
        <img
          //   onClick={() => navigate("/")}
          className="cursor-pointer "
          src="/logo.svg"
          alt=""
        />
      </div>
      {selectedPaymentMethod === null && (
        <>
          <p className="text-xl font-medium">
            {isCreatingOrder ? "Processing..." : "Choose Your payment method"}
          </p>

          <div className="flex items-center gap-6 bg-[#F2F2F2] p-4 py-6 min-w-[380px] min-h-[93px] rounded-lg [&>*]:cursor-pointer [&>*]:w-20 [&>*]:rounded border-2 border-gray-400/20 hover:border-[#1AABFE] transition-all duration-300">
            <img
              src="/assets/card1.svg"
              alt=""
              className="hover:drop-shadow-lg"
            />
            <img
              src="/assets/card2.svg"
              alt=""
              className="hover:drop-shadow-lg"
            />
            <img
              src="/assets/card3.svg"
              alt=""
              className="hover:drop-shadow-lg"
            />
            <div className=" h-full !w-fit ms-auto mb-4">
              <AiOutlineSafetyCertificate className="text-2xl " />
            </div>
          </div>
          <button
            className={`relative flex items-center gap-6 bg-[#F2F2F2] p-3 min-w-[380px] min-h-[93px] rounded-lg border-2 border-gray-400/20 hover:border-[#1AABFE] transition-all duration-300 ${
              isCreatingOrder
                ? "opacity-50 cursor-not-allowed"
                : " cursor-pointer"
            }`}
            onClick={() => handlePaymentMethodSelect("pix")}
            disabled={isCreatingOrder}
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <img src="/assets/pix.svg" alt="" className="w-30" />
              <p className="text-[0.8rem] font-medium">Pay by Pix</p>
            </div>

            <div className=" h-full !w-fit mb-4 ms-auto">
              <AiOutlineSafetyCertificate className="text-2xl " />
            </div>

            {isCreatingOrder && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/30">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1AABFE]" />
              </div>
            )}
          </button>
        </>
      )}

      {selectedPaymentMethod === "pix" && paymentData && (
        <div>
          <div className="flex flex-col  gap-2 w-[390px] py-4">
            <p className="bg-[#194D9A]  text-white px-4 py-1 rounded w-2/3 mx-auto text-center mb-4 ">
              PIX
            </p>
            <div>
              <p className="text-[1.8rem] font-semibold">
                R${" "}
                {paymentData?.payment_options?.pix?.valor_original ||
                  totalAmount.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-[0.8rem] font-medium">
                Time Remaining:{" "}
                {paymentData?.payment_options?.pix?.expiracao
                  ? `${Math.floor(
                      paymentData.payment_options.pix.expiracao / 60
                    )}:${String(
                      paymentData.payment_options.pix.expiracao % 60
                    ).padStart(2, "0")}`
                  : "10:00"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 bg-[#F3F3F3] p-4 rounded-lg">
              <p className="text-[0.9rem] font-medium">
                Scan to pay with your bank app
              </p>
              {paymentData?.payment_options?.pix?.pix_copia_e_cola ? (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                    paymentData.payment_options.pix.pix_copia_e_cola
                  )}`}
                  alt="PIX QR Code"
                  className="w-[250px] border-8 border-[#194D9A] rounded-xl p-1 bg-white"
                />
              ) : (
                <img
                  src="/assets/dummyQr.svg"
                  alt=""
                  className="w-[250px] border-8 border-[#194D9A] rounded-xl p-1"
                />
              )}
              <img src="/assets/pix.svg" alt="" className="w-28" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 bg-[#F3F3F3] p-4 rounded-lg">
            <p className="text-[0.8rem] font-medium">Or copy the code to pay</p>
            <button
              className="bg-[#194D9A] text-white px-4 py-1 rounded w-fit text-xs cursor-pointer"
              onClick={handleCopyCode}
            >
              <span className="text-xs">COPY CODE</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
