import React from "react";

/**
 * Reusable component for simple content sections with title and content box
 */
const SimpleContentSection = ({
  title,
  content,
  className = "",
  contentClassName = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <h3 className="text-xl text-[#194D9A] font-semibold">{title}</h3>
      )}
      <div
        className={`border-2 border-[#1AABFE]/80 rounded-full p-2 bg-white ${contentClassName}`}
      >
        {content}
      </div>
    </div>
  );
};

export default SimpleContentSection;
