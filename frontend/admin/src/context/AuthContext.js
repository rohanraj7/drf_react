import { createContext, useState } from "react";

import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export function AuthProvider({children}){
    const [user,setUser] = useState(()=>localStorage.getItem('authToken')? jwt_decode(localStorage.getItem('authToken')):null)
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authToken')? JSON.parse(localStorage.getItem('authToken')):null)


    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authToken')
    }

    let contextData={
        user,
        logoutUser,
        setUser,
        setAuthTokens,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}