import React from 'react'

const button = ({ title, ...rest }) => {
  return (
    <button {...rest} className='bg-[#ab7a5f] text-white px-4 py-2 rounded-md shadow-md'>
            {title}
    </button>
  )
}

export default button