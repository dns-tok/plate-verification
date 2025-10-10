import React, { useState } from "react";
import Button from "./Button";
import { BiMenu, BiX } from "react-icons/bi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  return (
    <div className="bg-black flex items-center justify-between">
      <img
        className=" max-w-[50%] md:max-w-[28%] xl:max-w-[25%]"
        src="/logoNav.svg"
        alt=""
      />
      <div className=" text-white gap-[1rem] md:gap-[1.5rem] xl:gap-[2rem] hidden lg:flex items-center md:me-[2rem] xl:me-[5rem]">
        {navLinks.map((link) => (
          <p
            key={link.name}
            className="text-sm  xl:text-base cursor-pointer border-b-2 border-transparent hover:border-[#1AABFE] transition-all duration-300 "
          >
            {link.name}
          </p>
        ))}
        <Button
          text="Enlrar"
          className="text-xl font-semibold ms-[3rem] md:ms-[1rem] xl:ms-[6rem] bg-[#1AABFE] text-white hover:bg-[#1AABFE]/60 hover:shadow-inner transition-all duration-300"
        />
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

      {isMenuOpen && (
        <div className="flex flex-col gap-8 absolute top-[3.6rem] md:top-[4.2rem] lg:top-[8rem] w-full h-full bg-black p-4 pt-8 z-[1000]">
          {navLinks.map((link) => (
            <p key={link.name} className="text-white text-xl">
              {link.name}
            </p>
          ))}
          <Button
            text="Enlrar"
            bgColor="#1AABFE"
            textColor="white"
            className="text-2xl me-auto bg-[#1AABFE]"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
