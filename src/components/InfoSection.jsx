import React from 'react'
import InfoSectionCard from './InfoSectionCard'
import ViewButton from './ViewButton'

const InfoSection = () => {
    return (
        <div className='text-black px-[6rem] py-[3rem] flex flex-col justify-center items-center'>
            <div className='flex justify-between items-center'>
                <div className='w-[43%]'>
                    <h1 className='text-[#194D9A] text-[2rem] font-bold tracking-tight'>The best for you​</h1>
                    <h2 className='text-black text-[2rem] font-semibold'>Complete Vehicle X-ray</h2>
                    <p className='text-black text-[1rem] font-normal  pt-[1rem]'>
                        Buying a vehicle and don't want to discover hidden issues later? Verified Plate guarantees peace of mind
                        when you purchase the complete vehicle inspection for your dream vehicle. It provides peace of mind
                        against fraud and losses by automatically validating information about the vehicle's history, risks, and
                        status.
                    </p>
                </div>
                <div className='font-bold text-[1.1rem]'>
                28 pieces of information about your dream​
                </div>
            </div>
            <div className='my-[3rem] flex justify-between items-center flex-wrap gap-5'>
                <InfoSectionCard/>
                <InfoSectionCard/>
                <InfoSectionCard/>
                <InfoSectionCard/>
                <InfoSectionCard/>
                <InfoSectionCard/>
                <InfoSectionCard/>
                <InfoSectionCard/>  
                <InfoSectionCard/>  
                <InfoSectionCard/>  
                <InfoSectionCard/>
                <InfoSectionCard/>
            </div>
            <ViewButton/>
        </div>
    )
}

export default InfoSection