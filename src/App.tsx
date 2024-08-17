import React from 'react'
import Hero from './compnents/hero/Hero'
import CreateProject from './compnents/createProject/CreateProject'
import Navbar from './compnents/navbar/Navbar'
import Projects from './compnents/projects/Projects'
import MyProjects from './compnents/myProjects/MyProjects'
import Global from './compnents/global/Global'
import Banxa from './compnents/banxa/Banxa'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Banxa/>
      <CreateProject/>
      {/* <Projects/> */}
      {/* <Global/> */}
      {/* <MyProjects/> */}
    </div>
  )
}

export default App