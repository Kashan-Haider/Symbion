import React from 'react'

const SlidingBgButton = ({children}:{children:string}) => {
  return (
    <button className='px-5 py-2 rounded-xl bg-slate-200 text-gray-800 group hover:text-slate-100 transition-all duration-300 relative' >
        <div className='h-full rounded-xl absolute w-0 group-hover:w-full duration-300 transition-all bg-[#F76E13] top-0 left-0 '></div>
        <div className='relative z-10'>{children}</div>
    </button>
  )
}

export default SlidingBgButton