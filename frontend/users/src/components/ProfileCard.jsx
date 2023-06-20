import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import axios from '../Axios'
import AuthContext from '../Context/AuthContext'
import { getuser } from '../Constants/Constants'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

function ProfileCard() {
    const [pro, setPro] = useState()
    const { user } = useContext(AuthContext)
    const [details, setDetails] = useState()
    useEffect(() => {
        GetUSer()
    }, [])

    function GetUSer() {
        console.log("response iiiii");
        axios.post(getuser, JSON.stringify({ 'user_id': user.user_id }),
            { headers: { 'Content-Type': 'application/json' } }
        ).then((response) => {
            setPro(response.data.image)
            setDetails(response.data.first_name)
        })
    }
    console.log(details, "photoo enter")
    return (
        <>
            <div className='flex items-center '>
                <Card >
                    <div className="flex items-center bg-dark-400 space-x-4 " style={{ width: '340px' }}>
                        <div className="flex-shrink-0">
                            <Avatar urls={pro} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-blue-400">{user.username}</p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{details}</p>
                        </div>
                        <Link to={'/profile'} className='text-cyan-500 hover:text-cyan-600'>
                            View Profile</Link>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ProfileCard