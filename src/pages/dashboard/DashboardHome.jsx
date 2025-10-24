import React from "react";

const DashboardHome = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to your car service dashboard!</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">New Consultation</h3>
          <p className="text-blue-700 mb-4">Start a new vehicle consultation</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </button>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-900 mb-2">History</h3>
          <p className="text-green-700 mb-4">View your consultation history</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            View History
          </button>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-900 mb-2">Profile</h3>
          <p className="text-purple-700 mb-4">Manage your account settings</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
