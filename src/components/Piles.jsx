import React from 'react'

function Piles({children}) {
  return (
    <div className='rounded-full w-fit text-center px-3 py-1 my-5 text-text-blue font-medium bg-[#edf4fd] border cursor-pointer'>
      {children}
    </div>
  )
}

export default Piles
{}