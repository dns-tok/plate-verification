import React, { useEffect, useState } from "react";
import InputField from "../../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import { changePassword } from "../../../services/authService";
import { toast } from "react-toastify";

// Change Password Schema
const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Senha atual is required"),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const { refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await changePassword({
        new_password: data.password,
        current_password: data.currentPassword,
      });
      // Refresh user data to reflect changes in context
      await refreshUserProfile();
      toast.success("Password updated successfully!");
      form.reset();
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error(
        error?.response?.data?.error ||
          "Failed to update password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "!bg-[#EDEDED] !p-2 !py-3 !rounded-md !text-black !text-sm";
  const labelClass = "!text-black !text-sm";
  const inputContainerClass =
    "!bg-[#EDEDED] !p-0 !rounded-md !text-black !text-sm";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex justify-between flex-col">
        <div className="w-full lg:w-[45%] ">
          <InputField
            form={form}
            label="Senha atual"
            name="currentPassword"
            required
            placeholder="Digite a senha atual"
            isPassword={true}
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />
        </div>

        <div className="w-full lg:w-[45%] ">
          <InputField
            form={form}
            label="Nova Senha"
            name="password"
            required
            placeholder="Confirmar a nova senha"
            isPassword={true}
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />
          <InputField
            form={form}
            label="Confirm Password"
            name="confirmPassword"
            required
            placeholder="Confirmar a nova senha"
            isPassword={true}
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`text-sm w-[140px] bg-[#194D9A] hover:bg-[#1AABFE] text-white font-medium px-4 py-3 rounded-md transition-all duration-300 hover:drop-shadow-lg  shadow-lg mb-6  ${
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Salvar"}
      </button>
    </form>
  );
};

export default ChangePassword;
