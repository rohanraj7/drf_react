import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
// import ClickOutHandler from 'react-clickout-handler'
import AuthContext from '../Context/AuthContext'
import axios from '../Axios'
import { Following, Liked, comments, deletecomment, getcomments, getisSavedvideo, getlikes, getpost, getsav_videos, getsaved, getuser, getvideocomments, getvideolike, getvideos, reportpost, save_post, un_save, un_savevideo, url, videoliked, videosaved } from '../Constants/Constants'
import Swal from 'sweetalert2'

function PostCard() {

    const [profile, setProfile] = useState()
    const [post, setPost] = useState([])
    const [videos, setVideos] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownvideo, setDropdownVideo] = useState(false)
    const [following, setFollowing] = useState('')
    const { user } = useContext(AuthContext)
    const [userliked, setUserLiked] = useState([])
    const [videoLiked, setVideoLiked] = useState([])
    const [comment, setComment] = useState('')
    const [precomment, setPreComment] = useState([])
    const [vidcomment, setVidcomment] = useState([])
    const [saved, setSaved] = useState(null)
    const [reportMsg, setReportMsg] = useState("It's Contain Inappropriate")
    // const [savedVideo, setSavedVideo] = useState(null)

    const [isSaved, setIsSaved] = useState(null)


    useEffect(() => {
        getUser()
        getPost()
        getfollowing()
        getLike()
        getSaved()
        getVideo()
        // getSaved_Video()
        getvideo_Liked()
        checkSaved_video()

    }, [])


    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": user.user_id }),
            { headers: { 'Content-Type': 'application/json' } }
        ).then((response) => {
            console.log("moneee")
            setProfile(response.data.image)
        })
    }

    function getPost() {
        axios.get(getpost).then((response) => {
            console.log("no way")
            setPost(response.data)
        })
    }

    function getfollowing() {
        console.log("sneakers")
        axios.get(Following + user.user_id).then((response) => {
            // console.log("it came from backend")
            setFollowing(response.data)
        })
    }


    function getLike() {
        axios.get(getlikes).then((response) => {
            setUserLiked(response.data)
        })
    }

    function getvideo_Liked() {
        axios.get(getvideolike).then((response) => {
            setVideoLiked(response.data)
        })
    }




    function formatDateTime(dateTimeStr) {
        const dateTime = new Date(dateTimeStr);
        const currentTime = new Date();
        const timeDifference = Math.floor((currentTime.getTime() - dateTime.getTime()) / 1000); // Time difference in seconds

        if (timeDifference < 60) {
            // Display "Just now" for posts within the last 10 seconds
            return "Just now";
        } else if (timeDifference < 600) {
            // Display minutes if the post is within the last 10 minutes
            const minutes = Math.floor(timeDifference / 60);
            return `${minutes} min ago`;
        } else {
            // Display date and time for older posts
            const formattedDateTime = dateTime.toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" });
            return formattedDateTime;
        }
    }



    function liked(postid, userid) {
        console.log(postid, "postid started !!! liking")
        console.log(userid, "userid started !!! liking")
        axios.post(Liked, JSON.stringify({ 'postid': postid, 'userid': userid }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log("user Linked is Succesfull")
            getLike()
        })
    }

    function unliked(liked_id) {
        console.log(liked_id, "started !!! unliking")
        axios.post(Liked, JSON.stringify({ 'liked_id': liked_id }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log("Unliked the post")
            getLike()
        })
    }

    function unLiked_video(videoId) {
        console.log(videoId, "The Videossssssssssssssssssss")
        axios.post(videoliked, JSON.stringify({ 'liked_id': videoId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log("Unliking the video")
            getvideo_Liked()
        })
    }



    function liked_video(videoId, userId) {
        axios.post(videoliked, JSON.stringify({ 'videoId': videoId, 'userId': userId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getvideo_Liked()
        })
    }




    function addComment(userId, postId) {
        console.log(userId, "user is the ")
        console.log(postId, "post is the ")
        axios.post(comments, JSON.stringify({ 'userId': userId, 'postId': postId, 'comment': comment }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            getComment()
            setComment('')
        });
    }

    function videoComment(userId, videoId) {
        axios.post(comments, JSON.stringify({ 'userId': userId, 'video_id': videoId, 'comment': comment }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            videoComments()
            setComment('')
        });
    }


    function getComment() {
        axios.get(getcomments).then((response) => {
            setPreComment(response.data)
        })
    }


    function videoComments() {
        axios.get(getvideocomments).then((response) => {
            setVidcomment(response.data)
        })
    }

    function deleteComment(userId, postId, comment) {
        console.log("deleting comment", comment)
        axios.post(deletecomment, JSON.stringify({ 'post_id': postId, 'user_id': userId, 'comment': comment }),
            {
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                Swal.fire(
                    'Success',
                    response.data.status,
                    'success'
                )
                getComment()
            })
    }



    function deletevidComment(userId, videoId, comment) {
        console.log("deleting comment", comment)
        axios.post(deletecomment, JSON.stringify({ 'video_id': videoId, 'user_id': userId, 'comment': comment }),
            {
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                Swal.fire(
                    'Success',
                    response.data.status,
                    'success'
                )
                videoComments()
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


    function savepost(postId, userId) {
        axios.post(save_post, JSON.stringify({ 'postId': postId, 'userid': userId }), {
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

    function unsave(userId, postId) {
        axios.put(un_save + userId, JSON.stringify({ 'postId': postId }), {
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

    function unsave_video(userId, videoId) {
        console.log(videoId, "the valuessssssssssssssss")
        axios.put(un_savevideo + userId, JSON.stringify({ 'video_Id': videoId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                "success",
                response.data.status,
                'success'
            )
            checkSaved_video()
        })
    }


    function save_video(videoId, userId) {
        console.log(videoId, "saving the postttttttt");
        axios.post(videosaved, JSON.stringify({ 'videoId': videoId, 'userId': userId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'success',
                response.data.status,
                'success'
            )
            checkSaved_video()
        })
    }


    function getSaved() {
        axios.get(getsaved).then((response) => {
            setSaved(response.data)
        })
    }

    // function getSaved_Video(){
    //     console.log("ALLGOODD GOINGGGG")
    //     axios.get(getsav_videos).then((response)=>{
    //     console.log("1111111111ALLGOODD GOINGGGG")
    //         setSavedVideo(response.data)
    //     })
    // }

    function checkSaved_video() {
        axios.get(getisSavedvideo).then((response) => {
            setIsSaved(response.data)
        })
    }


    function getVideo() {
        axios.get(getvideos).then((response) => {
            setVideos(response.data)
        })

    }


    // function report(userId, postId) {
    function report(postId) {
        axios.post(reportpost + user.user_id, JSON.stringify({ 'post_Id': postId, 'msg': reportMsg }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'updated!',
                response.data.status,
                'success'
            )
            setDropdownOpen(!dropdownOpen)
        })
    }


    function reportVideo(videoId) {
        axios.post(reportpost + user.user_id, JSON.stringify({ 'video_id': videoId, 'msg': reportMsg }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'Updated!',
                response.data.status,
                'success'
            )
            setDropdownVideo(!dropdownvideo)
        })
    }

    console.log(post, "Thepossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");


    return (
        <>
            <Card>
                {
                    following.length === 0 ? (
                        <div>
                            <img style={{ marginLeft: "410px" }} src='https://media.tenor.com/images/8003e9994455e3dc5c53ee852780f8e6/tenor.gif' />
                            <h3 style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", fontWeight: "600", color: "red", fontFamily: "initial" }}>No post yet !</h3>
                        </div>
                    ) : (
                        <div>

                            {post?.length > 0 && (
                                post.map((po) => {
                                    if (following) {
                                        const followed = following.some((fow) => fow.follow_user.id === po.user.id)
                                        if (followed) {
                                            return (
                                                <Card key={po.id}>
                                                    <div className="flex gap-3 mb-3" >
                                                        <div>
                                                            <Link>
                                                                <Avatar urls={po.user.image} />
                                                            </Link>
                                                        </div>
                                                        <div className="grow">
                                                            <Link to='/profile'><p><span className="font-semibold cursor-pointer hover:underline">{po.user.username}</span> Shared a <span className="text-socialBlue">post</span></p></Link>
                                                            <p className="text-gray-500 text-sm">{formatDateTime(po.date_posted)}</p>
                                                        </div>
                                                        <div className="relative">
                                                            <button className="text-gray-400" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                                </svg>
                                                            </button>
                                                            {
                                                                dropdownOpen && (
                                                                    <form onSubmit={(e) => { e.preventDefault(); report(po.id) }}>
                                                                        <div id="dropdown" className="z-10  bg-cyan divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-cyan-400">
                                                                            <div className="flex flex-col">
                                                                                <label htmlFor="exampleFormControlTextarea1" >Report Message</label>
                                                                                <textarea className="form-control bg-gray-200 grow py-3 h-14 " id="exampleFormControlTextarea1" onChange={(e) => { setReportMsg(e.target.value) }} value={reportMsg} ></textarea>
                                                                            </div>
                                                                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                                <li>
                                                                                    {/* <button type="text" onClick={() => { report(user.user_id, po.id) }} href="" class=" ml-8 font-bold block px-16 py-2 hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-blue">Report</button> */}
                                                                                    <button type="submit" href="" className=" ml-8 font-bold block px-16 py-2 hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-blue">Report</button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </form>

                                                                )

                                                            }

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p>{po.description}</p>

                                                        <div className="rounded-md overflow-hidden  flex justify-center">
                                                            <img className="w-1/2" src={url + po.image} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="mt-5 flex gap-8">


                                                            

                                                            {userliked.some((data) => data.user === user.user_id && po.id === data.post) ? (
                                                                // If there is a match, render a button with an "unliked" action
                                                                <button onClick={() => { unliked(po.id) }} className="flex gap-2 items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                                    </svg>
                                                                    {/* {userliked.length} */}
                                                                </button>
                                                            ) : (
                                                                // If there is no match, render a button with a "liked" action
                                                                <button onClick={() => { liked(po.id, user.user_id) }} className="flex gap-2 items-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                                    </svg>
                                                                    {/* {userliked.length} */}
                                                                </button>
                                                            )}


                                                            <button className="flex gap-2 items-center" onClick={getComment}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                                </svg>
                                                                {/* {precomment.length} */}
                                                            </button>
                                                            <button className="flex gap-2 items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className="mt-5">
                                                            {saved?.some((save) => save.user.id === user.user_id && save.post.id === po.id) ? (
                                                                <button onClick={() => { unsave(user.user_id, po.id) }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                                    </svg>
                                                                    {/* {saved.length} */}
                                                                </button>

                                                            ) : (
                                                                <button onClick={() => { savepost(po.id, user.user_id) }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                                    </svg>
                                                                    {/* {saved.length} */}
                                                                </button>
                                                            )}

                                                        </div>
                                                    </div>
                                                    {precomment?.map((precom) => (
                                                        precom.post.id === po.id &&
                                                        <Card>
                                                            <div className="flex gap-3 mt-3">
                                                                <div>
                                                                    <Avatar size={'medium'} urls={precom.user.image} />
                                                                </div>
                                                                <h2>{precom.user.username}</h2>
                                                                {':-'}
                                                                <div className="flex w-[87%] h-8  text-center ">
                                                                    <p>{precom.comment}</p>
                                                                </div>
                                                                <div className='flex w-[11%] gap-4'>

                                                                    <p>{formattingDateTime(precom.comment_date)}</p>
                                                                    {precom.user.id === user.user_id &&
                                                                        <button onClick={() => deleteComment(user.user_id, po.id, precom.comment)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                            </svg>
                                                                        </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    ))}



                                                    {/* comments */}


                                                    <div className="flex gap-2 mt-3">
                                                        <div className="mt-1">
                                                            <Avatar size={'small'} urls={profile} />
                                                        </div>
                                                        <div className="flex w-[87%] h-8 text-center ">
                                                            <div className="w-[87%]">
                                                                <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} className="block w-[92%] py-1 outline-none overflow-hidden" placeholder="Feel free to  comment" />
                                                            </div>
                                                        </div>
                                                        <button onClick={() => { addComment(user.user_id, po.id) }} className="top-0 text-blue-500 font-bold">Post</button>
                                                    </div>
                                                    <button onClick={getComment} className="text-sm text-gray-500">Show all comments</button>
                                                </Card>
                                            )
                                        }
                                        return null
                                        // (

                                        //     <div>
                                        //         <p style={{ fontSize: '20px', marginTop: '20px' }} className='text-center text-red-400'>Followed person Don't Have Any Post </p>
                                        //         <img style={{ marginLeft: "310px" }} src='https://media0.giphy.com/media/xT9IgAvSlauYLm97ji/giphy.gif?cid=ecf05e47vm9eg84oefgckbzxgv515g6tnqeklymxumrggloj&ep=v1_gifs_related&rid=giphy.gif' />
                                        //     </div>

                                        // )

                                    }

                                }
                                )
                            )}

                            {videos?.length > 0 && (
                                videos.map((video) => (
                                    following?.map((fow) => (
                                        fow.follow_user.id === video.user.id &&
                                        <Card key={video.id}>
                                            <div className="flex gap-3 mb-3" >
                                                <div>
                                                    <Link>
                                                        <Avatar urls={video.user.image} />
                                                    </Link>
                                                </div>
                                                <div className="grow">
                                                    <Link to='/profile'><p><span className="font-semibold cursor-pointer hover:underline">{video.user.username}</span> Shared a <span className="text-socialBlue">post</span></p></Link>
                                                    <p className="text-gray-500 text-sm">{formatDateTime(video.date_posted)}</p>
                                                </div>
                                                <div className="relative">
                                                    <button className="text-gray-400" onClick={() => setDropdownVideo(!dropdownvideo)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                        </svg>
                                                    </button>
                                                    {
                                                        dropdownvideo && (
                                                            <form onSubmit={(e) => { e.preventDefault(); reportVideo(video.id) }}>
                                                                <div className="z-10 bg-cyan divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-cyan-400 p-4">
                                                                    <div className="flex flex-col">
                                                                        <label htmlFor="reportMessage" className="text-gray-700">Report Message</label>
                                                                        <textarea
                                                                            id="reportMessage"
                                                                            className="form-control bg-gray-200 grow py-3 h-14"
                                                                            onChange={(e) => { setReportMsg(e.target.value) }}
                                                                            value={reportMsg}
                                                                        ></textarea>
                                                                    </div>
                                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                                        <li>
                                                                            <button
                                                                                type="submit"
                                                                                className="ml-8 font-bold block px-16 py-2 hover:bg-red-100 dark:hover:bg-gray-600 dark:hover:text-blue"
                                                                            >
                                                                                Report
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </form>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <p>{video.description}</p>

                                                <div className="rounded-md overflow-hidden  flex justify-center">
                                                    <video className='w-1/2' controls>
                                                        <source src={url + video.video} type="video/mp4" />
                                                    </video>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="mt-5 flex gap-8">
                                                    {videoLiked.some((data) => data.user === user.user_id && video.id === data.video) ? (
                                                        // If there is a match, render a button with an "unliked" action
                                                        <button onClick={() => { unLiked_video(video.id) }} className="flex gap-2 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                            {/* {videoLiked.length} */}
                                                        </button>
                                                    ) : (
                                                        // If there is no match, render a button with a "liked" action
                                                        <button onClick={() => { liked_video(video.id, user.user_id) }} className="flex gap-2 items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                            </svg>
                                                            {/* {videoLiked.length} */}
                                                        </button>
                                                    )}


                                                    <button className="flex gap-2 items-center" onClick={getComment}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                                        </svg>
                                                        {/* {precomment.length} */}
                                                    </button>
                                                    <button className="flex gap-2 items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                        </svg>
                                                    </button>
                                                </div>


                                                {/* In the modified code, I added a check using Array.isArray(isSaved) to ensure that isSaved is an array before accessing its length property.
                                                 Additionally, in the else branch, I added a check using isSaved && isSaved.length to handle the case where isSaved is null or not an array. */}

                                                <div className="mt-5">
                                                    {Array.isArray(isSaved) && isSaved?.some((save) => save.user.id === user.user_id && save.video.video === video.video) ? (
                                                        <button onClick={() => { unsave_video(user.user_id, video.id) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                            </svg>
                                                            {isSaved.length}
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => { save_video(video.id, user.user_id) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                            </svg>
                                                            {isSaved && isSaved.length}
                                                        </button>
                                                    )}

                                                </div>
                                            </div>
                                            {vidcomment?.map((vidcom) => (
                                                vidcom.video.id === video.id &&
                                                <Card>
                                                    <div className="flex gap-3 mt-3">
                                                        <div>
                                                            <Avatar size={'medium'} urls={vidcom.user.image} />
                                                        </div>
                                                        <h2>{vidcom.user.username}</h2>
                                                        {':-'}
                                                        <div className="flex w-[87%] h-8  text-center ">
                                                            <p>{vidcom.comment}</p>
                                                        </div>
                                                        <div className='flex w-[11%] gap-4'>

                                                            <p>{formattingDateTime(vidcom.comment_date)}</p>
                                                            {vidcom.user.id === user.user_id &&
                                                                <button onClick={() => deletevidComment(user.user_id, video.id, vidcom.comment)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}



                                            {/* comments */}


                                            <div className="flex gap-2 mt-3">
                                                <div className="mt-1">
                                                    <Avatar size={'small'} urls={profile} />
                                                </div>
                                                <div className="flex w-[87%] h-8 text-center ">
                                                    <div className="w-[87%]">
                                                        <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} className="block w-[92%] py-1 outline-none overflow-hidden" placeholder="Feel free to  comment" />
                                                    </div>
                                                </div>
                                                <button onClick={() => { videoComment(user.user_id, video.id) }} className="top-0 text-blue-500 font-bold">Post</button>
                                            </div>
                                            <button onClick={videoComments} className="text-sm text-gray-500">Show all comments</button>
                                        </Card>
                                    ))
                                ))
                            )}

                        </div>

                    )
                }
            </Card>
        </>
    )
}

export default PostCard