import React from 'react'
import Faq from './Faq'

const FaqSection = () => {
  return (
    <div className='py-[5rem] px-[6rem] text-center'>
        <h1 className='text-[#194D9A] text-[2rem] font-bold'>Frequently Asked Questions​</h1>
        <div className='my-[5rem] mx-[10rem] flex justify-between'>
            <img src="/Rectangle 16.png" alt="" width={500} height={500}/>
            <div>
                <Faq 
                    question="How do I purchase a report?" 
                    answer="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
                />
                <Faq 
                    question="What information is included in the report?" 
                    answer="The report includes vehicle registration details, accident history, ownership records, and complete vehicle history."
                />
                <Faq 
                    question="How long does it take to get my report?" 
                    answer="You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes."
                />              
                <Faq 
                    question="How long does it take to get my report?" 
                    answer="You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes."
                />              
                <Faq 
                    question="How long does it take to get my report?" 
                    answer="You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes."
                />              
                <Faq 
                    question="How long does it take to get my report?" 
                    answer="You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes."
                />              
                <Faq 
                    question="How long does it take to get my report?" 
                    answer="You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes."
                />              
                <Faq 
                    question="How long does it take to get my report?" 
                    answer="You will receive your report instantly after payment confirmation. The process usually takes less than 2 minutes."
                />              
            </div>
        </div>
    </div>
  )
}

export default FaqSection