import axios from '../../Axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getvideouser, url, userpost } from '../../Constants/Constants'
import AuthContext from '../../Context/AuthContext'

function Post(id) {
    const params = useParams()
    const [friend, setFriend] = useState(params.userId)
    const [post, setPost] = useState([])
    const [video, setVideo] = useState([])


    const { user } = useContext(AuthContext)

    useEffect(() => {
        getPost()
        getVideos()
    }, [])

    function getPost() {
        axios.post(userpost, JSON.stringify({ 'user_id': friend }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setPost(response.data)
        })
    }


    function getVideos() {
        axios.post(getvideouser + user.user_id).then((response) => {
            setVideo(response.data)
        })
    }

    return (
        <>
            {
                (post?.length === 0 && video?.length === 0) ? (

                    <div>
                        <img style={{ marginLeft: "500px" }} src='https://media.tenor.com/XMNibTaTcQYAAAAi/bankrupt-out-of-money.gif' />
                        <h3 style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", fontWeight: "600", color: "red", fontFamily: "initial" }}>No posts yet !</h3>
                    </div>

                ) : (
                    <div>
                        {post.length > 0 && (
                            post?.map((data) => (
                                <div key={data.id} class="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
                                    <div class="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                        <img class=" transition-all h-full w-full object-cover duration-300 rounded-lg blur-sm hover:blur-none" src={url + data.image} alt="image description" />

                                    </div>
                                    <div class="p-6">
                                        <div class="mb-2 flex items-center justify-between">
                                            <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                                                {data.description}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            ))
                        )}

                        {video.length > 0 && (
                            video.map((video) => (
                                <div key={video.id} class="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
                                    {video.video !== '/undefined' && (
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


export default Post