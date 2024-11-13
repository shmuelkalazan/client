import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import userSlice from '../redux/slices/userSlice'

function Nav() {
    const user = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut  = () => {
      localStorage.removeItem('token')
      dispatch(userSlice.actions.logout())
      navigate("/")
      //alert("Log out successfully")
    }
  return (
    <div>Nav

    </div>
  )
}

export default Nav