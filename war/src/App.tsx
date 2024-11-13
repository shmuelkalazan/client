import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Launch from './components/pages/launch'
import Nav from './components/Nav'
import Interception from './components/pages/interception'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>app
    <Nav/>
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='launch' element={<Launch/>}/>
        <Route path='interception' element={<Interception/>}/>
        <Route path='/' element={<Navigate to={'/register'}/>}/>
      </Routes>

    </div>
  )
}

export default App
