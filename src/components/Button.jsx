import React from "react";

const Button = ({ text, bgColor, textColor, className }) => {
  return (
    <button className={`rounded-full px-8 py-2 cursor-pointer ${className}`}>
      {text}
    </button>
  );
};

export default Button;
