import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import axios from '../Axios'
import { Following, Unfollow } from '../Constants/Constants'
import AuthContext from '../Context/AuthContext'
import Avatar from './Avatar'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Friends() {
    const [profile, setProfile] = useState()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getUser()
    }, [])


    function getUser() {
        axios.get(Following + user.user_id).then((response) => {
            setProfile(response.data)
        })
    }


    function unfollowing(userId) {
        console.log(userId, "unfollow button working");
        console.log(user.user_id, "hellooooo");
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to UnFollow the User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                console.log(result, "result")
                axios
                    .delete(Unfollow + user.user_id, {
                        data: { userId: userId },
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then((response) => {
                        console.log("unfollow success");
                        Swal.fire(
                            'UnFollow!',
                            response.data.status,
                            'success'
                        )
                        getUser()
                    });
            }
        })
    }
    return (
        <>
            <Card>
                <ul role="list" className="divide-y divide-gray-100">
                    {profile?.length === 0 ? (
                        <div>
                            <img style={{ marginLeft: "580px" }} src='https://media.tenor.com/tErPDtf_1SsAAAAi/mafumafu-ghost.gif' />
                            <h3 style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", fontWeight: "600", color: "red", fontFamily: "initial" }}>Not Following anyOne</h3>
                        </div>
                    ) : (
                        profile?.map((data) => (
                            <li key={data.follow_user.id} className="flex justify-between gap-x-6 py-5">
                                <div className="flex gap-x-4">
                                    <Link to={`/friendprofile/${data.follow_user.id}`}>
                                        <Avatar urls={data.follow_user.image} />
                                    </Link>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{data.follow_user.username}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.follow_user.email}</p>
                                    </div>
                                </div>
                                <button onClick={() => { unfollowing(data.follow_user.id) }} className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                                    Unfollow
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </Card>
        </>
    )
}

export default Friends