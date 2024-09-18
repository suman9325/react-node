import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import DashBoard from './pages/DashBoard/DashBoard.jsx'
import Login from './components/Login/Login.jsx'
import Payment from './components/Payment/Payment.jsx'
import DashBoardHome from './components/DashBoardHome/DashBoardHome.jsx';
import BidderLogin from './components/Login/Bidder/BidderLogin.jsx';
import AdminLogin from './components/Login/Admin/AdminLogin.jsx';
import ClientLogin from './components/Login/Client/ClientLogin.jsx';
import Catalogue from './pages/Catalogue/Catalogue.jsx';
import CatalogueList from './components/Catalogue/CatalogueList.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Home />}>
        <Route path='' element={<Login />} />
        <Route path='Bidder' element={<BidderLogin />} />
        <Route path='Admin' element={<AdminLogin />} />
        <Route path='Client' element={<ClientLogin />} />
      </Route>
      <Route path='dashboard' element={<DashBoard />}>
        <Route path='' element={<DashBoardHome />}></Route>
        <Route path='payment' element={<Payment />}></Route>
      </Route>
      <Route path='Catalogue' element={<DashBoard />}>
        <Route path='' element={<Catalogue />}></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
