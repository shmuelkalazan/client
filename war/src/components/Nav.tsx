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
    <div className="nav">
    {user.user ? (
      <>
      {/* {console.log(user.user)} */}
        <NavLink to={"/votes"}>Votes</NavLink>
        {/* {user.user.isAdmin && (
          <NavLink to={"/statistics"}>Statistics</NavLink>
        )} */}
        <button onClick={() => {logOut()}}>Logout</button>
      </>
    ) : (
      <>
      {/* {console.log(user.user)} */}
        <NavLink to={"/login"}>Login</NavLink>
        <NavLink to={"/register"}>Register</NavLink>
      </>
    )}
    </div>
  )
}

export default Nav