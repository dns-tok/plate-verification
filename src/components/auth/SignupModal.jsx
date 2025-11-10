import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Modal from "../common/Modal";
import InputField from "../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import DateInputField from "../common/Form/DateInputField";

// Step 1 Schema
const step1Schema = z.object({
  id: z.string().nonempty("ID is required"),
  fullName: z
    .string()
    .nonempty("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Endereço de e-mail inválido"),
  telephone: z
    .string()
    .nonempty("Telefone is required")
    .min(10, "Telefone must be at least 10 characters"),
});

// Step 2 Schema
const step2Schema = z
  .object({
    zipCode: z
      .string()
      .min(5, { message: "ZIP code must be at least 5 characters" }),
    houseNumber: z.string().min(1, { message: "Número da residência is required" }),
    password: z
      .string()
      .nonempty({ message: "A senha é requerida" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupModal = ({ isOpen, onClose, onNavigateToLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const acceptTermsRef = useRef(null);
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleTermsClick = () => {
    onClose();
    navigate("/terms-of-use");
  };
  const handleTermsAccepted = () => {
    setTermsAccepted(!termsAccepted);
    acceptTermsRef.current.checked = termsAccepted;
    if (termsError) setTermsError(""); // Clear error when user checks terms
  };

  const step1Form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      id: "",
      fullName: "",
      dateOfBirth: "",
      email: "",
      telephone: "",
    },
  });

  const step2Form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      zipCode: "",
      houseNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleStep1Submit = (data) => {
    setStep(2);
  };

  const handleStep2Submit = async (data) => {
    if (!termsAccepted) {
      setTermsError("Please accept the terms of use to continue.");
      return;
    }
    setTermsError("");
    setIsLoading(true);
    try {
      const payload = {
        celular: step1Form.getValues("telephone"),
        cep: step2Form.getValues("zipCode"),
        cpf: step1Form.getValues("id"),
        data_nascimento: step1Form.getValues("dateOfBirth"),
        email: step1Form.getValues("email"),
        nome_completo: step1Form.getValues("fullName"),
        numero_residencia: step2Form.getValues("houseNumber"),
        password: step2Form.getValues("password"),
      };
      await register(payload);
      toast.success("Registration successful!");
      onClose();
      navigate("/");
    } catch (e) {
      console.log(e);

      // API returns one error at a time with field information
      // Format: { error: "Error message", field: "field_name" }
      const errorResponse = e.response?.data;
      if (errorResponse?.field && errorResponse?.error) {
        // Map API field names to form field names
        const fieldMapping = {
          birth_date: "dateOfBirth",
          data_nascimento: "dateOfBirth",
          cpf: "id",
          nome_completo: "fullName",
          email: "email",
          celular: "telephone",
          phone: "telephone",
          cep: "zipCode",
          zipcode: "zipCode",
          numero_residencia: "houseNumber",
          password: "password",
        };

        const formFieldName = fieldMapping[errorResponse.field];

        if (formFieldName) {
          // Check which form the field belongs to
          const step1Fields = [
            "id",
            "fullName",
            "dateOfBirth",
            "email",
            "telephone",
          ];
          const step2Fields = [
            "zipCode",
            "houseNumber",
            "password",
            "confirmPassword",
          ];

          if (step1Fields.includes(formFieldName)) {
            // Error is in step 1, navigate back and set error
            setStep(1);
            step1Form.setError(formFieldName, {
              type: "server",
              message: errorResponse.error,
            });
          } else if (step2Fields.includes(formFieldName)) {
            // Error is in step 2, set error on current form
            step2Form.setError(formFieldName, {
              type: "server",
              message: errorResponse.error,
            });
          }
        } else {
          // Field not mapped, show generic error
          toast.error(
            errorResponse.error ||
              "Registration failed. Please check your details."
          );
        }
      } else {
        // No field information, show generic error
        toast.error(
          errorResponse?.error ||
            "Registration failed. Please check your details."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <Modal title="Sign Up" onClose={onClose} isAuthModal={true}>
      {step === 1 && (
        <form onSubmit={step1Form.handleSubmit(handleStep1Submit)}>
          <InputField
            form={step1Form}
            label="CPF"
            name="id"
            placeholder="_ _ _ _ _ - _ _"
            required
          />

          <InputField
            form={step1Form}
            label="Nome completo"
            name="fullName"
            placeholder="John Doe"
            required
          />

          {/* <InputField
            form={step1Form}
            label="Date of Birth"
            name="dateOfBirth"
            placeholder="_ _ / _ _ / _ _ _ _"
            inputProps={{ type: "date" }}
          /> */}
          <DateInputField
            name="dateOfBirth"
            label="Data de nascimento"
            required
            form={step1Form}
          />
          <InputField
            form={step1Form}
            label="Email"
            name="email"
            placeholder="yvoce@exemplo.com"
            required
          />

          <InputField
            form={step1Form}
            label="Telefone"
            name="telephone"
            placeholder="(_ _) _ _ _ _ _ - _ _ _ _"
            required
          />

          {/* Privacy Notice */}
          <p className="text-xs mb-2 leading-relaxed text-white">
           Para oferecer uma experiência de navegação mais segura e personalizada ao seu perfil, armazenamos alguns dados na sua conta. Dessa forma, você pode consultar seu histórico e informações sempre que desejar, além de receber notificações importantes por e-mail ou SMS. Para obter detalhes completos, consulte nossa Política de Privacidade.{" "}
            <span className="text-[#1AABFE] cursor-pointer hover:underline">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </span>
            .
          </p>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition mt-2 shadow-lg cursor-pointer"
          >
            Continuar
          </button>

          {/* <p className="text-center text-[0.8rem]  mt-5 text-white flex justify-center">
            <input
              type="checkbox"
              className="mr-2"
              ref={acceptTermsRef}
              checked={termsAccepted}
              onChange={handleTermsAccepted}
            />
            <span className="cursor-pointer" onClick={handleTermsAccepted}>
              By following, you will accept our{" "}
            </span>
            <span className="text-[#1AABFE] cursor-pointer hover:underline ms-1">
              terms of use
            </span>
            .
          </p> */}

          <p className="text-center text-[0.8rem] mt-4 md:mt-3">
            Já possui uma conta ?{" "}
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
      )}

      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
          <InputField
            form={step2Form}
            label=""
            name="zipCode"
            placeholder="_ _ _ _ _ - _ _"
            required
          />

          <InputField
            form={step2Form}
            label="Número da residência"
            name="houseNumber"
            placeholder="_ _ _ _"
            required
          />

          <InputField
            form={step2Form}
            label="Senha"
            name="password"
            placeholder="Password"
            isPassword={true}
            required
          />

          <InputField
            form={step2Form}
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="Confirmar senha"
            isPassword={true}
            required
          />

          {/* Password Requirements */}
          {/* <div className="mb-2 space-y-1">
            {passwordRequirements.map((req, index) => (
              <p
                key={index}
                className={`text-xs flex items-center ${
                  req.met ? "text-green-400" : "text-red-400"
                }`}
              >
                <span className="mr-2">{req.met ? "✓" : "✗"}</span>
                {req.text}
              </p>
            ))}
          </div> */}

          {/* Privacy Notice */}
          <p className="text-xs mb-3 leading-relaxed text-white">
            When you register, we'll use your contact information to send you
            email and WhatsApp promotions, and to send you weekly consultation
            information for the Protected Plate plan. For more information, see
            our{" "}
            <span className="text-[#1AABFE] cursor-pointer hover:underline">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </span>
            .
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="w-full bg-white hover:bg-gray-100 text-blue-700 font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={isLoading || !termsAccepted}
              className={`w-full py-3 rounded-md transition shadow-lg font-medium ${
                termsAccepted && !isLoading
                  ? "bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Registering..." : "Cadastrar"}
            </button>
          </div>

          <p className="text-center text-[0.8rem]  mt-5 text-white flex justify-center">
            <input
              type="checkbox"
              className="mr-2 size-4"
              ref={acceptTermsRef}
              checked={termsAccepted}
              onChange={handleTermsAccepted}
            />
           <span className="cursor-pointer" onClick={handleTermsAccepted}>
  Seguindo, você concorda com nossos{" "}
</span>
<span
  className="text-[#1AABFE] cursor-pointer hover:underline ms-1"
  onClick={handleTermsClick}
>
  termos de uso
</span>

            .
          </p>

          <p className="text-center text-[0.8rem] mt-4 md:mt-3">
            Já possui uma conta ?{" "}
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
      )}
    </Modal>
  );
};

export default SignupModal;
