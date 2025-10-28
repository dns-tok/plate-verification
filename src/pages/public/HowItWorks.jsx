import React from "react";
import PublicLayout from "../../components/layout/PublicLayout";
const HowItWorks = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                How It Works
              </h1>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default HowItWorks;
