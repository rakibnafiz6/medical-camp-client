import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();

    const { data: camps = [], refetch } = useQuery({
        queryKey: ['manage-camps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/manage-camps`)

            return res.data;
        }
    })

    const handleDelete = (id)=>{
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
            axios.delete(`${import.meta.env.VITE_API_URL}/delete-camp/${id}`)
            .then(res=>{
                // console.log(res.data);
               if(res.data.deletedCount){
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your camp has been deleted.",
                    icon: "success"
                  });
               }
            })
            }
          });
    }

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
                                <Link to={`/dashboard/update-camps/${camp._id}`}><button className="btn mr-1">Update</button></Link>
                                <button onClick={()=>handleDelete(camp._id)} className="btn">Delete</button>
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