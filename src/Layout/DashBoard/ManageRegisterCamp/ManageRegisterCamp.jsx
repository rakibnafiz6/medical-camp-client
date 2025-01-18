import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageRegisterCamp = () => {

    const { data: registerCamps = [] } = useQuery({
        queryKey: ['manage-register'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/manage-register`)
            return res.data;
        }
    })
    console.log(registerCamps);
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
                            <td><button className="btn btn-xs">
                            {camp.confirmationStatus}
                            </button></td>
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