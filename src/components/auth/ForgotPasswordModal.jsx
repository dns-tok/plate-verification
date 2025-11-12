import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { z } from "zod";
import Modal from "../common/Modal";
import InputField from "../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Por favor digite o seu e-mail" })
    .email({ message: "Invalid email address" }),
});

const ForgotPasswordModal = ({ isOpen, onClose, onNavigateToLogin }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { requestPasswordReset } = useAuth();

  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await requestPasswordReset(data.email);
      setSentEmail(data.email);
      setEmailSent(true);
      toast.success("Password reset instructions sent to your email!");
    } catch (e) {
      console.log(e);
      setSentEmail(data.email);
      setEmailSent(true);
      toast.success("Password reset instructions sent to your email!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setEmailSent(false);
    form.reset();
  };

  if (!isOpen) return null;

  if (emailSent) {
    return (
      <Modal title="Check Your Email" onClose={onClose} isAuthModal={true}>
        <div className="text-center">
          <div className="mb-4">
            <div className="size-14 bg-[#1AABFE] rounded-full flex items-center justify-center mx-auto mb-4">
              <MdEmail className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Reset Link Sent!
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              We've sent a password reset link to:
            </p>
            <p className="text-[#1AABFE] font-medium">{sentEmail}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-300">
              Check your email and click the reset link to continue. The link
              will expire in 24 hours.
            </p>

            <button
              onClick={handleResend}
              className="w-full bg-white hover:bg-gray-100 text-[#1AABFE] font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
            >
              Didn't get the link? Resend
            </button>

            <button
              onClick={onNavigateToLogin}
              className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Esqueceu a Senha" onClose={onClose} isAuthModal={true}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="Email"
          name="email"
          placeholder="you@example.com"
          icon={<MdEmail />}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full font-medium py-3 rounded-md transition mt-2 shadow-lg ${
            isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white cursor-pointer"
          }`}
        >
          {isLoading ? "Enviando..." : "Enviar Link de Redefinição"}
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-3">
          Lembrou sua senha?{" "}
          <span
            onClick={() => {
              onClose();
              onNavigateToLogin();
            }}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
           Entrar
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default ForgotPasswordModal;
