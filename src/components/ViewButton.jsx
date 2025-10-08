import React from 'react'

const ViewButton = ({ bgColor = 'transparent', textColor = 'white', borderColor = '#1AABFE', text = 'View More', icon = '/Group.png', onClick }) => {
  return (
    <div>
        <button 
          className='border rounded-lg flex items-center gap-3 py-2 px-4'
          style={{
            backgroundColor: bgColor,
            color: textColor,
            borderColor: borderColor
          }}
          onClick={onClick}
        >
          <span className='text-lg font-semibold'>{text}</span> 
          <img className='' src={icon} alt="" width={20} height={20} />
        </button>
    </div>
  )
}

export default ViewButton