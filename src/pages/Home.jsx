import React, { useEffect } from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import PriceSection from "../components/PriceSection";
import InfoSection from "../components/InfoSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import TestimonialSection from "../components/TestimonialSection";

const Home = () => {
  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100); // Small delay to ensure page is loaded
      }
    };

    handleHashNavigation();
  }, []);

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
