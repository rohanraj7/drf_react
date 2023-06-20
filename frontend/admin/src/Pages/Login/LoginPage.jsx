import React, { useContext, useEffect } from 'react'
import Login from '../../components/Login'
import { AuthContext } from '../../context/AuthContext'
import {useNavigate} from 'react-router-dom'


function LoginPage(){
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()    

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }else{
            navigate('/')
        }
    },[])

    return(
        <>
            <Login/>
        </>
    )
}

export default LoginPage