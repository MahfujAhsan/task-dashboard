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

const route = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: "/",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/create-new",
                element: <CreateNew></CreateNew>
            },
            {
                path: "/new-tasks",
                element: <NewTasks></NewTasks>
            },
            {
                path: "/in-progress",
                element: <InProgress></InProgress>
            },
            {
                path: "/completed",
                element: <Completed></Completed>
            },
            {
                path: "/canceled",
                element: <Canceled></Canceled>
            },
            {
                path: "/login",
                element: <SignIn></SignIn>
            },
        ]
    }
])

export default route;