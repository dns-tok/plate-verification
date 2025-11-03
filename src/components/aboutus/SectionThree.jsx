import React, { useState } from "react";



export default function AboutSectionThree() {



const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
  };

  return (
    <div className=" flex items-center justify-center p-6 sm:p-6 lg:p-8 bg-[#194D9A] mb-15">
      <div className="w-full max-w-[1600px] flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
        
        {/* Left Section - Title */}
        <div className="w-full lg:w-1/4 flex items-center text-white px-4 lg:px-6">
          <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold leading-tight w-full text-center lg:text-left">
            Contact Us
          </h1>
        </div>

        {/* Right Section - Form Card */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/30 shadow-2xl h-full">
            <div className="flex flex-col h-full">
              
              {/* Header and Form Container */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-full">
                
                {/* Left side - Header text */}
                <div className="lg:w-1/3 text-white flex items-center bg-[rgba(255,255,255,0.1)] p-6 sm:p-8 lg:p-10">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed">
                    Any question or
                    remarks? Just write us
                    a message!
                  </h2>
                </div>

                {/* Right side - Form fields */}
                <div className="lg:w-2/3 flex-1 p-6 sm:p-8 lg:p-10">
                  <div className="space-y-6">
                    
                    {/* First Name and Last Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 py-2 px-1 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 py-2 px-1 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email and Phone Number Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 py-2 px-1 focus:outline-none focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <div className="flex items-center border-b-2 border-white/50 focus-within:border-white transition-colors">
                          <span className="text-white/80 pr-2">+91</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent text-white placeholder-white/60 py-2 px-1 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message.."
                        rows="4"
                        className="w-full bg-transparent border-b-2 border-white/50 text-white placeholder-white/60 py-2 px-1 focus:outline-none focus:border-white transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleSubmit}
                        className="bg-sky-400 hover:bg-sky-300 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}