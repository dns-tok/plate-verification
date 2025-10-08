import React from 'react'

const ContactSection = () => {
    return (
        <div className=' py-[5rem] flex justify-center' style={{
            backgroundImage: "linear-gradient(rgba(25, 77, 154, 0.7), rgba(25, 77, 154, 0.7)), url('/Rectangle 92.png')"
        }}>
            <div className='flex gap-10'>
            <div className='w-[25rem] h-[25rem] bg-white rounded-2xl flex items-end justify-center'>
                <img src="/Mask group (1).png" alt="" width={400} height={400} />
            </div>
            <div>
                <h1 className='text-white text-[2rem] font-bold'>Contact Us</h1>
                <form className='flex flex-col gap-2 text-white' action="">
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Name</label>
                            <input type="text" className='bg-white rounded-md py-2 px-4'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email</label>
                            <input type="email" className='bg-white  rounded-md py-2 px-4'/>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="name">Name</label>
                            <input type="text" className='bg-white rounded-md py-2 px-4'/>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="email">Email</label>
                            <input type="email" className='bg-white  rounded-md py-2 px-4'/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="message">Message</label>
                        <input type="text" className='bg-white rounded-md py-5 px-4'/>
                    </div>
                    <button type='submit' className='bg-white rounded-full w-[8rem] h-[2rem] text-[#1AABFE] my-5'>Submit</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default ContactSection