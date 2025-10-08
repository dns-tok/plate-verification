import React from 'react'
import TestimonialCard from './TestimonialCard'

const TestimonialSection = () => {
  return (
    <div className='mt-[5rem] mb-[3rem] px-[6rem] text-center bg-[#194D9A] py-[5rem]'>
        <h1 className='text-white text-[2rem] font-bold mb-[5rem]'>Our Testimonials</h1>
        <div className='flex gap-20 items-center justify-center'>
            <TestimonialCard/>
            <TestimonialCard/>
        </div>
    </div>
  )
}

export default TestimonialSection