import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Dashboard from './components/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'



function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path= "/" element={<Login />} />
          <Route path= "/register" element={<Register />} />
          <Route path= "/dashboard" element={<Dashboard />} />
        </Routes>
          
      </div>
    </>
  )
}

export default App
