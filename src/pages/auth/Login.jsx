import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { z } from "zod";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const navigate = useNavigate();
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
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          form={form}
          label="Email"
          name="email"
          placeholder="you@example.com"
          icon={<MdEmail />}
        />

        <InputField
          form={form}
          label="Password"
          name="password"
          placeholder="Password"
          icon={<MdLock />}
          isPassword={true}
          onForgotPassword={() => navigate("/forgot-password")}
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
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-[0.8rem] mt-4 md:mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#1AABFE] cursor-pointer hover:underline font-medium"
          >
            Sign Up
          </span>
        </p>
      </form>
    </AuthLayout>
  );
}
