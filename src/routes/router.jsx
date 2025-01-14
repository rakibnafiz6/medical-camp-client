import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashBoard from "../Layout/DashBoard/DashBoard";




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
            path: '/dashboard',
            element: <h1>outlet</h1>
           },
           {
            path: '/dashboard/profile',
            element: <h1>profile</h1>
           }
        ]
    }
]);

export default router;