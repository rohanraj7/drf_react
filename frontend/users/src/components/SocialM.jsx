import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'

export default function SocialM() {
    let {logoutUser} = useContext(AuthContext)
    return(
        <>
            <button onClick={logoutUser}>logoutButton</button>
        </>
    )
}