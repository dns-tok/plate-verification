import React, { useState } from 'react'
import Button from './Button'
import PriceCard from './PriceCard'
import ViewButton from './ViewButton'
import MultiConsultant from './MultiConsultant'

const PriceSection = () => {
  const [selectedCard, setSelectedCard] = useState(2)
  const [showMultiConsultant, setShowMultiConsultant] = useState(false)

  return (
    <div
      className='bg bg-cover bg-center bg-no-repeat text-white py-[3rem] px-[6rem]'
      style={{
        backgroundImage: "url('/Rectangle 54.png')"
      }}
    >
      <div className='flex justify-center items-center mb-[6rem]'>
        <div>
          <h1 className='text-white text-[4.5rem] font-bold'>The Best Plan for You</h1>
          <p className='text-[1.5rem] font-normal'>Prices valid per unit​ If you have any questions, please contact us.</p>
        </div>
      </div>
      {!showMultiConsultant && (
        <div className='priceCards flex justify-between items-center relative'>
          <PriceCard
            id={1}
            isSelected={selectedCard === 1}
            onClick={() => setSelectedCard(1)}
            planName="Premium  Plan"
            price="R$ 58,00"
            description="Single consultation"
            features={[
              "Vehicle registration details",
              "License plate status ",
              "Vehicle restrictions ",
              "Vehicle debts ",
              "Traffic fines ",
              "IPVA (Motor Vehicle Property Tax) value ",
              "Licensing value ",
              "DPVAT (Mandatory Insurance) value ",
              "Owner information ",
              "Number of previous owners"
            ]}
            buttonText="Choose Plan"
            viewButtonProps={{
              bgColor: "transparent",
              textColor: "white",
              borderColor: "#1AABFE",
              text: "View More",
              icon: "/Group.png"
            }}
          />
          <PriceCard
            id={2}
            isSelected={selectedCard === 2}
            onClick={() => setSelectedCard(2)}
            planName="Ultra plan"
            price="R$ 44,90"
            description="Complete consultation"
            features={[
              "Vehicle registration details",
              "License plate status ",
              "Vehicle restrictions ",
              "Vehicle debts ",
              "Traffic fines ",
              "Owner information ",
              "Number of previous owners ",
              "Legal representative details ",
              "Vehicle theft records ",
              "Vehicle recovery status ",
              "Auction history "
            ]}
            buttonText="Choose Plan"
            viewButtonProps={{
              bgColor: "transparent",
              textColor: "white",
              borderColor: "#1AABFE",
              text: "View More",
              icon: "/Group.png"
            }}
          />
          <PriceCard
            id={3}
            isSelected={selectedCard === 3}
            onClick={() => setSelectedCard(3)}
            planName="Plus Plan"
            price="R$ 33,90"
            description="Multi consultation"
            features={[
              "Vehicle registration details",
              "License plate status ",
              "Vehicle restrictions ",
              "Vehicle debts ",
              "Traffic fines ",
              "Owner information ",
              "Number of previous owners ",
              "Legal representative details ",
              "Vehicle theft records ",
              "Vehicle recovery status ",
              "Auction history "
            ]}
            buttonText="Choose Plan"
            viewButtonProps={{
              bgColor: "transparent",
              textColor: "white",
              borderColor: "#1AABFE",
              text: "View More",
              icon: "/Group.png"
            }}
          />
          <PriceCard
            id={4}
            isSelected={selectedCard === 4}
            onClick={() => setSelectedCard(4)}
            planName="Light Plan"
            price="R$ 27,90"
            description="Unlimited consultation"
            features={[
              "Vehicle registration details ",
              "License plate status ",
              "Vehicle restrictions ",
              "Vehicle debts ",
              "Owner information ",
              "Number of previous owners ",
              "Legal representative details ",
              "Vehicle model and version ",
              "Manufacturing year ",
              "Fuel type ",
              "Chassis number verification "
            ]}
            buttonText="Choose Plan"
            viewButtonProps={{
              bgColor: "transparent",
              textColor: "white",
              borderColor: "#1AABFE",
              text: "View More",
              icon: "/Group.png"
            }}
          />
          <div className='text-center bg-white rounded-full p-2 w-[10rem] absolute -top-5 left-[34rem]'>
            <p className='text-red-500 font-bold'>User's Choice</p>
          </div>
        </div>
      )}

      {showMultiConsultant && (
        <div className='multiConsultant flex flex-col justify-between items-center gap-22'>
          <div className='flex justify-between items-center gap-22'>
            <MultiConsultant
              id={5}
              isSelected={selectedCard === 5}
              onClick={() => setSelectedCard(5)}
              planName="Always Present"
              planNumber="Plan 1200"
              priceDescription="Buy 1200 and pay R$900.00"
              discount="-25%"
              description="of economy"
              buttonText="Choose Plan"
            />
            <MultiConsultant
              id={6}
              isSelected={selectedCard === 6}
              onClick={() => setSelectedCard(6)}
              planName="Eye on security"
              planNumber="Plan 700"
              priceDescription="Buy 700 and pay R$500.00"
              discount="-21%"
              description="of economy"
              buttonText="Choose Plan"
            />
            <MultiConsultant
              id={7}
              isSelected={selectedCard === 7}
              onClick={() => setSelectedCard(7)}
              planName="Professional"
              planNumber="Plan 500"
              priceDescription="Buy 500 and pay R$410.00"
              discount="-18%"
              description="of economy"
              buttonText="Choose Plan"
            />
            <MultiConsultant
              id={8}
              isSelected={selectedCard === 8}
              onClick={() => setSelectedCard(8)}
              planName="Negotiator"
              planNumber="Plan 300"
              priceDescription="Buy 300 and pay R$250.00"
              discount="-17%"
              description="of economy"
              buttonText="Choose Plan"
            />
          </div>

          <div className='flex justify-between items-center gap-22 backdrop-blur-md bg-[#1AABFE]/20 border border-[#1AABFE]/30 w-[50%] py-5 px-20 rounded-xl'>
            <div className=' my-5'>
              <p className='text-white text-xl font-medium'>Test Drive</p>
              <h2 className='text-white text-[3rem] font-bold'>Plan 150</h2>
              <p className='text-white text-lg font-normal'>Buy 150 and pay R$140.00</p>
              <div className='flex items-center gap-5'>
              <h2 className='text-white text-[3rem] font-bold'>-7%</h2>
              <p className='text-white text-xl font-normal'>of economy</p>
              </div>
    
            </div>
            <div>
              <button className='bg-white text-black rounded-full cursor-pointer font-bold py-4 px-24'>Choose plan</button>
            </div>
          </div>
        </div>
      )}

      <div className='flex gap-10 mt-[5rem] justify-center'>
        <ViewButton
          bgColor={!showMultiConsultant ? "#1AABFE" : "#1AABFE"}
          textColor={!showMultiConsultant ? "white" : "white"}
          borderColor="#1AABFE"
          text="Single Consultation"
          icon="/white-arrow.png"
          onClick={() => setShowMultiConsultant(false)}
        />
        <ViewButton
          bgColor={showMultiConsultant ? "#1AABFE" : "#1AABFE"}
          textColor={showMultiConsultant ? "white" : "white"}
          borderColor="#1AABFE"
          text="Multi Consultation"
          icon="/white-arrow.png"
          onClick={() => setShowMultiConsultant(true)}
        />
      </div>
    </div>
  )
}

export default PriceSection