import { Link, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
        <div className="flex w-11/12 mx-auto">
        <div className="bg-red-600 flex flex-col p-8 min-h-screen">
            {/* organizer */}
            <Link to='/dashboard/profile'>Organizer Profile</Link>
            <Link to='/dashboard/add-camp'>Add A Camp</Link>
            <Link>Manage Camps</Link>
            <Link>Manage Registered Camps</Link>
            
            {/* Participant */}
            <Link>Analytics</Link>
            <Link>Participant Profile</Link>
            <Link>Registered Camps</Link>
            <Link>Payment History</Link>
            <Link to='/'>Home</Link>

        </div>
        <div className="w-full pt-7">
            <Outlet></Outlet>
        </div>
        </div>
    );
};

export default DashBoard;