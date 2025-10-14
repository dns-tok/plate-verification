import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { IoLogoWhatsapp } from "react-icons/io";

const Layout = ({ children }) => {
  return (
    <div className=" relative max-w-[2100px] mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <IoLogoWhatsapp className="fixed bottom-10 text-green-500 text-4xl cursor-pointer z-[100] hover:scale-110 transition-all duration-300 whatsapp-icon" />
    </div>
  );
};

export default Layout;
