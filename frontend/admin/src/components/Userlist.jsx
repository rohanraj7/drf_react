import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { blockUser, getusers } from '../constants/Constants'
import Swal from 'sweetalert2'

function Userlist() {

    let [user, setUser] = useState(null)
    
    let [newData, setNewData] = useState([])


    useEffect(() => {
        getUser()
    }, [])

    function getUser() {
        console.log("before entering ")
        axios.get(getusers).then((response) => {
            console.log("entered")
            setUser(response.data)
            console.log("user is mr ", user)
            setNewData(response.data)
        })
    }

    function handleBlock(userId, is_active) {
        console.log("working good", userId)
        console.log("is active", is_active)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Block the User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                console.log("result", result)
                console.log(" before enter the backend")
                axios.put(`blockuser/${userId}`).then((response) => {
                    getUser()
                    Swal.fire(
                        'Blocked!',
                        response.data.status,
                        'success'
                    )
                    console.log("enter the backend")
                })
            }
        })

    }

    function handleUnBlock(userId, is_active) {
        console.log("working good", userId)
        console.log("is active", is_active)
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to UnBlock the User!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                console.log("result", result)
                console.log(" before enter the backend")
                axios.put(`blockuser/${userId}`).then((response) => {
                    getUser()
                    Swal.fire(
                        'UnBlocked!',
                        response.data.status,
                        'success'
                    )
                    console.log("enter the backend")
                })
            }
        })

    }

    function handleDelete(userId) {
        console.log("Started deleteing", userId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                console.log("before entering the Backend")
                axios.post(`deleteuser/${userId}`).then((response) => {
                    getUser()
                    Swal.fire(
                        'Deleted!',
                        response.data.status,
                        'success'
                    )
                    console.log("all good entered succesfully")
                })
            }
        })
    }

    // seachFilter 
    function handleSearch(e){
        console.log("Searching filter is working")

        const newData = user.filter((users)=>{
            return users.email.toLowerCase().includes(e.target.value.toLowerCase());
        })
        console.log("newDatas user", newData)
        // setRecords(newData)
        setNewData([...newData])
        console.log(newData,"dataaa")

        
    }



    return (
        <>

            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="relative flex items-center text-gray-400 focus-within:text-cyan-400" style={{width: '30%'}}>
                <span class="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" class="w-4 fill-current" viewBox="0 0 35.997 36.004">
                        <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                </span>
                <input type="search" onChange={handleSearch} name="leadingIcon" id="leadingIcon" placeholder="Search here" class="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
            </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                firstname
                            </th>
                            <th scope="col" className="px-6 py-3">
                                username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newData.length === 0 ? (
                            <p className=' text-cyan-400 '>No Data Found</p>
                        ):(
                                newData?.map((user, index) => (
                                    <tr key={index.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.email}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.first_name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 flex ">
                                            {user.is_active ? (

                                                <button onClick={() => handleBlock(user.id, user.is_active)} class="text-blue-600 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                </svg>
                                                </button>
                                            ) : (
                                                <button >
                                                    <svg onClick={() => handleUnBlock(user.id, user.is_active)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                    </svg>

                                                </button>
                                            )}
                                            {user.is_active && (
                                                <button>
                                                    <svg onClick={() => handleDelete(user.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            )}

                                        </td>
                                    </tr>
                                ))    
                        )

                        } 
                        
                    </tbody>
                </table>
            </div>


        </>
    )
}
export default Userlist