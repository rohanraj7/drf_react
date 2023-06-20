import axios from '../Axios'
import React, { useContext, useState } from 'react'
import { changepassword } from '../Constants/Constants'
import Swal from 'sweetalert2'
// import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from '../Context/AuthContext';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function ChangePassword() {

    const {user} = useContext(AuthContext)
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [validationErrors,setValidationErrors] = useState()


    const navigate = useNavigate()

    function handlePassword(e) {
        e.preventDefault()
        console.log("checking")

        let validate = passwordVerify()

        if (validate === true) {
            console.log("checking passed")
            const data = JSON.stringify({
                'currentPassword': currentPassword,
                'newPassword': newPassword
            })
            // const swalWithBootstrapButtons = Swal.mixin({
            //     customClass: {
            //         confirmButton: 'btn btn-success',
            //         cancelButton: 'btn btn-danger'
            //     },
            //     buttonsStyling: false
            // })

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
        } else {
            console.log("error camed in changepassord senting")
            setValidationErrors(validate)
        }

    }


    function passwordVerify() {

        console.log("ok working in passwordverify")
        let error = {}
        let flag = false
        console.log("loveme")
        
        const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/

        if (currentPassword === "") {
            flag = true
            error.currentpassword = "Current password can't be Empty"
            return error
        }
        if (newPassword == "") {
            flag = true
            error.newpassword = "new password can't be Empty"
            return error

        }
        else if (!password_pattern.test(newPassword)) {
            flag = true
            error.newpassword = "Password is not valid"
            return error

        }
        if (confirmPassword == "") {
            flag = true
            error.confirmpassword = "Confirm Password is not matching"
            return error

        }
        if (flag == true) {
            console.log("error correct in verify")
            return error
        } else {
            console.log("no error proceed")
            return true
        }
    }
    return (
        <>
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
                    
                                        <input className="" id="" type="text"/>
                                        {validationErrors.currentpassword && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.currentpassword}
                                        </div>
                                        )}

                                        <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="New Password" onChange={(e) => { setNewPassword(e.target.value) }} type="password" name="newpassword" id="password" />
                                        {validationErrors.newpassword && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            {validationErrors.newpassword}
                                        </div>
                                        )}
                                        <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" name="confirmpassword" id="password" />
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
        </>
    )
}

export default ChangePassword