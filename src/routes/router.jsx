import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashBoard from "../Layout/DashBoard/DashBoard";
import AddCamp from "../Layout/DashBoard/AddCamp/AddCamp";
import AvailableCamp from "../Pages/AvailableCamp/AvailableCamp";
import CampDetails from "../Pages/CampDetails/CampDetails";




const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/available',
                element: <AvailableCamp></AvailableCamp>
            },
            {
                path: '/camp-details/:id',
                element: <CampDetails></CampDetails>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashBoard></DashBoard>,
        children: [
           {
            path: '/dashboard/add-camp',
            element: <AddCamp></AddCamp>
           },
           {
            path: '/dashboard/profile',
            element: <h1>profile</h1>
           }
        ]
    }
]);

export default router;