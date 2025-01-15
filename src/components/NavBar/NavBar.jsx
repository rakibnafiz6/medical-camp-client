import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
    const links = <>
        <NavLink to='/' className='mr-2'><li>Home</li></NavLink>
        <NavLink to='/available'><li>Available Camps</li></NavLink>
    </>
    const { signOutUser, user } = useAuth();

    const handleLogOut = () => {
        signOutUser()
            .then(() => {
                console.log('sign out successfully');
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="navbar bg-base-100 px-10">
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
            <div className="navbar-end mr-6">
                {user ? <details className="dropdown">
                    
                    <summary className="btn">
                    <img className="w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                        <li className="mb-1 ml-2 text-base">{user?.displayName}</li>
                        <Link to='/dashboard'><li className="mb-1"><button className="btn-xs flex text-base">Dashboard</button></li></Link>
                        <li><button onClick={handleLogOut} className="btn-xs flex text-base">Logout</button></li>
                    </ul>
                </details>
                    : <Link to='/login'><button className="btn">Join Us</button></Link>
                }
                
                

            </div>
        </div>
    );
};
export default NavBar;