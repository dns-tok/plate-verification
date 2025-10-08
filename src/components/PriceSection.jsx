import React from 'react'
import Button from './Button'
import PriceCard from './PriceCard'

const PriceSection = () => {
  return (
    <div
    className='bg bg-cover bg-center bg-no-repeat text-white py-[3rem] px-[6rem]'
      style={{ 
        backgroundImage: "url('/Rectangle 54.png')"
      }}
    >
        <div className='flex justify-between items-center mb-[6rem]'>
            <div>
                <h1 className='text-white text-[4.5rem] font-bold'>The Best Plan for You</h1>
                <p className='text-[1.5rem] font-normal'>Prices valid per unit​ If you have any questions, please contact us.</p>
            </div>
            <div className='flex gap-5'>
            <Button text="Single consultants "/>
            <Button text="Single consultants "/>
            </div>
        </div>
        <div className='flex justify-between items-center'>
        <PriceCard/>
        <PriceCard/>
        <PriceCard/>
        <PriceCard/>
        </div>
        <div className='flex gap-10 mt-[5rem] justify-center'>
            <div className='w-[2.5rem] h-[2.5rem] bg-[#D9D9D9] flex items-center justify-center rounded'><img src="/mingcute_down-fill.png" alt="" /></div>
            <div className='w-[2.5rem] h-[2.5rem] bg-[#D9D9D9] flex items-center justify-center rounded'><img src="/mingcute_down-fill (1).png" alt="" /></div>
        </div>
    </div>
  )
}

export default PriceSection