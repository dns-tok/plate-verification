import React, { useState } from "react";
import { MdLock } from "react-icons/md";
import { z } from "zod";
import Modal from "../common/Modal";
import InputField from "../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const passwordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "A senha é requerida" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Por favor, confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

const ResetPasswordModal = ({ isOpen, onClose, resetToken }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data) => {
    if (!resetToken) {
      toast.error("Link de redefinição inválido. Por favor, solicite uma nova redefinição de senha.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await resetPassword({ token: resetToken, newPassword: data.password });
      toast.success(response?.message || "Senha redefinida com sucesso!");
      onClose();
    } catch (error) {
      console.log("Redefinição de senha falhou", error);
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.error ||
                          "Link de redefinição inválido ou expirado. Por favor, solicite uma nova redefinição de senha.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Redefinir Senha" onClose={onClose} isAuthModal={true}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="Nova Senha"
          name="password"
          placeholder="Digite a nova senha"
          icon={<MdLock />}
          isPassword={true}
        />

        <InputField
          form={form}
          label="Confirmar nova senha"
          name="confirmPassword"
          placeholder="Confirmar a nova senha"
          icon={<MdLock />}
          isPassword={true}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-medium py-3 rounded-md transition mt-2 shadow-lg ${
            isSubmitting
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white cursor-pointer"
          }`}
        >
          {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-3">
          Lembrou sua senha?{" "}
          <span
            onClick={() => {
              onClose();
              // Could navigate to login or trigger login modal
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

export default ResetPasswordModal;
