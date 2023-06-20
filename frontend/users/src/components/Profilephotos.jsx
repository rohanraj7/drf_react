import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from './Card'
import axios from '../Axios'
import { deletepost, deletevideo, editingPost, updatingpost, url, userpost, uservideo } from '../Constants/Constants'
import AuthContext from '../Context/AuthContext'
import Swal from 'sweetalert2'
import Avatar from './Avatar'
import { json } from 'react-router-dom'

function Profilephotos() {
    const [photos, setPhotos] = useState([])
    const [videos, setVideos] = useState([])
    const { user } = useContext(AuthContext)
    const [frame, setFrame] = useState(false)
    const [post, setPost] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUsername] = useState('')
    const [videoSrc, setVideoSrc] = useState('')
    const [frameVid, setFrameVid] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null)
    const [postId, setPostId] = useState('')
    const [videoId,setVideoId] =  useState('')
    const fileInputRef = useRef(null)


    useEffect(() => {
        getvideos()
        getPhotos()
    }, [])


    function getPhotos() {
        axios.post(userpost, JSON.stringify({ 'user_id': user.user_id }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setPhotos(response.data)
        })
    }

    function getvideos() {
        axios.post(uservideo, JSON.stringify({ 'user_id': user.user_id }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setVideos(response.data)
        })
    }



    function deletePost(dataId) {
        console.log("the post id is ", dataId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Delete the Post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                console.log(result, "result")
                axios
                    .delete(deletepost + user.user_id, {
                        data: { postId: dataId },
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then((response) => {
                        console.log("unfollow success");
                        Swal.fire(
                            'Deleted!',
                            response.data.status,
                            'success'
                        )
                        getPhotos()
                    });
            }
        })
    }




    function deleteVideo(videoId) {
        console.log(videoId, "The video is ")
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Delete the Post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                console.log(result, "result")
                axios
                    .delete(deletevideo + user.user_id, {
                        data: { videoId: videoId },
                        headers: { 'Content-Type': 'application/json' },
                    })
                    .then((response) => {
                        console.log("unfollow success");
                        Swal.fire(
                            'Deleted!',
                            response.data.status,
                            'success'
                        )
                        getvideos()
                    });
            }
        })
    }


    function editPost(dataId) {
        console.log(dataId, "thepost");
        axios.post(editingPost + user.user_id, JSON.stringify({ 'post_id': dataId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setPost(response.data.image)
            setDescription(response.data.description)
            setUsername(response.data.user.username)
            setPostId(response.data.id)
        })
        setFrame(!frame)
    }



    function editVideo(videoId) {
        axios.post(editingPost + user.user_id, JSON.stringify({ 'video_id': videoId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log('but it was first GEtingggggggggggggggg')
            setVideoSrc(response.data.video)
            setUsername(response.data.user.username)
            setDescription(response.data.description)
            setVideoId(videoId)
        })
        setFrameVid(!frameVid)
    }



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Handle the file as needed (e.g., upload, update state, etc.)
        setImageFile(file);
    };

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file)
    }


    

    function updatepost(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', imageFile)
        formdata.append('description', description)
        formdata.append('postid', postId)
        const body = formdata
        axios.put(updatingpost + user.user_id, body).then((response) => {
            Swal.fire(
                'Updated!',
                response.data.status,
                'success'
            )
            getPhotos()
            setFrame(!frame)
        })
    }


    function updatevideo(e) {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('video',videoFile)
        formdata.append('description',description)
        formdata.append('video_id',videoId)
        const body = formdata
        axios.put(updatingpost + user.user_id, body).then((response)=>{
            Swal.fire(
                'Updated!',
                response.data.status,
                'success'
            )
            setFrameVid(!frameVid)
            getvideos()
        })
    }


    return (
        <>

            {frame &&
                <>
                    <div class="py-6">
                        <p className='text-gray-400'>EditPost</p>
                        <span><p className='text-red-600 animate-pulse'>Tab On the Image to change</p></span>

                        <form onSubmit={updatepost}>
                            <div class="flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">

                                <div class="w-1/3 bg-coverimage-container"  >
                                    {imageFile ? (
                                        <img src={URL.createObjectURL(imageFile)} className="h-full w-full object-cover" alt='no images' />
                                    ) : (
                                        <>
                                            <img class="  h-full w-full object-cover" src={url + post} alt="" onClick={() => fileInputRef.current.click()} />

                                        </>
                                    )
                                    }
                                </div>
                                <div class="w-2/3 p-4 ">
                                    <h1 class="text-gray-900 font-bold text-2xl"><span>Title</span> <p className='text-blue-400'>{description}</p></h1>

                                    <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} className="bg-gray-400 grow py-3 h-14 " placeholder="Feel Free To Post ur Thoughts ?" />


                                    <p class="mt-2 text-gray-600 text-sm"><p ><span>username :- </span>{username}</p></p>
                                    <div class="mt-auto flex justify-end">
                                        <button class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Edit profile</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <input type="file" style={{ display: 'none' }} onChange={handleImageChange} ref={fileInputRef} />
                    </div>
                </>
            }

            {frameVid &&
                <>
                    <div class="py-6">
                        <p className='text-gray-400'>EditPost</p>
                        <span><button onClick={() => fileInputRef.current.click()} className='text-red-600 animate-pulse'>Tab On  Here to change</button></span>

                        <form onSubmit={updatevideo}>
                            <div class="flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">

                                <div class="w-1/3 bg-coverimage-container"  >
                                    {videoFile ? (
                                        <video src={URL.createObjectURL(videoFile)} className="rounded-md" alt='no images' />
                                    ) : (
                                        <div>
                                            {videoSrc &&
                                                <video width="320" height="740" controls>
                                                    <source src={url + videoSrc} type="video/mp4"  />
                                                </video>
                                            }
                                        </div>
                                    )}

                                </div>
                                <div class="w-2/3 p-4 ">
                                    <h1 class="text-gray-900 font-bold text-2xl"><span>Title</span> <p className='text-blue-400'>{description}</p></h1>

                                    <textarea onChange={(e) => { setDescription(e.target.value) }} value={description} className="bg-gray-400 grow py-3 h-14 " placeholder="Feel Free To Post ur Thoughts ?" />


                                    <p class="mt-2 text-gray-600 text-sm"><p ><span>username :- </span>{username}</p></p>
                                    <div class="mt-auto flex justify-end">
                                        <button class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Edit profile</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <input type="file" accept="video/*" style={{ display: 'none' }} onChange={handleVideoChange} ref={fileInputRef} />
                    </div>
                </>
            }

            {
                (photos?.length === 0 && videos?.length === 0) ? (
                    <div>
                        <img style={{ marginLeft: "500px" }} src='https://media.tenor.com/XMNibTaTcQYAAAAi/bankrupt-out-of-money.gif' />
                        <h3 style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", fontWeight: "600", color: "red", fontFamily: "initial" }}>No posts yet !</h3>
                    </div>
                ) : (
                    <div>
                        {photos.length > 0 && (
                            photos.map((data) => (
                                <div key={data.id} class="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
                                    {data.image !== '/undefined' && (
                                        <div class="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                            <img class=" transition-all h-full w-full object-cover duration-300 rounded-lg blur-sm hover:blur-none" src={url + data.image} alt="" />
                                        </div>
                                    )}
                                    <div class="p-6">
                                        <div class="mb-2 flex items-center justify-between">
                                            <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                                {data.description}
                                            </p>
                                            <div className='flex items-center space-x-2'>
                                                <button onClick={() => { editPost(data.id) }} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => { deletePost(data.id) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))
                        )}

                        {videos.length > 0 && (
                            videos.map((video) => (
                                <div key={video.id} class="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
                                    {video.image !== '/undefined' && (
                                        <div class="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                            <video width="320" height="740" controls>
                                                <source src={url + video.video} type="video/mp4" />
                                            </video>
                                        </div>
                                    )}
                                    <div class="p-6">
                                        <div class="mb-2 flex items-center justify-between">
                                            <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                                {video.description}
                                            </p>
                                            <div className='flex items-center space-x-2'>
                                                <button onClick={() => { editVideo(video.id) }} >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => { deleteVideo(video.id) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            ))
                        )}




                    </div>
                )
            }


        </>
    )
}

export default Profilephotos