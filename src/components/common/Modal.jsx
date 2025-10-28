import React from "react";
import { createPortal } from "react-dom";

const Modal = ({
  title,
  description,
  children,
  onClose,
  className,
  isAuthModal = false,
}) => {
  const modalContent = !isAuthModal ? (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]">
      <div className="w-full h-full flex justify-center items-start overflow-y-auto sm:py-20 sm:px-4">
        <div
          className={`bg-gray-100/90 px-6 xl:px-8 py-4 rounded-lg relative space-y-5 my-auto w-full max-w-md ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex text-center justify-between items-center w-full">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-medium">
              {title}
            </h2>
            <button className="text-3xl cursor-pointer" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] overflow-y-auto">
      <div className="max-w-screen max-h-screen w-[500px] mx-auto  ">
        <div className="w-full bg-[#002F74]/50 backdrop-blur-lg text-white shadow-2xl rounded-[35px] p-6 sm:p-12 mx-auto  relative">
          {title && (
            <h2 className="text-[1.6rem] sm:text-[2rem] font-[600] text-center mb-4">
              {title}
              <button
                className="text-3xl cursor-pointer absolute right-6 top-6"
                onClick={onClose}
              >
                ✕
              </button>
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  // Render modal outside the normal DOM hierarchy using a portal
  return createPortal(modalContent, document.body);
};

export default Modal;
