import React from 'react'
import Button from './Button'
import ViewButton from './ViewButton'

const MultiConsultant = ({  id, 
    isSelected, 
    onClick, 
    planName = "Plan", 
    planNumber = "", 
    priceDescription = "Price", 
    discount = "", 
    description = "Consultation", 
    features = [], 
    buttonText = "Choose Plan",
    viewButtonProps }) => {
  return (
    <div 
    className={`backdrop-blur-md rounded-2xl p-6 border w-[22rem] cursor-pointer transition-all duration-300 ${
      isSelected ? 'bg-[#1AABFE]/20 border-[#1AABFE] border-2' : 'bg-white/10 border-white/20'
    }`}
    onClick={onClick}
  >
      <p className='text-white text-xl font-medium'>{planName}</p>
      {planNumber && <h2 className='text-white text-[3rem] font-bold'>{planNumber}</h2>}
      <p className='text-white text-lg font-normal'>{priceDescription}</p>
      {discount && <h2 className='text-white text-[3rem] font-bold'>{discount}</h2>}
      <p className='text-white text-xl font-normal'>{description}</p>
      <div className='w-[100%] my-5'>
      <Button 
        text={buttonText}
        bgColor={isSelected ? '#1AABFE' : 'white'}
        textColor={isSelected ? 'white' : 'black'}
      />
      </div>
      {features && features.length > 0 && (
        <div className='my-5'>
          {features.map((feature, index) => (
            <div key={index} className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>{feature}</p>
            </div>
          ))}
        </div>
      )}
      {viewButtonProps && <ViewButton {...viewButtonProps} />}   
  </div>
  )
}

export default MultiConsultant