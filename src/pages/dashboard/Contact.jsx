import React, { useState } from "react";
import MainContent from "../../components/layout/MainContent";
import { BiSolidEnvelope, BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { sendMessage } from "../../services/authService";
import { toast } from "react-toastify";
import { IoLogoWhatsapp } from "react-icons/io";

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
          <p className="text-2xl font-semibold">Fale conosco</p>
          <p className="text-[0.8rem] font-[400] max-w-[85%]">
            Nossa equipe está à disposição para responder às suas dúvidas e
            oferecer o melhor atendimento possível. Basta escrever sua mensagem
            no campo abaixo e entraremos em contato com você rapidamente. Se
            preferir, também pode falar conosco pelos outros canais disponíveis.
          </p>
        </div>
        <div className="flex gap-4 justify-between items-center rounded-xl overflow-hidden">
          <div className="w-[45%] h-[418px] relative bg-[#2D3134]">
            <img
              src="/contactVector.svg"
              alt=""
              className="absolute bottom-0 right-0 size-[30%] "
            />
            <div className="w-full h-full text-white p-9">
              <p className="text-2xl font-medium">Informações de contato</p>
              <p className="text-white/60 font-light text-[0.9rem] ms-0.5">
                Caso prefira, podemos lhe atender por Whatsapp
              </p>
              <div className="flex flex-col justify-evenly gap-2 [&>p]:flex [&>p]:items-center [&>p]:gap-2 mt-5 h-[200px]">
                <p className="hover:text-green-500">
                  <FaWhatsapp className="text-[1.3rem] " />
                  <a
                    href={"https://wa.me/5511942227953"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +55 11 94222-7953
                  </a>
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
              className="text-sm font-semibold mb-2 block text-black/70"
            >
              Mensagem
            </label>
            <textarea
              name="message"
              id="message"
              className="w-full border-2 border-[#8D8D8D]/60 p-2 rounded-md resize-none text-sm focus:outline-none focus:ring-0 focus:border-[#1AABFE] transition-all duration-500"
              value={message}
              onChange={handleMessageChange}
              placeholder="Escreva sua mensagem aqui"
              rows={5}
              required
            />
            <button
              type="submit"
              className={`relative text-sm w-[140px] bg-[#194D9A] hover:bg-[#1AABFE] text-white font-medium px-4 py-3 rounded-md transition-all duration-300 shadow-lg mt-2  ${
                isSending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Enviar mensagem"}
              <img
                src="/letterSend.svg"
                alt=""
                className="absolute bottom-0 right-0 translate-y-full translate-x-[-30%] "
              />
            </button>
          </form>
        </div>
      </div>
    </MainContent>
  );
};

export default ContactPage;
