import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

// Email Schema
const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
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
      // API suggests success even if email not registered; still show success
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

  if (emailSent) {
    return (
      <AuthLayout title="Check Your Email">
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
              onClick={() => navigate("/login")}
              className="w-full bg-[#1AABFE] hover:bg-[#1AABFE]/70 text-white font-medium py-3 rounded-md transition shadow-lg cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot Password">
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
          {isLoading ? "Sending..." : "Send Reset Link"}
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
