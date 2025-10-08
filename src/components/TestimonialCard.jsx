import React from 'react'

const TestimonialCard = () => {
  return (
    <div className='bg-white rounded-2xl p-5 w-[30rem] h-[15rem] flex justify-between items-center relative'>
        <div>
            <img src="/Ellipse 1.png" alt="" width={100} height={100}/>
        </div>
        <div className='text-left w-[18rem] relative'>
            <h2>John Doe</h2>
            <img className='my-2' src="/Frame 10.png" alt="" />
            <p>Ever since I discovered this service, I never buy a car without checking it first. For something of such high  value, it's not worth taking risks</p>
            <img src="/Mask group (2).png" alt="" width={10} height={10} className='absolute top-15 -left-3'/>
        </div>
        <img src="/Mask group (3).png" alt=""  className='absolute top-8 right-6' width={40} height={40}/>
    </div>
  )
}

export default TestimonialCard