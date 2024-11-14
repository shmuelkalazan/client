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
      localStorage.removeItem('Authorization')
      dispatch(userSlice.actions.logout())
      navigate("/")
    }
  return (
    <div className="nav">
    {user.user && (
      <>
      {/* {console.log(user.user.organization)} */}
      {user.user.organization.toString().split(' ')[0] === 'IDF' &&
        <Navigate to={"/interception"}/>
      }
      {user.user.organization.toString().split(' ')[0]  != 'IDF' &&
          <Navigate to={"/launch"}/>
      }
        <button className='logout' onClick={() => {logOut()}}>Logout</button>
      </>
    ) }
    </div>
  )
}

export default Nav