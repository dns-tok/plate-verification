import React from "react";
import MainContent from "../../components/layout/MainContent";
import { FaCheckCircle } from "react-icons/fa";

const ConnectedPage = () => {
  return (
    <MainContent showMenu={false} bgImage="/assets/privacy.svg">
      <p className="text-2xl font-semibold mb-4">Privacy</p>
      <div className="bg-[#34C759] p-2 rounded-lg flex items-center gap-4 justify-between w-fit">
        <div className="bg-white py-2 px-4 rounded-md">
          <p className="text-[0.8rem] font-[400]">
            <span className="font-[600] text-[0.7rem]">Contact method:</span>{" "}
            WhatsApp & Email
          </p>
          <p className="text-[0.8rem] font-[400]">
            <span className="font-[600] text-[0.7rem]">Objective: </span>Direct
            communication
            <br /> with the customer
          </p>
        </div>
        <FaCheckCircle className="text-white text-[2.8rem] " />
      </div>
      <p className="text-[0.8rem] font-[400] max-w-[95%] mt-5">
        By using our platform, you authorize the use of your data for
        communication purposes via email and WhatsApp. We may send you content
        such as news, promotions, updates, and relevant information about our
        services. For Protected Plate plan customers, weekly messages are an
        essential part of the experience, ensuring alerts and ongoing
        monitoring. Data processing fully complies with the General Data
        Protection Law (LGPD), with security and transparency. You can manage
        your preferences at any time. For more details, see our Privacy Policy.
      </p>
    </MainContent>
  );
};

export default ConnectedPage;
