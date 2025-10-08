import React from 'react'
import Button from './Button'

const HeroSection = () => {
  return (
    <div
      className='bg bg-cover bg-center bg-no-repeat overflow-hidden relative'
      style={{
        backgroundImage: "linear-gradient(to top, rgba(25, 77, 154, 1), rgba(0, 0, 0, 0.7)), url('/PlacaVerificada-removebg-preview 2.png')"
      }}
    >
      <div className='flex flex-col  w-[50%] pb-[5rem] pt-[10rem] ml-[10rem] overflow-x-hidden'>
        <h1 className='text-white text-[4.5rem] font-bold pb-[3rem]'>
          Before purchasing,​consult.
          Protect your dream
        </h1>
        <div className='flex items-center justify-between bg-white rounded-full py-2 px-4 w-[70%]'>
          <textarea name="" placeholder='Type here is the vehicle license....' id="" className="resize-none border-none outline-none w-[70%] h-auto"></textarea>
          <Button
            text="Consult Now"
          />
        </div>
        <p className='text-white text-[1.5rem] font-semibold w-[65%] pt-[1rem]'>
          Consult everything you need , ultimately want buy a car
          and not one story to tell , report complete
        </p>
      </div>
      <div className='absolute top-6 -right-22 overflow-x-hidden'>
        <img src="/f1f7ce1808d508da6aff4f4eebe244d81220b1f2.png" alt="" width={1200} height={1200} />
      </div>
    </div>
  )
}

export default HeroSection