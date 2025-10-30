import React, { useEffect } from "react";
import InputField from "./Form/InputField";
import { formatPlateDisplay, unmaskPlate } from "../../utils/plateFormat";

const SearchPlateForm = ({
  form,
  onSubmit,
  showCancelButton = false,
  onCancel,
  buttonText = "Release All Information",
  labelClassName = "",
  searchMode = false, // When true, only show license plate field
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
        label="License Plate"
        name="licensePlate"
        labelClassName={labelClass}
        inputClassName={inputClass}
        inputContainerClassName={containerClass}
        required
        disabled={!searchMode}
        inputProps={{ onChange: handleLicenseChange }}
      />
      {!searchMode && (
        <>
          <InputField
            form={form}
            label="Make & Model"
            name="makeAndModel"
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
        </>
      )}
      <div className="flex items-center mx-auto gap-4 ">
        {showCancelButton && !searchMode && (
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
