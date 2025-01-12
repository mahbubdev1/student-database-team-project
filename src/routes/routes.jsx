import { createBrowserRouter } from "react-router-dom";
import Home from '../Components/Home/Home';
import Students from '../Components/Students/Students';
import Teachers from '../Components/Teachers/Teachers';
import Registration from "../Components/Registration/Registration";
import MainLayout from '../Components/mainLayout/MainLayout';
import Login from "../Components/Login/Login";
import Dashboard from "../Components/dashbord/dashboard";
import CVMaker from "../Components/Cvmaker/cvmaker";
import TecStuJoin from "../Components/joinpage/join";
import AboutUs from "../Components/AboutUs/AboutUs";
import FeedBack from "../Components/FeedBack/FeedBack";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: () => fetch('../DeboloparData.json')
            },
            {
                path: "/students",
                element: <Students />,
                loader: () => fetch('StudentData.json'),
            },
            {
                path: "/teachers",
                element: <Teachers />,
                loader: () => fetch('TeacherData.json'),
            },
            {
                path: "/registrations",
                element: <Registration></Registration>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            
            {
                path: "/dashbord",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/cv",
                element: <CVMaker></CVMaker>
            },
            {
                path: "/join",
                element: <TecStuJoin></TecStuJoin>
            },
            {
                path: '/about',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/feedBack',
                element: <FeedBack></FeedBack>
            }
           
        ],
    },
]);

export default routes;
