import React from 'react'

const Button = ({ text = 'Entrar' }) => {
  return (
    <div>
        <button 
          className={`bg-[#1AABFE] rounded-full px-7 py-3 cursor-pointer text-white font-bold`}
        >
          {text}
        </button>
    </div>
  )
}

export default Button