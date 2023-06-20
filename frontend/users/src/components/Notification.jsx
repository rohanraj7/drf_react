import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import LayOut from './LayOut'
import axios from '../Axios'
import { allusers, clearntn, getnotification } from '../Constants/Constants'
import Swal from 'sweetalert2'
import Avatar from './Avatar'
import AuthContext from '../Context/AuthContext'

function Notification() {
    const [notification, setnotification] = useState([])
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState([])

    useEffect(() => {
        getNotification()
        getPost()
    }, [])

    function getNotification() {
        axios.get(getnotification + user.user_id).then((response) => {
            setnotification(response.data)
        })
    }

    function getPost() {
        axios.get(allusers).then((response) => {
            setProfile(response.data)
        })
    }


    function formattingDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const currentDate = new Date();

        if (
            dateTime.getDate() === currentDate.getDate() &&
            dateTime.getMonth() === currentDate.getMonth() &&
            dateTime.getFullYear() === currentDate.getFullYear()
        ) {
            // Display time only if the post is from today
            const formattedTime = dateTime.toLocaleTimeString("en-US", { timeStyle: "short" });
            return formattedTime;
        } else {
            // Display date for older posts
            const formattedDate = dateTime.toLocaleDateString("en-US", { dateStyle: "short" });
            return formattedDate;
        }
    }

    function clear(id) {
        console.log(id, "Clearing It....................")
        axios.delete(clearntn, {
            data: JSON.stringify({ 'noti_id': id }),
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getNotification()
        })
    }

    return (
        <>
            <LayOut>
                <Card>
                    <p className='text-center animate-pulse text-blue-400 text-2xl font-bold'> NOTIFICATIONS</p>

                    {notification?.map((not) =>
                        <Card>
                            <div className='flex'>
                                {profile?.map((po) =>
                                    not.sender === po.id &&
                                    <Avatar urls={po.image} />
                                )
                                }
                                <p className='mt-3 ml-7'>{not.message}</p>
                                <h1 style={{ marginLeft: '1040px' }}><span className="text-xs font-medium text-blue-600 dark:text-blue-500">{formattingDateTime(not.created)}</span></h1>
                                <button onClick={() => { clear(not.id) }} className='mb-7 ml-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        </Card>
                    )}
                </Card>
            </LayOut>
        </>
    )
}

export default Notification
