import React from "react";
import InputField from "./Form/InputField";
import { formatPlateDisplay } from "../../utils/plateFormat";

const SearchPlateForm = ({
  form,
  onSubmit,
  showCancelButton = false,
  onCancel,
  buttonText = "Liberar todas as informações",
  labelClassName = "",
  isSearching = false,
}) => {
  const labelClass = `text-[0.9rem] md:text-[0.8rem] font-semibold text-[0.9rem] md:text-[0.8rem] uppercase ${labelClassName}`;
  const inputClass =
    "!bg-white !py-2 !px-2 !rounded-md !text-black !text-[1rem] md:!text-[1rem] !shadow-md";
  const containerClass = "!bg-white !p-0 !rounded-md";

  const handleLicenseChange = (e) => {
    const masked = formatPlateDisplay(e.target.value);
    form.setValue("licensePlate", masked, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // const handleInternalSubmit = (data) => {
  //   const payload = { ...data, licensePlate: unmaskPlate(data.licensePlate) };
  //   return onSubmit(payload);
  // };

  // Ensure the plate is always shown masked, even when form resets programmatically
  // useEffect(() => {
  //   const subscription = form.watch((values, { name }) => {
  //     if (name === "licensePlate") {
  //       const current = values?.licensePlate ?? "";
  //       const masked = formatPlateDisplay(current);
  //       if (current !== masked) {
  //         form.setValue("licensePlate", masked, {
  //           shouldValidate: false,
  //           shouldDirty: false,
  //         });
  //       }
  //     }
  //   });
  //   return () => subscription.unsubscribe?.();
  // }, [form]);

  return (
    <form className="flex flex-col " onSubmit={form.handleSubmit(onSubmit)}>
      <InputField
        form={form}
        label="Placa do veículo"
        name="licensePlate"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        disabled
        inputProps={{ onChange: handleLicenseChange }}
      />
      <InputField
        form={form}
        label="Marca e Modelo"
        name="makeAndModel"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        disabled
      />
      <InputField
        form={form}
        label="Chassis"
        name="chassis"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        disabled
      />
      <div className="W-full">
        <div className="bg-white rounded-md w-[100px] h-[100px] aspect-square mx-auto">
          <img
            loading="lazy"
            onError={(e) => {
              e.target.src = "/logo.svg";
            }}
            src={form.watch("logo") || "/logo.svg"}
            alt=""
            className="w-full h-full "
          />
        </div>
      </div>
      <div className="flex items-center mx-auto gap-4 ">
        {showCancelButton && (
          <button
            type="button"
            className="bg-transparent border border-white rounded-full font-bold px-6 py-2 text-[1rem] md:text-[0.9rem] mt-4 text-white whitespace-nowrap mb-2 cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className={`bg-white rounded-full font-bold px-6 py-2 text-[1rem] md:text-[0.9rem] mt-4 text-[#1AABFE] hover:bg-[#1AABFE] hover:text-white transition-all duration-300 whitespace-nowrap mb-2 ${
            isSearching ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isSearching}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default SearchPlateForm;
