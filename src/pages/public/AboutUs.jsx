import React from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import AboutHero from "../../components/aboutus/AboutHero";
import AboutSectionOne from "../../components/aboutus/SectionOne";
import AboutSectionTwo from "../../components/aboutus/SectionTwo";
import AboutSectionThree from "../../components/aboutus/SectionThree";

const AboutUs = () => {
  return (
    <PublicLayout>
      {/* <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                About Us
              </h1>
            </div>
          </div>
        </div>
      </div> */}

      <AboutHero/>
      <AboutSectionOne/>
      <AboutSectionTwo/>
      <AboutSectionThree/>
      
    </PublicLayout>
  );
};

export default AboutUs;
