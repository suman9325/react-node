import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Auth/Login'
import Registrtation from './pages/Auth/Registration'
import BasicTable from './pages/List/BasicTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      {/* <Registrtation /> */}
      <BasicTable/>
    </>
  )
}

export default App
