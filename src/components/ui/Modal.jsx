import React from "react";

const Modal = ({ title, description, children, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed -inset-1 md:-inset-[1.22rem] bg-black/70  flex justify-center items-center  z-[1000] "
      onClick={handleBackgroundClick}
    >
      <div
        className="w-full h-screen flex justify-center items-start overflow-y-auto sm:py-20 sm:px-4"
        onClick={handleBackgroundClick}
      >
        <div
          className="bg-gray-100/90 px-[1.5rem] xl:px-[2rem] py-[1rem] md:py-[1rem] rounded-lg relative space-y-5 my-auto  w-full md:w-auto "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex  text-center justify-between items-center w-full">
            <h2 className="text-[1.5rem] md:text-[1.8rem] font-medium">
              {title}
            </h2>
            <button className="text-3xl  cursor-pointer" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="w-full md:min-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
