import React, { useEffect, useState } from "react";
import { MdLock } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

// Password Schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Must be at least 8 characters long" })
      .regex(/[0-9]/, { message: "Must have at least one number" })
      .regex(/[a-z]/, { message: "Must have at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Must have at least one capital letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Must have at least one special character",
      }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Invalid reset link. Please request a new password reset.");
      navigate("/forgot-password");
      return;
    }

    const validateToken = async () => {
      try {
        // Optionally call validate-token endpoint if needed
        // For now, consider presence of token as enough to show form; backend will enforce validity on submit
        setTokenValid(true);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [searchParams, navigate]);

  const handleSubmit = async (data) => {
    const token = searchParams.get("token");
    setIsSubmitting(true);
    try {
      await resetPassword({ token, newPassword: data.password });
      toast.success("Password reset successfully!");
      navigate("/login");
    } catch (error) {
      console.log("Password reset failed", error);
      toast.error("Invalid or expired reset link. Please request a new one.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AuthLayout title="Validating Reset Link">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Validating reset link...</p>
        </div>
      </AuthLayout>
    );
  }

  if (!tokenValid) {
    return (
      <AuthLayout title="Invalid Reset Link">
        <div className="text-center">
          <p className="text-white mb-4">Invalid or expired reset link.</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
          >
            Request New Reset Link
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="New Password"
          name="password"
          placeholder="Enter new password"
          icon={<MdLock />}
          isPassword={true}
        />

        <InputField
          form={form}
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm new password"
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
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-3">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
            Log In
          </span>
        </p>
      </form>
    </AuthLayout>
  );
}
