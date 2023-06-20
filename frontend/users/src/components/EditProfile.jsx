import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import AuthContext from '../Context/AuthContext'

// import 'bootstrap/dist/css/bootstrap.min.css';


import logo from '../assets/download (1).png'
import axios from '../Axios'
import { changepassword, editprofile, getuser, url } from '../Constants/Constants'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


function EditProfile() {

    const { user } = useContext(AuthContext)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState()
    const [about, setAbout] = useState()
    const [validationErrors, setValidationErrors] = useState({})
    const [profileImage, setProfileImage] = useState()
    const [oldProfileImage, setOldProfileImage] = useState()
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const navigate = useNavigate()


    useEffect(() => {
        getUser()
        console.log(firstname,"Foundeddd")
    }, [])


    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": user.user_id }), { headers: { 'Content-Type': 'application/json' } }).then((response) => {
            console.log(response.data,"response")
            setAbout(response.data.about)
            setFirstname(response.data.first_name)
            setLastname(response.data.last_name)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setOldProfileImage(response.data.image)
        })
    }

    function handleProfile(e) {
        e.preventDefault()
        console.log("checking all good")
        const formdata = new FormData()
        formdata.append('firstname', firstname)
        formdata.append('lastname', lastname)
        formdata.append('username', username)
        formdata.append('email', email)
        formdata.append('about', about)
        formdata.append('profileImage', profileImage)
        


        console.log(formdata, "form is")
        let validate = profileValide()
        if(validate !== false){
            console.log("Mistake")
            setValidationErrors(validate)
        }
        if (validate === false) {
            console.log("condition okay")
            axios.put(editprofile + user.user_id, formdata).then((response) => {
                getUser()
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        Swal.fire('Saved!', '', 'success')
                        // navigate('/profile')
                        
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }).catch((error) => {
                console.log("error founded", error.response.status)
                if (error.response.status === 406) {
                    setValidationErrors({ email: error.response.data })
                }
                if (error.response.status === 401) {
                    setValidationErrors({ username: error.response.data })
                }
            });
        }
        // else {
        //     setValidationErrors(validate)
        // }

    }


    function profileValide() {
        let error = {}
        let flag = false
        let email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      
        if (firstname === "") {
            flag = true
            error.firstname = "First name should not be Empty"
        }
        if (lastname === "") {
            flag = true
            error.lastname = "Last name should not be Empty"
        }
        if (username === "") {
            flag = true
            error.username = "please provide username"
        }
        if (email === "") {
            flag = true
            error.email = "Email should not be Empty"
        }
        else if (!email_pattern.test(email)) {
            flag = true
            error.email = "Email Address is not valid"
        }
        if (about === "") {
            console.log("validate not clear")
            flag = true
            error.about = "Describe Something About You"
        }
        if (flag === true) {
            console.log("here")
            return error
        }
        else {
            console.log("Checked ok!")
            return flag
        }

    }


    function handlePassword(e) {
        e.preventDefault()
        console.log("checking ")

        let validate = passwordVerify()

        if (validate === true) {
            console.log("checking passed")
            const data = JSON.stringify({
                'currentPassword': currentPassword,
                'newPassword': newPassword
            })
            Swal.fire({
                title: 'Are you sure?',
                text: "Aren't You sure to change password!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Changed!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result)=>{
                if(result.value){
                    if(result.isConfirmed) {
                        Swal.fire(
                            'Changed!',
                            'Your password has been changed.',
                            'success'
                          )
                        }
                        console.log("request sent0")
                        axios.put(changepassword + user.user_id,data,{ headers: { 'Content-Type': 'application/json'}}).then((response)=>{
                            console.log("request sent")
                            setNewPassword("")
                            setConfirmPassword("")
                            navigate('/profile')
                        
                    }).catch((error)=>{
                        if(error.response.status === 401){
                            setValidationErrors({currentpassword:error.response.data})
                        }
                    })
                }
            })
        } 
        else {
            console.log("error camed in changepassord senting")
            setValidationErrors(validate)
        }

    }



    function passwordVerify() {
        let error = {};
        let flag = false;
        const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
      
        if (currentPassword === "") {
          flag = true;
          error.currpassword = "Current password can't be empty"; // Updated error message
        }
        if (newPassword === "") {
          flag = true;
          error.newpassword = "New password can't be empty"; // Updated error message
        } else if (!password_pattern.test(newPassword)) {
          flag = true;
          error.newpassword = "Password is not valid";
        }
        if (confirmPassword === "") {
          flag = true;
          error.confirmpassword = "Confirm Password is not matching";
        }
        if (flag === true) {
        console.log("not reaching")
          return error;
        } else {
          console.log("someth9")
          return true;
        }
      }
      


    return (
        <>
            <div>
                <Card>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                        <form onSubmit={handleProfile}>
                            <div className="flex flex-col items-center mb-5 relative">
                                <div className="w-36 h-36 bg-gray-400 rounded-full overflow-hidden">
                                    {profileImage && <img className="object-fill" src={URL.createObjectURL(profileImage)} alt=""></img>}
                                    {oldProfileImage !== null ? <img className="object-fill" src={url + oldProfileImage} alt=""></img> : <img className="object-cover" src={logo} alt="" />}
                                </div>
                                <button className="font-bold bg-gray-500 px-2 mt-1 text-white hover:bg-gray-400 rounded-md shadow-md">Change</button>
                                <input onChange={(e) => setProfileImage(e.target.files[0])} type="file" className="w-14 h-6 absolute bottom-0 opacity-0" />
                            </div>
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        First Name
                                    </label>
                                    <input onChange={(e) => { setFirstname(e.target.value) }} value={firstname} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="first-name" type="text" placeholder="Jane" />
                                    {validationErrors.firstname && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.firstname}
                                        </div>
                                    )}
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Last Name
                                    </label>
                                    <input onChange={(e) => { setLastname(e.target.value) }} value={lastname} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="last-name" type="text" placeholder="Doe" />
                                    {validationErrors.lastname && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.lastname}
                                        </div>
                                    )}
                                </div>
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        UserName
                                    </label>
                                    <input onChange={(e) => { setUsername(e.target.value) }} value={username} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe" />
                                    {validationErrors.username && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.username}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                                        Email
                                    </label>
                                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="email" placeholder="Jhoe@email.com" />
                                    {validationErrors.email && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.email}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="-mx-3 md:flex mb-6">
                                <div className="md:w-full px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-password">
                                        About
                                    </label>
                                    <input onChange={(e) => { setAbout(e.target.value) }} value={about} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text" placeholder="Bio" />
                                    <p className="text-grey-dark text-xs italic">Interesting Something describe in Your Bio</p>
                                    {validationErrors.about && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.about}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
                                Submit
                            </button>
                        </form>
                    </div>
                    <Card>
                        <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
                            <form onSubmit={handlePassword}>
                                <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
                                    <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
                                        <div>
                                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">CHANGE PASSWORD</h1>
                                            <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">Secure Your Account With ConnnectOuts</p>
                                        </div>

                                        <div className="mt-8 space-y-8">
                                            <div className="space-y-6">
                                                <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Current password" onChange={(e) => { setCurrentPassword(e.target.value) }} type="password"  id="password1" />
                                                {validationErrors.currpassword && (
                                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                                        {validationErrors.currpassword}
                                                    </div>
                                                )}
                                                <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="New Password" onChange={(e) => { setNewPassword(e.target.value) }} type="password"  id="password2" />
                                                {validationErrors.newpassword && (
                                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                                        {validationErrors.newpassword}
                                                    </div>
                                                )}
                                                <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} type="password"  id="password3" />
                                                {validationErrors.confirmpassword && (
                                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                                        {validationErrors.confirmpassword}
                                                    </div>
                                                )}
                                            </div>

                                            <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Card>
                </Card>
            </div>

        </>
    )
}

export default EditProfile