import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "../common/WhatsAppButton";

const PublicLayout = ({ children }) => {
  return (
    <div className=" relative max-w-[2100px] mx-auto">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PublicLayout;
