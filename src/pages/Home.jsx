import React from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import PriceSection from "../components/PriceSection";
import InfoSection from "../components/InfoSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import TestimonialSection from "../components/TestimonialSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <section id="plans" className="scroll-mt-[3.7rem]">
        <PriceSection />
      </section>
      <section id="advantages" className="scroll-mt-[3.7rem]">
        <InfoSection />
      </section>
      <section id="questions" className="scroll-mt-[3.7rem]">
        <FaqSection />
      </section>
      <section id="contact" className="scroll-mt-[3.7rem]">
        <ContactSection />
      </section>
      <TestimonialSection />
    </Layout>
  );
};

export default Home;
