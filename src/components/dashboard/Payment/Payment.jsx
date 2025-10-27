import React, { useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { toast } from "react-toastify";
import { useCart } from "../../../context/CartContext";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [copyCode, setCopyCode] = useState(false);
  const { cartItems, couponDiscount } = useCart();

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText("1234567890");
    setCopyCode(true);
    setTimeout(() => {
      setCopyCode(false);
    }, 2000);

    toast.success("Code copied to clipboard");
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
          <p className="text-xl font-medium">Choose Your payment method</p>
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
          <div
            className="flex items-center gap-6 bg-[#F2F2F2] p-3 min-w-[380px] min-h-[93px] rounded-lg cursor-pointer border-2 border-gray-400/20 hover:border-[#1AABFE] transition-all duration-300"
            onClick={() => setSelectedPaymentMethod("pix")}
          >
            <div className="flex flex-col items-center gap-2 w-full">
              <img src="/assets/pix.svg" alt="" className="w-30" />
              <p className="text-[0.8rem] font-medium">Pay by Pix</p>
            </div>

            <div className=" h-full !w-fit mb-4 ms-auto">
              <AiOutlineSafetyCertificate className="text-2xl " />
            </div>
          </div>
        </>
      )}

      {selectedPaymentMethod === "pix" && (
        <div>
          <div className="flex flex-col  gap-2 w-[390px] py-4">
            <p className="bg-[#194D9A]  text-white px-4 py-1 rounded w-2/3 mx-auto text-center mb-4 ">
              PIX
            </p>
            <div>
              <p className="text-[1.8rem] font-semibold">
                R$ {totalAmount.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-[0.8rem] font-medium">Time Remaining: 10:00</p>
            </div>
            <div className="flex flex-col items-center gap-3 bg-[#F3F3F3] p-4 rounded-lg">
              <p className="text-[0.9rem] font-medium">
                Scan to pay with your bank app
              </p>
              <img
                src="/assets/dummyQr.svg"
                alt=""
                className="w-[250px] border-8 border-[#194D9A] rounded-xl p-1"
              />
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
