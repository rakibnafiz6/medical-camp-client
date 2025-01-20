import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { MdSupervisorAccount } from "react-icons/md";
import { SiNamebase } from "react-icons/si";
import { Link } from "react-router-dom";

const HighsParticipant = () => {

    const { data } = useQuery({
        queryKey: ['highs-participant'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/high-participant`)

            return res.data;
        }
    })
    // console.log(data);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Highs Participant Card</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map(camp => <div key={camp._id} className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                            src={camp.image}
                            alt=""
                            className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{camp.campName}</h2>
                        <p className='flex items-center gap-1'><BsCalendarDateFill />{camp.dateTime}</p>
                        <p className='flex items-center gap-1'><GiMoneyStack />{camp.fees}</p>
                        <p className='flex items-center gap-1'><FaLocationArrow />{camp.location}</p>
                        <p className='flex items-center gap-1'><SiNamebase />{camp.professionalName}</p>
                         <p className='flex items-center gap-1'><MdSupervisorAccount />{camp.participantCount}</p>
                        <div className="card-actions">
                           <Link to={`/camp-details/${camp._id}`}><button className="btn btn-primary">Details</button></Link>
                        </div>
                    </div>
                </div>)}
            </div>
            <div className="flex justify-center">
            <Link to='/available'><button className="btn btn-primary mt-5 md:w-[400px]">See All Camps</button></Link>
            </div>
        </div>
    );
};

export default HighsParticipant;
