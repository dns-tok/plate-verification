import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./Form/InputField";

// Validation schema
const searchPlateSchema = z.object({
  makeAndModel: z.string().min(1, "Make & Model is required"),
  licensePlate: z.string().min(1, "License Plate is required"),
  chassis: z.string().min(1, "Chassis is required"),
  color: z.string().min(1, "Color is required"),
  yearOfManufacture: z.string().min(1, "Year Of Manufacture is required"),
});

const SearchPlateForm = ({
  onSubmit,
  defaultValues = {
    makeAndModel: "",
    licensePlate: "",
    chassis: "",
    color: "",
    yearOfManufacture: "",
  },
  showCancelButton = false,
  onCancel,
  buttonText = "Release All Information",
  labelClassName = "",
}) => {
  const form = useForm({
    resolver: zodResolver(searchPlateSchema),
    defaultValues,
  });

  const labelClass = `text-[0.9rem] md:text-[0.8rem] font-semibold text-[0.9rem] md:text-[0.8rem] uppercase ${labelClassName}`;
  const inputClass =
    "!bg-white !py-2 !px-2 !rounded-md !text-black !text-[1rem] md:!text-[1rem] !shadow-md";
  const containerClass = "!bg-white !p-0 !rounded-md";

  return (
    <form
      className="flex flex-col "
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <InputField
        form={form}
        label="Make & Modal"
        name="makeAndModel"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        required
      />

      <InputField
        form={form}
        label="License Plate"
        name="licensePlate"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        required
      />

      <InputField
        form={form}
        label="Chassis"
        name="chassis"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        required
      />

      <InputField
        form={form}
        label="Color"
        name="color"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        required
      />

      <InputField
        form={form}
        label="Year Of Manufacture / Model"
        name="yearOfManufacture"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        required
      />
      <div className="flex items-center mx-auto gap-4 ">
        {showCancelButton && (
          <button
            type="button"
            className="bg-transparent border border-white rounded-full font-bold px-6 py-2 text-[1rem] md:text-[0.9rem] mt-4 text-white whitespace-nowrap mb-2 cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-white rounded-full font-bold px-6 py-2 text-[1rem] md:text-[0.9rem] mt-4 text-[#1AABFE] hover:bg-[#1AABFE] hover:text-white transition-all duration-300 whitespace-nowrap mb-2 cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default SearchPlateForm;
