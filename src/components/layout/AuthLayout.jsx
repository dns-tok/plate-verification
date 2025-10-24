import React from "react";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="relative min-h-dvh flex items-center overflow-y-auto bg-[url('/assets/authBg.svg')] bg-cover bg-center bg-fixed">
      <div className="max-w-[1840px] w-full h-full mx-auto flex justify-end items-center p-[1rem] lg:p-[4rem] overflow-y-auto ">
        <div className="w-full md:w-[52.5%] h-full">
          <div className="flex items-center h-full">
            <div className="max-w-[600px] bg-[#002F74]/50 backdrop-blur-lg text-white shadow-2xl rounded-[35px] p-6 sm:p-12 mx-auto md:mx-0 w-full">
              {title && (
                <h2 className="text-[1.6rem] sm:text-[2rem] font-[600] text-center mb-4">
                  {title}
                </h2>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
