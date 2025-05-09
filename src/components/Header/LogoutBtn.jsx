import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../features/authSlice'

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = ()=> {
        authservice.logout().then(()=> {
            dispatch(logout())
        })
        .catch(()=> {
            console.log("Please Login First!!")
        })
    }
  return (
    <button className='' onClick={logoutHandler}>
        LogOut
    </button>
  )
}

export default LogoutBtn