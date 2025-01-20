import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const OrganizerProfile = () => {
    const {user} = useAuth();

    return (
        <div className='max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 space-y-2'>
        <h2 className='text-2xl font-bold text-center mb-5'>Organizer Profile</h2>
           <div className='w-6/12 mx-auto space-y-2'>
            <img src={user?.photoURL}
            className='w-20 h-20'
             alt="" />
            <h2>Name: {user?.displayName}</h2>
            <h2>Email: {user?.email}</h2>
           </div>
      </div>
    );
};

export default OrganizerProfile;