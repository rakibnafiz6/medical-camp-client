import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const links = <>
    <NavLink to='/' className='mr-2'><li>Home</li></NavLink>
    <NavLink><li>Available Camps</li></NavLink>
    </>
    const {signOutUser}= useAuth();

    const handleLogOut = ()=>{
        signOutUser()
        .then(()=>{
            console.log('sign out successfully');
        })
        .catch(error=>{
            console.log(error.message);
        })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Medical Camp</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Link to='/login'><button className="btn">Join Us</button></Link>
                <button onClick={handleLogOut} className="btn">Logout</button>
            </div>
        </div>
    );
};

export default NavBar;