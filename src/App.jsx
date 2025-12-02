import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import MainDashboard from './components/MainDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CallerPage from './pages/CallerPage'
import AccessPoint from './pages/AcessPoint'
import SwitchPage from './pages/SwitchPage'
// import UsersPage from './pages/UsersPage'

function App() {
  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route path="" element={<MainDashboard />} />
           <Route path="/list-caller" element={<CallerPage />} />
           <Route path="/access-point" element={<AccessPoint />} />
            <Route path="/switch" element={<SwitchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
