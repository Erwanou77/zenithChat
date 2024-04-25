import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/pages/Login/Login'
import Signup from './components/pages/Signup/Signup';
import Home from './components/pages/Home/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
