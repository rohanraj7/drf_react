import AuthContext from '../Context/AuthContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


const Loginn = () => {
    let { loginUser } = useContext(AuthContext)
    let {errors} = useContext(AuthContext)
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div
                    className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
                >

                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <span className="mb-3 text-4xl font-bold">Welcome back</span>
                        <span className="font-light text-gray-400 mb-8">
                            Welcome back! Please enter your Login Information
                        </span>
                        <form action="" onSubmit={loginUser}>
                            <div className="py-4">
                                <span className="mb-2 text-md">Username</span>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                    name="username"
                                    id="username"
                                />
                                {errors.username && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        {errors.username}
                                    </div>
                                )}
                            </div>
                            <div className="py-4">
                                <span className="mb-2 text-md">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                                />
                                {errors.password &&(
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        {errors.password}
                                        </div>
                                ) }
                            </div>
                            <div className="flex justify-between w-full py-4">
                                <div className="mr-24">
                                    <input type="checkbox" name="ch" id="ch" className="mr-2" />
                                    <span className="text-md">Remember for 30 days</span>
                                </div>
                                <span className="font-bold text-md">Forgot password</span>
                            </div>
                            <button
                                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                            >
                                Sign in
                            </button>
                        </form>
                        <div className=" nnn text-center text-gray-400 ">
                            Dont'have an account? {' '}
                            {/* <button className="font-bold text-blue-500 hover:text-black ">Sign up for free</button> */}
                            <Link to='/signup'><button className="bg-white text-blue p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">Signup for Free</button></Link>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://i.pinimg.com/564x/10/7b/9e/107b9edd05f22bb1efe5a8143a0ee9da.jpg"
                            alt="img"
                            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                        />

                        <div
                            className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
                        >
                            <span className="text-white text-xl"
                            >The Most important Things "<br />in the Life are the Connection <br /> you Make  with OtherS"
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loginn