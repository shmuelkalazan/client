import React, { useEffect, useState } from 'react'
import { fetchLogin, fetchRegister } from '../../redux/slices/userSlice'
import cors from "cors"
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

function Register() {
    const [username ,setUsername] = useState("")
    const [password ,setPassword] = useState("")
    const [organization , setOrganization] = useState("")
    const [fullorganization , setFullOrganization] = useState("")
    const [location , setLocation] = useState("")
    const navigate = useNavigate()
    const dispach = useAppDispatch()
    const {user} = useAppSelector((state) => state.user)

    useEffect(() => {
      if (location){
        setFullOrganization(`${organization} - ${location}`)
      }
      if (organization != "IDF"){
        setFullOrganization(organization)
        setLocation("")
      }
    }, [location ,organization]);


    const hendleRegister = ()=>{
        const fechRegister = () =>{dispach(
            fetchRegister({username ,password ,organization:fullorganization 
            ,location}))
        }
        fechRegister()
        navigate('/login')
    }
  return (
    <div className='Register'>
        <h1 className='card'>register</h1>
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
            <p>orgnzation</p>
            <select 
            onChange={(e)=>{setOrganization(e.target.value)}}
            name="organization" id="">
                <option value="" disabled selected>Select your option</option>
                <option value="IDF">IDF</option>
                <option value="Hezbollah">Hezbollah</option>
                <option value="Hamas">Hamas</option>
                <option value="IRGC">IRGC</option>
                <option value="Houthis">Houthis</option>
            </select>
        </div>
        {organization == "IDF"  &&
        <div className='card'>
            <p>locatin</p>
            <select 
            onChange={(e)=>{setLocation(e.target.value)}}
            name="location">
                <option value="" disabled selected>Select your option</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="Center">Center</option>
                <option value="West Bank">West Bank</option>
            </select>
        </div> 
         }
        {organization != "IDF" &&<div className='card'></div> }
        <div>
            <button
            disabled={!username || !password || !organization}
            onClick={hendleRegister}
            >
                register</button>
        </div>
        <div className={'navlink'}>
            <p>are you olready register? {<NavLink  to={"/login"}> login </NavLink>} now</p>
        </div>

    </div>
  )
}

export default Register