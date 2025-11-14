import React from "react";
import ReportField from "./ReportField";

/**
 * Reusable component for displaying fields in a two-column layout
 */
const TwoColumnFieldSection = ({ fields, className = "" }) => {
  return (
    <div
      className={`border-2 border-[#1AABFE]/80 rounded-xl p-4 bg-white ${className}`}
    >
      <div className="grid grid-cols-2 gap-4 ">
        <div className="space-y-3">
          {fields.left?.map((field, index) => (
            <ReportField
              key={index}
              label={field.label}
              value={field.value}
              hasWarning={field.hasWarning}
            />
          ))}
        </div>
        <div className="space-y-3">
          {fields.right?.map((field, index) => (
            <ReportField
              key={index}
              label={field.label}
              value={field.value}
              hasWarning={field.hasWarning}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnFieldSection;
