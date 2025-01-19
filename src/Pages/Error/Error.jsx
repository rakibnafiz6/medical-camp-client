import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col items-center min-h-screen pt-4">
            <h2 className="text-4xl font-bold text-[#b090c1]">Sorry</h2>
            <p className="text-[#63c463] mb-2">Page Not Found</p>
            <img src="https://i.ibb.co.com/5Gxt2LM/download.jpg"
                className="w-52"
                alt="" />
            <Link to='/' className="btn bg-gradient-to-r from-[#2d49bd] to-[#de2045] text-white mt-2">Go Back</Link>
        </div>
    );
};

export default Error;