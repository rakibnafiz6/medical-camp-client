import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageCamps = () => {

    const { data: camps = [] } = useQuery({
        queryKey: ['manage-camps'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/manage-camps`)

            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Manage Camps</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        camps.map((camp, idx) =><tr key={idx} className="hover">
                            <th>{idx + 1}</th>
                            <td>{camp.campName}</td>
                            <td>{camp.dateTime}</td>
                            <td>{camp.location}</td>
                            <td>{camp.professionalName}</td>
                            <td className="flex flex-col md:flex-row">
                                <Link><button className="btn mr-1">Update</button></Link>
                                <button className="btn">Delete</button>
                            </td>
                        </tr>)
                       }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;