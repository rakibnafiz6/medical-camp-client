import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ParticipantProfile = () => {
    const {user} = useAuth();

    const {data} = useQuery({
        queryKey: ['participant-profile'],
        queryFn: async()=>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/participant-profile/${user?.email}`)
            return res.data;
        }
    })
 console.log(data);


    return (
        <div className='max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 space-y-2'>
        <h2 className='text-2xl font-bold text-center mb-5'>Participant Profile</h2>
           <div className='w-6/12 mx-auto space-y-2'>
            <img src={data?.image}
            className='w-32 h-32 rounded-full'
             alt="" />
            <h2 className='text-lg font-bold'>Name: {data?.name}</h2>
            <p className='font-medium text-gray-500'>Email: {data?.email}</p>
            <Link to={`/dashboard/participant/${data?._id}`}><button className='btn btn-primary mt-2'>Update</button></Link>
           </div>
      </div>
    );
};

export default ParticipantProfile;