import React from 'react'
import Heading from '../../ui/Heading'
import SlidingBgButton from '../../ui/SlidingBgButton'

const FundraiserLogin = () => {
  return (
    <div className='h-screen text-white flex items-center justify-center p-10 md:p-14'>
        <div className='bg-[#fff2] w-[40%] h-full rounded-xl shadow-black shadow-xl'>
            <Heading>
                Login
            </Heading>
            <div className='p-5 flex flex-col gap-3' >
                <input className='px-3 py-2 w-full bg-transparent outline-none border-b-[1px] border-white placeholder:text-white' placeholder='Enter Your Wallet Address' type="text" />
            <SlidingBgButton title='Login'/>

               
            </div>

            <div className='p-5 flex flex-col gap-3' >
            <p>Not registered as a Fundraiser at Symbion?</p>
            <SlidingBgButton title='Register Now'/> 
            </div>
            
        </div>
    </div>
  )
}

export default FundraiserLogin