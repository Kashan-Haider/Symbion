import React from 'react'

const SmallHeading = ({children}:{children:string}) => {
  return (
    <div className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-xl md:text-2xl lg:text-3xl font-bold text-center uppercase' >
        {children}
    </div>
  )
}

export default SmallHeading