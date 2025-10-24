import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/home/HeroSection";
import PriceSection from "../components/home/PriceSection";
import InfoSection from "../components/home/InfoSection";
import FaqSection from "../components/home/FaqSection";
import ContactSection from "../components/home/ContactSection";
import TestimonialSection from "../components/home/TestimonialSection";
import { useHashNavigation } from "../utils/scrollUtils";

const Home = () => {
  const handleHashNavigation = useHashNavigation();

  useEffect(() => {
    handleHashNavigation();
  }, [handleHashNavigation]);

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
