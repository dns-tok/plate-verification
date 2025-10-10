import React from "react";

const ContactSection = () => {
  const labelClass = "text-white text-[0.9rem] md:text-[0.8rem] font-semibold";
  const inputClass =
    "bg-white rounded-md py-1.5 px-4 w-full text-black text-[1rem] md:text-[1.1rem]";
  return (
    <div className='commonPadding flex justify-center bg-[url("/contactBg.svg")] bg-cover bg-center bg-no-repeat'>
      <div className="flex flex-col md:flex-row gap-10 my-[4rem]  md:w-[80%] lg:w-[70%] ">
        <div className="flex justify-center  md:w-[45%] rounded-2xl overflow-hidden">
          <img
            src="/contactGuy.svg"
            alt=""
            className=" h-full object-cover my-auto"
          />
        </div>
        <div className="md:w-[55%]">
          <form className="flex flex-col gap-2 text-white" action="">
            <h1 className="text-white text-[2rem] font-bold leading-none">
              Contact Us
            </h1>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input type="text" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input type="email" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input type="text" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input type="email" className={inputClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                type="text"
                className={`${inputClass} h-[6rem] md:h-[6rem] lg:h-[9rem]`}
              />
            </div>
            <button
              type="submit"
              className="bg-white rounded-full ms-auto md:ms-0 me-auto font-bold px-6 py-3 text-[1rem] md:text-[0.9rem] mt-4 text-[#1AABFE] whitespace-nowrap"
            >
              Submit contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
