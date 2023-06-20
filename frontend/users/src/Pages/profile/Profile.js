import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LayOut from "../../components/LayOut";
import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import EditProfile from "../../components/EditProfile";
import AuthContext from "../../Context/AuthContext";
import axios from "../../Axios";
import { getuser } from "../../Constants/Constants";
import Friends from "../../components/Friends";
import Profilephotos from "../../components/Profilephotos";
import Saved from "../Saved/Saved";
// import AboutCard from "../../components/AboutCard";


function Profile() {
    const { user } = useContext(AuthContext)
    const location = useLocation()
    const [profile, setProfile] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const { pathname } = location
    const tabClasses = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white';
    const activeTabClasses = 'flex gap-1 px-4 py-1 items-center border-socialBlue border-b-4 text-socialBlue font-bold';

    useEffect(() => {
        getUser()
    }, [])

    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": user.user_id }),
            { headers: { "Content-Type": 'application/json' } }
        ).then((response) => {
            setProfile(response.data.image)
            setFirstname(response.data.first_name)
            setLastname(response.data.last_name)
            console.log(response.data, 'kuhj')
        })

    }

    



    return (
        <>
            <LayOut>
                {pathname === '/profile/edit' ? <EditProfile /> :
                    <Card noPadding={true}>
                        <div className="relative rounded-md overflow-hidden">
                            <div className="h-36 overflow-hidden flex justify-center items-center">
                                <img className="w-full" src="https://i.pinimg.com/564x/47/38/d7/4738d734bb729fcacfd41859a59a6f52.jpg" alt="" />
                            </div>
                            <div className="absolute top-24 left-4">

                                <Avatar size='large' urls={profile} />
                            </div>
                            <div className="p-4 pb-0">
                                <div className="flex items-center">
                                    <div className="ml-40">
                                        <h2 className="text-3xl font-bold">{user.username}</h2>
                                        <h1 className="text-lg font-bold dark:text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{firstname}</span>{''}{lastname}</h1>
                                    </div>
                                    <div className="ml-10">
                                        <Link to='/profile/edit'><button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Edit Profile</button></Link>
                                    </div>
                                </div>

                                <div className="mt-10 flex gap-0">
                                    <Link to='/profile/posts' className={pathname === '/profile' || pathname === '/profile/posts' ? activeTabClasses : tabClasses}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        Posts
                                    </Link>
                                    <Link to='/profile/friends' className={pathname === '/profile/friends' ? activeTabClasses : tabClasses}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                        Friends
                                    </Link>

                                    <Link to='/profile/saved' className={pathname === '/profile/saved' ? activeTabClasses : tabClasses}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                                        </svg>
                                        Saved
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                }
                <div>
                    {
                        (() => {
                            if (pathname === '/profile' || pathname === '/profile/posts') {
                                return <Profilephotos />
                            }
                            else if (pathname === '/profile/about') {
                                // return <AboutCard/>                   
                            }
                            else if (pathname === '/profile/friends') {
                                return <Friends />
                            }
                            else if (pathname === '/profile/photos') {
                                return <Profilephotos />
                            }
                            else if(pathname === '/profile/saved'){
                                return <Saved/>
                            }
                        })()

                    }
                </div>
            </LayOut>

        </>
    )
}

export default Profile