import React from 'react'
import Hero from './compnents/hero/Hero'
import CreateProject from './compnents/createProject/CreateProject'
import Navbar from './compnents/navbar/Navbar'
import Projects from './compnents/projects/Projects'
import MyProjects from './compnents/myProjects/MyProjects'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <CreateProject/>
      <Projects/>
      <MyProjects/>
    </div>
  )
}

export default App