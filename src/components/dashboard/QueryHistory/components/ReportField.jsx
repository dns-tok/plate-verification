import React from "react";

/**
 * Reusable component for rendering a single field
 */
const ReportField = ({ label, value, hasWarning = false }) => {
  return (
    <div className="flex gap-1">
      <div className="flex items-start gap-1 text-[#194D9A] ">
        {hasWarning && (
          <span className="text-yellow-500 text-lg  leading-none">▲</span>
        )}
        <span className="text-[0.875rem] font-semibold">{label}:</span>
      </div>
      <span className={`text-[0.95rem] text-[#194D9A]`}>
        {value || "Nada Consta"}
      </span>
    </div>
  );
};

export default ReportField;
