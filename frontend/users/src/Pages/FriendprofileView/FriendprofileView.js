import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../components/LayOut'

import Avatar from '../../components/Avatar'
import { Link, useLocation, useParams } from 'react-router-dom'
import Post from '../../components/FriendProfile/Post'
import { Follow, Unfollow, confirming, getuser } from '../../Constants/Constants'
import axios from '../../Axios'
import AuthContext from '../../Context/AuthContext'
import Card from '../../components/Card'
import Friend from '../../components/FriendProfile/Friend'
import Swal from 'sweetalert2'

function FriendprofileView() {

    const location = useLocation()
    const params = useParams()
    const { pathname } = location
    const { user } = useContext(AuthContext)
    const [id, setID] = useState(params.userId)

    const [profile, setPofile] = useState()
    const [username, setUsername] = useState()
    const [userFirstname, setUserFirstname] = useState()
    const [userLastname, setUserLastname] = useState()
    const [confirm, setConfirm] = useState(false)



    const tabClasses = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white';
    const activeTabClasses = 'flex gap-1 px-4 py-1 items-center border-socialBlue border-b-4 text-socialBlue font-bold';

    useEffect(() => {
        getUser()
        Checking()
    }, [])

    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": id }), { headers: { 'Content-Type': 'application/json' } }).then((response) => {
            setPofile(response.data.image)
            setUsername(response.data.username)
            setUserFirstname(response.data.first_name)
            setUserLastname(response.data.last_name)
        })
    }
    function Unfollowing(id,userId) {
        console.log(id, "hellooooo");
        console.log(userId, "unfollow button working");
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
                    .delete(Unfollow + id, {
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
                        Checking()
                    });
            }
        })
    }

    

    function follow(user,userId) {
        console.log(user, "user id of the user")
        console.log(userId, "HEY AMNIN")
        axios.post(Follow + user, JSON.stringify({ 'to': userId }), {
          headers: {
            'Content-Type': "application/json"
          }
        }).then((response) => {
          console.log("requested ")
          getUser()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'followed',
            showConfirmButton: false,
            timer: 1500
          })
          console.log("requested Successfully  ")
          Checking()
        })
      }

    const Checking = () => {
        console.log("CHECKING COndition is true")
        axios.put(confirming + user.user_id + '/' + id).then((response) => {
            setConfirm(response.data)
        })
    }

    console.log(confirm,"Checking the condition is for confirmationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    return (
        <>
            <LayOut>
                <Card>
                    <div className="relative rounded-md overflow-hidden">
                        <div className="h-36 overflow-hidden flex justify-center items-center">
                            <img className="w-full" src="https://i.pinimg.com/564x/8d/12/dd/8d12dd4ca4b88322ea96523d1f381d7d.jpg" alt="" />
                        </div>
                        <div className="absolute top-24 left-4">
                            <Avatar size='large' urls={profile} />
                        </div>
                        <div className="p-4 pb-0">
                            <div className="flex items-center">
                                <div className="ml-40">
                                    <h2 className="text-3xl font-bold">{username}</h2>
                                    <h1 className="text-lg font-bold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{userFirstname}</span>{' '}{userLastname}</h1>
                                </div>
                                {confirm ? 
                                    <div className="ml-10">
                                        <button onClick={()=>{Unfollowing(user.user_id, id)}} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">unFollow</button>
                                    </div> 
                                :
                                    <div className="ml-10">
                                        <button onClick={()=>{follow(user.user_id, id)}} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Follow</button>
                                    </div>
                                }
                            </div>



                            <div className="mt-10 flex gap-0">
                                <Link to={`/friendprofile/${id}`} className={pathname === `/friendprofile/${id}` || pathname === '/profile/posts' ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Posts
                                </Link>
                                <Link to={`/friendprofile/friend/${id}`} className={pathname === '/friendprofile/friend' ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                    Friends
                                </Link>

                            </div>
                        </div>
                    </div>
                </Card>


                <div>
                    {
                        (() => {
                            if (pathname === `/friendprofile/${id}` || pathname === `/friendprofile/posts/${id}`) {
                                return <Post />
                            }
                            // else if (pathname === '/profile/about') {
                            //     // return <AboutCard/>                   
                            // }
                            else if (pathname === `/friendprofile/friend/${id}`) {
                                return <Friend />
                            }
                            // else if (pathname === '/profile/photos') {
                            //     return <Profilephotos />
                            // }
                        })()

                    }
                </div>
            </LayOut>
        </>
    )
}

export default FriendprofileView