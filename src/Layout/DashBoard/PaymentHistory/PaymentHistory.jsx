import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
    const { user } = useAuth();

    const { data: payments } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/payment-history/${user?.email}`)
            return res.data;
        }
    })
    console.log(payments);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Payment History</h2>
            {payments?.length ? <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx)=><tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{payment.campName}</td>
                            <td>{payment.campFees}</td>
                            <td>{payment.paymentStatus}</td>
                            <td>{payment.confirmationStatus}</td>
                            <td>{payment.transactionId}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>: <p className="font-bold text-center text-lg">You are not payment please! register your camp</p>}
        </div>
    );
};

export default PaymentHistory;