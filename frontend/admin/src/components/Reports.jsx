import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { issuesolved, reports, url } from '../constants/Constants'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import Swal from 'sweetalert2'


function Reports() {


    const [report, setReport] = useState([])

    useEffect(() => {
        getReports()
    }, [])

    function getReports() {
        axios.get(reports).then((response) => {
            setReport(response.data)
        })
    }

    function checked(reportId) {
        axios.post(issuesolved, JSON.stringify({ 'report_id': reportId }), {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            Swal.fire(
                'Solved!',
                response.data.status,
                'success'
            )
            getReports()
        })
    }

    return (
        <>

            {report.length === 0 ? (
                <div>
                    <img style={{ marginLeft: "310px" }} src='https://media0.giphy.com/media/xT9IgAvSlauYLm97ji/giphy.gif?cid=ecf05e47vm9eg84oefgckbzxgv515g6tnqeklymxumrggloj&ep=v1_gifs_related&rid=giphy.gif' />
                    <p style={{ fontSize: '20px', marginTop: '20px' }} className='text-center text-red-400'>No Issues Found................!</p>
                </div>

            ):(
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                user
                            </th>
                            <th scope="col" className=" text-center px-6 py-3">
                                Reported person username
                            </th>
                            <th scope="col" className="text-center px-6 py-3 ">
                                messages
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Content
                            </th>
                            <th scope="col" className="text-center px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {report?.map((value, index) => (
                            <tr key={index.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className='flex'>
                                        <Link>
                                            <Avatar urls={value.user.image} />
                                        </Link>
                                        <h1 className='ml-4 mt-2 text-gray-400'>{value.user.username}</h1>
                                    </div>
                                </th>
                                {value.post && (
                                    <th scope="row" className=" text-center  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {value.post.user.username}
                                        <h1 className='text-cyan-600'>[it a photo]</h1>
                                    </th>
                                )}
                                {value.video && (
                                    <th scope="row" className="text-center  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {value.video.user.username}
                                        <h1 className='text-cyan-600'>[it a Video]</h1>

                                    </th>
                                )}
                                <th scope="row" className="text-center  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <h1 className='text-cyan-600'>{value.report_message}</h1>

                                </th>
                                {value.post.image === "/undefined" &&
                                    <td className="px-6 py-4">
                                        <div className="rounded-md overflow-hidden  flex justify-center">
                                            {/* <img className="w-1/6" src={url + value.post.image} alt="" style={{ width: "10%" }} /> */}
                                            <p className='animate-pulse text-purple-600'>Text Type Nothing to Show</p>
                                        </div>
                                    </td>
                                }
                                {value.post &&
                                    <td className="px-6 py-4">
                                        <div className="rounded-md overflow-hidden  flex justify-center">
                                            <img className="w-1/6" src={url + value.post.image} alt="" style={{ width: "10%" }} />
                                        </div>
                                    </td>
                                }
                                {value.video &&
                                    <td className="px-6 py-4">
                                        <div className="rounded-md overflow-hidden  flex justify-center">
                                            <video className='w-1/6' controls>
                                                <source src={url + value.video.video} type="video/mp4" />
                                            </video>
                                        </div>
                                    </td>
                                }
                                <td className="px-6 py-4">
                                    <button onClick={() => { checked(value.id) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            )
            }

        </>
    )
}

export default Reports