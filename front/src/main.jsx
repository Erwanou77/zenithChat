import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login/Login'
import Signup from './components/pages/Signup/Signup';
import Home from './components/pages/Home/Home';

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/Signup' element={<Signup />} />
      <Route path='/Home' element={<Home />} />
    </Routes>
  </BrowserRouter>
)
