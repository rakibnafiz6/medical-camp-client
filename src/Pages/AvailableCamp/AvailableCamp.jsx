import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { MdSupervisorAccount } from 'react-icons/md';
import { SiNamebase } from 'react-icons/si';

const AvailableCamp = () => {
    const { data: camps = [] } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps`)
            return res.data;
        }
    })

    return (
        <div className='min-h-screen'>
            <h2>available camps {camps.length}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    camps.map(camp =>
                        <div className="card bg-base-100 shadow-xl">
                            <figure>
                              <img
                                src={camp.image}
                                alt="camps" />
                            </figure>
                            <div className="card-body">
                              <h2 className="card-title">{camp.campName}</h2>
                              <p className='flex items-center gap-1'><FaLocationArrow />{camp.location}</p>
                              <p className='flex items-center gap-1'><BsCalendarDateFill />{camp.dateTime}</p>
                              <p className='flex items-center gap-1'><MdSupervisorAccount />{camp.participantCount}</p>
                              <p className='flex items-center gap-1'><SiNamebase />{camp.professionalName}</p>
                              <p className=''>{`${camp.description}`.slice(0,40)}...</p> 
                              <div className="card-actions">
                                <button className="btn btn-primary">Details</button>
                              </div>
                            </div>
                          </div>
                       
                    )
                }
            </div>

        </div>
    );
};

export default AvailableCamp;