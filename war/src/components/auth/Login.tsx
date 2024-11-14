import React, { useEffect, useState } from 'react'
import { fetchLogin } from '../../redux/slices/userSlice'
import cors from "cors"
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

function Login() {
    const [username ,setUsername] = useState("")
    const [password ,setPassword] = useState("")
    const navigate = useNavigate()
    const dispach = useAppDispatch()
    const {user} = useAppSelector((state) => state.user)
  



  const hendleLogin = () =>{
    const login = () => {
        dispach(fetchLogin({username ,password}))
    }
    login()
    
  }

  return (
    <div className='login'>
        <div className='card'>
            <h1>login</h1>
        </div>
        <div className='card'>
            <p>username</p>
            <input type='text' placeholder='username'
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            />
        </div>
        <div className='card'>
            <p>password</p>
            <input type='password' placeholder='Password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
        </div>
        <div className='card'>
            <button 
            disabled={!username || !password}
            onClick={hendleLogin}>login</button>
        </div>
        <div className='card'></div>
        <div className={'navlink'}>
            <p>are you not register yet {<NavLink  to={"/register"}> Register </NavLink>} now</p>
        </div>
    </div>
  )
}

export default Login