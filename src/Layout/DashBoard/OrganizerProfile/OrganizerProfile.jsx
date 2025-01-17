import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const OrganizerProfile = () => {
    const {user} = useAuth();

    return (
        <div>
        <h2 className='text-2xl font-bold text-center'>Organizer Profile</h2>
           <div className='max-w-2xl mx-auto bg-white shadow-md rounded px-8 py-6 space-y-2'>
            <img src={user?.photoURL}
            className='w-20 h-20'
             alt="" />
            <h2>Name: {user?.displayName}</h2>
            <h2>Email: {user?.email}</h2>
            {/* <p>Phone: </p> */}
            <Link to='/dashboard/organizer-update'><button className='btn btn-primary'>Update</button></Link>
           </div>
      </div>
    );
};

export default OrganizerProfile;