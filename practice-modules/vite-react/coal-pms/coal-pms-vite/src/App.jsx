import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Auth/Login'
import Registrtation from './pages/Auth/Registration'
import BasicTable from './pages/List/BasicTable'
import DependableDropdown from './pages/Dropdowns/DependableDropdown'
import DependableUsingPkg from './pages/Dropdowns/DependableUsingPkg'
import FilterTable from './pages/List/FilterTable'
import SearchableDropdown from './pages/Dropdowns/SearchableDropdown'
import List from './pages/List/List'
import TableCheckbox from './pages/List/TableCheckbox'
import SingleFileUpload from './pages/FileUpload/SingleFileUpload'
import NewUser from './pages/User/NewUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Login /> */}
      {/* <Registrtation /> */}
      {/* <BasicTable /> */}
      {/* <List /> */}
      {/* <DependableDropdown/> */}
      {/* <FilterTable /> */}
      {/* <SearchableDropdown/> */}
      {/* <TableCheckbox/> */}
      {/* <SingleFileUpload/> */}
      {/* <NewUser/> */}
      <DependableUsingPkg/>
    </>
  )
}

export default App
