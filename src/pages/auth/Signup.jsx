import React, { useRef, useState } from "react";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdHome,
  MdLocationOn,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

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
    .email("Invalid email address"),
  telephone: z
    .string()
    .nonempty("Telephone is required")
    .min(10, "Telephone must be at least 10 characters"),
});

// Step 2 Schema
const step2Schema = z
  .object({
    zipCode: z
      .string()
      .min(5, { message: "ZIP code must be at least 5 characters" }),
    houseNumber: z.string().min(1, { message: "House number is required" }),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" })
      .regex(/[0-9]/, { message: "Must have at least one number" })
      .regex(/[a-z]/, { message: "Must have at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Must have at least one capital letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Must have at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const acceptTermsRef = useRef(null);
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");
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
    console.log("Step 1 data:", data);
    setStep(2);
  };

  const handleStep2Submit = async (data) => {
    console.log(data);
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
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("Registration failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  // const passwordValue = step2Form.watch("password");
  // const passwordRequirements = [
  //   {
  //     met: passwordValue?.length >= 8,
  //     text: "Must be at least 8 characters long",
  //   },
  //   {
  //     met: /[0-9]/.test(passwordValue || ""),
  //     text: "Must have at least one number",
  //   },
  //   {
  //     met: /[a-z]/.test(passwordValue || ""),
  //     text: "Must have at least one lowercase letter",
  //   },
  //   {
  //     met: /[A-Z]/.test(passwordValue || ""),
  //     text: "Must have at least one capital letter",
  //   },
  //   {
  //     met: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue || ""),
  //     text: "Must have at least one special character",
  //   },
  // ];

  return (
    <AuthLayout title="Register Account">
      {step === 1 && (
        <form onSubmit={step1Form.handleSubmit(handleStep1Submit)}>
          <InputField
            form={step1Form}
            label="ID"
            name="id"
            placeholder="_ _ _ _ _ - _ _"
          />

          <InputField
            form={step1Form}
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
          />

          <InputField
            form={step1Form}
            label="Date of Birth"
            name="dateOfBirth"
            placeholder="_ _ / _ _ / _ _ _ _"
            inputProps={{ type: "date" }}
          />

          <InputField
            form={step1Form}
            label="E-mail"
            name="email"
            placeholder="you@example.com"
          />

          <InputField
            form={step1Form}
            label="Telephone"
            name="telephone"
            placeholder="(_ _) _ _ _ _ _ - _ _ _ _"
          />

          {/* Privacy Notice */}
          <p className="text-xs mb-2 leading-relaxed text-white">
            To offer safer browsing experience tailored to your profile, we
            record some data in your account. This way, you can review your
            history and information whenever you want, in addition to receiving
            important notifications via email or SMS. Full details are available
            in our{" "}
            <span className="text-[#1AABFE] cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>

          {/* Next Button */}
          <button
            type="submit"
            className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition mt-2 shadow-lg cursor-pointer"
          >
            Follow
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
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
            >
              Log In
            </span>
          </p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
          <InputField
            form={step2Form}
            label="ZIP Code"
            name="zipCode"
            placeholder="_ _ _ _ _ - _ _"
          />

          <InputField
            form={step2Form}
            label="House Number"
            name="houseNumber"
            placeholder="_ _ _ _"
          />

          <InputField
            form={step2Form}
            label="Password"
            name="password"
            placeholder="Password"
            isPassword={true}
          />

          <InputField
            form={step2Form}
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            isPassword={true}
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
              Privacy Policy
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
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md transition shadow-lg font-medium ${
                termsAccepted && !isLoading
                  ? "bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Registering..." : "Register"}
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
              By following, you will accept our{" "}
            </span>
            <span className="text-[#1AABFE] cursor-pointer hover:underline ms-1">
              terms of use
            </span>
            .
          </p>

          <p className="text-center text-[0.8rem] mt-4 md:mt-3">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
            >
              Log In
            </span>
          </p>
        </form>
      )}

      {/* {step === 3 && (
        <div className="text-center">
          <div className="mb-5">
            <img
              src="/assets/auth_email.png"
              alt="Email confirmation"
              className="mx-auto"
            />
          </div>

          <p className="text-xs mb-6 leading-relaxed text-white">
            We have sent email to{" "}
            <span className="text-[#1AABFE] cursor-pointer hover:underline">
              jhondoe@gmail.com
            </span>{" "}
            to confirm the validity of our email address. After receiving the
            email follow the link provided to complete your registration
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition mt-2 shadow-lg cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      )} */}
    </AuthLayout>
  );
}
