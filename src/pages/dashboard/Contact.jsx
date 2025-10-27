import React, { useState } from "react";
import MainContent from "../../components/layout/MainContent";
import { BiSolidEnvelope, BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { sendMessage } from "../../services/authService";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSending(true);
    try {
      await sendMessage(message);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setMessage(""); // Clear the message after successful send
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <MainContent showMenu={false} bgImage="/assets/privacy.svg">
      <div className="space-y-4">
        <div className="flex flex-col gap-1 text-center justify-center items-center">
          <p className="text-2xl font-semibold">Contact Us</p>
          <p className="text-[0.8rem] font-[400] max-w-[85%]">
            Our team is available to answer your questions and offer the best
            possible service.Before we continue, we need some basic information
            so we can get back to you quickly.If you prefer another channel, you
            can also contact us through the options below:
          </p>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <div className="w-[45%] relative">
            <div className="h-full w-full">
              <img
                src="/assets/contactBg.svg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full text-white p-9">
              <p className="text-2xl font-medium">Contact Information</p>
              <p className="text-white/60 ">
                Say something to start a live chat!
              </p>
              <div className="flex flex-col justify-evenly gap-2 [&>p]:flex [&>p]:items-center [&>p]:gap-2 mt-5 h-[200px]">
                <p>
                  <BiSolidPhoneCall className="text-[1.3rem]" />
                  +1012 3456 789
                </p>
                <p>
                  <BiSolidEnvelope className="text-[1.3rem]" />
                  <span className="underline text-[#1AABFE] cursor-pointer break-all">
                    contato@placaverificada.com.br
                  </span>
                </p>
                <p>
                  <FaLocationDot className="text-[1.3rem]" />
                  Avenida Paulista 1471, São Paulo – SP
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-[50%]">
            <label
              htmlFor="message"
              className="text-sm font-semibold mb-2 block"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="w-full border border-[#8D8D8D] p-2 rounded-md resize-none text-sm focus:outline-none focus:ring-0 focus:border-[#1AABFE]"
              value={message}
              onChange={handleMessageChange}
              placeholder="Enter your message"
              rows={5}
              required
            />
            <button
              type="submit"
              className={`text-sm w-[140px] bg-[#194D9A] hover:bg-[#1AABFE] text-white font-medium px-4 py-3 rounded-md transition  shadow-lg mt-2  ${
                isSending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default ContactPage;
