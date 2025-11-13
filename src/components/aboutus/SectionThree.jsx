import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactMessage } from "../../services/authService";
import { toast } from "react-toastify";
import InputField from "../common/Form/InputField";
import TextAreaField from "../common/Form/TextAreaField";

const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z
    .string()
    .min(1, "Sobrenome é obrigatório")
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z
    .string()
    .min(1, "Por favor digite o seu e-mail")
    .email("Por favor digite um e-mail válido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .min(10, "Telefone deve ter pelo menos 10 caracteres"),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export default function AboutSectionThree() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await sendContactMessage({
        message: data.message,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phone,
      });

      toast.success(
        response?.message ||
          "Mensagem enviada com sucesso! Nós iremos responder o mais breve possível"
      );

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.error ||
                          "Erro ao enviar mensagem. Por favor, tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex items-center justify-center p-6 sm:p-6 lg:p-8 bg-[#194D9A] mb-15">
      <div className="w-full max-w-[1600px] flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
        {/* Left Section - Title */}
        <div className="w-full lg:w-1/4 flex items-center text-white px-4 lg:px-6">
          <h1 className="text-4xl sm:text-4xl lg:text-4xl font-bold leading-tight w-full text-center lg:text-left">
            Fale conosco
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
                    Tem alguma dúvida ou comentário? Basta nos enviar uma
                    mensagem!{" "}
                  </h2>
                </div>

                {/* Right side - Form fields */}
                <div className="lg:w-2/3 flex-1 p-6 sm:p-8 lg:p-10">
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                  >
                    {/* First Name and Last Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <InputField
                        form={form}
                        label="Nome"
                        name="firstName"
                        required
                        labelClassName="text-white text-sm font-medium mb-2"
                        className="mb-0"
                        inputContainerClassName=" !bg-transparent !border-none  border-white/50 focus-within:border-white !px-0 !py-0"
                        inputClassName="!bg-transparent text-white placeholder-white/60 !font-normal py-2 !px-2 !border-b-2 border-white/50 focus-within:border-white"
                        errorClassName="text-red-400"
                      />
                      <InputField
                        form={form}
                        label="Sobrenome"
                        name="lastName"
                        required
                        labelClassName="text-white text-sm font-medium mb-2"
                        className="mb-0"
                        inputContainerClassName=" !bg-transparent  !border-none  border-white/50 focus-within:border-white !px-0 !py-0"
                        inputClassName="!bg-transparent text-white placeholder-white/60 !font-normal py-2 !px-2 !border-b-2 border-white/50 focus-within:border-white"
                        errorClassName="text-red-400"
                      />
                    </div>

                    {/* Email and Telefone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <InputField
                        form={form}
                        label="Email"
                        name="email"
                        required
                        inputProps={{ type: "email" }}
                        labelClassName="text-white text-sm font-medium mb-2"
                        className="mb-0"
                        inputContainerClassName=" !bg-transparent  !border-none  border-white/50 focus-within:border-white !px-0 !py-0"
                        inputClassName="!bg-transparent text-white placeholder-white/60 !font-normal py-2 !px-2 !border-b-2 border-white/50 focus-within:border-white"
                        errorClassName="text-red-400"
                      />

                      <InputField
                        form={form}
                        label="Telefone"
                        name="phone"
                        required
                        defaultValue="+91"
                        inputProps={{ type: "tel" }}
                        className="mb-0"
                        inputContainerClassName=" !bg-transparent !border-none  !border-white/50 focus-within:border-white !px-0 !py-0"
                        inputClassName="!bg-transparent text-white placeholder-white/60 !font-normal py-2 !px-2 !border-b-2 border-white/50 focus-within:border-white"
                        errorClassName="text-red-400"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <TextAreaField
                        form={form}
                        label="Mensagem"
                        name="message"
                        required
                        placeholder="Digite sua mensagem..."
                        rows={4}
                        labelClassName="text-white text-sm font-medium mb-2"
                        errorClassName="text-red-400"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-sky-400 hover:bg-sky-300 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                          isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
