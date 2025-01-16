import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { MdSupervisorAccount } from 'react-icons/md';
import { SiNamebase } from 'react-icons/si';
import { useParams } from 'react-router-dom';

const CampDetails = () => {
    const { id } = useParams();

    const { data: camps = {} } = useQuery({
        queryKey: ['details'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps-details/${id}`)
            return res.data;
        }
    })

    const { campName, dateTime, description, fees, image, location, participantCount, professionalName } = camps;
    // console.log(camps);

    return (
        <div>
            <h2>Camp Details</h2>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row w-full">
                    <div className='w-2/3'>
                        <img
                            src={image}
                            className="w-full rounded-lg shadow-2xl" />
                    </div>
                    <div className='w-1/3'>
                        <h1 className="text-5xl font-bold">{campName}</h1>
                        <p className='flex items-center gap-1 mb-2 mt-2'><FaLocationArrow />{location}</p>
                        <p className='flex items-center gap-1 mb-2'><BsCalendarDateFill />{dateTime}</p>
                        <p className='flex items-center gap-1 mb-2'><MdSupervisorAccount />{participantCount}</p>
                        <p className='flex items-center gap-1 mb-2'><GiMoneyStack />{fees}</p>
                        <p className='flex items-center gap-1'><SiNamebase />{professionalName}</p>
                        <p className="py-6">
                            {/* {description} */}
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas alias modi quae cumque. Amet eligendi error, perferendis, explicabo cum aliquid veniam, illo et expedita deserunt nobis fuga incidunt tempore delectus doloremque voluptate numquam nulla laborum! Molestiae enim voluptatem placeat eos repudiandae! Architecto consectetur quis odit? Eos non voluptate rerum earum?
                        </p>
                        <button className="btn btn-primary">Join Camp</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;