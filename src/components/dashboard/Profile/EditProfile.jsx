import React, { useEffect, useState } from "react";
import InputField from "../../common/Form/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../../hooks/useAuth";
import { updateProfile } from "../../../services/authService";
import { toast } from "react-toastify";

// Edit Profile Schema
const editProfileSchema = z.object({
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
  zipCode: z
    .string()
    .nonempty("ZIP code is required")
    .min(5, "ZIP code must be at least 5 characters"),
  houseNumber: z
    .string()
    .nonempty("House number is required")
    .min(1, "House number is required"),
  telephone: z
    .string()
    .nonempty("Telephone is required")
    .min(10, "Telephone must be at least 10 characters"),
});

const EditProfile = () => {
  const { user, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      id: "",
      fullName: "",
      dateOfBirth: "",
      email: "",
      zipCode: "",
      houseNumber: "",
      telephone: "",
    },
  });

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      // Format birth_date to YYYY-MM-DD for date input
      const formattedDate = user.birth_date
        ? new Date(user.birth_date).toISOString().split("T")[0]
        : "";

      form.reset({
        id: user.cpf || "",
        fullName: user.full_name || "",
        dateOfBirth: formattedDate,
        email: user.email || "",
        zipCode: user.zip_code || "",
        houseNumber: user.house_number || "",
        telephone: user.phone || "",
      });
    }
  }, [user, form]);

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
      <div className="lg:space-y-4 flex justify-between flex-col lg:flex-row">
        <div className="w-full lg:w-[45%] ">
          <InputField
            form={form}
            label="ID"
            name="id"
            required
            placeholder="_ _ _ _ _ - _ _"
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
            disabled
          />

          <InputField
            form={form}
            label="Full Name"
            name="fullName"
            required
            placeholder="John Doe"
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />

          <InputField
            form={form}
            label="Date of Birth"
            name="dateOfBirth"
            required
            placeholder="_ _ / _ _ / _ _ _ _"
            inputProps={{ type: "date" }}
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />

          <InputField
            form={form}
            label="E-mail"
            name="email"
            required
            placeholder="you@example.com"
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />
        </div>
        <div className="w-full lg:w-[45%] ">
          <InputField
            form={form}
            label="ZIP Code"
            name="zipCode"
            required
            placeholder="_ _ _ _ _ - _ _"
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />

          <InputField
            form={form}
            label="House Number"
            name="houseNumber"
            required
            placeholder="_ _ _ _"
            inputClassName={inputClass}
            labelClassName={labelClass}
            inputContainerClassName={inputContainerClass}
          />

          <InputField
            form={form}
            label="Telephone"
            name="telephone"
            required
            placeholder="(_ _) _ _ _ _ _ - _ _ _ _"
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
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default EditProfile;
