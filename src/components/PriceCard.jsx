import React from 'react'
import Button from './Button'
import ViewButton from './ViewButton'

const PriceCard = ({ 
  id, 
  isSelected, 
  onClick, 
  planName = "Premium Plan", 
  price = "R$ 58,00", 
  description = "Single consultation", 
  features = ["Vehicle registration details"], 
  buttonText = "Choose Plan",
  viewButtonProps 
}) => {
  return (
    <div 
      className={`backdrop-blur-md rounded-2xl p-6 border w-[22rem] cursor-pointer transition-all duration-300 ${
        isSelected ? 'bg-[#1AABFE]/20 border-[#1AABFE] border-2' : 'bg-white/10 border-white/20'
      }`}
      onClick={onClick}
    >
        <p>{planName}</p>
        <h2 className='text-white text-[3rem] font-bold'>{price}</h2>
        <p className='text-white text-xl font-normal'>{description}</p>
        <div className='w-[100%] my-5'>
        <Button 
          text={buttonText}
          bgColor={isSelected ? '#1AABFE' : 'white'}
          textColor={isSelected ? 'white' : 'black'}
        />
        </div>
        <div className='my-5'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-center gap-2'>
                  <img src="/dashicons_yes.png" alt="" />
                  <p>{feature}</p>
              </div>
            ))}
        </div>
        {viewButtonProps && <ViewButton {...viewButtonProps} />}   
    </div>
  )
}

export default PriceCard