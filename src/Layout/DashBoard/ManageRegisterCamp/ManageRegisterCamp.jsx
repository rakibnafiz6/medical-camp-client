import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
        console.log(id);
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


    return (
        <div>
            <h2>Manage Register Camp</h2>
            <div className="overflow-x-auto">
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
                        {registerCamps.map((camp, idx) =><tr key={idx} className="hover">
                            <th>{idx + 1}</th>
                            <td>{camp.participantName}</td>
                            <td>{camp.campName}</td>
                            <td>{camp.campFees}</td>
                            <td>{camp.paymentStatus}</td>
                            <td>{camp.paymentStatus === 'paid'? <button onClick={()=>handleConfirmation(camp._id)} className="btn btn-xs" disabled={camp.confirmationStatus==='Confirmed'}>
                            {camp.confirmationStatus}
                            </button>: camp.confirmationStatus}</td>
                            <td>
                                <button className="btn">Cancel</button>
                            </td>
                        </tr>)}
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisterCamp;