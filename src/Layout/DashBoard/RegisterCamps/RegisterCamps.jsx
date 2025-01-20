import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";


const RegisterCamps = () => {
    const { user } = useAuth();

    const { data, refetch } = useQuery({
        queryKey: ['register-camp', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/register/${user?.email}`);
            return res.data;
        },
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/register/${id}`).then((res) => {
                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire("Canceled!", "Your registration has been canceled.", "success");
                    }
                });
            }
        });
    };

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);
    // Get current page data
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-4">Register Camps</h2>
            {data?.length ? (
                <>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Camp Name</th>
                                <th>Camp Fees</th>
                                <th>Participant Name</th>
                                <th>Payment Status</th>
                                <th>Confirmation Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((camp, idx) => (
                                <tr key={idx} className="hover">
                                    <th>{idx + 1}</th>
                                    <td>{camp.campName}</td>
                                    <td>{camp.campFees}</td>
                                    <td>{camp.participantName}</td>
                                    <td>
                                        {camp.paymentStatus === 'unpaid' ? (
                                            <Link to={`/dashboard/payment?fees=${camp.campFees}&id=${camp._id}`}>
                                                <button className="btn">Pay</button>
                                            </Link>
                                        ) : (
                                            "Paid"
                                        )}
                                    </td>
                                    <td>{camp.confirmationStatus}</td>
                                    <td>
                                        {camp.paymentStatus === 'unpaid' ? (
                                            <button onClick={() => handleCancel(camp._id)} className="btn">
                                                Cancel
                                            </button>
                                        ) : (
                                            <button disabled className="btn">
                                                Cancel
                                            </button>
                                        )}
                                        {
                                            camp.paymentStatus === 'paid' && camp.confirmationStatus === 'Confirmed' && <Link to={`/dashboard/feedback?campName=${camp.campName}&name=${camp.participantName}`}><button className="btn ml-1">Feedback</button></Link>
                                        }
                                    </td>
                                </tr>
                            ))}
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
                </>
            ) : (
                <p className="font-bold text-center text-lg">
                    You are not registered for any camp. Please register and access your data.
                </p>
            )}
        </div>
    );
};

export default RegisterCamps;

