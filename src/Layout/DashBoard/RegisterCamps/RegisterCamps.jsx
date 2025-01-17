import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RegisterCamps = () => {
    const { user } = useAuth();

    const { data, refetch } = useQuery({
        queryKey: ['register-camp', user?.email],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/register/${user?.email}`)

            return res.data;
        }
    })
    // console.log(data);

    const handleCancel = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/register/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Canceled!",
                                text: "Your register has been canceled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-4">Register Camps</h2>
            {data?.length?<div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
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
                        {
                            data?.map((camp, idx) => <tr key={idx} className="hover">
                                <th>{idx + 1}</th>
                                <td>{camp.campName}</td>
                                <td>{camp.campFees}</td>
                                <td>{camp.participantName}</td>
                                <td>
                                    {camp.paymentStatus === 'unpaid' ? <button className="btn">Pay</button> : "Paid"
                                    }
                                </td>
                                <td>{camp.confirmationStatus}</td>
                                <td>
                                    {camp.paymentStatus === 'unpaid' ? <button
                                        onClick={() => handleCancel(camp._id)}
                                        className="btn">Cancel</button> : <button disabled className="btn">Cancel</button>

                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>:<p className="font-bold text-center text-lg">You are not register camp please! register camp and access your data</p>}
            
        </div>
    );
};

export default RegisterCamps;