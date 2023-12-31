import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import AuthContext from '../Context/AuthContext'
import Avatar from './Avatar'
import axios from '../Axios'
import { baseUrl, getpost, getuser, postimage } from '../Constants/Constants'
import Swal from 'sweetalert2'

function PostFormcard() {

    useEffect(() => {
        getUser()
        getPostdetail()
    },[])

    const { user } = useContext(AuthContext)
    const [image, setImage] = useState()
    const [video, setVideo] = useState()
    const [description, setDescription] = useState()
    const [profile, setProfile] = useState()
    const user_id = user.user_id


    function getPostdetail(){
        axios.get(getpost).then((response)=>{
            console.log("Post recalled !")
        })
    }

    function PostSubmit(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', image)
        formdata.append('video',video)
        formdata.append('description', description)        

        const body = formdata
        console.log("HELLOO")
        axios.post(baseUrl + postimage + user_id, body).then((response) => {
            if (response.status === 200) {
                setImage("")
                setDescription("")
                setVideo("")
                Swal.fire(
                    'Uploaded!',
                    'photo upload Successfully',
                    'success'

                );
            }
        })
    }


    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": user.user_id }),
            { headers: { "Content-Type": 'application/json' } }
        ).then((response) => {
            setProfile(response.data.image)

        })
    }

    return (
        <Card>
            <form onSubmit={PostSubmit} style={{width: '1103px'}}>
                <div className="flex gap-3">
                    <div>
                        <Avatar urls={profile} />
                    </div>
                    <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} className="grow py-3 h-14 outline-none" placeholder="Feel Free To Post ur Thoughts ?" />
                    {image && <img src={URL.createObjectURL(image)} className="w-[60px] h-14 rounded-md" alt='no images' />}
                    {video && <video src={URL.createObjectURL(video)} className="w-[60px] h-14 rounded-md" alt='no images' />}

                </div>
                <div className="flex gap-5 items-center mt-2">
                    <div className="relative flex gap-3">
                        <button type="file" className="flex gap-1 " placeholder="Post">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                            <span className="mt-1">Post</span>
                        </button>
                        <input onChange={(e) => { setImage(e.target.files[0]) }} name="image" type="file" className=" w-[60px] absolute top-0 opacity-0" />
                    </div>

                    <div className="relative flex gap-3">
                        <button type="button" className="flex gap-1" placeholder="Post">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                            <span className="mt-1">video</span>
                        </button>
                        <input onChange={(e) => { setVideo(e.target.files[0]) }} name="video" type="file" accept="video/*" className="w-[60px] absolute top-0 opacity-0" />
                    </div>


                    {/*<div>
                        <button className="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            Mood
                        </button>
                    </div> */}
                    <div className="grow text-right">
                        <button className="bg-socialBlue text-white px-6 py-0.5 rounded-md">Share</button>
                    </div>
                </div>
            </form>
        </Card>
    )
}

export default PostFormcard