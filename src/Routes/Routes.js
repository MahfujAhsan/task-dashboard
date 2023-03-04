import { createBrowserRouter } from "react-router-dom";
import Canceled from "../Canceled/Canceled";
import Completed from "../Completed/Completed";
import CreateNew from "../CreateNew/CreateNew";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DisplayError from "../DisplayError/DisplayError";
import InProgress from "../InProgress/InProgress";
import SignIn from "../Login/SignIn";
import NewTasks from "../NewTasks/NewTasks";
import PrivateRoute from "../PrivateRoute/Privateroute";
import SignUp from "../SignUp/SignUp";

const route = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: "/",
                element: <PrivateRoute>
                    <Dashboard></Dashboard>
                </PrivateRoute>
            },
            {
                path: "/create-new",
                element: <PrivateRoute>
                    <CreateNew></CreateNew>
                </PrivateRoute>
            },
            {
                path: "/new-tasks",
                element: <PrivateRoute>
                    <NewTasks></NewTasks>
                </PrivateRoute>
            },
            {
                path: "/in-progress",
                element: <PrivateRoute>
                    <InProgress></InProgress>
                </PrivateRoute>
            },
            {
                path: "/completed",
                element: <PrivateRoute>
                    <Completed></Completed>
                </PrivateRoute>
            },
            {
                path: "/canceled",
                element: <PrivateRoute>
                    <Canceled></Canceled>
                </PrivateRoute>
            },
            {
                path: "/login",
                element: <SignIn></SignIn>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            }
        ]
    }
])

export default route;