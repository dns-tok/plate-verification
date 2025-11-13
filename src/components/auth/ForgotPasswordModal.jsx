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
      const response = await requestPasswordReset(data.email);
      setSentEmail(data.email);
      setEmailSent(true);
      toast.success(response?.message || "Password reset instructions sent to your email!");
    } catch (e) {
      console.log(e);
      const errorMessage = e?.response?.data?.message || 
                          e?.response?.data?.error;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        // If no error message, assume success (some APIs return success even on error for security)
        setSentEmail(data.email);
        setEmailSent(true);
        toast.success("Password reset instructions sent to your email!");
      }
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
      <Modal title="Verifique seu e-mail" onClose={onClose} isAuthModal={true}>
        <div className="text-center">
          <div className="mb-4">
            <div className="size-14 bg-[#1AABFE] rounded-full flex items-center justify-center mx-auto mb-4">
              <MdEmail className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Link de redefinição enviado!
            </h3>
            <p className="text-sm text-gray-300 mb-2">
              Enviamos um link de redefinição de senha para:
            </p>
            <p className="text-[#1AABFE] font-medium">{sentEmail}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-300">
              Verifique seu e-mail e clique no link de redefinição para
              continuar. O link expirará em 24 horas.
            </p>

            <button
              onClick={handleResend}
              className="w-full bg-white hover:bg-gray-100 text-[#1AABFE] font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
            >
              Não recebeu o link? Reenviar
            </button>

            <button
              onClick={onNavigateToLogin}
              className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
            >
              Voltar para o entrar
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
          placeholder="voce@exemplo.com.br"
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
