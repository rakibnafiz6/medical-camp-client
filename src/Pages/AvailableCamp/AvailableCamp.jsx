import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { BsCalendarDateFill } from 'react-icons/bs';
import { FaLocationArrow } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { MdSupervisorAccount } from 'react-icons/md';
import { SiNamebase } from 'react-icons/si';
import { TbLayout2Filled } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const AvailableCamp = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [layout, setLayout] = useState('');

    // console.log(sort);
    const { data: camps = [], refetch } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/camps?search=${search}&sort=${sort}`)
            return res.data;
        }
    })
    if(search || sort===true){
        refetch();
    }
    else{
        refetch();
    }
    

    return (
        <div className='min-h-screen'>
            <div className='flex justify-center items-center gap-5 mb-5'>
                <label className="input input-bordered flex items-center gap-2 w-80">
                    <input
                        onChange={e => setSearch(e.target.value)}
                        type="text" className="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" />
                    </svg>
                </label>
                
                <details className="dropdown">
                    <summary className="btn m-1">{sort?`Sort by: ${sort}` :'Sort Here'}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={()=>setSort('Most Registered')}><a>Most Registered</a></li>
                        <li onClick={()=>setSort('Camp Fees')}><a>Camp Fees</a></li>
                        <li onClick={()=>setSort('Alphabetical Order')}><a>Alphabetical Order (Camp Name)</a></li>
                    </ul>
                </details>
                <button 
                onClick={()=>setLayout('column')}
                 className='btn text-2xl'><TbLayout2Filled /></button>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${layout? 'lg:grid-cols-2': 'lg:grid-cols-3'}  gap-6`}>
                {
                    camps.map(camp =>
                        <div key={camp._id} className="card bg-base-100 shadow-xl">
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
                                <p className='flex items-center gap-1'><GiMoneyStack />{camp.fees}</p>
                                <p className='flex items-center gap-1'><SiNamebase />{camp.professionalName}</p>
                                <p className=''>{`${camp.description}`.slice(0, 40)}...</p>
                                <div className="card-actions">
                                    <Link to={`/camp-details/${camp._id}`}>
                                    <button className="btn btn-primary">Details</button>
                                    </Link>
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