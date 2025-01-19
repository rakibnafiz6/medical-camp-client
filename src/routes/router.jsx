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
import OrganizerProfile from "../Layout/DashBoard/OrganizerProfile/OrganizerProfile";
import UpdateOrganizerProfile from "../Layout/DashBoard/UpdateOrganizerProfile/UpdateOrganizerProfile";
import ManageCamps from "../Layout/DashBoard/ManageCamps/ManageCamps";
import UpdateCamps from "../Layout/DashBoard/UpdateCamps/UpdateCamps";
import RegisterCamps from "../Layout/DashBoard/RegisterCamps/RegisterCamps";
import Payment from "../Layout/DashBoard/Payment/Payment";
import PaymentHistory from "../Layout/DashBoard/PaymentHistory/PaymentHistory";
import ManageRegisterCamp from "../Layout/DashBoard/ManageRegisterCamp/ManageRegisterCamp";
import Feedback from "../Layout/DashBoard/Feedback/Feedback";




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
            path: '/dashboard/organizer-profile',
            element: <OrganizerProfile></OrganizerProfile>
           },
           {
            path: '/dashboard/organizer-update',
            element: <UpdateOrganizerProfile></UpdateOrganizerProfile>
           },
           {
            path: '/dashboard/manage-camps',
            element: <ManageCamps></ManageCamps>
           },
           {
            path: '/dashboard/manage-register',
            element: <ManageRegisterCamp></ManageRegisterCamp>
           },
           {
            path: '/dashboard/update-camps/:id',
            element: <UpdateCamps></UpdateCamps>
           },
           {
            path: '/dashboard/register',
            element: <RegisterCamps></RegisterCamps>
           },
           {
            path: '/dashboard/payment',
            element: <Payment></Payment>
           },
           {
            path: '/dashboard/payment-history',
            element: <PaymentHistory></PaymentHistory>
           },
           {
            path: '/dashboard/feedback',
            element: <Feedback></Feedback>
           }

        ]
    }
]);

export default router;