import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Auth/Login'
import Registrtation from './pages/Auth/Registration'
import BasicTable from './pages/List/BasicTable'
import DependableDropdown from './pages/Dropdowns/DependableDropdown'
import FilterTable from './pages/List/FilterTable'
import SearchableDropdown from './pages/Dropdowns/SearchableDropdown'
import List from './pages/List/List'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      {/* <Registrtation /> */}
      <BasicTable />
      <List />
      {/* <DependableDropdown/> */}
      {/* <FilterTable /> */}
      {/* <SearchableDropdown/> */}
    </>
  )
}

export default App
