import React from "react";
import { useLocation } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";

const ConfirmEmail = () => {
  const { email } = useLocation().state ?? {};
  return (
    <AuthLayout>
      <div className="text-center  flex flex-col">
        <div className=" max-w-[400px] mx-auto mb-4">
          <img
            src="/assets/confirmEmail.svg"
            alt="Email confirmation"
            className="mx-auto"
          />
        </div>
        <p className="text-[1.6rem] sm:text-[1.5rem] font-[500] text-center ">
          Confirm Your Email
        </p>
        <p className="text-xs leading-relaxed text-white ">
          We have sent email to{" "}
          <span className="text-[#1AABFE] cursor-pointer hover:underline">
            {email}
          </span>{" "}
          to confirm the validity of our email address. After receiving the
          email follow the link provided to complete your registration
        </p>
      </div>
    </AuthLayout>
  );
};

export default ConfirmEmail;
