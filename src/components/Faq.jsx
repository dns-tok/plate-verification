import React, { useState } from 'react'

const Faq = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleFaq = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='mb-4'>
            <div 
                className={`bg-[#194D9A] w-[40rem] h-[3rem] flex justify-between items-center px-4 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'} relative cursor-pointer`}
                onClick={toggleFaq}
            >
                <h1 className='text-white'>{question || 'How do I purchase a report?'}</h1>
                <img 
                    className={`absolute right-3 ${isOpen ? 'hidden' : 'block'}`} 
                    src="/dashicons_yes.png" 
                    alt="Open" 
                    width={20} 
                    height={20} 
                />
                <img 
                    className={`absolute right-3 ${isOpen ? 'block' : 'hidden'}`} 
                    src="/cross.png" 
                    alt="Close" 
                    width={10} 
                    height={10} 
                />
            </div>
            <div className={`bg-white w-[40rem] rounded-b-xl p-4 border border-[#194D9A] border-t-0 text-left ${isOpen ? 'block' : 'hidden'}`}>
                {answer || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It`}
            </div>
        </div>
    )
}

export default Faq