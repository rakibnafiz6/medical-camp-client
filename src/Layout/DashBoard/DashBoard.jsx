// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashBoard = () => {
    const {user} = useAuth();
    // console.log(user);
    // const {data: users = [], isPending} = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async()=>{
    //         const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`)
    //         return res.data;
    //     }
    // })
    
    



    return (
        <div className="flex gap-4 w-11/12 mx-auto">
        <div className="bg-red-600 flex flex-col p-8 w-60 min-h-screen">
             
            {user?.email === "nafizrakib55@gmail.com"?<>
            {/* organizer */}
            <Link to='/dashboard/organizer-profile'>Organizer Profile</Link>
            <Link to='/dashboard/add-camp'>Add A Camp</Link>
            <Link to='/dashboard/manage-camps'>Manage Camps</Link>
            <Link className="">Manage Registered Camps</Link>
            <Link to='/'>Home</Link>
            </>
             :<>
            {/* Participant */}
            <Link>Analytics</Link>
            <Link>Participant Profile</Link>
            <Link to='/dashboard/register'>Registered Camps</Link>
            <Link to='/dashboard/payment-history'>Payment History</Link>
            <Link to='/'>Home</Link>
            </>}
            
            
           

        </div>
        <div className="w-full pt-7">
            <Outlet></Outlet>
        </div>
        </div>
    );
};

export default DashBoard;