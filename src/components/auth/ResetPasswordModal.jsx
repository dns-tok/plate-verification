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
      toast.error("Invalid reset link. Please request a new password reset.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({ token: resetToken, newPassword: data.password });
      toast.success("Password reset successfully!");
      onClose();
    } catch (error) {
      console.log("Password reset failed", error);
      toast.error(
        error?.response?.data?.message ||
          "Invalid or expired reset link. Please request a new one."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Reset Password" onClose={onClose} isAuthModal={true}>
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
            onClick={() => {
              onClose();
              // Could navigate to login or trigger login modal
            }}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
            Log In
          </span>
        </p>
      </form>
    </Modal>
  );
};

export default ResetPasswordModal;
