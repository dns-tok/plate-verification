import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import {
  createOrValidateOrder,
  checkPaymentStatus,
} from "../../services/plansService";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { parseCurrency } from "../../utils/currencyUtils";
import { useWallet } from "../../context/WalletContext";
import {
  isMultiPlan,
  getMultiPlanItemCode,
  getMultiPlanCouponCode,
} from "../../utils/multiPlanUtils";

const GoBackButton = ({ onClick, className }) => {
  return (
    <div
      className={`flex items-center cursor-pointer group bg-gray-200 text-gray-700 rounded-full text-lg  ${className}`}
      onClick={onClick}
    >
      <BiArrowBack className="size-7 p-1" />
      <span className="w-0 group-hover:w-[65px] transition-all duration-300 overflow-hidden whitespace-nowrap group-hover:pe-1 text-sm">
        Voltar
      </span>
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, couponDiscount, appliedCoupon, clearCart } = useCart();
  const { fetchWalletInfo } = useWallet();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [copyCode, setCopyCode] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const paymentCheckIntervalRef = useRef(null);

  // Map plan names to API codes
  const getPlanCode = (item) => {
    // Check if it's a multi-plan first
    if (isMultiPlan(item)) {
      const itemCode = getMultiPlanItemCode(item);
      if (itemCode) return itemCode;
    }

    // Fallback to name-based mapping for single plans
    const planName = item.name;
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
      (acc, item) => acc + parseCurrency(item.price),
      0
    );
    return orderValue - couponDiscount;
  };

  const totalAmount = calculateTotal();

  // Create order when user clicks on payment method
  const handlePaymentMethodSelect = async (method) => {
    if (cartItems.length === 0) {
      toast.error("Carrinho está vazio");
      return;
    }

    setIsCreatingOrder(true);
    try {
      // Map cart items to API format
      const items = cartItems.map((item) => ({
        code: item?.apiData?.code ? item.apiData.code : getPlanCode(item),
        quantity: item.quantity || 1,
      }));

      // Automatically apply coupon code for multi-plans if not already applied
      // If multiple multi-plans exist, use the last one's coupon code
      let couponCode = appliedCoupon?.code || "";

      // Check if there are multi-plans in cart
      const multiPlanCouponCode = getMultiPlanCouponCode(cartItems);
      if (multiPlanCouponCode) {
        // Use multi-plan coupon code (overrides manually applied coupon if any)
        couponCode = multiPlanCouponCode;
      }

      const payload = {
        items,
        coupon_code: couponCode,
        transaction_type: "inbound",
        validation_only: false,
      };

      const response = await createOrValidateOrder(payload);

      if (response && response.success) {
        setPaymentData(response);
        setSelectedPaymentMethod(method);

        // Get order_id from response (order.id is the correct location based on API response)
        const orderId =
          response.order?.id || response.order_id || response.data?.order_id;

        if (method === "pix" && response.payment_options?.pix) {
          // Initialize countdown timer
          const expirationSeconds =
            response.payment_options.pix.expiracao || 3600;
          setTimeRemaining(expirationSeconds);
          setIsExpired(false);
          toast.success("Detalhes de pagamento PIX recuperados!");

          // Start polling payment status for PIX
          if (orderId) {
            setIsCheckingPayment(true);
            startPaymentStatusCheck(orderId);
          } else {
            console.error("Order ID not found in response for PIX payment");
            toast.error(
              "ID do pedido não encontrado. Por favor, tente novamente."
            );
          }
        } else if (method === "card" && response.payment_options?.cartao) {
          // Open payment URL in new tab
          window.open(response.payment_options.cartao.payment_url, "_blank");

          // Start checking payment status
          if (orderId) {
            setIsCheckingPayment(true);
            startPaymentStatusCheck(orderId);
          } else {
            console.error("Order ID not found in response for card payment");
            toast.error(
              "ID do pedido não encontrado. A verificação do status do pagamento pode não funcionar."
            );
            // Still show loading state even if order_id is missing
            setIsCheckingPayment(true);
          }
        }
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error(
        error?.response?.data?.message ||
          "Falha ao processar pagamento. Por favor, tente novamente."
      );
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleCopyCode = () => {
    if (!paymentData?.payment_options?.pix?.pix_copia_e_cola) {
      toast.error("Código PIX não disponível");
      return;
    }

    navigator.clipboard.writeText(
      paymentData.payment_options.pix.pix_copia_e_cola
    );
    setCopyCode(true);
    setTimeout(() => {
      setCopyCode(false);
    }, 2000);

    toast.success("Código PIX copiado para a área de transferência");
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) {
      if (timeRemaining === 0) {
        setIsExpired(true);
        toast.error(
          "Tempo de pagamento expirado. Por favor, crie um novo pedido."
        );
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Format time remaining as MM:SS
  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Start polling payment status
  const startPaymentStatusCheck = (orderId) => {
    if (!orderId) {
      console.error("Cannot start payment status check: orderId is missing");
      setIsCheckingPayment(false);
      return;
    }

    console.log("Starting payment status polling for order_id:", orderId);

    // Clear any existing interval
    if (paymentCheckIntervalRef.current) {
      clearInterval(paymentCheckIntervalRef.current);
    }

    // Poll every 3 seconds
    paymentCheckIntervalRef.current = setInterval(async () => {
      try {
        console.log("Polling payment status for order_id:", orderId);
        const response = await checkPaymentStatus(orderId);
        console.log("Payment status response:", response);

        // Check if payment is successful based on new API response structure
        // Response structure: { order_id, order_number, paid, payment_type, status, total_amount }
        if (response.paid === true || response.status === "approved") {
          // Payment successful
          console.log("Payment successful!");
          clearInterval(paymentCheckIntervalRef.current);
          paymentCheckIntervalRef.current = null;
          setIsCheckingPayment(false);
          toast.success("Pagamento concluído com sucesso!");
          // Update wallet balance after successful payment
          fetchWalletInfo();
          clearCart();
          setTimeout(() => {
            navigate("/buy-consultation");
          }, 2000);
        } else if (
          response.status === "failed" ||
          response.status === "cancelled" ||
          response.paid === false
        ) {
          // Payment failed
          console.log("Payment failed");
          clearInterval(paymentCheckIntervalRef.current);
          paymentCheckIntervalRef.current = null;
          setIsCheckingPayment(false);
          toast.error("Pagamento falhou. Por favor, tente novamente.");
          setSelectedPaymentMethod(null);
        } else {
          // Status is pending or unknown, continue polling
          console.log("Payment status pending, continuing to poll...");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        // Don't stop polling on error, might be temporary
      }
    }, 3000); // Check every 3 seconds

    // Stop polling after 10 minutes (600 seconds) to prevent infinite polling
    setTimeout(() => {
      if (paymentCheckIntervalRef.current) {
        console.log("Payment status check timeout after 10 minutes");
        clearInterval(paymentCheckIntervalRef.current);
        paymentCheckIntervalRef.current = null;
        setIsCheckingPayment(false);
        toast.error(
          "Tempo de verificação de pagamento expirado. Por favor, verifique o status do pagamento manualmente."
        );
        setSelectedPaymentMethod(null);
      }
    }, 600000); // 10 minutes
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (paymentCheckIntervalRef.current) {
        clearInterval(paymentCheckIntervalRef.current);
      }
    };
  }, []);

  // Handle payment completion
  const handlePaymentComplete = () => {
    toast.success("Pagamento concluído! Pedido está sendo processado.");
    clearCart();
    setTimeout(() => {
      navigate("/buy-consultation");
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-2 md:gap-10  w-full h-screen items-center justify-center">
      <div className="p-4 md:p-8 w-[150px] md:w-[180px] md:fixed top-0 left-0">
        <img
          onClick={() => navigate("/")}
          className="cursor-pointer "
          src="/logo.svg"
          alt=""
        />
      </div>
      {(selectedPaymentMethod === null || selectedPaymentMethod === "card") && (
        <div className="flex flex-col gap-2 md:gap-10 items-center justify-center relative">
          <GoBackButton
            onClick={() => {
              // Stop payment check if in progress
              if (paymentCheckIntervalRef.current) {
                clearInterval(paymentCheckIntervalRef.current);
                paymentCheckIntervalRef.current = null;
                setIsCheckingPayment(false);
              }
              navigate("/buy-consultation");
            }}
            className="absolute -top-10 left-0 me-auto"
          />
          <p className="text-xl font-medium">
            {isCreatingOrder
              ? "Processando..."
              : isCheckingPayment
              ? "Aguardando confirmação de pagamento..."
              : "Escolha a forma de pagamento:"}
          </p>

          <div
            className={`flex items-center gap-6 bg-[#F2F2F2] p-4 py-6 min-w-[380px] min-h-[93px] rounded-lg [&>*]:cursor-pointer [&>*]:w-20 [&>*]:rounded border-2 border-gray-400/20 hover:border-[#1AABFE] transition-all duration-300 ${
              isCreatingOrder
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() =>
              !isCreatingOrder && handlePaymentMethodSelect("card")
            }
          >
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
              <p className="text-[0.8rem] font-medium">Pagamento via Pix</p>
            </div>

            <div className=" h-full !w-fit mb-4 ms-auto">
              <AiOutlineSafetyCertificate className="text-2xl " />
            </div>
          </button>
          {(isCreatingOrder || isCheckingPayment) && (
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white/90 z-50 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1AABFE]" />
              {isCheckingPayment && (
                <p className="mt-4 text-sm text-gray-600 text-center px-4">
                  Por favor, complete o pagamento na nova aba. Estamos
                  verificando o payment status...
                </p>
              )}
              {isCreatingOrder && (
                <p className="mt-4 text-sm text-gray-600 text-center px-4">
                  Processando seu pedido...
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {selectedPaymentMethod === "pix" && paymentData && (
        <div className=" h-full md:h-auto">
          <div className="flex flex-col  gap-2 w-[390px] py-4 ">
            <div className="flex  items-center gap-2 mb-4">
              <GoBackButton onClick={() => setSelectedPaymentMethod(null)} />
              <p className="bg-[#194D9A]  text-white px-4 py-1 rounded  text-center text-lg md:text-base">
                PIX
              </p>
            </div>
            <div>
              <p className="text-[1.8rem] font-semibold">
                R${" "}
                {paymentData?.payment_options?.pix?.valor_original ||
                  totalAmount.toFixed(2).replace(".", ",")}
              </p>
              <p
                className={`text-[0.8rem] font-medium ${
                  isExpired ? "text-red-600" : ""
                }`}
              >
                Tempo Restante: {formatTime(timeRemaining)}
              </p>
              {isExpired && (
                <p className="text-red-600 text-sm font-medium">
                  Tempo de pagamento expirado! Por favor, volte para o carrinho
                  e crie um novo order.
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-3 bg-[#F3F3F3] p-4 rounded-lg">
              <p className="text-[0.9rem] font-medium">
                Escaneie para pagar com o seu app de banco
              </p>
              {!isExpired &&
              paymentData?.payment_options?.pix?.pix_copia_e_cola ? (
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
            {isExpired && (
              <div className="flex flex-col items-center gap-3 bg-red-50 border-2 border-red-500 p-4 rounded-lg my-4">
                <p className="text-red-600 font-medium text-center">
                  Tempo de pagamento expirado
                </p>
                <button
                  onClick={() => {
                    navigate("/new-consultation");
                  }}
                  className="bg-[#194D9A] text-white px-6 py-2 rounded hover:bg-[#1AABFE] transition-all"
                >
                  Volte para o Plano
                </button>
              </div>
            )}
            {!isExpired && (
              <div className="flex justify-between items-center gap-2 bg-[#F3F3F3] p-4 rounded-lg mt-4">
                <p className="text-[0.8rem] font-medium">
                  Ou copie o código para pagar
                </p>
                <button
                  className="bg-[#194D9A] text-white px-4 py-1 rounded w-fit text-xs cursor-pointer"
                  onClick={handleCopyCode}
                >
                  <span className="text-xs">COPIAR CÓDIGO</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
