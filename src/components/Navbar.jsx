import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

const navLinks = [
  {
    name: "Plano",
    href: "#",
  },
  {
    name: "Advantages",
    href: "#",
  },
  {
    name: "How it works",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Questions",
    href: "#",
  },
  {
    name: "About Us",
    href: "#",
  },
];
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`bg-black flex flex-col items-start justify-between ${
        isMenuOpen ? "fixed w-full h-full" : "sticky "
      } top-0 z-[1000]`}
    >
      <div className="flex items-center justify-between w-full ">
        <img
          onClick={scrollToTop}
          className=" max-w-[50%] md:max-w-[28%] xl:max-w-[25%] cursor-pointer"
          src="/logoNav.svg"
          alt=""
        />
        <div className=" text-white gap-[1rem] md:gap-[1.5rem] xl:gap-[2rem] hidden lg:flex items-center md:me-[2rem] xl:me-[5rem]">
          {navLinks.map((link) => (
            <p
              key={link.name}
              className="text-sm  xl:text-sm cursor-pointer border-b-2 border-transparent hover:border-[#1AABFE] transition-all duration-300 "
            >
              {link.name}
            </p>
          ))}

          <button
            className={`text-[0.8rem] md:text-[0.9rem] bg-[#1AABFE] hover:bg-[#1590d4] font-semibold w-fit whitespace-nowrap text-white  transition-colors duration-300 px-8 py-2 cursor-pointer rounded-full ms-[3rem] md:ms-[1rem] xl:ms-[6rem]`}
          >
            Enlrar
          </button>
        </div>
        <div className="flex lg:hidden text-4xl text-white cursor-pointer me-2">
          {isMenuOpen ? (
            <span
              onClick={toggleMenu}
              className="text-3xl text-white cursor-pointer me-2"
            >
              ✕
            </span>
          ) : (
            <BiMenu onClick={toggleMenu} />
          )}
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col gap-8 w-full h-full bg-black p-4 pt-8 z-[1000]">
          {navLinks.map((link) => (
            <p key={link.name} className="text-white text-lg">
              {link.name}
            </p>
          ))}

          <button
            className={`text-lg bg-[#1AABFE] hover:bg-[#1590d4] font-semibold w-fit whitespace-nowrap text-white  transition-colors duration-300 px-8 py-2  cursor-pointer rounded-full`}
          >
            Enlrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
