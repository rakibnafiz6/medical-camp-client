import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageRegisterCamp = () => {

    const { data: registerCamps = [], refetch } = useQuery({
        queryKey: ['manage-register'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/manage-register`)
            return res.data;
        }
    })
    
    const handleConfirmation = (id)=>{
        // console.log(id);
        axios.patch(`${import.meta.env.VITE_API_URL}/confirmation-status/${id}`)
        .then(res=>{
            // console.log(res.data);
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Confirmation status confirm successfully`,
                    showConfirmButton: false,
                    timer: 2000
                });
     } })
    }

    const handleDelete = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want to cancel this registration?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
          }).then((result) => {
            if (result.isConfirmed) {
            axios.delete(`${import.meta.env.VITE_API_URL}/delete-register/${id}`)
            .then(res=>{
                // console.log(res.data);
               if(res.data.deletedCount){
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

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(registerCamps.length / rowsPerPage);
    // Get current page data
    const currentData = registerCamps.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


    return (
        <div className="">
            <h2 className="font-bold text-2xl text-center mb-4">Manage Register Camp</h2>
            <div className="overflow-x-auto min-h-screen">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Participant Name</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((camp, idx) =><tr key={idx} className="hover">
                            <th>{idx + 1}</th>
                            <td>{camp.participantName}</td>
                            <td>{camp.campName}</td>
                            <td>{camp.campFees}</td>
                            <td>{camp.paymentStatus}</td>
                            <td>{camp.paymentStatus === 'paid'? <button onClick={()=>handleConfirmation(camp._id)} className="btn btn-xs" disabled={camp.confirmationStatus==='Confirmed'}>
                            {camp.confirmationStatus}
                            </button>: camp.confirmationStatus}</td>
                            <td>
                               {camp.confirmationStatus === 'Confirmed' && camp.paymentStatus === 'paid'? <button disabled className="btn">Cancel</button>: <button
                               onClick={()=>handleDelete(camp._id)}
                               className="btn">Cancel</button>}
                            </td>
                        </tr>)}
                       
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

export default ManageRegisterCamp;