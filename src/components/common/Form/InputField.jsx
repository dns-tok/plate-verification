import { useState } from "react";
import { Controller } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = ({
  label,
  required,
  name,
  defaultValue = "",
  disabled = false,
  form,
  inputProps = {},
  isPassword = false,
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  alignVertical = false,
  className = "",
  placeholder = "",
  icon = null,
  onForgotPassword = null,
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = errors?.[name]?.message;

  return (
    <div
      className={`flex flex-col mb-4 ${
        alignVertical ? "flex-col" : ""
      } ${className}`}
    >
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

      {/* <div className="relative flex items-center "> */}
      <div
        className={`relative flex items-center
  w-full  rounded-md
  text-sm xl:text-base bg-white
  placeholder-[#9F9F9F] font-[400]
  transition-colors duration-200 ease-in-out
disabled:opacity-50 disabled:cursor-not-allowed
  sm:text-sm px-3 py-3 `}
      >
        {icon && <div className="text-[#9F9F9F] mr-2">{icon}</div>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={isPassword && !showPassword ? "password" : "text"}
              disabled={disabled}
              id={name}
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className={`
                w-full
                text-sm xl:text-base bg-white outline-none text-[#535353] 
                placeholder-[#9F9F9F] font-[400]
                transition-colors duration-200 ease-in-out
                 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                sm:text-sm
                ${isPassword ? "pr-10 sm:pr-8" : ""}
                ${inputClassName}
              `}
              {...inputProps}
            />
          )}
        />

        {/* Toggle password visibility */}
        {isPassword && (
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
          </span>
        )}
      </div>

      {errorMessage && (
        <p
          className={`text-red-600 font-medium mt-1.5 w-full  text-xs lg:text-xs xl:text-sm sm:mt-1 ${errorClassName}`}
        >
          {errorMessage}
        </p>
      )}
      {onForgotPassword && (
        <p
          onClick={onForgotPassword}
          className="text-right text-[0.8rem] text-[#1AABFE] cursor-pointer hover:underline font-medium mt-1.5 w-fit ms-auto"
        >
          Forgot Password?
        </p>
      )}
    </div>
  );
};

export default InputField;
