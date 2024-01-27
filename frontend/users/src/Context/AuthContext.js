import axios from '../Axios'
import jwt_decode from "jwt-decode"
import { createContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";




const AuthContext = createContext()

export  default AuthContext

export const AuthProvider =({children})=>{
    const [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')):null)
    const [user,setUser] = useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')):null)

    const[errors,setError] = useState({})
    const navigate = useNavigate()

    let loginUser = (e)=>{
        console.log("heyygbhbjh")
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value
        // validating the username and password 
        const err = validate(username,password)
        console.log(username,"name")
        console.log(password,"pass")
        if(err === true){
            console.log("Succesfully validated")
            axios.post('token/',JSON.stringify({'username':username,'password':password}),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then((response)=>{
            console.log("vannuu evidahh");
                if(response.status === 200){
                    setAuthTokens(response.data)
                    setUser(jwt_decode(response.data.access))
                    localStorage.setItem('authToken',JSON.stringify(response.data))
                    navigate('/')
                }
                else{
                    alert("Something went wrongkkll")
                }
            }).catch((error)=>{
                if(error.response.status === 401){
                    setError({password:"Invalid Username or Password"})
                }
            })
        }
        else{
            console.log("Something Went Wrong")
            setError(err)
        }
    }

    let logoutUser =()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authToken')
    }
    

    let contextData = {
        user: user,
        logoutUser : logoutUser,
        loginUser: loginUser,
        errors: errors
    }


    const validate=(username,password)=>{
        const error = {}
        let flag = false 
        if(username === ""){
            flag = true
            error.username = "username can't be Empty"
            return error
        }
        if(password === ""){
            flag = true
            error.password = "Password can't be Empty"
        }
        if(flag === true){
            return error
        }
        else{
            return true
        }
    }

    return(
        <AuthContext.Provider value={contextData}>
                {children}
        </AuthContext.Provider>
    )

}