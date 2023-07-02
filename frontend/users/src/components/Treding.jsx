import React, { useEffect, useState } from 'react';
import Card from './Card';
import { getcomments, mostLiked, mostlikedvid, url } from '../Constants/Constants';
import axios from '../Axios';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

function Treding() {
  const [photo, setPhotos] = useState();
  const [videos, setVideos] = useState()

  useEffect(() => {
    getMostLikedPost();
    getMostLikedVideo();
  }, []);


  function getMostLikedPost() {
    axios.get(mostLiked)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function getMostLikedVideo() {
    axios.get(mostlikedvid).then((response) => {
      setVideos(response.data)
    })
     
  }


  return (
    <>
      <h1 className='text-center text-blue-900 mt-5 font-bold bg-blue-400' >Trending Items</h1>
      <h1 className="text-red-400 animate-pulse font-bold mt-5">Most Liked Photo</h1>
      {photo === undefined &&
        <Card>
          <div>
            <img style={{ marginLeft: "" }} src='https://media.tenor.com/tErPDtf_1SsAAAAi/mafumafu-ghost.gif' />
            <h3 style={{ textAlign: "center", fontSize: "20px", marginTop: "10px", fontWeight: "600", color: "red", fontFamily: "initial" }}>No post yet !</h3>
          </div>
          <p className='text-center'>System Maintance Please Wait</p>
        </Card>
      }
      {photo && (
        <div key={photo.id} className="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
          <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
            <img className=" h-full w-full object-cover " src={url + photo.image} alt="image description" />
          </div>
          <p className='text-purple-400'>{photo.description}</p>
          <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-3">
                <Link to={`/friendprofile/${photo.user.id}`}>
                  <div>
                    <Avatar urls={photo.user.image} />
                  </div>
                </Link>
                <h2 className="pl-2 mt-3 text-cyan-900  font-extrabold">{photo.user.username}</h2>
              </div>
            </div>
          </div>
        </div>
      )}

      

      <h1 className="text-red-400 animate-pulse font-bold mt-5">Most Liked Video</h1>
      {videos === undefined &&
        <Card>
          <div>
            <img style={{ marginLeft: "" }} src='https://media.tenor.com/tErPDtf_1SsAAAAi/mafumafu-ghost.gif' />
            <p style={{ fontSize: '20px', marginTop: '20px' }} className='text-center text-red-400'>No video Founded Yet .........! </p>
          </div>
          <p className='text-center'>System Maintance Please Wait</p>
        </Card>
      }

      {videos && (
        <div key={videos.id} className="relative flex  w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md float-left mb-4 mr-4">
          <div>
            <video controls>
              <source src={url + videos.video} type="video/mp4" />
            </video>
          </div>
          <p className='text-purple-400'>{videos.description}</p>
          <div className="p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-3">
                <Link to={`/friendprofile/${videos.user.id}`}>
                  <div>
                    <Avatar urls={videos.user.image} />
                  </div>
                </Link>
                <h2 className="pl-2 mt-3 text-cyan-900  font-extrabold">{videos.user.username}</h2>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default Treding;
