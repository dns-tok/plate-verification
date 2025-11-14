import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../context/CartContext";
import { z } from "zod";
import Modal from "../common/Modal";
import InputField from "../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { fetchPublicPlans, transformPublicPlans } from "../../services/plansService";
import { multiPlans } from "../dashboard/Consultation/plansData";

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
  const { addToCart, openCart } = useCart();
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
      const response = await login({
        email: data.email,
        password: data.password,
      });
      toast.success(response?.message || "Login realizado com sucesso!");
      onClose();
      
      // Check if there's a pending plan to add to cart
      const pendingPlanData = localStorage.getItem("pendingPlanToAdd");
      if (pendingPlanData) {
        try {
          const pendingPlan = JSON.parse(pendingPlanData);
          
          // Check if the pending plan is not too old (e.g., 1 hour)
          const oneHour = 60 * 60 * 1000;
          if (Date.now() - pendingPlan.timestamp > oneHour) {
            localStorage.removeItem("pendingPlanToAdd");
            return;
          }
          
          let planToAdd = null;
          
          // Handle multi-plans (static data)
          if (pendingPlan.isMultiPlan) {
            planToAdd = multiPlans.find(
              (plan) => plan.id === pendingPlan.planId || plan.name === pendingPlan.planName
            );
          } else {
            // Handle single plans (from API)
            const apiPlans = await fetchPublicPlans();
            const transformedPlans = transformPublicPlans(apiPlans);
            
            // Find the matching plan by code
            planToAdd = transformedPlans.find(
              (plan) => plan.apiData?.code === pendingPlan.planCode
            );
          }
          
          if (planToAdd) {
            // Add plan to cart
            addToCart(planToAdd);
            // Open cart
            setTimeout(() => {
              openCart();
            }, 500); // Small delay to ensure modal is closed
            toast.success(`${pendingPlan.planName} adicionado ao carrinho!`);
          } else {
            console.warn(`Plan with code/name '${pendingPlan.planCode || pendingPlan.planName}' not found`);
          }
          
          // Clear pending plan from localStorage
          localStorage.removeItem("pendingPlanToAdd");
        } catch (error) {
          console.error("Error adding pending plan to cart:", error);
          // Don't show error to user, just log it
        }
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login falhou. Por favor, verifique suas credenciais.";
      toast.error(errorMessage);
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
