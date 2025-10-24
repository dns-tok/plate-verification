import React, { useEffect } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import HeroSection from "../../components/public/HeroSection";
import PriceSection from "../../components/public/PriceSection";
import InfoSection from "../../components/public/InfoSection";
import FaqSection from "../../components/public/FaqSection";
import ContactSection from "../../components/public/ContactSection";
import TestimonialSection from "../../components/public/TestimonialSection";
import { useHashNavigation } from "../../utils/scrollUtils";

const PublicHome = () => {
  const handleHashNavigation = useHashNavigation();

  useEffect(() => {
    handleHashNavigation();
  }, [handleHashNavigation]);

  return (
    <PublicLayout>
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
    </PublicLayout>
  );
};

export default PublicHome;
