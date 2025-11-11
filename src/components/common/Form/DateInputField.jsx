import { Controller } from "react-hook-form";

const DateInputField = ({
  label = "Data de Nascimento",
  name,
  form,
  required = false,
  defaultValue = "",
  disabled = false,
  className = "",
  inputClassName = "",
  errorClassName = "",
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  const errorMessage = errors?.[name]?.message;

  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 text-base text-white sm:text-sm sm:mb-1"
        >
          {label} {required && "*"}
        </label>
      )}

      <div
        className={`relative flex items-center w-full rounded-md text-sm xl:text-base bg-white
          placeholder-[#565656] font-[400]
          transition-colors duration-200 ease-in-out
          disabled:opacity-50 disabled:cursor-not-allowed
          sm:text-sm px-3 py-3
                ${errorMessage ? "border-red-600 border" : ""}
          
          
          `}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              id={name}
              type="date"
              disabled={disabled}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              className={`w-full text-sm xl:text-base bg-white outline-none text-[#343434] 
                placeholder-[#9F9F9F] font-[600] focus:outline-none 
                disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
            />
          )}
        />
      </div>

      {errorMessage && (
        <p
          className={`text-red-600 font-medium mt-1.5 w-full text-xs xl:text-sm ${errorClassName}`}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DateInputField;
