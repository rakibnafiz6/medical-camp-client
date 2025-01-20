import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import AllTableSearch from "../../../components/AllTableSearch/AllTableSearch";

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');

    const { data: camps = [], refetch } = useQuery({
        queryKey: ['manage-camps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-camps?search=${search}`)
            return res.data;
        }
    })

    const handleDelete = (id) => {
        // console.log(id)
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
                axiosSecure.delete(`/delete-camp/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount) {
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

    const handleSearch = (query) => {
        setSearch(query);
        refetch();
    };



    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(camps.length / rowsPerPage);
    // Get current page data
    const currentData = camps.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);



    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Manage Camps</h2>
            <AllTableSearch onSearch={handleSearch}></AllTableSearch>
            <div className="overflow-x-auto min-h-screen">
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
                            currentData.map((camp, idx) => <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>{camp.campName}</td>
                                <td>{camp.dateTime}</td>
                                <td>{camp.location}</td>
                                <td>{camp.professionalName}</td>
                                <td className="flex flex-col lg:flex-row">
                                    <Link to={`/dashboard/update-camps/${camp._id}`}><button className="btn mr-1">Update</button></Link>
                                    <button onClick={() => handleDelete(camp._id)} className="btn">Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mx-1 bg-gray-300 rounded"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className="px-4 py-2 mx-1 bg-gray-300 rounded"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ManageCamps;