import React, { useEffect, useState } from "react";
import InputField from "../../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import { updateProfile } from "../../../services/authService";
import { toast } from "react-toastify";

// Change Password Schema
const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty("Current password is required"),
  newPassword: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" })
    .regex(/[0-9]/, { message: "Must have at least one number" })
    .regex(/[a-z]/, { message: "Must have at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Must have at least one capital letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Must have at least one special character",
    }),
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
      // Map form data to API format
      const updateData = {
        cpf: data.id,
        full_name: data.fullName,
        birth_date: data.dateOfBirth,
        email: data.email,
        zip_code: data.zipCode,
        house_number: data.houseNumber,
        phone: data.telephone,
      };

      await updateProfile(updateData);
      // Refresh user data to reflect changes in context
      await refreshUserProfile();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
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
      <div className="space-y-4 flex justify-between">
        <div className="w-[45%]">
          <InputField
            form={form}
            label="Current Password"
            name="currentPassword"
            required
            placeholder="Enter current password"
            isPassword={true}
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />
        </div>

        <div className="w-[45%]">
          <InputField
            form={form}
            label="New Password"
            name="newPassword"
            required
            placeholder="Enter new password"
            isPassword={true}
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`text-sm w-[140px] bg-[#194D9A] hover:bg-[#1AABFE] text-white font-medium px-4 py-3 rounded-md transition  shadow-lg  ${
          isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default ChangePassword;
