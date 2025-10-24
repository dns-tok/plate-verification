import React from "react";
import MainContent from "../../components/layout/MainContent";
import { toast } from "react-toastify";

const RecommendPage = () => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "https://www.placaverificada.com.br/indicado?hashlink=edd777166-b017-4856-a9da-7600e8fe2625"
    );
    toast.success("Address copied to clipboard");
  };

  return (
    <MainContent showMenu={false}>
      <p className="text-2xl font-semibold mb-4">My Recommendations</p>
      <p className="text-[1.2rem] mb-4 font-medium max-w-[650px]">
        Refer a verified license plate to your friends and customers and earn a
        referral discount coupon. You can use the value toward future inquiries.
      </p>
      <div>
        <p className="text-[#194D9A] text-[1.2rem] font-medium mb-2">
          My Recommendation ID
        </p>
        <div className="flex items-center gap-2">
          <p className="text-[0.6rem] px-4 py-[0.6rem] border-2 border-[#194D9A] rounded-full">
            https://www.placaverificada.com.br/indicado?hashlink=edd77166-b017-4856-a9da-7600e8fe2625
          </p>
          <button
            onClick={handleCopyAddress}
            className="bg-[#194D9A] text-white px-6 py-2 rounded-full cursor-pointer"
          >
            Copy Address
          </button>
        </div>
      </div>
    </MainContent>
  );
};

export default RecommendPage;
