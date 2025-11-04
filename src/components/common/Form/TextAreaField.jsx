import { Controller } from "react-hook-form";

const TextAreaField = ({
  label,
  required = false,
  name,
  defaultValue = "",
  disabled = false,
  form,
  className = "",
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  placeholder = "",
  rows = 4,
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
          className={`block text-white text-sm font-medium mb-2 ${labelClassName}`}
        >
          {label} {required && "*"}
        </label>
      )}

      <div
        className={`border-b-2 border-white/50 focus-within:border-white transition-colors`}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <textarea
              {...field}
              id={name}
              disabled={disabled}
              placeholder={placeholder}
              rows={rows}
              value={field.value || ""}
              onChange={(e) => field.onChange(e.target.value)}
              className={`w-full bg-transparent text-white placeholder-white/60 py-2 px-1 focus:outline-none transition-colors resize-none ${inputClassName}`}
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

export default TextAreaField;
