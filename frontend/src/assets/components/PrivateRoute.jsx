import React from 'react'
import {useSelector} from "react-redux"
import {Outlet,Navigate} from "react-router-dom"

export default function PrivateRoute() {
    const {user}=useSelector(state=>state.user);
  return user.currentUser ? <Outlet/> :<Navigate to="/sign-in"/>
  
}

