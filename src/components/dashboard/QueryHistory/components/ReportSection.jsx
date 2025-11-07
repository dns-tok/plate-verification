import React from "react";

/**
 * Reusable wrapper component for report sections
 * Handles section title and spacing
 */
const ReportSection = ({
  title,
  children,
  className = "",
  breakSection = false,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <h3 className="text-xl text-[#194D9A]  font-semibold">{title}</h3>
      )}
      {breakSection ? (
        <div className="page-break-after">{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

export default ReportSection;
