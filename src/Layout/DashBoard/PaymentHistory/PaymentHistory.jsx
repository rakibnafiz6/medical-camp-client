import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import AllTableSearch from "../../../components/AllTableSearch/AllTableSearch";

const PaymentHistory = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');

    const { data: payments, refetch } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/payment-history/${user?.email}?search=${search}`)
            return res.data;
        }
    })
    
    const handleSearch = (query) => {
        setSearch(query);
        refetch();
    };



    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Calculate total pages
    const totalPages = Math.ceil(payments?.length / rowsPerPage);
    // Get current page data
    const currentData = payments?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);


    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Payment History</h2>
            <AllTableSearch onSearch={handleSearch}></AllTableSearch>
            {payments?.length ?<> <div className="overflow-x-auto min-h-screen">
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
                        {currentData.map((payment, idx)=><tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{payment.campName}</td>
                            <td>{payment.campFees}</td>
                            <td>{payment.paymentStatus}</td>
                            <td>{payment.confirmationStatus}</td>
                            <td>{payment.transactionId}</td>
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
            </>: <p className="font-bold text-center text-lg">You are not payment please! payment your camp</p>}
        </div>
    );
};

export default PaymentHistory;