import React from 'react'

const Button = ({ text, bgColor, textColor }) => {
  return (
    <div>
        <button 
          className={`rounded-full px-7 py-3 cursor-pointer font-bold`}
          style={{
            backgroundColor: bgColor,
            color: textColor
          }}
        >
          {text}
        </button>
    </div>
  )
}

export default Button