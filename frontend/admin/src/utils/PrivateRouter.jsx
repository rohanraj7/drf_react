import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {Outlet,Navigate} from 'react-router-dom'

const PrivateRouter =()=>{
    const {user} = useContext(AuthContext)
    return(
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRouter