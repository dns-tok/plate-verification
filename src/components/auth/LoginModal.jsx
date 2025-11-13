import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { z } from "zod";
import Modal from "../common/Modal";
import InputField from "../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Por favor digite o seu e-mail" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginModal = ({
  isOpen,
  onClose,
  onNavigateToSignup,
  onNavigateToForgotPassword,
}) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login({ email: data.email, password: data.password });
      toast.success("Login realizado com sucesso!");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Login falhou. Por favor, verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Entrar" onClose={onClose} isAuthModal={true}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="Email"
          name="email"
          placeholder="voce@exemplo.com.br"
          icon={<MdEmail />}
        />

        <InputField
          form={form}
          label="Senha"
          name="password"
          placeholder="*****"
          icon={<MdLock />}
          isPassword={true}
          onForgotPassword={onNavigateToForgotPassword}
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
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-6">
          Não tem uma conta ?{" "}
          <span
            onClick={() => {
              onClose();
              onNavigateToSignup();
            }}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
            cadastre-se
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default LoginModal;
