import axios from '../../Axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Following } from '../../Constants/Constants'
import Card from '../Card'
import Avatar from '../Avatar'

function Friend(id) {

    const params = useParams()
    const [friend, setFriend] = useState(params.userId)
    const [profile, setProfile] = useState()

    useEffect(() => {
        getUser()
    }, [])

    function getUser() {
        axios.get(Following+friend).then((response) => {
            setProfile(response.data)
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
                                {/* <button onClick={"() => { unfollowing(data.follow_user.id) }"} className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                                    Unfollow
                                </button> */}
                            </li>
                        ))
                    )}
                </ul>
            </Card>
        </>
    )
}

export default Friend