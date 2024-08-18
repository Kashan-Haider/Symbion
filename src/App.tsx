import React from 'react'
import Hero from './compnents/hero/Hero'
import CreateProject from './compnents/createProject/CreateProject'
import Navbar from './compnents/navbar/Navbar'
import Projects from './compnents/projects/Projects'
import Banxa from './compnents/banxa/Banxa'
import AllMerchants from './compnents/allMerchants/AllMerchants'

const App = () => {
  return (
    <div className='text-white'>
      <Navbar/>
      <Hero/>
      <Banxa/>
      <CreateProject/>
      <Projects/>
      <AllMerchants/>
    </div>
  )
}

export default App