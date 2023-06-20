
import axios from '../Axios'
import React, { useEffect, useState } from 'react'
import { Follow, Follower, Following, allusers, } from '../Constants/Constants'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import Swal from 'sweetalert2'

function RightSide() {
  const [newUser, setNewUsers] = useState([]) //get the all users
  const [showAllUsers, setShowAllUsers] = useState(false) // State to track if "View all" link is clicked
  const { user } = useContext(AuthContext) //get the user to send with the follow to ?
  const [userData, setUserData] = useState([]) //get the user information of Login
  const [following,setFollowing] = useState('')

  useEffect(() => {
    getAllUsers()
    getUser() //call the current user login
    getFollowings()
  }, [])

  function getAllUsers() {
    axios.get(allusers).then((response) => {
      setNewUsers(response.data)
      console.log(response.data, "data collected from backend")
      // getUser()
    })
  }

  function getUser() {
    console.log("not calling")
    axios.get(Follower).then((response) => {
      setUserData(response.data)
    })
  }
  
  function getFollowings(){
    axios.get(Following + user.user_id).then((response)=>{
        setFollowing(response.data)
    })
  }

  // Function to handle "View all" link click
  function handleViewAllClick() {
    setShowAllUsers(true)
  }

  // when the follow button is clicked !
  function follow(id) {
    console.log(id, "HEY AMNIN")
    console.log(user.user_id, "user id of the user")
    axios.post(Follow + user.user_id, JSON.stringify({ 'to': id }), {
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
      getFollowings()
    })
  }


  console.log(newUser,"All present Members")
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">NEW USERS</h5>
          {!showAllUsers && (
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500" onClick={handleViewAllClick}>
              View all
            </a>
          )}
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* {newUser.slice(0, showAllUsers ? newUser.length : 4).map((value) => {
              if (userData) {

                //if its used it working when the one user is logged in and followed couple of user and logout , new user login and check the 2 user were missing the previous one followed so thats why i changed the thois code like this with two return 
                // const isFollowed = userData.some((correct) => correct.follow_user.id === value.id);
                // if (!isFollowed && value.id !== user.user_id) {
                if ( value.id !== user.user_id ) {
                  return (
                    
                    <li className="py-3 sm:py-4" key={value.id}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Link to={`/friendprofile/${value.id}`}>
                            <Avatar urls={value.image} />
                          </Link>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{value.username}</p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">{value.email}</p>
                        </div>
                        <button
                          onClick={() => { follow(value.id) }}
                          type="button"
                          className="text-white bg-socialBlue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Follow
                        </button>
                      </div>
                    </li>
                  );
                }
              }
              return null;
            })} */}
         {newUser.slice(0, showAllUsers ? newUser.length : 4).map((value) => {
          // {newUser?.map((value)=>{
            if(following){
              const checkFollowed = following.some((data)=> data.follow_user.id === value.id)
              if(!checkFollowed && value.id !== user.user_id){
                return(
                  <li className="py-3 sm:py-4" key={value.id}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Link to={`/friendprofile/${value.id}`}>
                            <Avatar urls={value.image} />
                          </Link>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{value.username}</p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">{value.email}</p>
                        </div>
                        <button
                          onClick={() => { follow(value.id) }}
                          type="button"
                          className="text-white bg-socialBlue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Follow
                        </button>
                      </div>
                    </li>
                )
              }
            }
          })}

          </ul>
        </div>
      </div>
    </>
  )
}

export default RightSide
