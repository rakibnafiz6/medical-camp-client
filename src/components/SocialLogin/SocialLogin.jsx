import React from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {signInGoogle} = useAuth();
    const navigate = useNavigate();

    const handleGoogle = ()=>{
        signInGoogle()
        .then(result=>{

            const userInfo ={
                name: result?.user?.displayName,
                email: result?.user?.email,
                image: result?.user?.photoURL
            }

            axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                .then(res => {
                    // console.log(res.data);
                  navigate('/');
                })
        })
        .catch(error=>{
            // console.log(error.message);
        })
    }

    return (
        <div>
             <button onClick={handleGoogle} className="btn btn-primary lg:w-80 ml-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Google
                    </button>
        </div>
    );
};

export default SocialLogin;