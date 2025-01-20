import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { MdSupervisorAccount } from 'react-icons/md';
import { SiNamebase } from 'react-icons/si';
import { useParams } from 'react-router-dom';
import JoinCamp from '../../Modal/JoinCamp';

const CampDetails = () => {
    const { id } = useParams();

    const { data: camps = {} } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps-details/${id}`)
            return res.data;
        }
    })

   
    return (
        <div>
            <h2 className='font-bold text-center text-2xl mb-4'>Camp Details</h2>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row w-full">
                    <div className='lg:w-2/3 md:w-full'>
                        <img
                            src={camps.image}
                            className="w-full rounded-lg shadow-2xl" />
                    </div>
                    <div className='lg:w-1/3'>
                        <h1 className="text-5xl font-bold">{camps.campName}</h1>
                        <p className='flex items-center gap-1 mb-2 mt-2'><FaLocationArrow />{camps.location}</p>
                        <p className='flex items-center gap-1 mb-2'><BsCalendarDateFill />{camps.dateTime}</p>
                        <p className='flex items-center gap-1 mb-2'><MdSupervisorAccount />{camps.participantCount}</p>
                        <p className='flex items-center gap-1 mb-2'><GiMoneyStack />{camps.fees}</p>
                        <p className='flex items-center gap-1'><SiNamebase />{camps.professionalName}</p>
                        <p className="py-6">
                            {camps.description}
                        </p>
                        <JoinCamp camps={camps} id={id}></JoinCamp>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;