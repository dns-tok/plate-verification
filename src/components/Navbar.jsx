import React from 'react'
import Button from './Button'

const Navbar = () => {
  return (
    <div className='bg-black w-screen h-auto flex justify-between items-center'>
        <div className='relative'>
            <img className='w-[20rem] h-[5rem]' src="/public/Rectangle 99.png" alt=""/>
            <img className='absolute top-0 left-12 w-[7rem] h-[7rem]' src="/PlacaVerificada-removebg-preview 1.png" alt="" />
        </div>
        <div className='flex text-white gap-[3rem]'>
            <p>Plano</p>
            <p>Advantages</p>
            <p>How it works</p>
            <p>Contact</p>
            <p>Questions</p>
            <p>About Us</p>
        </div>
        <div className='mr-[5rem]'>
        <Button/>
        </div>
    </div>
  )
}

export default Navbar