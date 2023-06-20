import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from '../Axios'



const Accountreg = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneno, setPhoneno] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");


  const [errors, setError] = useState({})


  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const err = validate()

    console.log(err, "hellorr")
    const body = JSON.stringify({
      username,
      email,
      phoneno,
      password,
      firstname,
      lastname
    })
    console.log(body, "heyy baby")
    if (err === true) {
      console.log("connection")
      axios.post('signup/', body, {
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Account created in ConnectOuts!",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate('/')
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setError({ username: error.response.data })
          }
          if (error.response.status === 406) {
            setError({ email: error.response.data })
          }
        });
    }
    else {
      setError(err)
    }
  };

  function validate() {
    let error = {}
    let flag = false
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/
    if (firstname === "") {
      flag = true
      error.firstname = "Fisrt name should not be Empty"
      return error
    }
    if (firstname.length < 3) {
      flag = true
      error.firstname = "Name Should be atleast 4 Letters"
      return error
    }
    if (lastname === "") {
      flag = true
      error.lastname = "Lastnameshould not be Empty"
      return error
    }
    if (username === ""){
      flag = true
      error.username = "username can't be Empty"
      return error

    }
    if(phoneno === ""){
      flag = true
      error.phoneno = "phone Number not be Empty"
      return error

    }
    else if(phoneno.length < 10){
      flag = true
      error.phoneno = "phone number should atlest 10 number"
      return error

    }
    if (email === "") {
      flag = true
      error.email = "Email should not be Empty"
      return error

    }
    else if (!email_pattern.test(email)) {
      flag = true
      error.email = "Email is should be given valid"
    }
    if (password === "") {
      flag = true
      error.password = "Paasword should not be Empty"
      return error

    }
    else if (!password_pattern.test(password)) {
      flag = true
      error.password = "Password is not valid ,password must be 8 characters need one upper case and lowercase number"
      return error
    }
    if (confirmpassword === "") {
      flag = true
      error.confirmpassword = "Confirm password cant be Empty!"
      return error
    }
    else if (password !== confirmpassword) {
      flag = true
      error.confirmpassword = "Password is not Matching"
    }
    if (flag === true) {
      return error
    }
    else {
      console.log("Something went Wrong");
      return true
    }

  }
  return (
    <>
        <div style={{ backgroundImage: `url('https://i.pinimg.com/564x/20/b2/6e/20b26e3b161e8abe28f1459599164149.jpg')`, backgroundSize: "invert" }}>
        <div className="container mx-auto py-8 bbb ">
          <h1 className="text-2xl font-bold mb-6 text-white text-center">Registration Form</h1>
          <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md" action='' onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Firstname</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setFirstname(e.target.value) }}
                type="text" id="fisrtname" name="fisrtname" placeholder="Enter your First Name" />
                {errors.firstname && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.firstname}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Lastname</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setLastname(e.target.value) }}
                type="text" id="lastname" name="lastname" placeholder="Enter your Last Name" />
                {errors.lastname && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.lastname}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setUsername(e.target.value) }}
                type="text" id="username" name="username" placeholder="Enter your username" />
              {errors.username && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.username}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneno">PhoneNumber</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setPhoneno(e.target.value) }}
                type="number" id="phoneno" name="phoneno" placeholder="Enter your Phone Number" />
                {errors.phoneno && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.phoneno}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setEmail(e.target.value) }}
                type="email" id="email" name="email" placeholder="john@example.com" />
              {errors.email && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setPassword(e.target.value) }}
                type="password" id="password" name="password" placeholder="********" />
                {errors.password && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={(e) => { setConfirmpassword(e.target.value) }}
                type="password" id="confirmpassword" name="confirmpassword" placeholder="********" />
                {errors.confirmpassword && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  {errors.confirmpassword}
                </div>
              )}
            </div>
            <button
              className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
              type="submit">Register</button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account {''}
            <Link to='/'><button className="border p-2 rounded-lg mb-6 hover:text-blue hover:border hover:border-blue-300 ">
              {''}Login Page
            </button>
            </Link>
          </p>
          </div>
        </div>
    </>
  )
}

export default Accountreg

