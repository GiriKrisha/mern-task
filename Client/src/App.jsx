import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import PasswordReset from './pages/PasswordReset';
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/passwordreset" element={<PasswordReset/>}/>

    </Routes>
  )
}

export default App