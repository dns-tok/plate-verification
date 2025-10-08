import React from 'react'
import Button from './Button'
import ViewButton from './ViewButton'

const PriceCard = () => {
  return (
    <div className='backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 w-[22rem]'>
        <p>Premium Plan</p>
        <h2 className='text-white text-[3rem] font-bold'>R$ 58,00</h2>
        <p className='text-white text-xl font-normal'>Single consultation​</p>
        <div className='w-[100%] my-5'>
        <Button text="Choose Plan"/>
        </div>
        <div className='my-5'>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
            <div className='flex items-center gap-2'>
                <img src="/dashicons_yes.png" alt="" />
                <p>Vehicle registration details </p>
            </div>
        </div>
        <ViewButton/>   
    </div>
  )
}

export default PriceCard