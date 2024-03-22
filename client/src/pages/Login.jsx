import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import googleLogo from '../assets/google-logo.svg'
// import {
//     getAuth
//   } from "firebase/auth";
// import app from "../firebase/firebase.config";
export default function Login() {


    const { signUpWithGmail, login, signOut } = useContext(AuthContext);
    // const auth = getAuth(app);
    // console.log(signUpWithGmail)
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // login with google
    const handleRegister = () => {
        signUpWithGmail().then((result) => {
            if (!result.user.email.endsWith("lnmiit.ac.in")) {
                // If not, sign out the user and throw an error
                // signOut(auth);
                alert("Invalid email domain. Please use an @lnmiit.ac.in email.");
              }
              else{
                const user = result?.user;
                navigate("/admin/dashboard/manage");
              }
        }).catch((error) => console.log(error))
    }

    return (

        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-3xl font-semibold">Please Login to Dashboard</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                        </div>
                    </div>

                    {/* social login */}
                    <div>
                        <hr />
                        <div className="flex w-full items-center flex-col mt-5 gap-3">
                            <button onClick={handleRegister} className='block'> <img src={googleLogo} alt="" className='w-12 h-12 inline-block' />Log in with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
