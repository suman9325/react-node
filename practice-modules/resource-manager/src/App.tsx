import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import AddUpdateProject from './pages/AddUpdateProject'
import ProjectListing from './pages/ProjectListing'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssignDevs from './pages/AssignDevs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Home/>
      <AddUpdateProject />
      <ProjectListing/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-project" element={<AddUpdateProject />} />
          <Route path="/projects" element={<ProjectListing />} />
          <Route path="/assign-devs" element={<AssignDevs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
