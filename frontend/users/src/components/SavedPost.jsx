import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import LayOut from "./LayOut";
import axios from "../Axios";
import { getisSavedvideo, getpost, getsaved, getvideolike, getvideos, save_post, url, videoliked, videosaved } from "../Constants/Constants";
import AuthContext from "../Context/AuthContext";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getlikes } from "../Constants/Constants";
import { Liked } from "../Constants/Constants";

function SavedPost() {
    const [post, setPosted] = useState([])
    const { user } = useContext(AuthContext)
    const [saved, setSaved] = useState([])
    const [likes, setLikes] = useState([])
    const [savedVd, setSavedvd] = useState([])
    const [vLikes,setVLikes] = useState([])



    useEffect(() => {
        getPost()
        getSaved()
        getLiked()
        getSavedvideo()
        getvideo_like()
    }, [])


    

    function getSavedvideo() {
        axios.get(getisSavedvideo).then((response) => {
            setSavedvd(response.data)
        })
    }


    function getPost() {
        axios.get(getpost).then((response) => {
            setPosted(response.data)
        })
    }

    function getSaved() {
        axios.get(getsaved).then((response) => {
            setSaved(response.data)
        })
    }






    function savepost(userId) {
        console.log(userId,"the user id")
        axios.post(save_post, JSON.stringify({ 'user': userId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                "success",
                response.data.status,
                "success"
            )
            getSaved()
        })
    }

    function getLiked() {
        axios.get(getlikes).then((response) => {
            setLikes(response.data)
            
        })
    }

    function getvideo_like(){
        axios.get(getvideolike).then((response)=>{
            setVLikes(response.data)
        })
    }

    function liked( postId,userId) {
        console.log("post", postId)
        console.log("user", userId)
        axios.post(Liked, JSON.stringify({ 'userid': userId, 'postid': postId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getLiked()
        })


    }

    function unliked(postId) {
        console.log("post", postId)
        axios.post(Liked, JSON.stringify({ 'liked_id': postId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getLiked()
        })
    }

    function like_video(userId,videoId){
        console.log(userId,"The user is")
        console.log(videoId,"The video is")
        axios.post(videoliked,JSON.stringify({'userId':userId,'videoId':videoId}),{
            headers:{'Content-Type':'application/json'}
        }).then((response)=>{
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getvideo_like()
        })
    }   

    function unlike_video(videoId){
        console.log("unliking video",videoId)
        axios.post(videoliked,JSON.stringify({'liked_id':videoId}),{
            headers:{'Content-Type':'application/json'}
        }).then((response)=>{
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getvideo_like()
        })
    }



    function video_saved(videoId){
        console.log(videoId,"The video User!")
        axios.post(videosaved,JSON.stringify({'video_Id':videoId}),{
            headers: {'Content-Type': 'application/json'}
        }).then((response)=>{
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getSavedvideo()
        })
    }

    return (
        <>
            {/* <h1 className="text-4xl font-extrabold text-gray-900 text-center">Saved Posts</h1> */}

            <div className="mt-7 ">
                {
                    (saved?.length === 0 && savedVd?.length === 0) ? (
                        <div>

                            <img style={{ marginLeft: "500px" }} src='https://media.tenor.com/XMNibTaTcQYAAAAi/bankrupt-out-of-money.gif' />
                            <h3  style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", fontWeight: "600", color: "red", fontFamily: "initial" }}>No posts yet !</h3>
                        </div>
                    ) : (
                        <div >
                            {saved.length > 0 && (
                                saved?.map((save) => (
                                    save.user.id === user.user_id &&
                                    <div key={save.id} className="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
                                        <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                            <img className="transition-all h-full w-full object-cover duration-300 rounded-lg blur-sm hover:blur-none" src={url + save.post.image} alt="image description" />
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex gap-3">
                                                    <Link to={`/friendprofile/${save.post.user.id}`}>
                                                        <div>
                                                            <Avatar urls={save.post.user.image} />
                                                        </div>
                                                    </Link>
                                                    <h2 className="pl-2 mt-3 text-cyan-900  font-extrabold">{save.post.user.username}</h2>
                                                </div>
                                                <div className="" style={{ marginLeft: '105px' }}>
                                                    {likes?.some((like) => like.user === user.user_id && save.post.id === like.post) ? (
                                                        <button onClick={() => { unliked(save.post.id) }} className="flex gap-2 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                            {/* {likes.length} */}
                                                        </button>
                                                    ) : (
                                                        // If there is no match, render a button with a "liked" action
                                                        <button onClick={() => { liked( save.post.id,user.user_id) }} className="flex gap-2 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                            {/* {likes.length} */}
                                                        </button>
                                                    )}
                                                </div>



                                                {saved?.some((save) => save.user.id === user.user_id) &&
                                                    <button onClick={() => { savepost(save.id) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                        </svg>
                                                    </button>
                                                }


                                            </div>
                                        </div>
                                    </div>

                                ))
                            )}

                            {savedVd.length > 0 && (
                                savedVd?.map((save) => (
                                    save.user.id === user.user_id &&
                                    
                                        <div key={save.id} className="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
                                        <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                            <video width="320" height="740" controls>
                                                <source src={url + save.video.video} type="video/mp4" />
                                            </video>
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex gap-3">
                                                    <Link to={`/friendprofile/${save.video.user.id}`}>
                                                        <div>
                                                            <Avatar urls={save.video.user.image} />
                                                        </div>
                                                    </Link>
                                                    <h2 className="pl-2 mt-3 text-cyan-900  font-extrabold">{save.video.user.username}</h2>
                                                </div>
                                                <div className="" style={{ marginLeft: '150px' }}>
                                                    {vLikes?.some((like) => like.user === user.user_id && save.user.id === like.user) ? (
                                                        <button onClick={() => { unlike_video(save.video.id) }} className="flex gap-2 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        // If there is no match, render a button with a "liked" action
                                                        <button onClick={() => { like_video(user.user_id, save.video.id) }} className="flex gap-2 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>



                                                {savedVd?.some((save) => save.user.id === user.user_id) &&
                                                    <button onClick={() => { video_saved(save.id) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                        </svg>
                                                    </button>
                                                }


                                            </div>
                                        </div>
                                    </div>

                                ))
                            )}

                        </div>

                    )


                }

            </div>
        </>
    )
}

export default SavedPost