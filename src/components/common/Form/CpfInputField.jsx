import { useState } from "react";
import { Controller } from "react-hook-form";
import { applyCpfMask, removeCpfMask } from "../../../utils/cpfUtils";

const CpfInputField = ({
  label,
  required,
  name,
  defaultValue = "",
  disabled = false,
  form,
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  className = "",
  placeholder = "000.000.000-00",
  inputContainerClassName = "",
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  const errorMessage = errors?.[name]?.message;

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <div className="flex items-start justify-between w-full">
          <label
            htmlFor={name}
            className={`mb-1.5 text-base text-white sm:text-sm sm:mb-1 ${labelClassName}`}
          >
            {label} {required && "*"}
          </label>
        </div>
      )}

      <div
        className={`relative flex items-center
          w-full rounded-md
          text-sm xl:text-base bg-white
          placeholder-[#565656] font-[400]
          transition-colors duration-200 ease-in-out
          disabled:opacity-50 disabled:cursor-not-allowed
          sm:text-sm px-3 py-3
          ${errorMessage ? "border-red-500 border" : ""}
          ${inputContainerClassName}
        `}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              disabled={disabled}
              id={name}
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => {
                const maskedValue = applyCpfMask(e.target.value);
                field.onChange(maskedValue);
              }}
              maxLength={14} // 000.000.000-00 = 14 caracteres
              className={`
                w-full
                text-sm xl:text-base bg-white outline-none text-[#343434] 
                placeholder-[#9F9F9F] !font-[600]
                transition-colors duration-200 ease-in-out
                focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                ${inputClassName}
              `}
            />
          )}
        />
      </div>

      {errorMessage && (
        <p
          className={`text-red-600 font-medium mt-1.5 w-full text-xs lg:text-xs xl:text-sm sm:mt-1 ${errorClassName}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CpfInputField;