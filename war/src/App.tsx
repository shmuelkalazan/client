import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Nav from './components/Nav'
import Launch from './components/pages/Launch'
import Interception from './components/pages/Interception'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Nav/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/launch' element={<Launch/>}/>
        <Route path='/interception' element={<Interception/>}/>
        <Route path='/' element={<Navigate to={'/login'}/>}/>
      </Routes>

    </div>
  )
}

export default App
