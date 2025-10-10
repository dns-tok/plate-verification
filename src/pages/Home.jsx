import React from "react";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import PriceSection from "../components/PriceSection";
import InfoSection from "../components/InfoSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import TestimonialSection from "../components/TestimonialSection";
import MultiConsultant from "../components/MultiConsultant";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <PriceSection />
      <InfoSection />
      <FaqSection />
      <ContactSection />
      <TestimonialSection />
    </Layout>
  );
};

export default Home;
